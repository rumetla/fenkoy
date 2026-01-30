"use server";

import { contactSchema, type ContactInput } from "@/lib/validations";
import { appendContactRow } from "@/lib/google-sheets";
import { sendContactNotification } from "@/lib/email";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";
import { headers } from "next/headers";

export type ContactState = { ok: boolean; message: string };

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const headersList = await headers();
  const id = getClientIdentifier(headersList);
  const { ok: rateOk } = checkRateLimit(id);
  if (!rateOk) {
    return { ok: false, message: "Çok fazla deneme. Lütfen bir dakika sonra tekrar deneyin." };
  }

  const raw = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    message: formData.get("message"),
    website: formData.get("website"), // honeypot
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg = first.name?.[0] ?? first.phone?.[0] ?? first.email?.[0] ?? "Lütfen alanları kontrol edin.";
    return { ok: false, message: msg };
  }

  const data = parsed.data as ContactInput;
  if (data.website && data.website.length > 0) {
    return { ok: false, message: "Gönderim başarısız." };
  }

  try {
    const row = [data.name, data.phone, data.email, data.message ?? ""];
    await appendContactRow(row);
    await sendContactNotification({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    });
    return { ok: true, message: "Mesajınız alındı. En kısa sürede size dönüş yapacağız." };
  } catch (e) {
    console.error("Contact submit error:", e);
    return { ok: false, message: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin." };
  }
}
