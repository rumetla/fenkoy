"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { contactSchema, type ContactInput } from "@/lib/validations";
import { submitContact, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = { ok: false, message: "" };

export default function IletisimPage() {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
      website: "",
    },
  });

  useEffect(() => {
    if (state.message) {
      if (state.ok) form.reset();
    }
  }, [state, form]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-lg">
      <h1 className="text-2xl font-semibold mb-2">İletişim</h1>
      <p className="text-muted-foreground mb-8">
        Sorularınız için formu doldurun; en kısa sürede size dönüş yapacağız.
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ad Soyad</FormLabel>
                <FormControl>
                  <Input placeholder="Adınız soyadınız" {...field} name="name" />
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
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mesaj (opsiyonel)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Mesajınız..." rows={4} {...field} name="message" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Gönderiliyor..." : "Gönder"}
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
