'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#tech-stack' },
]

type Theme = 'light' | 'dark'

function SunIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
    )
}

function MoonIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    )
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [theme, setTheme] = useState<Theme>('light')
    const [mounted, setMounted] = useState(false)

    // Ambil tema yang sudah diterapkan oleh script di layout
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
            // localStorage tidak tersedia, abaikan
        }

        setTheme(next)
    }

    const themeButton = (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={
                theme === 'dark'
                    ? 'Ganti ke mode terang'
                    : 'Ganti ke mode gelap'
            }
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
            {/* Sebelum mounted, ikon disembunyikan supaya tidak mismatch saat hydration */}
            {mounted ? (theme === 'dark' ? <SunIcon /> : <MoonIcon />) : null}
        </button>
    )

    return (
        <nav className="fixed top-0 z-50 w-full border-b border-gray-200/70 bg-white/80 backdrop-blur-xl dark:border-gray-800/70 dark:bg-gray-950/80">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">

                {/* Logo */}
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
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-950 dark:text-gray-400 dark:hover:text-white"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop: Theme + Contact */}
                <div className="hidden items-center gap-3 md:flex">
                    {themeButton}

                    <Link
                        href="#contact"
                        className="inline-flex rounded-full bg-gray-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800 dark:bg-white dark:text-gray-950 dark:hover:bg-blue-500 dark:hover:text-white"
                    >
                        Let&apos;s Talk <span className="ml-2">↗</span>
                    </Link>
                </div>

                {/* Mobile: Theme + Menu Button */}
                <div className="flex items-center gap-2 md:hidden">
                    {themeButton}

                    <button
                        type="button"
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isOpen}
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                        <span
                            className={`h-0.5 w-5 bg-gray-950 transition-transform duration-300 ease-out dark:bg-white ${isOpen ? 'translate-y-1 rotate-45' : ''
                                }`}
                        />
                        <span
                            className={`h-0.5 w-5 bg-gray-950 transition-transform duration-300 ease-out dark:bg-white ${isOpen ? '-translate-y-1 -rotate-45' : ''
                                }`}
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Navigation (selalu dirender supaya bisa dianimasikan) */}
            <div
                aria-hidden={!isOpen}
                className={`grid transition-[grid-template-rows,opacity,visibility] duration-300 ease-out motion-reduce:transition-none md:hidden ${isOpen
                    ? 'visible grid-rows-[1fr] opacity-100'
                    : 'invisible grid-rows-[0fr] opacity-0'
                    }`}
            >
                <div className="overflow-hidden">
                    <div className="border-t border-gray-100 bg-white px-6 py-5 dark:border-gray-800 dark:bg-gray-950">
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link, index) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    style={{ transitionDelay: isOpen ? `${index * 40}ms` : '0ms' }}
                                    className={`rounded-lg px-3 py-3 text-sm font-medium text-gray-600 transition duration-300 ease-out hover:bg-gray-50 hover:text-gray-950 motion-reduce:transition-none dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <Link
                                href="#contact"
                                onClick={() => setIsOpen(false)}
                                style={{ transitionDelay: isOpen ? `${navLinks.length * 40}ms` : '0ms' }}
                                className={`mt-2 rounded-lg bg-gray-950 px-4 py-3 text-center text-sm font-medium text-white transition duration-300 ease-out motion-reduce:transition-none dark:bg-white dark:text-gray-950 ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
                                    }`}
                            >
                                Let&apos;s Talk ↗
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}