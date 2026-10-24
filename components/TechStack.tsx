'use client'

import Reveal from '@/components/Reveal'
import LogoLoop from '@/components/LogoLoop'

import {
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiTailwindcss,
    SiJavascript,
    SiNodedotjs,
    SiGit,
    SiGithub,
    SiVercel,
    SiNetlify,
    SiFigma,
    SiJson,
    SiLaravel,
    SiPhp,
    SiXampp,
    SiPostman,
} from 'react-icons/si'

const techLogos = [
    {
        node: <SiNextdotjs />,
        title: 'Next.js',
        href: 'https://nextjs.org',
    },
    {
        node: <SiReact />,
        title: 'React',
        href: 'https://react.dev',
    },
    {
        node: <SiTailwindcss />,
        title: 'Tailwind CSS',
        href: 'https://tailwindcss.com',
    },
    {
        node: <SiJavascript />,
        title: 'JavaScript',
        href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    },
    {
        node: <SiTypescript />,
        title: 'TypeScript',
        href: 'https://www.typescriptlang.org',
    },
    {
        node: <SiLaravel />,
        title: 'Laravel',
        href: 'https://laravel.com',
    },
    {
        node: <SiPhp />,
        title: 'PHP',
        href: 'https://www.php.net',
    },
    {
        node: <SiXampp />,
        title: 'XAMPP',
        href: 'https://www.apachefriends.org',
    },
    {
        node: <SiNodedotjs />,
        title: 'Node.js',
        href: 'https://nodejs.org',
    },
    {
        node: <SiPostman />,
        title: 'Postman',
        href: 'https://www.postman.com',
    },
    {
        node: <SiGit />,
        title: 'Git',
        href: 'https://git-scm.com',
    },
    {
        node: <SiGithub />,
        title: 'GitHub',
        href: 'https://github.com',
    },
    {
        node: <SiVercel />,
        title: 'Vercel',
        href: 'https://vercel.com',
    },
    {
        node: <SiNetlify />,
        title: 'Netlify',
        href: 'https://www.netlify.com',
    },
    {
        node: <SiFigma />,
        title: 'Figma',
        href: 'https://www.figma.com',
    },
    {
        node: <SiJson />,
        title: 'JSON',
        href: 'https://www.json.org/json-en.html',
    },
]

export default function TechStack() {
    return (
        <section
            id="tech-stack"
            className="w-full overflow-hidden px-6 py-20 md:px-16"
        >
            <div className="mx-auto max-w-7xl">
                <Reveal>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                        My Toolkit
                    </p>

                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                        Technologies I Use
                    </h2>

                    <p className="mb-10 max-w-xl text-base leading-7 text-gray-600">
                        Tools and technologies I use to build modern, responsive,
                        and user-friendly web experiences.
                    </p>
                </Reveal>

                <Reveal delay={0.15}>
                    <div className="relative 'h-[130px]' w-full">
                        <LogoLoop
                            logos={techLogos}
                            speed={70}
                            direction="left"
                            logoHeight={42}
                            gap={56}
                            hoverSpeed={0}
                            scaleOnHover
                            fadeOut
                            fadeOutColor="#ffffff"
                            ariaLabel="Technologies I use"
                        />
                    </div>
                </Reveal>
            </div>
        </section>
    )
}