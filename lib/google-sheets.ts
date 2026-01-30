/**
 * Google Apps Script Web App'e POST ile form verisi gönderir.
 * Apps Script doPost(e) ile karşılar; tek dokümandaki sheet'lere yazar.
 * .env: GOOGLE_APPS_SCRIPT_WEB_APP_URL (Deploy > Web app URL)
 */

const getWebAppUrl = (): string => {
  const url = process.env.GOOGLE_APPS_SCRIPT_WEB_APP_URL;
  if (!url) throw new Error("GOOGLE_APPS_SCRIPT_WEB_APP_URL tanımlı değil.");
  return url.endsWith("/exec") ? url : `${url.replace(/\/?$/, "")}/exec`;
};

export interface ContactPayload {
  type: "contact";
  name: string;
  phone: string;
  email: string;
  message?: string;
}

export interface ReservationPayload {
  type: "reservation";
  workshopName: string;
  parentName: string;
  phone: string;
  email: string;
  studentAge: number;
  studentGrade: string;
  interests?: string[];
  notes?: string;
}

async function postToAppsScript(payload: ContactPayload | ReservationPayload): Promise<void> {
  const url = getWebAppUrl();
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Apps Script yanıt hatası: ${res.status}`);
  }
  const json = (await res.json()) as { result?: string; message?: string };
  if (json.result === "error") {
    throw new Error(json.message ?? "Apps Script hatası");
  }
}

export async function appendContactRow(values: string[]): Promise<void> {
  const [name, phone, email, message] = values;
  await postToAppsScript({
    type: "contact",
    name,
    phone,
    email,
    message: message ?? "",
  });
}

export async function appendReservationRow(
  _sheetId: string,
  values: string[],
  workshopName?: string
): Promise<void> {
  // values: [timestamp, parentName, phone, email, studentAge, studentGrade, interestAreas, notes]
  const [, parentName, phone, email, studentAge, studentGrade, interestAreasStr, notes] = values;
  const interests = interestAreasStr ? interestAreasStr.split(",").map((s) => s.trim()) : undefined;
  await postToAppsScript({
    type: "reservation",
    workshopName: workshopName ?? "Genel",
    parentName,
    phone,
    email,
    studentAge: Number(studentAge),
    studentGrade,
    interests,
    notes: notes ?? "",
  });
}
