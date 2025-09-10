import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { t } from "@/lib/i18n";
import { enqueue } from "@/lib/offline";
import { toast } from "sonner";

export default function WaterTest() {
  const [ph, setPh] = useState<number | "">("");
  const [turbidity, setTurbidity] = useState<number | "">("");
  const [contamination, setContamination] = useState<"yes" | "no">("no");
  const [loc, setLoc] = useState<{ lat: number; lng: number } | null>(null);

  const getLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => alert("Could not get location"),
    );
  };

  const submit = async () => {
    const payload = {
      ph,
      turbidity,
      contamination,
      location: loc,
      createdAt: Date.now(),
    };
    await enqueue("waterTest", payload);
    toast.success("Submitted successfully", {
      description: "Thank you for your valuable contribution!",
      duration: 3500,
      icon: "🎉",
    });
    setPh("");
    setTurbidity("");
    setContamination("no");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{t("waterTest")}</h2>
      <div className="rounded-xl bg-white p-4 shadow space-y-4">
        <div>
          <Label>{t("ph")}</Label>
          <Input
            type="number"
            step="0.1"
            value={ph}
            onChange={(e) =>
              setPh(e.target.value ? Number(e.target.value) : "")
            }
          />
        </div>
        <div>
          <Label>{t("turbidity")}</Label>
          <Input
            type="number"
            step="0.1"
            value={turbidity}
            onChange={(e) =>
              setTurbidity(e.target.value ? Number(e.target.value) : "")
            }
          />
        </div>
        <div>
          <Label>{t("contamination")}</Label>
          <div className="mt-2 flex gap-3">
            <label
              className={`rounded border px-3 py-2 ${contamination === "yes" ? "border-red-500 bg-red-50" : ""}`}
            >
              <input
                type="radio"
                name="cont"
                value="yes"
                checked={contamination === "yes"}
                onChange={() => setContamination("yes")}
              />{" "}
              {t("yes")}
            </label>
            <label
              className={`rounded border px-3 py-2 ${contamination === "no" ? "border-emerald-500 bg-emerald-50" : ""}`}
            >
              <input
                type="radio"
                name="cont"
                value="no"
                checked={contamination === "no"}
                onChange={() => setContamination("no")}
              />{" "}
              {t("no")}
            </label>
          </div>
        </div>
        <div>
          <Label>{t("location")}</Label>
          <div className="mt-2 flex items-center gap-2">
            <Button variant="secondary" onClick={getLocation}>
              Pin
            </Button>
            {loc && (
              <span className="text-sm text-slate-600">
                {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}
              </span>
            )}
          </div>
        </div>
        <Button className="w-full" onClick={submit}>
          {t("submit")}
        </Button>
      </div>
    </div>
  );
}
