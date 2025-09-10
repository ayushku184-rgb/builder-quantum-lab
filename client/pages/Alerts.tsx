import { Link } from "react-router-dom";
import {
  User,
  Users,
  Droplet,
  AlertTriangle,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import KPIStat from "@/components/ui/kpi-card";
import SiteFooter from "@/components/ui/site-footer";
import SiteHeader from "@/components/ui/site-header";

export default function Alerts() {
  const outbreakAlerts = [
    { village: "Khanpur", suspectedDisease: "Diarrhea", waterQuality: "Moderate", date: "2025-09-07" },
    { village: "Shanti Nagar", suspectedDisease: "Typhoid", waterQuality: "Unsafe", date: "2025-09-07" },
    { village: "Lian", suspectedDisease: "Malaria", waterQuality: "Moderate", date: "2025-09-06" },
    { village: "Siploek", suspectedDisease: "Fever", waterQuality: "Safe", date: "2025-09-05" },
    { village: "Rampur", suspectedDisease: "Dengue", waterQuality: "Safe", date: "2025-09-05" },
  ];

  const waterQualityData = [
    { village: "Khanpur", age: "31", no: "30", waterQuality: "70.00", date: "2025-09-07" },
    { village: "Shanti Nagar", age: "60", no: "23", waterQuality: "55.00", date: "2025-09-07" },
    { village: "Lian", age: "60", no: "39", waterQuality: "60.00", date: "2025-09-06" },
    { village: "Siploek", age: "50", no: "88", waterQuality: "70.00", date: "2025-09-06" },
    { village: "Rampur", age: "50", no: "89", waterQuality: "80.00", date: "2025-09-05" },
  ];

  const [alerts, setAlerts] = useState<
    { title: string; status: string; desc: string }[]
  >([]);
  const [stats, setStats] = useState({
    cases: 0,
    water: 0,
    activeAlerts: 0,
    highRiskVillages: 0,
  });

  const alertHistory = [
    { date: "2025-08-28", status: "Pending", detail: "Possible outbreak reported" },
    { date: "2025-08-29", status: "Acknowledged", detail: "Alert acknowledged" },
    { date: "2025-08-30", status: "Resolved", detail: "Contaminated well treated" },
    { date: "2025-09-01", status: "Resolved", detail: "Fever spike contained" },
  ];

  const [selectedOutbreakRow, setSelectedOutbreakRow] = useState<number | null>(
    null,
  );
  const [selectedWaterRow, setSelectedWaterRow] = useState<number | null>(null);

  // Fetch live alerts and stats
  useEffect(() => {
    fetch("/api/notifications")
      .then((r) => r.json())
      .then((d) => setAlerts(d.alerts || []))
      .catch(() => {});
    fetch("/api/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      {/* Header */}
      <SiteHeader />

      {/* Main Content */}
      <main className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          <KPIStat
            label="Total cases reported today"
            value={String(stats.cases)}
            icon={<Users className="w-7 h-7 text-white" />}
            accent="blue"
          />
          <KPIStat
            label="Water sources tested"
            value={String(stats.water)}
            icon={<Droplet className="w-7 h-7 text-white" />}
            accent="green"
          />
          <KPIStat
            label="Active alerts"
            value={String(stats.activeAlerts)}
            icon={<AlertTriangle className="w-7 h-7 text-white" />}
            accent="orange"
          />
          <KPIStat
            label="Villages at High Risk"
            value={String(stats.highRiskVillages)}
            icon={<TrendingUp className="w-7 h-7 text-gray-700" />}
            accent="purple"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Outbreak Alerts Table */}
          <div className="xl:col-span-3 glass-card-bright rounded-2xl p-6 scroll-reveal">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Outbreak Alerts
            </h2>

            {/* Dynamic alerts banner */}
            {alerts.length > 0 && (
              <div className="space-y-3 mb-6">
                {alerts.map((a, i) => (
                  <div
                    key={i}
                    className={`rounded-xl border p-3 ${a.status === "Pending" ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"}`}
                  >
                    <div className="font-medium text-gray-900">{a.title}</div>
                    <div className="text-xs text-gray-700">
                      <span className="mr-2 rounded bg-slate-800 px-2 py-0.5 text-white">
                        Status: {a.status}
                      </span>
                      {a.desc}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="overflow-x-auto mb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Village</TableHead>
                    <TableHead>Suspected Disease</TableHead>
                    <TableHead>Water Quality</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {outbreakAlerts.map((alert, index) => (
                    <TableRow
                      key={index}
                      className="group"
                      data-state={
                        selectedOutbreakRow === index ? "selected" : undefined
                      }
                      onClick={() => setSelectedOutbreakRow(index)}
                    >
                      <TableCell className="font-medium group-hover:font-semibold">
                        {alert.village}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {alert.suspectedDisease}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`${alert.waterQuality === "Unsafe" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"} px-2 py-0.5 rounded-md text-xs font-medium`}
                        >
                          {alert.waterQuality}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-500">
                        {alert.date}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mb-4">
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                ✓ Acknowledge
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                ↑ Escalate
              </Button>
            </div>

            {/* Water Quality Section */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Water Quality
              </h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Village</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Samples</TableHead>
                    <TableHead>Water Quality</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {waterQualityData.map((item, index) => (
                      <TableRow
                        key={index}
                        className="group"
                        data-state={
                          selectedWaterRow === index ? "selected" : undefined
                        }
                        onClick={() => setSelectedWaterRow(index)}
                      >
                        <TableCell className="font-medium group-hover:font-semibold">
                          {item.village}
                        </TableCell>
                        <TableCell>{item.age}</TableCell>
                        <TableCell>{item.no}</TableCell>
                        <TableCell>
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md text-xs font-medium">
                            {item.waterQuality}
                          </span>
                        </TableCell>
                        <TableCell className="text-gray-500">
                          {item.date}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    ⋮
                  </Button>
                </div>
                <span className="text-sm text-gray-500">Show...</span>
              </div>
            </div>
          </div>

          {/* Alert History Sidebar */}
          <div className="glass-card-bright rounded-2xl p-6 scroll-reveal">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Alert History
            </h2>

            <div className="space-y-3">
              {alertHistory.map((item, index) => (
                <div key={index} className="space-y-1">
                  {item.date && (
                    <div className="text-sm text-gray-600">{item.date}</div>
                  )}
                  {item.status && (
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          item.status === "Pending"
                            ? "bg-blue-100 text-blue-800"
                            : item.status === "Acknowledged"
                              ? "bg-green-100 text-green-800"
                              : item.status === "Resolved"
                                ? "bg-gray-100 text-gray-800"
                                : ""
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  )}
                  {item.detail && (
                    <div className="text-sm text-gray-800 ml-2">
                      {item.detail}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
