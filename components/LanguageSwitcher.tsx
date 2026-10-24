
"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Languages } from "lucide-react";
import { useLanguage } from "@/components/context/LanguageContext";
import type { Language } from "@/lib/translations";

const languageOptions: {
  code: Language;
  flag: string;
  label: string;
  nativeLabel: string;
}[] = [
  {
    code: "id",
    flag: "🇮🇩",
    label: "Bahasa Indonesia",
    nativeLabel: "Indonesia",
  },
  {
    code: "en",
    flag: "🇺🇸",
    label: "English",
    nativeLabel: "English",
  },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const selectedLanguage = languageOptions.find(
    (option) => option.code === language
  )!;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Pilih bahasa"
        className="inline-flex items-center gap-2 rounded-full border
          border-neutral-200 bg-white/80 px-3 py-2 text-sm
          text-neutral-800 shadow-sm backdrop-blur-md
          transition-all duration-300 hover:bg-neutral-100
          dark:border-neutral-700 dark:bg-neutral-900/80
          dark:text-neutral-100 dark:hover:bg-neutral-800"
      >
        <Languages size={16} />
        <span>{language.toUpperCase()}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        aria-hidden={!isOpen}
        className={`absolute right-0 top-full 'z-[100]' mt-3 w-60
          origin-top-right rounded-2xl border border-neutral-200
          bg-white/95 p-2 shadow-xl backdrop-blur-xl
          transition-all duration-200 ease-out
          dark:border-neutral-700 dark:bg-neutral-900/95
          ${
            isOpen
              ? "visible translate-y-0 scale-100 opacity-100"
              : "invisible -translate-y-2 scale-95 opacity-0"
          }`}
      >
        <p className="px-3 pb-2 pt-1 text-xs font-medium text-neutral-500">
          Pilih Bahasa / Select Language
        </p>

        <div role="menu" aria-label="Pilihan bahasa">
          {languageOptions.map((option) => {
            const isSelected = language === option.code;

            return (
              <button
                key={option.code}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                tabIndex={isOpen ? 0 : -1}
                onClick={() => {
                  setLanguage(option.code);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl
                  px-3 py-3 text-left transition-colors duration-200
                  ${
                    isSelected
                      ? "bg-neutral-100 dark:bg-neutral-800"
                      : "hover:bg-neutral-50 dark:hover:bg-neutral-800/70"
                  }`}
              >
                <span className="text-xl" aria-hidden="true">
                  {option.flag}
                </span>

                <span className="flex-1">
                  <span className="block text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {option.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-neutral-500">
                    {option.nativeLabel}
                  </span>
                </span>

                {isSelected && (
                  <Check
                    size={16}
                    className="text-blue-600 dark:text-blue-400"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
