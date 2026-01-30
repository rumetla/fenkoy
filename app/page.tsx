import Link from "next/link";
import { HeroCarousel } from "@/components/ui/hero-carousel";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WORKSHOPS } from "@/lib/constants";

const HERO_SLIDES = [
  {
    title: "Fen Kampı ile Keşfet",
    subtitle:
      "Ortaokul öğrencileri için deney temelli fen atölyeleri. Profesyonel öğretmenler eşliğinde bilimi yaşayarak öğrenin.",
    ctaText: "Rezervasyon Yap",
    ctaHref: "/rezervasyon",
  },
  {
    title: "Yaz Dönemi Kayıtları Açıldı",
    subtitle: "Kimya, fizik, biyoloji ve robotik atölyeleri. Sınırlı kontenjan.",
    ctaText: "Hemen Başvur",
    ctaHref: "/rezervasyon",
  },
  {
    title: "Veliler İçin Güvenli ve Eğlenceli",
    subtitle: "Çocuğunuz bilimle tanışsın; siz rahat edin.",
    ctaText: "İletişime Geç",
    ctaHref: "/iletisim",
  },
];

const FEATURES = [
  {
    title: "Misyon",
    description:
      "Ortaokul çağındaki öğrencilere deneyerek öğrenme fırsatı sunmak ve fen bilimlerine ilgi uyandırmak.",
  },
  {
    title: "Vizyon",
    description:
      "Her çocuğun bilimle buluştuğu, güvenli ve nitelikli atölye ortamları oluşturmak.",
  },
  {
    title: "Eğitim Yaklaşımı",
    description:
      "Müfredata uyumlu, deney temelli ve uygulamalı programlar; profesyonel eğitmen kadrosu.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroCarousel slides={HERO_SLIDES} autoplayIntervalMs={5000} />

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-semibold text-center mb-10">Neden Fen Kampı?</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map((f) => (
            <Card key={f.title}>
              <CardHeader>
                <CardTitle>{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{f.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 bg-muted/20">
        <h2 className="text-2xl font-semibold text-center mb-10">Workshop Dönemleri</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {WORKSHOPS.map((w) => (
            <Card key={w.id}>
              <CardHeader>
                <CardTitle>{w.name}</CardTitle>
                <CardDescription>{w.dateRange}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{w.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href={`/rezervasyon?workshop=${w.id}`}>Rezervasyon Yap</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Sorularınız mı var?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Size en uygun dönem ve program hakkında bilgi almak için bizimle iletişime geçin.
        </p>
        <Button size="lg" asChild>
          <Link href="/iletisim">İletişime Geç</Link>
        </Button>
      </section>
    </div>
  );
}
