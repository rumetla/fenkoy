import { z } from "zod";

const phoneRegex = /^[\d\s+()-]{10,20}$/;
const honeypotSchema = z.string().max(0).optional();

/** İletişim formu – Ad, Telefon, E-posta, Mesaj (opsiyonel) */
export const contactSchema = z.object({
  name: z.string().min(2, "Ad soyad en az 2 karakter olmalı.").max(100),
  phone: z.string().regex(phoneRegex, "Geçerli bir telefon numarası girin."),
  email: z.string().email("Geçerli bir e-posta adresi girin."),
  message: z.string().max(2000).optional(),
  website: honeypotSchema, // honeypot
});

/** Rezervasyon formu */
export const reservationSchema = z.object({
  workshopId: z.string().min(1, "Workshop seçiniz."),
  studentAge: z.coerce.number().min(10).max(18),
  studentGrade: z.string().min(1, "Sınıf seçiniz."),
  parentName: z.string().min(2, "Veli adı en az 2 karakter olmalı.").max(100),
  phone: z.string().regex(phoneRegex, "Geçerli bir telefon numarası girin."),
  email: z.string().email("Geçerli bir e-posta adresi girin."),
  interestAreas: z.array(z.string()).optional(),
  notes: z.string().max(1000).optional(),
  website: honeypotSchema,
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ReservationInput = z.infer<typeof reservationSchema>;
