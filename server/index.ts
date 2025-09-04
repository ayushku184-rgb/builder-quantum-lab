import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { supabaseServer, hasSupabaseServer } from "./supabase";

const memory = {
  healthReports: [] as any[],
  waterTests: [] as any[],
};

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: "5mb" }));
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  app.post("/api/health-report", (req, res) => {
    const body = req.body ?? {};
    memory.healthReports.push({ ...body, id: memory.healthReports.length + 1 });
    res.json({ ok: true });
  });

  app.post("/api/water-test", (req, res) => {
    const body = req.body ?? {};
    memory.waterTests.push({ ...body, id: memory.waterTests.length + 1 });
    res.json({ ok: true });
  });

  app.get("/api/notifications", (_req, res) => {
    const diarrheaCount = memory.healthReports.filter((r) =>
      r.symptoms?.includes("Diarrhea"),
    ).length;
    const contaminationYes = memory.waterTests.some(
      (w) => w.contamination === "yes",
    );
    const alerts = [] as any[];
    if (diarrheaCount >= 3 || contaminationYes) {
      alerts.push({
        title: "Possible Outbreak Alert",
        status: "Pending",
        desc: "Multiple diarrhea cases/contaminated water",
      });
    }
    alerts.push({
      title: "New health guideline released",
      status: "Acknowledged",
      desc: "Updated hygiene protocols",
    });
    alerts.push({
      title: "Reminder: Submit weekly report",
      status: "Pending",
      desc: "Collect data for May",
    });
    res.json({ alerts });
  });

  app.get("/api/stats", async (_req, res) => {
    try {
      if (hasSupabaseServer && supabaseServer) {
        const [{ count: cases }, { count: water }] = await Promise.all([
          supabaseServer
            .from("health_reports")
            .select("id", { count: "exact", head: true }),
          supabaseServer
            .from("water_tests")
            .select("id", { count: "exact", head: true }),
        ]);
        const totalCases = cases ?? 0;
        const totalWater = water ?? 0;
        res.json({
          cases: totalCases,
          water: totalWater,
          activeAlerts: 0,
          highRiskVillages: Math.min(
            8,
            Math.max(1, Math.floor((totalCases + totalWater) / 5)),
          ),
        });
        return;
      }

      const cases = memory.healthReports.length;
      const water = memory.waterTests.length;
      const diarrheaCount = memory.healthReports.filter((r) =>
        r.symptoms?.includes("Diarrhea"),
      ).length;
      const contaminationYes = memory.waterTests.some(
        (w) => w.contamination === "yes",
      );
      const activeAlerts = diarrheaCount >= 3 || contaminationYes ? 1 : 0;
      res.json({
        cases,
        water,
        activeAlerts,
        highRiskVillages: Math.min(
          8,
          Math.max(1, Math.floor((cases + water) / 5)),
        ),
      });
    } catch (e) {
      res.status(500).json({ error: "Failed to load stats" });
    }
  });

  return app;
}
