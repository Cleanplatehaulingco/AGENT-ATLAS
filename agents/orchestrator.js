import Anthropic from '@anthropic-ai/sdk';
import { SHARED_TOOLS, executeTool, getAuditLog } from './tools.js';
import * as queue from './queue.js';
import { STANDARDS, DEPARTMENTS } from './standards.js';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `You are the Audit Orchestrator for TradeOpsVault — an autonomous quality control system for an Etsy digital product shop selling 20 trade form HTML templates.

Your job is to run a comprehensive quality audit across all departments and assign work to department agents when standards are not met. You do NOT fix things yourself — you delegate to department agents via enqueue_task.

Departments you can assign tasks to:
- templates: HTML form template quality and completeness
- copy: Etsy listing copy, titles, descriptions, tags, SEO
- design: mockup image generation system (images.js)
- server: backend Express server health and security (server/server.js)
- listings: LISTINGS array completeness, pricing, cross-sells

Your audit workflow:
1. Read each major file (templates.js, app.js, images.js, server/server.js)
2. Evaluate against quality standards
3. For each gap or issue: enqueue_task to the right department with full context
4. report_audit_finding for everything you find (pass OR fail)
5. After audit, summarize what was found and what tasks were queued

Quality Standards Summary:
${JSON.stringify(STANDARDS, null, 2)}

Be thorough. Be specific in task descriptions so department agents know exactly what to fix.
Do NOT make file changes yourself — delegate all fixes.
Never reference or read any file named with personal/sensitive data.`;

async function runOrchestratorLoop(messages) {
  const allMessages = [...messages];

  while (true) {
    const response = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 16000,
      thinking: { type: 'adaptive' },
      system: SYSTEM,
      tools: SHARED_TOOLS,
      messages: allMessages,
    });

    allMessages.push({ role: 'assistant', content: response.content });

    if (response.stop_reason === 'end_turn') break;

    if (response.stop_reason === 'tool_use') {
      const toolResults = [];
      for (const block of response.content) {
        if (block.type !== 'tool_use') continue;
        console.log(`[ORCHESTRATOR] Tool: ${block.name}`, JSON.stringify(block.input).slice(0, 150));
        const result = executeTool(block.name, block.input, queue);
        toolResults.push({
          type: 'tool_result',
          tool_use_id: block.id,
          content: JSON.stringify(result),
        });
      }
      allMessages.push({ role: 'user', content: toolResults });
    } else {
      break;
    }
  }

  return allMessages;
}

export async function runOrchestrator() {
  console.log('\n╔══════════════════════════════════════╗');
  console.log('║  TRADEOPSVAULT AUDIT ORCHESTRATOR    ║');
  console.log('╚══════════════════════════════════════╝');

  const messages = [{
    role: 'user',
    content: `Run a full quality audit of the TradeOpsVault codebase now.

Files to audit:
- templates.js — all 20 HTML trade form templates
- app.js — LISTINGS array, ETSY_COPY for all 20 listings
- images.js — DesignTeam mockup generation system
- server/server.js — Express backend
- render.yaml — deployment config

For each file:
1. Read it (you may need to read in chunks for large files)
2. Evaluate quality against standards
3. Enqueue specific tasks to the right department for any issue found
4. Report findings (pass or fail) for every major area

Be specific in your task descriptions so department agents can execute without asking questions.
Work systematically through all 5 departments. Start with templates.js since that's the core product.`,
  }];

  const result = await runOrchestratorLoop(messages);

  // Print audit summary
  const log = getAuditLog();
  const critical = log.filter(e => e.severity === 'critical').length;
  const warnings = log.filter(e => e.severity === 'warning').length;
  const passes = log.filter(e => e.severity === 'pass').length;
  const qSummary = queue.summary();

  console.log('\n╔══════════════════════════════════════╗');
  console.log('║         AUDIT SUMMARY                ║');
  console.log('╚══════════════════════════════════════╝');
  console.log(`Critical: ${critical} | Warnings: ${warnings} | Passes: ${passes}`);
  console.log(`Tasks queued: ${JSON.stringify(qSummary)}`);

  return { log, queueSummary: qSummary };
}
