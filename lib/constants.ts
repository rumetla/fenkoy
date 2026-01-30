/**
 * Workshop verileri – PRD'ye göre koddan gelir.
 * Her workshop için sheetId, rezervasyon formu gönderiminde kullanılır.
 */
export interface Workshop {
  id: string;
  name: string;
  dateRange: string;
  description: string;
  sheetId: string; // Bu tarih için Google Sheet ID
}

export const WORKSHOPS: Workshop[] = [
  {
    id: "yaz-2025-1",
    name: "Yaz Fen Kampı 1. Dönem",
    dateRange: "23 Haziran – 4 Temmuz 2025",
    description: "Ortaokul öğrencileri için deney temelli fen atölyeleri. Kimya, fizik ve biyoloji deneyleri.",
    sheetId: process.env.RESERVATION_SHEET_ID_1 ?? "",
  },
  {
    id: "yaz-2025-2",
    name: "Yaz Fen Kampı 2. Dönem",
    dateRange: "7 Temmuz – 18 Temmuz 2025",
    description: "İkinci dönem: robotik ve kodlama odaklı fen etkinlikleri.",
    sheetId: process.env.RESERVATION_SHEET_ID_2 ?? "",
  },
  {
    id: "yaz-2025-3",
    name: "Yaz Fen Kampı 3. Dönem",
    dateRange: "21 Temmuz – 1 Ağustos 2025",
    description: "Üçüncü dönem: doğa bilimleri ve saha çalışmaları.",
    sheetId: process.env.RESERVATION_SHEET_ID_3 ?? "",
  },
];

/** İletişim formu için tek Sheet */
export const CONTACT_SHEET_ID = process.env.CONTACT_SHEET_ID ?? "";

/** Rate limit: aynı IP'den dakikada max form gönderimi */
export const RATE_LIMIT_MAX = 3;
export const RATE_LIMIT_WINDOW_MS = 60_000;
