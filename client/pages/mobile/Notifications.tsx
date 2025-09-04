import { useEffect, useMemo, useState } from "react";
import { getAllQueued } from "@/lib/offline";

function AlertCard({
  title,
  status,
  desc,
  color,
}: {
  title: string;
  status: string;
  desc: string;
  color: "red" | "green" | "blue";
}) {
  const colorMap = {
    red: "bg-red-50 border-red-300",
    green: "bg-emerald-50 border-emerald-300",
    blue: "bg-blue-50 border-blue-300",
  } as const;
  return (
    <div className={`rounded-2xl border p-4 shadow ${colorMap[color]}`}>
      <div className="font-semibold">{title}</div>
      <div className="mt-1 text-xs">
        <span className="mr-2 rounded bg-slate-800 px-2 py-0.5 text-white">
          Status: {status}
        </span>
        {desc}
      </div>
    </div>
  );
}

export default function Notifications() {
  const [alerts, setAlerts] = useState<JSX.Element[]>([]);

  useEffect(() => {
    (async () => {
      const queued = await getAllQueued();
      const reports = queued
        .filter((q) => q.type === "healthReport")
        .map((q) => (q as any).value ?? (q as any))
        .map((x: any) => x.payload ?? x);
      const waters = queued
        .filter((q) => q.type === "waterTest")
        .map((q) => ((x) => x.payload ?? x)(q as any));

      const diarrheaCount = reports.filter((r: any) =>
        r.symptoms?.includes("Diarrhea"),
      ).length;
      const contaminationYes = waters.some(
        (w: any) => w.contamination === "yes",
      );

      const cards: JSX.Element[] = [];
      if (diarrheaCount >= 3 || contaminationYes) {
        cards.push(
          <AlertCard
            key="alert"
            title="Possible Outbreak Alert"
            status="Pending"
            desc="Multiple diarrhea cases/contaminated water"
            color="red"
          />,
        );
      }
      cards.push(
        <AlertCard
          key="guideline"
          title="New health guideline released"
          status="Acknowledged"
          desc="Updated hygiene protocols"
          color="green"
        />,
      );
      cards.push(
        <AlertCard
          key="reminder"
          title="Reminder: Submit weekly report"
          status="Pending"
          desc="Collect data for May"
          color="blue"
        />,
      );

      setAlerts(cards);
    })();
  }, []);

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Notifications</h2>
      {alerts}
    </div>
  );
}
