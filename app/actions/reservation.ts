"use server";

import { reservationSchema, type ReservationInput } from "@/lib/validations";
import { WORKSHOPS } from "@/lib/constants";
import { appendReservationRow } from "@/lib/google-sheets";
import { sendReservationNotification } from "@/lib/email";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";
import { headers } from "next/headers";

export type ReservationState = { ok: boolean; message: string };

export async function submitReservation(
  _prev: ReservationState,
  formData: FormData
): Promise<ReservationState> {
  const headersList = await headers();
  const id = getClientIdentifier(headersList);
  const { ok: rateOk } = checkRateLimit(id);
  if (!rateOk) {
    return { ok: false, message: "Çok fazla deneme. Lütfen bir dakika sonra tekrar deneyin." };
  }

  const raw = {
    workshopId: formData.get("workshopId"),
    studentAge: formData.get("studentAge"),
    studentGrade: formData.get("studentGrade"),
    parentName: formData.get("parentName"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    interestAreas: formData.getAll("interestAreas"),
    notes: formData.get("notes"),
    website: formData.get("website"),
  };

  const parsed = reservationSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      first.workshopId?.[0] ??
      first.studentAge?.[0] ??
      first.studentGrade?.[0] ??
      first.parentName?.[0] ??
      first.phone?.[0] ??
      first.email?.[0] ??
      "Lütfen alanları kontrol edin.";
    return { ok: false, message: msg };
  }

  const data = parsed.data as ReservationInput;
  if (data.website && data.website.length > 0) {
    return { ok: false, message: "Gönderim başarısız." };
  }

  const workshop = WORKSHOPS.find((w) => w.id === data.workshopId);
  if (!workshop) {
    return { ok: false, message: "Geçersiz workshop seçimi." };
  }

  try {
    const row = [
      new Date().toISOString(),
      data.parentName,
      data.phone,
      data.email,
      String(data.studentAge),
      data.studentGrade,
      (data.interestAreas ?? []).join(", "),
      data.notes ?? "",
    ];
    await appendReservationRow("", row, workshop.name);
    await sendReservationNotification({
      workshopName: workshop.name,
      parentName: data.parentName,
      email: data.email,
      phone: data.phone,
      studentAge: data.studentAge,
      studentGrade: data.studentGrade,
    });
    return { ok: true, message: "Rezervasyon talebiniz alındı. Sizinle iletişime geçeceğiz." };
  } catch (e) {
    console.error("Reservation submit error:", e);
    return { ok: false, message: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin." };
  }
}
