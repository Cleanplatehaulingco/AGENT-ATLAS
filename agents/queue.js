import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const QUEUE_FILE = path.join(__dirname, 'task-queue.json');

function load() {
  if (!fs.existsSync(QUEUE_FILE)) return [];
  return JSON.parse(fs.readFileSync(QUEUE_FILE, 'utf8'));
}

function save(tasks) {
  fs.writeFileSync(QUEUE_FILE, JSON.stringify(tasks, null, 2));
}

export function enqueue(task) {
  const tasks = load();
  const entry = {
    id: `task-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,
    createdAt: new Date().toISOString(),
    status: 'pending',
    ...task,
  };
  tasks.push(entry);
  save(tasks);
  console.log(`[QUEUE] Enqueued → ${entry.id} | dept=${task.department} | ${task.title}`);
  return entry;
}

export function dequeue(department) {
  const tasks = load();
  const idx = tasks.findIndex(t => t.department === department && t.status === 'pending');
  if (idx === -1) return null;
  tasks[idx].status = 'in-progress';
  tasks[idx].startedAt = new Date().toISOString();
  save(tasks);
  return tasks[idx];
}

export function complete(id, result) {
  const tasks = load();
  const t = tasks.find(t => t.id === id);
  if (t) {
    t.status = 'done';
    t.completedAt = new Date().toISOString();
    t.result = result;
  }
  save(tasks);
}

export function fail(id, error) {
  const tasks = load();
  const t = tasks.find(t => t.id === id);
  if (t) {
    t.status = 'failed';
    t.failedAt = new Date().toISOString();
    t.error = String(error);
  }
  save(tasks);
}

export function pendingFor(department) {
  return load().filter(t => t.department === department && t.status === 'pending');
}

export function summary() {
  const tasks = load();
  const counts = {};
  for (const t of tasks) {
    counts[t.status] = (counts[t.status] || 0) + 1;
  }
  return counts;
}

export function allPending() {
  return load().filter(t => t.status === 'pending');
}
