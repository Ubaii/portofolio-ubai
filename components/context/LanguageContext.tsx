
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  translations,
  type Language,
  type TranslationKey,
} from "@/lib/translations";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const STORAGE_KEY = "portfolio-language";

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguageState] = useState<Language>("id");

  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem(STORAGE_KEY);

      if (savedLanguage === "id" || savedLanguage === "en") {
        setLanguageState(savedLanguage);
      }
    } catch {
      // Aplikasi tetap berjalan jika localStorage tidak tersedia.
    }
  }, []);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);

    try {
      localStorage.setItem(STORAGE_KEY, nextLanguage);
    } catch {
      // Bahasa tetap berubah selama halaman terbuka.
    }
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => translations[language][key],
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error(
      "useLanguage harus digunakan di dalam LanguageProvider"
    );
  }

  return context;
}
