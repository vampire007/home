
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import type { HistoryItem } from '../../shared/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HISTORY_FILE = path.join(__dirname, '../../data/history.json');

async function ensureDataDir() {
  const dataDir = path.dirname(HISTORY_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

async function readHistory(): Promise<HistoryItem[]> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(HISTORY_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeHistory(history: HistoryItem[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(HISTORY_FILE, JSON.stringify(history, null, 2));
}

export async function getHistory(): Promise<HistoryItem[]> {
  return await readHistory();
}

export async function saveHistoryItem(item: HistoryItem): Promise<void> {
  const history = await readHistory();
  history.unshift(item);
  await writeHistory(history);
}

export async function deleteHistoryItem(id: string): Promise<void> {
  const history = await readHistory();
  const filtered = history.filter(item => item.id !== id);
  await writeHistory(filtered);
}
