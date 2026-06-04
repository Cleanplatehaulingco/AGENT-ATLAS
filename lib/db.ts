import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DB_DIR, 'ravens.db');

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;

  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  initSchema(db);
  runMigrations(db);
  return db;
}

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      address TEXT,
      notes TEXT,
      tags TEXT DEFAULT '[]',
      last_contacted TEXT,
      follow_up_date TEXT,
      follow_up_note TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS sales (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      client_id INTEGER REFERENCES clients(id) ON DELETE SET NULL,
      client_name TEXT,
      items TEXT NOT NULL DEFAULT '[]',
      subtotal REAL NOT NULL DEFAULT 0,
      total REAL NOT NULL DEFAULT 0,
      payment_method TEXT,
      platform TEXT NOT NULL DEFAULT 'other',
      notes TEXT,
      receipt_photo TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT,
      color TEXT,
      materials TEXT,
      design_style TEXT,
      sku TEXT,
      cost_to_make REAL NOT NULL DEFAULT 0,
      time_to_make_minutes INTEGER DEFAULT 0,
      current_price REAL NOT NULL DEFAULT 0,
      inventory_count INTEGER DEFAULT 0,
      total_units_sold INTEGER DEFAULT 0,
      total_revenue REAL DEFAULT 0,
      platforms TEXT DEFAULT '[]',
      description TEXT,
      image_url TEXT,
      is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      amount REAL NOT NULL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );

    CREATE TABLE IF NOT EXISTS schema_migrations (
      version INTEGER PRIMARY KEY,
      applied_at TEXT DEFAULT (datetime('now'))
    );
  `);
}

function runMigrations(db: Database.Database) {
  const applied = (db.prepare('SELECT version FROM schema_migrations').all() as Record<string, unknown>[]).map(r => r.version as number);

  const migrations: { version: number; sql: string }[] = [
    {
      version: 1,
      sql: `
        -- Add rich product attributes if they don't exist yet
        ALTER TABLE products ADD COLUMN color TEXT;
        ALTER TABLE products ADD COLUMN materials TEXT;
        ALTER TABLE products ADD COLUMN design_style TEXT;
        ALTER TABLE products ADD COLUMN sku TEXT;
        ALTER TABLE products ADD COLUMN time_to_make_minutes INTEGER DEFAULT 0;
        ALTER TABLE products ADD COLUMN total_units_sold INTEGER DEFAULT 0;
        ALTER TABLE products ADD COLUMN total_revenue REAL DEFAULT 0;
        ALTER TABLE products ADD COLUMN image_url TEXT;
        ALTER TABLE products ADD COLUMN is_active INTEGER DEFAULT 1;
      `,
    },
  ];

  for (const m of migrations) {
    if (applied.includes(m.version)) continue;
    try {
      // Run each ALTER TABLE separately — SQLite doesn't support multi-statement ALTER
      const statements = m.sql.split(';').map(s => s.trim()).filter(s => s.length > 0 && !s.startsWith('--'));
      for (const stmt of statements) {
        try { db.prepare(stmt).run(); } catch { /* column may already exist */ }
      }
      db.prepare('INSERT INTO schema_migrations (version) VALUES (?)').run(m.version);
    } catch { /* migration already applied */ }
  }
}

// ── Types ──────────────────────────────────────────────────────────────────────

export type Client = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  notes: string | null;
  tags: string;
  last_contacted: string | null;
  follow_up_date: string | null;
  follow_up_note: string | null;
  created_at: string;
  updated_at: string;
};

export type Sale = {
  id: number;
  date: string;
  client_id: number | null;
  client_name: string | null;
  items: string;
  subtotal: number;
  total: number;
  payment_method: string | null;
  platform: string;
  notes: string | null;
  receipt_photo: string | null;
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: number;
  name: string;
  category: string | null;
  color: string | null;
  materials: string | null;
  design_style: string | null;
  sku: string | null;
  cost_to_make: number;
  time_to_make_minutes: number;
  current_price: number;
  inventory_count: number;
  total_units_sold: number;
  total_revenue: number;
  platforms: string;
  description: string | null;
  image_url: string | null;
  is_active: number;
  created_at: string;
  updated_at: string;
};

export type Expense = {
  id: number;
  date: string;
  category: string;
  description: string | null;
  amount: number;
  created_at: string;
};

export type SaleItem = {
  name: string;
  product_id?: number;
  quantity: number;
  price: number;
};

export type ProductAnalytics = {
  product_id: number;
  product_name: string;
  category: string | null;
  color: string | null;
  materials: string | null;
  design_style: string | null;
  total_units: number;
  total_revenue: number;
  avg_price: number;
  sale_count: number;
  platforms: Record<string, number>;
  monthly: Record<string, number>;
  last_sold: string | null;
  profit_per_unit: number;
  revenue_per_hour: number | null;
};
