import type { Photo } from "./PhotoPicker";

export type TimePreference = "" | "morning" | "afternoon" | "evening";

export type ServiceRequest = {
  service: string;
  description: string;
  address: string;
  date: string;
  time: TimePreference;
  photos: Photo[];
};

export const timeOptions: { value: Exclude<TimePreference, "">; label: string; range: string }[] = [
  { value: "morning", label: "Morning", range: "8 am – 12 pm" },
  { value: "afternoon", label: "Afternoon", range: "12 – 4 pm" },
  { value: "evening", label: "Evening", range: "4 – 8 pm" },
];

export type RequestErrors = Partial<Record<"service" | "description" | "address" | "date", string>>;

export function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export function validateRequest(r: ServiceRequest): RequestErrors {
  const e: RequestErrors = {};
  if (!r.service) e.service = "Please choose the type of help you need.";
  const desc = r.description.trim();
  if (!desc) e.description = "Please describe the problem in a few words.";
  else if (desc.length < 10) e.description = "Please add a little more detail (at least 10 characters).";
  else if (desc.length > 1000) e.description = "Please keep the description under 1000 characters.";
  if (!r.address.trim()) e.address = "Please enter your locality or address.";
  else if (r.address.trim().length > 300) e.address = "Please keep the address under 300 characters.";
  if (!r.date) e.date = "Please pick a preferred visit date.";
  else if (r.date < todayISO()) e.date = "Please choose today or a future date.";
  return e;
}
