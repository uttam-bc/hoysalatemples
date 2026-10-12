"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import enMessages from "@/messages/en.json";
import knMessages from "@/messages/kn.json";

export type Locale = "en" | "kn";

interface LocaleContextType {
  locale: Locale;
  setLocale: (newLocale: Locale) => void;
  toggleLocale: () => void;
  t: (key: string, defaultText?: string) => string;
  isKannada: boolean;
}

const LocaleContext = createContext<LocaleContextType | null>(null);

function getNestedValue(obj: Record<string, any>, path: string): string | undefined {
  const keys = path.split(".");
  let current: any = obj;
  for (const k of keys) {
    if (current && typeof current === "object" && k in current) {
      current = current[k];
    } else {
      return undefined;
    }
  }
  return typeof current === "string" ? current : undefined;
}

export function LocaleProvider({
  children,
  initialLocale = "en",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // Read saved locale cookie or localStorage on initial mount
  useEffect(() => {
    try {
      const match = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]*)/);
      if (match && (match[1] === "en" || match[1] === "kn")) {
        setLocaleState(match[1] as Locale);
      }
    } catch {
      // Safe ignore
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      // Persist in cookie (1 year expiry)
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      // Update <html lang>
      document.documentElement.lang = newLocale;
    } catch {
      // Safe ignore
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "kn" : "en");
  }, [locale, setLocale]);

  // Keep <html lang> in sync
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
      if (locale === "kn") {
        document.documentElement.classList.add("lang-kn");
      } else {
        document.documentElement.classList.remove("lang-kn");
      }
    }
  }, [locale]);

  const messages = useMemo(() => {
    return locale === "kn" ? knMessages : enMessages;
  }, [locale]);

  const t = useCallback(
    (key: string, defaultText?: string): string => {
      const translated = getNestedValue(messages, key);
      if (translated) return translated;
      // Fallback to English
      const fallback = getNestedValue(enMessages, key);
      return fallback || defaultText || key;
    },
    [messages]
  );

  const contextValue = useMemo(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      t,
      isKannada: locale === "kn",
    }),
    [locale, setLocale, toggleLocale, t]
  );

  return (
    <LocaleContext.Provider value={contextValue}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return ctx;
}
