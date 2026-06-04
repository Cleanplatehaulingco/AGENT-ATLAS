import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// ─── Tool definitions for Claude tool_use ────────────────────────────────────

export const SHARED_TOOLS = [
  {
    name: 'read_file',
    description: 'Read a file from the TradeOpsVault repository. Paths are relative to the repo root.',
    input_schema: {
      type: 'object',
      properties: {
        file_path: { type: 'string', description: 'Path relative to repo root, e.g. "templates.js"' },
        start_line: { type: 'number', description: 'Optional: first line to read (1-indexed)' },
        end_line: { type: 'number', description: 'Optional: last line to read' },
      },
      required: ['file_path'],
    },
  },
  {
    name: 'write_file',
    description: 'Write or overwrite a file in the repository. Use for fixes, improvements, and new content.',
    input_schema: {
      type: 'object',
      properties: {
        file_path: { type: 'string' },
        content: { type: 'string' },
      },
      required: ['file_path', 'content'],
    },
  },
  {
    name: 'patch_file',
    description: 'Replace a specific string in a file (exact match required). Use for targeted fixes.',
    input_schema: {
      type: 'object',
      properties: {
        file_path: { type: 'string' },
        old_string: { type: 'string', description: 'Exact text to find and replace' },
        new_string: { type: 'string', description: 'Replacement text' },
      },
      required: ['file_path', 'old_string', 'new_string'],
    },
  },
  {
    name: 'list_files',
    description: 'List files in a directory.',
    input_schema: {
      type: 'object',
      properties: {
        dir_path: { type: 'string', description: 'Path relative to repo root' },
      },
      required: ['dir_path'],
    },
  },
  {
    name: 'git_commit_push',
    description: 'Commit all staged changes and push to origin. Only call after making file improvements.',
    input_schema: {
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Commit message describing what was improved' },
      },
      required: ['message'],
    },
  },
  {
    name: 'enqueue_task',
    description: 'Send a task to another department agent when work is needed outside your domain.',
    input_schema: {
      type: 'object',
      properties: {
        department: {
          type: 'string',
          enum: ['templates', 'copy', 'design', 'server', 'listings'],
          description: 'Which department should handle this',
        },
        title: { type: 'string', description: 'Short task title' },
        description: { type: 'string', description: 'Full task description with context and what needs to be done' },
        priority: { type: 'string', enum: ['high', 'medium', 'low'], description: 'Task urgency' },
        context: { type: 'object', description: 'Any extra data the department agent needs (listing IDs, file names, etc.)' },
      },
      required: ['department', 'title', 'description', 'priority'],
    },
  },
  {
    name: 'report_audit_finding',
    description: 'Log an audit finding to the audit report. Use this to record what you found, good or bad.',
    input_schema: {
      type: 'object',
      properties: {
        department: { type: 'string' },
        severity: { type: 'string', enum: ['critical', 'warning', 'info', 'pass'] },
        finding: { type: 'string', description: 'What was found' },
        action_taken: { type: 'string', description: 'What was done about it, if anything' },
      },
      required: ['department', 'severity', 'finding'],
    },
  },
];

// ─── Tool executor ────────────────────────────────────────────────────────────

const auditLog = [];

export function executeTool(name, input, queueModule) {
  try {
    switch (name) {
      case 'read_file': {
        const full = path.join(ROOT, input.file_path);
        if (!fs.existsSync(full)) return { error: `File not found: ${input.file_path}` };
        const lines = fs.readFileSync(full, 'utf8').split('\n');
        const start = (input.start_line || 1) - 1;
        const end = input.end_line || lines.length;
        return { content: lines.slice(start, end).join('\n'), total_lines: lines.length };
      }

      case 'write_file': {
        const full = path.join(ROOT, input.file_path);
        fs.mkdirSync(path.dirname(full), { recursive: true });
        fs.writeFileSync(full, input.content, 'utf8');
        execSync(`git -C "${ROOT}" add "${input.file_path}"`, { stdio: 'pipe' });
        return { success: true, path: input.file_path };
      }

      case 'patch_file': {
        const full = path.join(ROOT, input.file_path);
        if (!fs.existsSync(full)) return { error: `File not found: ${input.file_path}` };
        const original = fs.readFileSync(full, 'utf8');
        if (!original.includes(input.old_string)) {
          return { error: 'old_string not found in file — cannot patch' };
        }
        const patched = original.replace(input.old_string, input.new_string);
        fs.writeFileSync(full, patched, 'utf8');
        execSync(`git -C "${ROOT}" add "${input.file_path}"`, { stdio: 'pipe' });
        return { success: true, path: input.file_path };
      }

      case 'list_files': {
        const full = path.join(ROOT, input.dir_path);
        if (!fs.existsSync(full)) return { error: `Directory not found: ${input.dir_path}` };
        return { files: fs.readdirSync(full) };
      }

      case 'git_commit_push': {
        try {
          const status = execSync(`git -C "${ROOT}" status --porcelain`, { encoding: 'utf8' });
          if (!status.trim()) return { success: true, message: 'Nothing to commit' };
          execSync(`git -C "${ROOT}" add -A`, { stdio: 'pipe' });
          execSync(`git -C "${ROOT}" commit -m "${input.message.replace(/"/g, "'")}"`, { stdio: 'pipe' });
          execSync(`git -C "${ROOT}" push -u origin HEAD`, { stdio: 'pipe' });
          return { success: true, message: `Committed and pushed: ${input.message}` };
        } catch (e) {
          return { error: e.message };
        }
      }

      case 'enqueue_task': {
        if (!queueModule) return { error: 'Queue module not available' };
        const task = queueModule.enqueue({
          department: input.department,
          title: input.title,
          description: input.description,
          priority: input.priority || 'medium',
          context: input.context || {},
        });
        return { success: true, task_id: task.id };
      }

      case 'report_audit_finding': {
        const entry = {
          timestamp: new Date().toISOString(),
          department: input.department,
          severity: input.severity,
          finding: input.finding,
          action_taken: input.action_taken || 'none',
        };
        auditLog.push(entry);
        const icon = { critical: '🔴', warning: '🟡', info: 'ℹ️', pass: '✅' }[input.severity] || '•';
        console.log(`[AUDIT] ${icon} [${input.department.toUpperCase()}] ${input.finding}`);
        return { success: true };
      }

      default:
        return { error: `Unknown tool: ${name}` };
    }
  } catch (err) {
    return { error: err.message };
  }
}

export function getAuditLog() {
  return [...auditLog];
}
