# Fen Kampı Web Sitesi – MVP PRD

## 1. Ürün Tanımı
Bu proje; profesyonel öğretmenler eşliğinde, deney temelli fen workshopları ve kamp dönemleri sunan bir eğitim girişiminin tanıtım ve rezervasyon talebi toplama sitesidir.

Hedef kitle: Ortaokul öğrencilerinin velileri.

---

## 2. Teknik Kapsam

- Framework: Next.js (App Router)
- Backend: Yok
- API: Next.js Server Actions
- Database: Yok
- Form storage: Google Sheets
- UI: React + Tailwind
- Component Library:
  - **shadcn/ui** (Temel UI elemanları: Button, Input, Card, vb.)
  - **ReactBits** (Animasyonlar ve özel UI efektleri)

---

## 3. Tasarım Prensipleri

- Profesyonel eğitim platformu hissi
- Güven veren, sade ve modern
- Veli odaklı UX
- Net ve görünür CTA’lar

---

## 4. Sayfalar

### 4.1 Anasayfa (/)

#### Bölümler:
- Hero + Carousel (ReactBits - autoplay, dot navigation)
- Misyon / Vizyon / Eğitim Yaklaşımı (Feature grid)
- Workshop listesi (Card yapısı)
- Güçlü CTA alanı

Workshop verileri koddan gelir.

---

### 4.2 İletişim (/iletisim)

#### Form Alanları:
- Ad Soyad
- Telefon
- E-posta
- Mesaj (opsiyonel)

Form submit:
- Google Sheets’e satır ekler
- Admin’e mail gönderir

---

### 4.3 Rezervasyon (/rezervasyon)

#### Amaç:
Kesin kayıt değil, rezervasyon talebi toplamak.

#### Form Alanları:
- Öğrenci yaşı
- Öğrenci sınıfı
- Veli adı
- Telefon
- E-posta
- İlgi alanları
- Ek notlar

Her workshop tarihi ayrı bir Google Sheet’e bağlıdır.

---

## 5. Güvenlik

- Client & server-side validation
- Honeypot
- Basic rate limiting

---

## 6. MVP Dışı (Non-Goals)

- Online ödeme
- Kullanıcı hesabı
- Admin panel
- Database
- Mikroservis mimarisi

---

## 7. Gelecek Genişletmeler

- Admin panel
- Ödeme entegrasyonu
- Çoklu dil
- Workshop doluluk durumu