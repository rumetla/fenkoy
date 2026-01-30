import { Suspense } from "react";
import { RezervasyonForm } from "./rezervasyon-form";

export default function RezervasyonPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-12 max-w-lg animate-pulse">Yükleniyor...</div>}>
      <RezervasyonForm />
    </Suspense>
  );
}
