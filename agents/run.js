/**
 * TradeOpsVault Autonomous Agent System
 *
 * Usage:
 *   node agents/run.js              — full audit + all departments
 *   node agents/run.js --audit      — orchestrator audit only (queues tasks, doesn't run departments)
 *   node agents/run.js --dept=copy  — run one specific department agent
 *   node agents/run.js --drain      — process existing queue tasks without new audit
 *
 * Environment variables required:
 *   ANTHROPIC_API_KEY — your Anthropic API key
 */

import 'dotenv/config';
import { runOrchestrator } from './orchestrator.js';
import { runTemplatesAgent } from './departments/templates.js';
import { runCopyAgent } from './departments/copy.js';
import { runDesignAgent } from './departments/design.js';
import { runServerAgent } from './departments/server.js';
import { runListingsAgent } from './departments/listings.js';
import { allPending, summary } from './queue.js';

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('ERROR: ANTHROPIC_API_KEY environment variable is required.');
  process.exit(1);
}

const args = process.argv.slice(2);
const mode = args.find(a => a.startsWith('--mode='))?.split('=')[1]
  || (args.includes('--audit') ? 'audit' : null)
  || (args.includes('--drain') ? 'drain' : null)
  || (args.find(a => a.startsWith('--dept='))?.split('=')[1] ? 'dept' : 'full');
const deptArg = args.find(a => a.startsWith('--dept='))?.split('=')[1];

const DEPT_RUNNERS = {
  templates: runTemplatesAgent,
  copy: runCopyAgent,
  design: runDesignAgent,
  server: runServerAgent,
  listings: runListingsAgent,
};

async function runAllDepartments() {
  // Run all department agents in parallel — they each handle their own queue drain + full audit
  await Promise.allSettled([
    runTemplatesAgent(),
    runCopyAgent(),
    runDesignAgent(),
    runServerAgent(),
    runListingsAgent(),
  ]);
}

async function main() {
  console.log(`\n🚀 TradeOpsVault Agent System — mode: ${mode}${deptArg ? ` (${deptArg})` : ''}`);
  console.log(`   ${new Date().toISOString()}\n`);

  try {
    if (mode === 'audit') {
      // Just run the orchestrator — queues tasks for departments
      await runOrchestrator();
      const pending = allPending();
      console.log(`\n${pending.length} tasks queued for department agents.`);
      console.log('Run "node agents/run.js --drain" to process them.');

    } else if (mode === 'drain') {
      // Process existing queue without a new audit
      const pending = allPending();
      console.log(`Processing ${pending.length} pending tasks...`);
      await runAllDepartments();

    } else if (mode === 'dept' && deptArg && DEPT_RUNNERS[deptArg]) {
      // Run one specific department
      await DEPT_RUNNERS[deptArg]();

    } else {
      // Full run: orchestrator audit → department agents (parallel)
      await runOrchestrator();
      console.log('\n--- Orchestrator done. Running department agents... ---\n');
      await runAllDepartments();
    }

    const q = summary();
    console.log('\n✅ Agent system complete.');
    console.log(`   Queue: ${JSON.stringify(q)}`);

  } catch (err) {
    console.error('\n❌ Agent system error:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
}

main();
