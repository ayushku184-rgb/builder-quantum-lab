import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { t } from "@/lib/i18n";
import { enqueue } from "@/lib/offline";
import { toast } from "sonner";

const SYMPTOMS = [
  "Fever",
  "Cough & Cold",
  "Typhoid",
  "Malaria",
  "Diarrhea",
] as const;

export default function ReportForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [village, setVillage] = useState("Village A");
  const [photo, setPhoto] = useState<string | null>(null);

  const toggleSymptom = (s: string, checked: boolean) => {
    setSymptoms((prev) =>
      checked ? [...prev, s] : prev.filter((x) => x !== s),
    );
  };

  const onFile = (f: File | undefined) => {
    if (!f) return setPhoto(null);
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(f);
  };

  const submit = async () => {
    const payload = {
      name,
      age,
      symptoms,
      village,
      photo,
      createdAt: Date.now(),
    };
    await enqueue("healthReport", payload);
    toast.success("Submitted successfully", {
      description: "Thank you for your valuable contribution!",
      duration: 3500,
      icon: "🎉",
    });
    setName("");
    setAge("");
    setSymptoms([]);
    setVillage("Village A");
    setPhoto(null);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{t("healthReport")}</h2>
      <div className="rounded-xl bg-white p-4 shadow space-y-4">
        <div>
          <Label>{t("name")}</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label>{t("age")}</Label>
          <Input
            type="number"
            value={age}
            onChange={(e) =>
              setAge(e.target.value ? Number(e.target.value) : "")
            }
          />
        </div>
        <div>
          <Label>{t("symptoms")}</Label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {SYMPTOMS.map((s) => (
              <label
                key={s}
                className="flex items-center gap-2 rounded border p-2"
              >
                <Checkbox
                  checked={symptoms.includes(s)}
                  onCheckedChange={(v) => toggleSymptom(s, Boolean(v))}
                />
                <span>{s}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <Label>{t("village")}</Label>
          <select
            value={village}
            onChange={(e) => setVillage(e.target.value)}
            className="mt-2 w-full rounded-md border px-3 py-2"
          >
            {["Village A", "Village B", "Village C"].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </div>
        <div>
          <Label>{t("uploadPhoto")}</Label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onFile(e.target.files?.[0])}
            className="mt-2"
          />
          {photo && (
            <img
              src={photo}
              alt="preview"
              className="mt-2 h-24 w-24 rounded object-cover"
            />
          )}
        </div>
        <Button className="w-full" onClick={submit}>
          {t("submit")}
        </Button>
      </div>
    </div>
  );
}
