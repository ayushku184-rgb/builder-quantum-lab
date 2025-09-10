import { Link } from "react-router-dom";
import { AlertTriangle, Droplet, LineChart, TrendingUp } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import KPIStat from "@/components/ui/kpi-card";
import SiteFooter from "@/components/ui/site-footer";
import SiteHeader from "@/components/ui/site-header";

export default function AIRisk() {
  const aiRiskRows = [
    { village: "Khanpur", cases: 35, water: "Moderate", risk: "High" },
    { village: "Shanti Nagar", cases: 48, water: "Unsafe", risk: "Critical" },
    { village: "Ujan", cases: 21, water: "Good", risk: "Medium" },
    { village: "Rampur", cases: 56, water: "Fair", risk: "High" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      {/* Header */}
      <SiteHeader />

      {/* Main */}
      <main className="p-8 space-y-8">
        {/* KPI */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          <KPIStat
            label="Total cases reported today"
            value={"0"}
            icon={<TrendingUp className="w-7 h-7 text-white" />}
            accent="blue"
          />
          <KPIStat
            label="Water sources tested"
            value={"0"}
            icon={<Droplet className="w-7 h-7 text-white" />}
            accent="green"
          />
          <KPIStat
            label="Active alerts"
            value={"0"}
            icon={<AlertTriangle className="w-7 h-7 text-white" />}
            accent="orange"
          />
          <KPIStat
            label="Villages at High Risk"
            value={"0"}
            icon={<LineChart className="w-7 h-7 text-gray-700" />}
            accent="purple"
          />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* AI Risk Table */}
          <div className="xl:col-span-2 glass-card-bright rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              AI Risk Score by Village
            </h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Village</TableHead>
                    <TableHead>Cases Reported</TableHead>
                    <TableHead>Water Quality</TableHead>
                    <TableHead>Risk Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {aiRiskRows.map((r, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{r.village}</TableCell>
                      <TableCell>{r.cases}</TableCell>
                      <TableCell
                        className={
                          r.water === "Unsafe" ? "text-red-600 font-medium" : ""
                        }
                      >
                        {r.water}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            r.risk === "Critical"
                              ? "bg-red-100 text-red-800"
                              : r.risk === "High"
                                ? "bg-orange-100 text-orange-800"
                                : r.risk === "Medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                          }`}
                        >
                          {r.risk}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Prediction & Simulation */}
          <div className="glass-card-bright rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Predicted Case Rise (Next 7 Days)
            </h2>
            <div className="h-56 mb-6">
              <svg viewBox="0 0 300 200" className="w-full h-full">
                <defs>
                  <pattern
                    id="grid2"
                    width="30"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 30 0 L 0 0 0 20"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid2)" />
                <path
                  d="M 20 150 L 60 140 L 100 130 L 140 110 L 180 90 L 220 95 L 260 80"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                />
                <path
                  d="M 20 155 L 60 145 L 100 135 L 140 120 L 180 100 L 220 105 L 260 90"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                Scenario Simulation
              </label>
              <div className="flex items-center space-x-3">
                <select className="px-3 py-2 border border-gray-300 rounded-lg bg-white/80 backdrop-blur-sm">
                  <option>Increase Rainfall by:</option>
                  <option>+5%</option>
                  <option>+10%</option>
                  <option>+20%</option>
                </select>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Recalculate Risk
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
