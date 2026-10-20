
'use client'

import Image from 'next/image'

const socialLinks = [
    {
        name: 'GitHub',
        href: 'https://github.com/Ubaii',
    },
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/satriaa.u',
    },
    {
        name: 'TikTok',
        href: 'https://www.tiktok.com/@uwebdev_',
    },
]

export default function LetsTalk() {
    return (
        <section
            id="contact"
            className="relative scroll-mt-24 overflow-hidden bg-white px-6 py-24 transition-colors duration-300 dark:bg-gray-950 md:px-10 md:py-32"
        >
            {/* Background decoration */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl dark:bg-blue-900/20"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-20 -left-32 h-80 w-80 rounded-full bg-indigo-100/50 blur-3xl dark:bg-indigo-900/10"
            />

            <div className="relative mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-16">

                {/* Left: Contact content */}
                <div>
                    <div className="mb-5 flex items-center gap-3">
                        <span className="h-px w-10 bg-blue-600" />

                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
                            Get in touch
                        </p>
                    </div>

                    <h2 className="text-4xl font-bold leading-tight tracking-tight text-gray-950 dark:text-white sm:text-5xl md:text-6xl">
                        Let&apos;s Talk
                        <span className="text-blue-600">.</span>
                        <br />
                        Let&apos;s Build
                        <br />
                        Something Great.
                    </h2>

                    <p className="mt-6 max-w-xl text-base leading-8 text-gray-500 dark:text-gray-400">
                        Have a project in mind or want to collaborate?
                        I&apos;m always open to discussing new ideas,
                        creative projects, and opportunities to build
                        something meaningful together.
                    </p>

                    {/* Main contact button */}
                    <a
                        href="mailto:emailkamu@example.com"
                        className="group mt-8 inline-flex items-center gap-4 rounded-xl bg-gray-950 px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/20 dark:bg-white dark:text-gray-950 dark:hover:bg-blue-600 dark:hover:text-white"
                    >
                        Let&apos;s Work Together

                        <span
                            aria-hidden="true"
                            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        >
                            ↗
                        </span>
                    </a>

                    {/* Email information */}
                    <div className="mt-10">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Prefer email?
                        </p>

                        <a
                            href="mailto:satriaubaidah398@gmail.com"
                            className="mt-2 inline-block break-all text-base font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 transition hover:text-blue-600 dark:text-gray-200 dark:decoration-gray-700 dark:hover:text-blue-400"
                        >
                            satriaubaidah398@gmail.com
                        </a>
                    </div>

                    {/* Social links */}
                    <div className="mt-10 border-t border-gray-200 pt-6 dark:border-gray-800">
                        <p className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                            Find me on
                        </p>

                        <div className="flex flex-wrap gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-600 dark:border-gray-800 dark:text-gray-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
                                >
                                    {social.name}

                                    <span
                                        aria-hidden="true"
                                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    >
                                        ↗
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Illustration */}
                <div className="relative mx-auto w-full max-w-xl">
                    <div
                        aria-hidden="true"
                        className="absolute inset-10 rounded-full bg-blue-200/50 blur-3xl dark:bg-blue-900/30"
                    />

                    <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-3 shadow-sm dark:border-gray-800 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950/30 sm:p-5">
                        <Image
                            src="/images/lets-talk.png"
                            alt="Illustration of a developer ready to collaborate on a web project"
                            width={1536}
                            height={1024}
                            className="h-auto w-full rounded-2xl object-contain"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />

                        {/* Availability label */}
                        <div className="absolute bottom-5 left-5 rounded-xl border border-white/80 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/95 sm:bottom-8 sm:left-8">
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-50" />
                                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-600" />
                                </span>

                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Let&apos;s connect
                                </p>
                            </div>

                            <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                                Open to collaboration
                            </p>
                        </div>
                    </div>

                    <p className="mt-4 text-center text-xs tracking-wide text-gray-400 dark:text-gray-500">
                        Good ideas start with a conversation.
                    </p>
                </div>
            </div>
        </section>
    )
}
