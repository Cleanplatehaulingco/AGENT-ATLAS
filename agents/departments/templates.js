import Anthropic from '@anthropic-ai/sdk';
import { SHARED_TOOLS, executeTool } from '../tools.js';
import { dequeue, complete, fail, pendingFor } from '../queue.js';
import * as queue from '../queue.js';
import { STANDARDS, LISTING_IDS } from '../standards.js';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `You are the Templates Department Agent for TradeOpsVault. You audit and fix HTML trade form templates.

Your domain is templates.js. You must ensure every template meets these standards:
- Minimum ${STANDARDS.templates.minSections} distinct sections
- Must include: service invoice section (line items, parts total, invoice total, payment method, payment status)
- Must include: customer info, service details, work performed/diagnosis
- Must include: priority field, satisfaction section, job complete checklist
- Must include: signature section with tech and customer sign-off
- All templates must use shared helpers: _toolbar(), _header(), _footer(), _infoStrip(), _coverPage()
- Minimum ${STANDARDS.templates.minFields} fillable input/textarea fields

When you find a template below standard:
1. Read the current template code
2. Write the fix directly into templates.js using patch_file
3. Commit the fix immediately with git_commit_push
4. Report findings with report_audit_finding

Be surgical — only patch what's broken. Do not rewrite entire templates.
Work through ALL ${LISTING_IDS.length} listing IDs: ${LISTING_IDS.join(', ')}.`;

async function runAgentLoop(messages, taskId) {
  const allMessages = [...messages];

  while (true) {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 8192,
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
        console.log(`[TEMPLATES] Tool: ${block.name}`, JSON.stringify(block.input).slice(0, 120));
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

export async function runTemplatesAgent() {
  console.log('\n[TEMPLATES AGENT] Starting...');

  // Process queue tasks first
  while (true) {
    const task = dequeue('templates');
    if (!task) break;
    console.log(`[TEMPLATES] Processing task: ${task.title}`);
    try {
      const messages = [{
        role: 'user',
        content: `Task assigned: ${task.title}\n\n${task.description}\n\nContext: ${JSON.stringify(task.context)}`,
      }];
      await runAgentLoop(messages, task.id);
      complete(task.id, 'Done');
    } catch (err) {
      fail(task.id, err.message);
      console.error(`[TEMPLATES] Task failed: ${err.message}`);
    }
  }

  // Run full audit
  const messages = [{
    role: 'user',
    content: `Run a full audit of all 20 templates in templates.js. For each listing ID (${LISTING_IDS.join(', ')}):
1. Read the relevant section in templates.js
2. Check it meets all quality standards
3. If anything is below standard, fix it immediately in the file and commit
4. Report your finding for each template

Start with templates you know are most likely to be thin (LS-004, LS-008, LS-009, LS-010, LS-013, LS-014, LS-015, LS-017, LS-018, LS-020) but audit all 20.`,
  }];

  await runAgentLoop(messages, 'full-audit');
  console.log('[TEMPLATES AGENT] Complete.');
}
