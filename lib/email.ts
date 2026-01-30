/**
 * Admin bildirim e-postası.
 * Resend veya başka bir sağlayıcı ile değiştirilebilir.
 * .env: RESEND_API_KEY, ADMIN_EMAIL
 */

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone: string;
  message?: string;
}): Promise<void> {
  if (!ADMIN_EMAIL) return; // MVP: e-posta yoksa sessizce atla
  // Resend örnek:
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({ from: "...", to: ADMIN_EMAIL, subject: "Yeni iletişim", html: ... });
  console.log("[Email] Contact notification (stub):", data);
}

export async function sendReservationNotification(data: {
  workshopName: string;
  parentName: string;
  email: string;
  phone: string;
  studentAge: number;
  studentGrade: string;
}): Promise<void> {
  if (!ADMIN_EMAIL) return;
  console.log("[Email] Reservation notification (stub):", data);
}
