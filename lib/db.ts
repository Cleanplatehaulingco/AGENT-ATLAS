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
      cost_to_make REAL NOT NULL DEFAULT 0,
      current_price REAL NOT NULL DEFAULT 0,
      inventory_count INTEGER DEFAULT 0,
      platforms TEXT DEFAULT '[]',
      description TEXT,
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
  `);
}

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
  cost_to_make: number;
  current_price: number;
  inventory_count: number;
  platforms: string;
  description: string | null;
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
  quantity: number;
  price: number;
};
