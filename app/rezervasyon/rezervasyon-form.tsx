"use client";

import { useActionState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reservationSchema, type ReservationInput } from "@/lib/validations";
import { submitReservation, type ReservationState } from "@/app/actions/reservation";
import { WORKSHOPS } from "@/lib/constants";

const initialState: ReservationState = { ok: false, message: "" };

const GRADES = ["5", "6", "7", "8"];
const INTEREST_OPTIONS = [
  { id: "kimya", label: "Kimya" },
  { id: "fizik", label: "Fizik" },
  { id: "biyoloji", label: "Biyoloji" },
  { id: "robotik", label: "Robotik" },
  { id: "kodlama", label: "Kodlama" },
];

export function RezervasyonForm() {
  const searchParams = useSearchParams();
  const presetWorkshop = searchParams.get("workshop") ?? undefined;

  const [state, formAction, isPending] = useActionState(submitReservation, initialState);

  const form = useForm<ReservationInput>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      workshopId: presetWorkshop ?? "",
      studentAge: 12,
      studentGrade: "",
      parentName: "",
      phone: "",
      email: "",
      interestAreas: [],
      notes: "",
      website: "",
    },
  });

  useEffect(() => {
    if (presetWorkshop) form.setValue("workshopId", presetWorkshop);
  }, [presetWorkshop, form]);

  useEffect(() => {
    if (state.message && state.ok) form.reset();
  }, [state, form]);

  const selectedWorkshop = useMemo(
    () => WORKSHOPS.find((w) => w.id === form.watch("workshopId")),
    [form.watch("workshopId")]
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-lg">
      <h1 className="text-2xl font-semibold mb-2">Rezervasyon Talebi</h1>
      <p className="text-muted-foreground mb-8">
        Kesin kayıt değildir; talebiniz alındıktan sonra sizinle iletişime geçeceğiz.
      </p>

      {state.message && (
        <div
          className={`mb-6 rounded-md border px-4 py-3 text-sm ${
            state.ok ? "border-green-200 bg-green-50 text-green-800" : "border-destructive/50 bg-destructive/10 text-destructive"
          }`}
        >
          {state.message}
        </div>
      )}

      <Form {...form}>
        <form action={formAction} className="space-y-6">
          <input type="hidden" {...form.register("website")} />

          <FormField
            control={form.control}
            name="workshopId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Workshop Dönemi</FormLabel>
                <select
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  {...field}
                  name="workshopId"
                >
                  <option value="">Seçiniz</option>
                  {WORKSHOPS.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name} – {w.dateRange}
                    </option>
                  ))}
                </select>
                {selectedWorkshop && (
                  <p className="text-sm text-muted-foreground">{selectedWorkshop.description}</p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="studentAge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Öğrenci Yaşı</FormLabel>
                <FormControl>
                  <Input type="number" min={10} max={18} {...field} name="studentAge" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="studentGrade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Öğrenci Sınıfı</FormLabel>
                <select
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  {...field}
                  name="studentGrade"
                >
                  <option value="">Seçiniz</option>
                  {GRADES.map((g) => (
                    <option key={g} value={g}>{g}. Sınıf</option>
                  ))}
                </select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="parentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Veli Adı</FormLabel>
                <FormControl>
                  <Input placeholder="Ad soyad" {...field} name="parentName" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="05XX XXX XX XX" {...field} name="phone" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-posta</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="ornek@email.com" {...field} name="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="interestAreas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>İlgi Alanları (opsiyonel)</FormLabel>
                <div className="flex flex-wrap gap-4 pt-2">
                  {(field.value ?? []).map((id) => (
                    <input key={id} type="hidden" name="interestAreas" value={id} readOnly />
                  ))}
                  {INTEREST_OPTIONS.map((opt) => (
                    <FormItem key={opt.id} className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(opt.id)}
                          onCheckedChange={(checked) => {
                            const next = checked
                              ? [...(field.value ?? []), opt.id]
                              : (field.value ?? []).filter((x) => x !== opt.id);
                            field.onChange(next);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">{opt.label}</FormLabel>
                    </FormItem>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ek Notlar (opsiyonel)</FormLabel>
                <FormControl>
                  <Input placeholder="Özel istekler, notlar..." {...field} name="notes" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Gönderiliyor..." : "Rezervasyon Talebi Gönder"}
          </Button>
        </form>
      </Form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link href="/" className="underline hover:text-foreground">
          Anasayfaya dön
        </Link>
      </p>
    </div>
  );
}
