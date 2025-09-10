import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Users,
  Droplet,
  AlertTriangle,
  TrendingUp,
  CloudUpload,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export default function Reports() {
  const [selectedDisease, setSelectedDisease] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [selected, setSelected] = useState<{
    health?: number;
    water?: number;
  } | null>(null);

  const healthReports = [
    {
      patientId: "E001",
      age: 75,
      io: 85,
      symptoms: "Fever, Cough",
      date: "2025-09-07",
    },
    {
      patientId: "E002",
      age: 60,
      io: 41,
      symptoms: "Diarrhea",
      date: "2025-09-07",
    },
    {
      patientId: "E003",
      age: 50,
      io: 32,
      symptoms: "Malaria Suspected",
      date: "2025-09-06",
    },
    {
      patientId: "E004",
      age: 50,
      io: 58,
      symptoms: "Typhoid Suspected",
      date: "2025-09-06",
    },
    {
      patientId: "E005",
      age: 50,
      io: 54,
      symptoms: "Headache",
      date: "2025-09-05",
    },
    {
      patientId: "E006",
      age: 56,
      io: 51,
      symptoms: "Fatigue",
      date: "2025-09-05",
    },
  ];

  const waterTestReports = [
    {
      sourceLocation: "Well A",
      turbidity: 3.5,
      ph: 7.2,
      remarks: "Within limits",
      date: "2025-09-07",
    },
    {
      sourceLocation: "River Point B",
      turbidity: 12.0,
      ph: 6.8,
      remarks: "Slightly turbid",
      date: "2025-09-07",
    },
    {
      sourceLocation: "Stream C",
      turbidity: 20.5,
      ph: 6.5,
      remarks: "Contamination flag",
      date: "2025-09-06",
    },
    {
      sourceLocation: "Handpump D",
      turbidity: 4.2,
      ph: 7.0,
      remarks: "Clear",
      date: "2025-09-06",
    },
    {
      sourceLocation: "Lake E",
      turbidity: 28.0,
      ph: 6.3,
      remarks: "Unsafe",
      date: "2025-09-05",
    },
  ];

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
            value={"0"}
            icon={<Users className="w-7 h-7 text-white" />}
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
            icon={<TrendingUp className="w-7 h-7 text-gray-700" />}
            accent="purple"
          />
        </div>

        {/* Reports Section */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Reports Area */}
          <div className="xl:col-span-3 space-y-6">
            {/* Health Reports */}
            <div className="glass-card-bright rounded-2xl p-6 scroll-reveal">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Health Reports
              </h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient ID</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Symptoms</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {healthReports.map((report, index) => (
                      <TableRow
                        key={index}
                        className="group"
                        data-state={
                          (selected as any)?.health === index
                            ? "selected"
                            : undefined
                        }
                        onClick={() =>
                          setSelected((s: any) => ({
                            ...(s || {}),
                            health: index,
                          }))
                        }
                      >
                        <TableCell className="font-medium group-hover:font-semibold">
                          {report.patientId}
                        </TableCell>
                        <TableCell>{report.age}</TableCell>
                        <TableCell>{report.io}</TableCell>
                        <TableCell>
                          <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md text-xs font-medium">
                            {report.symptoms}
                          </span>
                        </TableCell>
                        <TableCell className="text-gray-500">
                          {report.date}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Water Test Reports */}
            <div className="glass-card-bright rounded-2xl p-6 scroll-reveal">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Water Test Reports
              </h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Source Location</TableHead>
                      <TableHead>Turbidity</TableHead>
                      <TableHead>pH</TableHead>
                      <TableHead>Remarks</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {waterTestReports.map((report, index) => (
                      <TableRow
                        key={index}
                        className="group"
                        data-state={
                          selected?.water === index ? "selected" : undefined
                        }
                        onClick={() =>
                          setSelected((s) => ({ ...(s || {}), water: index }))
                        }
                      >
                        <TableCell className="font-medium group-hover:font-semibold">
                          {report.sourceLocation}
                        </TableCell>
                        <TableCell>
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md text-xs font-medium">
                            {report.turbidity}
                          </span>
                        </TableCell>
                        <TableCell>{report.ph}</TableCell>
                        <TableCell>
                          <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md text-xs font-medium">
                            {report.remarks}
                          </span>
                        </TableCell>
                        <TableCell className="text-gray-500">
                          {report.date}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Filters */}
            <div className="glass-card-bright rounded-2xl p-6 scroll-reveal">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Disease
                  </label>
                  <Select
                    value={selectedDisease}
                    onValueChange={setSelectedDisease}
                  >
                    <SelectTrigger className="bg-white/70 backdrop-blur-sm border-white/30">
                      <SelectValue placeholder="Disease" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="malaria">Malaria</SelectItem>
                      <SelectItem value="typhoid">Typhoid</SelectItem>
                      <SelectItem value="diarrhea">Diarrhea</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Village
                  </label>
                  <Select
                    value={selectedVillage}
                    onValueChange={setSelectedVillage}
                  >
                    <SelectTrigger className="bg-white/70 backdrop-blur-sm border-white/30">
                      <SelectValue placeholder="Village" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="khanpur">Khanpur</SelectItem>
                      <SelectItem value="pendor">Pendor</SelectItem>
                      <SelectItem value="ramtur">
                        Ramtur Shanti Nagar
                      </SelectItem>
                      <SelectItem value="block-c">Block C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Village
                  </label>
                  <Select>
                    <SelectTrigger className="bg-white/70 backdrop-blur-sm border-white/30">
                      <SelectValue placeholder="Village" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="village1">Village 1</SelectItem>
                      <SelectItem value="village2">Village 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Start Date
                  </label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-white/70 backdrop-blur-sm border-white/30"
                  />
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Apply Filters
                </Button>
              </div>
            </div>

            {/* Bulk Upload */}
            <div className="glass-card-bright rounded-2xl p-6 scroll-reveal">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Bulk Upload
              </h2>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <CloudUpload className="w-10 h-10 text-blue-600" />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Upload CSV/Excel
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
