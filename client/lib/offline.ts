import { openDB, DBSchema } from "idb";

interface OfflineDB extends DBSchema {
  queue: {
    key: string;
    value: {
      id: string;
      type: "healthReport" | "waterTest";
      payload: any;
      createdAt: number;
    };
    indexes: { "by-type": "healthReport" | "waterTest" };
  };
}

const DB_NAME = "mobile-offline-db";
const STORE = "queue";

export async function getDB() {
  return openDB<OfflineDB>(DB_NAME, 1, {
    upgrade(db) {
      const store = db.createObjectStore(STORE, { keyPath: "id" });
      store.createIndex("by-type", "type");
    },
  });
}

export async function enqueue(
  type: "healthReport" | "waterTest",
  payload: any,
) {
  const db = await getDB();
  const id = `${type}-${crypto.randomUUID()}`;
  await db.put(STORE, { id, type, payload, createdAt: Date.now() });
  return id;
}

export async function getAllQueued() {
  const db = await getDB();
  return db.getAll(STORE);
}

export async function remove(id: string) {
  const db = await getDB();
  await db.delete(STORE, id);
}

export async function syncWithServer(baseUrl = "") {
  const items = await getAllQueued();
  for (const item of items) {
    try {
      const endpoint =
        item.type === "healthReport" ? "/api/health-report" : "/api/water-test";
      const res = await fetch(baseUrl + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item.payload),
      });
      if (!res.ok) throw new Error(`Failed ${item.type}`);
      await remove(item.id);
    } catch (e) {
      // keep for retry
    }
  }
}

export function setupOnlineSync(baseUrl = "") {
  const run = () => syncWithServer(baseUrl);
  window.addEventListener("online", run);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") run();
  });
  // initial attempt
  run();
}
