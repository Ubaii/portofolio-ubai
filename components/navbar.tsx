
'use client'

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { useLanguage } from '@/components/context/LanguageContext'
import type { Language } from '@/lib/translations'

type Theme = 'light' | 'dark'

const languageOptions: {
    code: Language
    flag: string
    label: string
}[] = [
        { code: 'id', flag: '🇮🇩', label: 'Bahasa Indonesia' },
        { code: 'en', flag: '🇺🇸', label: 'English' },
    ]

function SunIcon() {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
    )
}

function MoonIcon() {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    )
}

function ChevronDownIcon({ open }: { open: boolean }) {
    return (
        <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
            <path d="m6 9 6 6 6-6" />
        </svg>
    )
}

function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage()
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handlePointerDown(event: PointerEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') setIsOpen(false)
        }

        document.addEventListener('pointerdown', handlePointerDown)
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    const selected = languageOptions.find(
        (option) => option.code === language
    )!

    return (
        <div ref={containerRef} className="relative">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label="Pilih bahasa / Select language"
                aria-haspopup="menu"
                aria-expanded={isOpen}
                className="flex h-10 items-center gap-2 rounded-full border border-gray-200 px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
                <span aria-hidden="true">{selected.flag}</span>
                <span>{selected.code.toUpperCase()}</span>
                <ChevronDownIcon open={isOpen} />
            </button>

            <div
                aria-hidden={!isOpen}
                className={`absolute right-0 top-full z-[60] mt-3 w-60 origin-top-right rounded-2xl border border-gray-200 bg-white/95 p-2 shadow-xl backdrop-blur-xl transition-[opacity,transform,visibility] duration-200 ease-out dark:border-gray-700 dark:bg-gray-950/95 ${isOpen
                        ? 'visible translate-y-0 scale-100 opacity-100'
                        : 'invisible -translate-y-2 scale-95 opacity-0'
                    }`}
            >
                <p className="px-3 pb-2 pt-1 text-xs text-gray-500 dark:text-gray-400">
                    Pilih Bahasa / Select Language
                </p>

                {languageOptions.map((option) => {
                    const active = language === option.code

                    return (
                        <button
                            key={option.code}
                            type="button"
                            role="menuitemradio"
                            aria-checked={active}
                            tabIndex={isOpen ? 0 : -1}
                            onClick={() => {
                                setLanguage(option.code)
                                setIsOpen(false)
                            }}
                            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${active
                                    ? 'bg-gray-100 dark:bg-gray-800'
                                    : 'hover:bg-gray-50 dark:hover:bg-gray-800/70'
                                }`}
                        >
                            <span className="text-xl" aria-hidden="true">
                                {option.flag}
                            </span>
                            <span className="flex-1 text-sm font-medium text-gray-800 dark:text-gray-100">
                                {option.label}
                            </span>
                            {active && (
                                <svg
                                    viewBox="0 0 24 24"
                                    width="16"
                                    height="16"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-blue-600 dark:text-blue-400"
                                    aria-hidden="true"
                                >
                                    <path d="m5 12 4 4L19 6" />
                                </svg>
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [theme, setTheme] = useState<Theme>('light')
    const [mounted, setMounted] = useState(false)
    const { t } = useLanguage()

    const navLinks = [
        { name: t('navHome'), href: '#home' },
        { name: t('navAbout'), href: '#about' },
        { name: t('navExperience'), href: '#experience' },
        { name: t('navProjects'), href: '#projects' },
        { name: t('navSkills'), href: '#tech-stack' },
    ]

    useEffect(() => {
        setTheme(
            document.documentElement.classList.contains('dark')
                ? 'dark'
                : 'light'
        )
        setMounted(true)
    }, [])

    const toggleTheme = () => {
        const next: Theme = theme === 'dark' ? 'light' : 'dark'

        document.documentElement.classList.toggle('dark', next === 'dark')
        document.documentElement.style.colorScheme = next

        try {
            localStorage.setItem('theme', next)
        } catch {
            // localStorage tidak tersedia
        }

        setTheme(next)
    }

    const themeButton = (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={
                theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            }
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
            {mounted ? (theme === 'dark' ? <SunIcon /> : <MoonIcon />) : null}
        </button>
    )

    return (
        <nav className="fixed top-0 z-50 w-full border-b border-gray-200/70 bg-white/80 backdrop-blur-xl dark:border-gray-800/70 dark:bg-gray-950/80">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
                <Link
                    href="#home"
                    className="text-xl font-bold tracking-tight text-gray-950 dark:text-white"
                    onClick={() => setIsOpen(false)}
                >
                    ubai<span className="text-blue-600">.</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-950 dark:text-gray-400 dark:hover:text-white"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Controls */}
                <div className="hidden items-center gap-3 md:flex">
                    <LanguageSwitcher />
                    {themeButton}

                    <Link
                        href="#contact"
                        className="inline-flex rounded-full bg-gray-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800 dark:bg-white dark:text-gray-950 dark:hover:bg-blue-500 dark:hover:text-white"
                    >
                        {t('navContact')} <span className="ml-2">↗</span>
                    </Link>
                </div>

                {/* Mobile Controls */}
                <div className="flex items-center gap-2 md:hidden">
                    <LanguageSwitcher />
                    {themeButton}

                    <button
                        type="button"
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isOpen}
                        aria-controls="mobile-navigation"
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 transition-colors duration-300 hover:bg-gray-100 active:scale-95 dark:border-gray-700 dark:hover:bg-gray-800 motion-reduce:transition-none"
                    >
                        <span
                            className={`absolute h-0.5 w-5 rounded-full bg-gray-950 transition-[transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] dark:bg-white motion-reduce:transition-none ${isOpen ? 'rotate-45' : '-translate-y-[3.5px]'
                                }`}
                        />
                        <span
                            className={`absolute h-0.5 w-5 rounded-full bg-gray-950 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] dark:bg-white motion-reduce:transition-none ${isOpen ? '-rotate-45' : 'translate-y-[3.5px]'
                                }`}
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div
                id="mobile-navigation"
                aria-hidden={!isOpen}
                inert={!isOpen}
                className={`grid transition-[grid-template-rows,opacity,visibility] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:hidden ${isOpen
                        ? 'visible grid-rows-[1fr] opacity-100'
                        : 'invisible grid-rows-[0fr] opacity-0'
                    }`}
            >
                <div className="min-h-0 overflow-hidden">
                    <div className="border-t border-gray-100 bg-white px-6 py-5 dark:border-gray-800 dark:bg-gray-950">
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link, index) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    tabIndex={isOpen ? 0 : -1}
                                    onClick={() => setIsOpen(false)}
                                    style={{
                                        transitionDelay: isOpen
                                            ? `${index * 60}ms`
                                            : '0ms',
                                    }}
                                    className={`rounded-xl px-3 py-3 text-sm font-medium text-gray-600 transition-[transform,opacity,background-color,color] duration-300 ease-out hover:bg-gray-100 hover:text-gray-950 motion-reduce:transition-none dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white ${isOpen
                                            ? 'translate-y-0 opacity-100'
                                            : '-translate-y-2 opacity-0'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <Link
                                href="#contact"
                                tabIndex={isOpen ? 0 : -1}
                                onClick={() => setIsOpen(false)}
                                style={{
                                    transitionDelay: isOpen
                                        ? `${navLinks.length * 60}ms`
                                        : '0ms',
                                }}
                                className={`mt-2 rounded-xl bg-gray-950 px-4 py-3 text-center text-sm font-medium text-white transition-[transform,opacity,background-color] duration-300 ease-out hover:bg-blue-800 motion-reduce:transition-none dark:bg-white dark:text-gray-950 dark:hover:bg-blue-500 dark:hover:text-white ${isOpen
                                        ? 'translate-y-0 opacity-100'
                                        : '-translate-y-2 opacity-0'
                                    }`}
                            >
                                {t('navContact')} ↗
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
