import Anthropic from '@anthropic-ai/sdk';
import { SHARED_TOOLS, executeTool } from '../tools.js';
import { dequeue, complete, fail } from '../queue.js';
import * as queue from '../queue.js';
import { STANDARDS } from '../standards.js';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `You are the Server Health Department Agent for TradeOpsVault. You audit the backend Express server.

Your domain is server/server.js and server/package.json.

Standards to enforce:
- Required endpoints present: ${STANDARDS.server.requiredEndpoints.join(', ')}
- Required middleware: cors, helmet, express-rate-limit
- /health endpoint must return {status: "ok", timestamp, uptime}
- /relay/store and /relay/load must validate input and handle errors gracefully
- No hardcoded secrets — must use process.env
- Rate limiting must be configured on relay endpoints
- CORS must only allow the GitHub Pages origin (not wildcard in production)
- All routes must have try/catch error handling
- render.yaml must be correct for Render.com deployment

When you find issues:
1. Read server/server.js
2. Identify security or reliability gaps
3. Fix them with patch_file
4. Commit with git_commit_push
5. Report with report_audit_finding

Do NOT break existing functionality. Be surgical. The server is live on Render.com.`;

async function runAgentLoop(messages) {
  const allMessages = [...messages];

  while (true) {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
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
        console.log(`[SERVER] Tool: ${block.name}`, JSON.stringify(block.input).slice(0, 120));
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

export async function runServerAgent() {
  console.log('\n[SERVER AGENT] Starting...');

  while (true) {
    const task = dequeue('server');
    if (!task) break;
    console.log(`[SERVER] Processing task: ${task.title}`);
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
    content: `Run a server health audit.

Steps:
1. Read server/server.js completely
2. Read server/package.json
3. Read render.yaml
4. Check all required endpoints exist and are correct
5. Check middleware stack (cors, helmet, rate-limit)
6. Check error handling on all routes
7. Check no hardcoded secrets
8. Check CORS origin is properly restricted
9. Fix any issues found — be surgical, don't break what works
10. Commit fixes and report all findings`,
  }]);

  console.log('[SERVER AGENT] Complete.');
}
