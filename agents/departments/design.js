import Anthropic from '@anthropic-ai/sdk';
import { SHARED_TOOLS, executeTool } from '../tools.js';
import { dequeue, complete, fail } from '../queue.js';
import * as queue from '../queue.js';
import { STANDARDS } from '../standards.js';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `You are the Design & Images Department Agent for TradeOpsVault. You audit and improve the image generation system in images.js.

Your domain is images.js — the DesignTeam module that generates Etsy listing mockup images.

Standards to enforce:
- Every listing must have ${STANDARDS.images.minShotsPerListing}+ shot types defined
- Required shot types: ${STANDARDS.images.requiredShotTypes.join(', ')}
- Each listing must have a SHOT_PROMPTS entry with specific, trade-relevant text
- LISTING_NAMES must contain all 20 listing IDs
- Per-listing accent colors must be defined and visually distinct
- generateInfoSlide() must produce real canvas content (not blank images)
- compositeImage() must render real form structure visible in mockups
- generateShopBanner() must reference TradeOpsVault branding

When you find issues:
1. Read the relevant section of images.js
2. Fix or enhance the code (e.g., add missing SHOT_PROMPTS, improve canvas rendering, add missing listings)
3. Use patch_file or write_file to update images.js
4. Commit improvements with git_commit_push
5. Report findings with report_audit_finding

Focus on making mockups look professional and trade-specific. Buyers decide to purchase based on what they see.`;

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
        console.log(`[DESIGN] Tool: ${block.name}`, JSON.stringify(block.input).slice(0, 120));
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

export async function runDesignAgent() {
  console.log('\n[DESIGN AGENT] Starting...');

  while (true) {
    const task = dequeue('design');
    if (!task) break;
    console.log(`[DESIGN] Processing task: ${task.title}`);
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
    content: `Run a full audit of images.js.

Steps:
1. Read images.js and check that LISTING_NAMES covers all 20 listing IDs (LS-001 through LS-020)
2. Check that every listing has SHOT_PROMPTS entries with trade-specific, compelling text
3. Verify accent colors are defined for every listing
4. Check that generateInfoSlide draws real canvas content for all 5 slide types
5. Check that compositeImage renders form structure (header bar, section blocks, field lines)
6. Check that the shop banner text and branding is correct
7. Fix any gaps — add missing listings, improve generic prompts, add canvas detail
8. Commit all improvements and report findings`,
  }]);

  console.log('[DESIGN AGENT] Complete.');
}
