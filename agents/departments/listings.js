import Anthropic from '@anthropic-ai/sdk';
import { SHARED_TOOLS, executeTool } from '../tools.js';
import { dequeue, complete, fail } from '../queue.js';
import * as queue from '../queue.js';
import { STANDARDS, LISTING_IDS } from '../standards.js';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `You are the Listings Department Agent for TradeOpsVault. You ensure all 20 Etsy listings are complete, priced correctly, and ready to publish.

Your domain is app.js — specifically the LISTINGS array and ETSY_COPY object.

Standards to enforce:
- Exactly 20 listings: ${LISTING_IDS.join(', ')}
- Each listing must have: id, name, price, description (short), category, tags array, etsy_copy reference
- Prices: LS-010 = $1.99 (loss leader), kit bundles = $4.99, all others = $3.99
- Every listing must be properly cross-referenced between LISTINGS array and ETSY_COPY
- Category must be correct (Digital Downloads > Templates)
- quantity must be set (digital = unlimited, typically 999)
- Each listing needs proper file delivery info in description

Improvements you can make:
- Add missing listings to the LISTINGS array
- Fix pricing discrepancies
- Add or improve cross-sell language ("Pairs well with LS-003")
- Add bundle suggestions where kits exist
- Report anything that needs a human decision (new listing type, pricing strategy)

When you find issues:
1. Read the relevant section of app.js
2. Fix with patch_file
3. Commit with git_commit_push
4. Report with report_audit_finding`;

async function runAgentLoop(messages) {
  const allMessages = [...messages];

  while (true) {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 6144,
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
        console.log(`[LISTINGS] Tool: ${block.name}`, JSON.stringify(block.input).slice(0, 120));
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

export async function runListingsAgent() {
  console.log('\n[LISTINGS AGENT] Starting...');

  while (true) {
    const task = dequeue('listings');
    if (!task) break;
    console.log(`[LISTINGS] Processing task: ${task.title}`);
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

  await runAgentLoop([{
    role: 'user',
    content: `Run a full listings audit of app.js.

Steps:
1. Read app.js and find the LISTINGS array
2. Verify all ${LISTING_IDS.length} listing IDs are present: ${LISTING_IDS.join(', ')}
3. Check pricing: LS-010 should be $1.99, kits $4.99, rest $3.99
4. Verify each listing has correct fields (id, name, price, tags, etc.)
5. Check that every LISTINGS entry has a matching ETSY_COPY entry
6. Fix any missing or mismatched data
7. Add cross-sell suggestions to listings that are similar (same trade category)
8. Commit fixes and report all findings`,
  }]);

  console.log('[LISTINGS AGENT] Complete.');
}
