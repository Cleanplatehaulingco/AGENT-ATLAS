import Anthropic from '@anthropic-ai/sdk';
import { SHARED_TOOLS, executeTool } from '../tools.js';
import { dequeue, complete, fail } from '../queue.js';
import * as queue from '../queue.js';
import { STANDARDS } from '../standards.js';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `You are the Copy & SEO Department Agent for TradeOpsVault. You audit and improve all Etsy listing copy in app.js.

Your domain is the ETSY_COPY object in app.js and all listing title/description/tag content.

Standards to enforce:
- Titles: ${STANDARDS.copy.minTitleLength}-${STANDARDS.copy.maxTitleLength} characters, front-load primary keyword
- Descriptions: minimum ${STANDARDS.copy.minDescriptionLength} characters, must include features, benefits, what's included, how to use
- Tags: exactly ${STANDARDS.copy.maxTags} tags (Etsy max), highly searchable, mix of broad and niche
- Required phrases in description: "${STANDARDS.copy.requiredPhrases.join('", "')}"
- Banned phrases (must NOT appear): "${STANDARDS.copy.noBannedPhrases.join('", "')}"
- Must target actual industry keywords buyers search: e.g. "HVAC service order form", "electrical work order fillable"
- Every listing must describe the real-world job it's used for (plumber, electrician, pool tech, etc.)

When you find copy below standard:
1. Read the current ETSY_COPY entry in app.js
2. Rewrite it to be stronger, more specific, SEO-optimized
3. Use patch_file to update app.js
4. Commit with git_commit_push
5. Report the improvement with report_audit_finding

Focus on listings that are thin, generic, or missing keyword density. All 20 listings must be strong.`;

async function runAgentLoop(messages) {
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
        console.log(`[COPY] Tool: ${block.name}`, JSON.stringify(block.input).slice(0, 120));
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

export async function runCopyAgent() {
  console.log('\n[COPY AGENT] Starting...');

  // Process queue tasks first
  while (true) {
    const task = dequeue('copy');
    if (!task) break;
    console.log(`[COPY] Processing task: ${task.title}`);
    try {
      await runAgentLoop([{
        role: 'user',
        content: `Task assigned: ${task.title}\n\n${task.description}\n\nContext: ${JSON.stringify(task.context)}`,
      }]);
      complete(task.id, 'Done');
    } catch (err) {
      fail(task.id, err.message);
    }
  }

  // Full audit
  await runAgentLoop([{
    role: 'user',
    content: `Run a full copy and SEO audit of all listings in app.js.

Steps:
1. Read app.js lines 1-300 to understand the ETSY_COPY structure
2. Read the rest of app.js to get all 20 ETSY_COPY entries
3. For each listing: evaluate title length, keyword quality, description length, tag count and quality
4. Fix any listings below standard — rewrite to be industry-specific, keyword-rich, and conversion-focused
5. Ensure no listing says "Canva" anywhere
6. Every description must mention the specific trade (HVAC, plumbing, electrical, pool, pest, locksmith, etc.)
7. Commit fixes and report findings`,
  }]);

  console.log('[COPY AGENT] Complete.');
}
