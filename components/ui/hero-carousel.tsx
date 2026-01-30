"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface HeroSlide {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  autoplayIntervalMs?: number;
  className?: string;
}

export function HeroCarousel({
  slides,
  autoplayIntervalMs = 5000,
  className,
}: HeroCarouselProps) {
  const [index, setIndex] = React.useState(0);
  const len = slides.length;

  React.useEffect(() => {
    if (len <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % len);
    }, autoplayIntervalMs);
    return () => clearInterval(id);
  }, [len, autoplayIntervalMs]);

  const slide = slides[index];

  return (
    <section className={cn("relative overflow-hidden bg-muted/30", className)}>
      <div className="container mx-auto px-4 py-16 md:py-24 text-center">
        <div key={index} className="transition-opacity duration-500">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {slide.subtitle}
            </p>
          )}
          {slide.ctaText && slide.ctaHref && (
            <a
              href={slide.ctaHref}
              className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
            >
              {slide.ctaText}
            </a>
          )}
        </div>

        {len > 1 && (
          <div className="mt-8 flex justify-center gap-2" role="tablist" aria-label="Slayt navigasyonu">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Slayt ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-colors",
                  i === index ? "bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
