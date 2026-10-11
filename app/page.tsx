'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Lanyard from '@/components/Lanyard'
import Reveal from '@/components/Reveal'
import TechStack from '@/components/TechStack'
import Stack from '@/components/Stack'

const images = Array.from(
  { length: 14 },
  (_, index) => `/picture/galeri/${index + 1}.jpeg`
)

const currentYear = new Date().getFullYear()

type Project = {
  title: string
  category: string
  description: string
  image: string
  tech: string[]
  features: string[]
  challenges: string
  learnings: string
  github: string
  demo: string
}

type Experience = {
  title: string
  subtitle: string
  subtitleHref?: string
  period: string
  description: string
  points: string[]
  tags: string[]
  links?: { label: string; href: string }[]
  active: boolean
}

type Certificate = {
  title: string
  issuer: string
  date: string
  image: string // contoh: '/picture/sertifikat/1.jpeg' (kosongkan jika belum ada)
  credentialUrl: string // link verifikasi (kosongkan jika tidak ada)
}

const projects: Project[] = [
  {
    title: 'Vespera',
    category: 'Web Development',
    description:
      'Website booking PlayStation untuk memudahkan pengguna melihat ruangan dan melakukan pemesanan.',
    image: '/project/vespera.jpeg',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    features: [
      'Membuat tampilan website responsif.',
      'Merancang halaman Home, Profile, Contact, dan Location.',
      'Mengembangkan antarmuka pemesanan ruangan PlayStation.',
      'Mengeksplorasi autentikasi dan database.',
    ],
    challenges:
      'Menyusun alur booking yang mudah dipahami serta menjaga konsistensi tampilan pada berbagai ukuran layar.',
    learnings:
      'Mempelajari Next.js, TypeScript, reusable components, responsive design, dan eksplorasi Supabase.',
    github: 'https://github.com/Ubaii/vespera',
    demo: '',
  },
  {
    title: 'Ubai AI',
    category: 'AI Application',
    description:
      'AI assistant berbasis web yang dirancang untuk membantu pengguna berinteraksi dengan kecerdasan buatan.',
    image: '/project/ubai-AI.jpeg',
    tech: ['Next.js', 'React', 'TypeScript', 'AI API'],
    features: [
      'Membangun antarmuka AI assistant.',
      'Mengembangkan interaksi percakapan.',
      'Mengintegrasikan layanan AI ke aplikasi web.',
    ],
    challenges:
      'Menghubungkan antarmuka dengan layanan AI dan mengelola respons percakapan.',
    learnings:
      'Mengeksplorasi integrasi AI API, pengelolaan state, dan pengembangan aplikasi AI berbasis web.',
    github: '',
    demo: '',
  },
  {
    title: 'Birthday Website',
    category: 'Web Development',
    description:
      'Website ulang tahun dengan desain personal untuk menghadirkan pengalaman digital yang spesial.',
    image: '/project/gift-birthday.jpeg',
    tech: ['HTML', 'CSS', 'JavaScript'],
    features: [
      'Membuat halaman ucapan ulang tahun.',
      'Menyusun desain dan konten personal.',
      'Mengembangkan interaksi dan tampilan website.',
    ],
    challenges:
      'Membuat desain yang menarik dan memastikan halaman nyaman digunakan di berbagai perangkat.',
    learnings:
      'Mempelajari struktur HTML, styling CSS, JavaScript, dan pengembangan website personal.',
    github: 'https://github.com/Ubaii/birthday-page',
    demo: '',
  },
  {
    title: 'Coffee Senja Dashboard',
    category: 'Dashboard Application',
    description:
      'Sistem dashboard manajemen coffee shop untuk mendukung pengelolaan menu, meja, dan transaksi.',
    image: '/project/dashboard-kasir-coffe.jpeg',
    tech: ['Laravel', 'PHP', 'Blade', 'Tailwind CSS', 'SQLite'],
    features: [
      'Membuat dashboard administrator dan kasir.',
      'Mengembangkan pengelolaan menu dan kategori.',
      'Membuat halaman meja dan status meja.',
      'Mengembangkan antarmuka transaksi kasir.',
    ],
    challenges:
      'Menghubungkan data aplikasi dengan tampilan dashboard dan memastikan alur transaksi berjalan dengan baik.',
    learnings:
      'Mempelajari Laravel, Blade, Tailwind CSS, database, dan debugging aplikasi.',
    github: '',
    demo: '',
  },
  {
    title: 'Mie Ayam Wengi’57',
    category: 'Web Application',
    description:
      'Aplikasi manajemen restoran untuk mengelola menu, kategori, meja, dan transaksi kasir.',
    image: '/project/mie-ayam.jpeg',
    tech: ['Laravel', 'PHP', 'Tailwind CSS', 'SQLite'],
    features: [
      'Membuat dashboard administrator dan kasir.',
      'Mengembangkan pengelolaan menu dan kategori.',
      'Membuat halaman meja dan status meja.',
      'Mengembangkan alur pembayaran kasir.',
    ],
    challenges:
      'Menjaga konsistensi data dan memperbaiki masalah pada layout serta alur transaksi.',
    learnings:
      'Mempelajari Laravel, Blade, database relasional, dan debugging.',
    github: 'https://github.com/Ubaii/Mieayam-Application',
    demo: '',
  },
  // TODO: sesuaikan tech, fitur, tantangan, dan link dengan project aslimu
  {
    title: 'UI Bank BCA',
    category: 'Frontend Development',
    description:
      'Website UI Bank BCA yang dibangun dengan Next.js dan Tailwind CSS, dengan tampilan rapi, responsif, dan mudah digunakan.',
    image: '/project/bank.jpeg',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    features: [
      'Membangun tampilan antarmuka perbankan dengan Next.js.',
      'Membuat layout responsif menggunakan Tailwind CSS.',
      'Menyusun reusable components agar tampilan konsisten.',
    ],
    challenges:
      'Menyusun informasi keuangan agar tetap jelas, rapi, dan nyaman dibaca di berbagai ukuran layar.',
    learnings:
      'Mempelajari Next.js, Tailwind CSS, reusable components, dan responsive design.',
    github: '',
    demo: '',
  },
  {
    title: 'Personal Portfolio',
    category: 'Frontend Development',
    description:
      'Website portfolio pribadi untuk menampilkan profil, keterampilan, galeri, dan hasil project.',
    image: '/project/portofolio.jpeg',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    features: [
      'Membuat Hero dan About Me.',
      'Menampilkan galeri foto interaktif.',
      'Mengintegrasikan animasi Reveal dan Lanyard.',
      'Membuat carousel project dengan modal detail.',
    ],
    challenges:
      'Menggabungkan komponen interaktif dan animasi sambil menjaga responsivitas website.',
    learnings:
      'Mempelajari React state, reusable components, responsive design, dan integrasi komponen.',
    github: '',
    demo: '',
  },
]

const skills = [
  'Next.js',
  'React',
  'JavaScript',
  'TypeScript',
  'Tailwind CSS',
  'Laravel',
  'PHP',
  'Python',
  'Supabase',
  'Figma',
]

const experiences: Experience[] = [
  {
    title: 'Founder & Web Developer',
    subtitle: 'UWebDev_',
    subtitleHref: 'https://www.instagram.com/uwebdev._',
    period: 'Sep 2026 – Present',
    description:
      'Founded UWebDev_, an independent website development service focused on helping individuals and businesses establish their online presence through modern and user-friendly websites.',
    points: [
      'Developing websites based on project requirements and user needs.',
      'Building the UWebDev_ brand and promoting website development services through social media.',
      'Continuously improving technical skills and exploring solutions for website development projects.',
    ],
    tags: ['Web Development', 'Front-End', 'UI/UX', 'Entrepreneurship'],
    links: [
      { label: 'Instagram', href: 'https://www.instagram.com/uwebdev._' },
      { label: 'TikTok', href: 'https://www.tiktok.com/@uwebdevv_' },
    ],
    active: true,
  },
  {
    title: 'Front-End Developer',
    subtitle: 'Self-Learning & Personal Projects',
    period: 'Ongoing',
    description:
      'Continuously learning and developing front-end development skills through self-study and hands-on projects. Focused on building responsive, interactive, and user-friendly websites while exploring modern web technologies and UI/UX principles.',
    points: [
      'Learning and applying HTML, CSS, JavaScript, React, and Next.js through practical projects.',
      'Building personal and portfolio projects to improve coding skills, responsive layouts, and reusable components.',
      'Continuously exploring modern development tools and UI/UX principles to improve website quality.',
    ],
    tags: [
      'HTML',
      'CSS',
      'JavaScript',
      'React',
      'Next.js',
      'Tailwind CSS',
      'UI/UX',
    ],
    active: true,
  },
  {
    title: 'Junior Front-End Developer',
    subtitle: 'Internship · Yogyakarta',
    period: '3 Months',
    description:
      'Completed a three-month internship as a Junior Front-End Developer, gaining practical experience in web development and improving my understanding of building modern web interfaces.',
    points: [
      'Worked on front-end development tasks and web interface implementation.',
      'Improved understanding of responsive web design and modern front-end development practices.',
      'Developed problem-solving skills and learned to work through tasks in a professional environment.',
    ],
    tags: [
      'Front-End Development',
      'Responsive Design',
      'Web Development',
      'Problem Solving',
    ],
    active: true,
  },
  {
    title: 'Team Support',
    subtitle: 'MR DIY',
    period: 'Dec 2024 – Apr 2025',
    description:
      'Supported daily operational activities while developing communication, teamwork, and problem-solving skills in a professional working environment.',
    points: [
      'Coordinated with team members to support smooth daily operations.',
      'Communicated effectively with colleagues and customers to complete tasks on time.',
      'Helped resolve operational challenges while taking responsibility for assigned tasks.',
    ],
    tags: ['Communication', 'Teamwork', 'Problem Solving', 'Time Management'],
    active: false,
  },
]

const certificates: Certificate[] = [
  {
    title: 'Web Development Series 15.0',
    issuer: 'Dibimbing',
    date: '27 – 28 Maret 2026',
    image: '/sertifikat/sertifikat1.jpeg',
    credentialUrl: '',
  },
  {
    title: 'UI/UX Design for Beginners',
    issuer: 'Consultee & Company',
    date: '9 Mei 2026',
    image: '/sertifikat/sertifikat2.jpeg',
    credentialUrl: '',
  },
  {
    title: 'Certificate of Employment · Team Support Staff',
    issuer: 'PT Daya Intiguna Yasa (MR.DIY)',
    date: '26 April 2025',
    image: '/sertifikat/sertifikat3.jpeg',
    credentialUrl: '',
  },
]

export default function Page() {
  const projectsRef = useRef<HTMLDivElement>(null)
  const certificatesRef = useRef<HTMLDivElement>(null)
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null)
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null)
  const [isMessageSent, setIsMessageSent] = useState(false)

  // Saat refresh, selalu kembali ke tampilan Home (paling atas)
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

    const resetScroll = () =>
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    window.addEventListener('beforeunload', resetScroll)

    return () => window.removeEventListener('beforeunload', resetScroll)
  }, [])

  // Tutup modal dengan tombol Escape
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null)
        setSelectedCertificate(null)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '')
    const email = String(data.get('email') ?? '')
    const subject = String(data.get('subject') ?? '')
    const message = String(data.get('message') ?? '')

    // Buka aplikasi email dengan data form yang sudah terisi
    const body = `Nama: ${name}\nEmail: ${email}\n\n${message}`
    window.location.href = `mailto:ubai.example@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`

    form.reset()
    setIsMessageSent(true)
  }

  const scrollProjects = (direction: 'left' | 'right') => {
    projectsRef.current?.scrollBy({
      left: direction === 'left' ? -340 : 340,
      behavior: 'smooth',
    })
  }

  const scrollCertificates = (direction: 'left' | 'right') => {
    certificatesRef.current?.scrollBy({
      left: direction === 'left' ? -340 : 340,
      behavior: 'smooth',
    })
  }

  return (
    <main className="w-full overflow-x-clip bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* HERO */}
      <section
        id="home"
        className="flex min-h-screen scroll-mt-20 items-center px-4 py-20 sm:px-6 md:px-16"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-10 md:flex-row md:gap-12">
          <Reveal className="w-full min-w-0 flex-1">
            <p className="mb-4 text-base font-medium text-gray-500 dark:text-gray-400 sm:text-lg">
              Hi, I&apos;m Ubai
            </p>

            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl">
              A <span className="text-blue-900 dark:text-blue-800">Frontend</span>{' '}
              Developer
              <span>.</span>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg">
              I build modern, responsive, and user-friendly web experiences
              with a passion for clean design.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <a
                href="#projects"
                className="rounded-lg bg-blue-800 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-900 sm:px-6 sm:text-base"
              >
                View My Projects
              </a>

              <a
                href="#contact"
                className="rounded-lg border border-gray-300 dark:border-gray-700 px-5 py-3 text-sm font-medium transition hover:bg-gray-100 dark:hover:bg-gray-800 sm:px-6 sm:text-base"
              >
                Contact Me
              </a>
            </div>
          </Reveal>

          <Reveal
            className="flex w-full flex-1 justify-center"
            delay={0.2}
          >
            <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-blue-500/20 shadow-xl sm:h-72 sm:w-72 md:h-96 md:w-96">
              <Image
                src="/picture/ubai.jpeg"
                alt="Ubai - Frontend Developer"
                fill
                priority
                sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, 384px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ABOUT ME */}
      <section
        id="about"
        className="scroll-mt-20 overflow-hidden px-4 py-16 sm:px-6 sm:py-20 md:px-16"
      >
        <Reveal>
          <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm">
            <div className="grid grid-cols-1 items-center gap-6 p-5 sm:gap-8 sm:p-8 md:grid-cols-2 md:gap-12 md:p-12">
              <div className="min-w-0">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400">
                  Who I Am
                </p>

                <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
                  Hi, I&apos;m Ubai.
                </h2>

                <p className="mb-5 text-base leading-8 text-gray-600 dark:text-gray-400 md:text-lg">
                  I&apos;m an Informatics student with a strong interest in
                  Frontend Development and UI/UX Design. I enjoy creating
                  modern, responsive, and user-friendly websites.
                </p>

                <p className="mb-5 text-base leading-8 text-gray-600 dark:text-gray-400 md:text-lg">
                  I love turning ideas into digital experiences through clean
                  code, thoughtful design, and attention to detail. I&apos;m
                  continuously learning and improving my skills.
                </p>

                <p className="text-base leading-8 text-gray-600 dark:text-gray-400 md:text-lg">
                  My goal is to become a skilled Frontend Developer who can
                  create meaningful digital products and great user
                  experiences.
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {skills.slice(0, 5).map((skill, index) => (
                    <Reveal key={skill} delay={index * 0.06}>
                      <span className="inline-block rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        {skill}
                      </span>
                    </Reveal>
                  ))}
                </div>
              </div>

              <Reveal
                className="relative -mr-5 h-[380px] w-[calc(100%+1.25rem)] translate-x-3 sm:mr-0 sm:h-[450px] sm:w-full sm:translate-x-0 md:h-[600px]"
                delay={0.2}
              >
                <Lanyard
                  frontImage="/picture/lanyard.jpeg"
                  backImage="/picture/lanyard.jpeg"
                  strapImage="/band.png"
                  imageFit="cover"
                  cardColor="#ffffff"
                  orientation="portrait"
                  finish="glossy"
                  cornerRadius={0.3}
                  size={0.66}
                  anchor="center"
                  strapLength={0.5}
                  strapColor="#111111"
                  strapWidth={0.65}
                  metal="silver"
                  gravity={1}
                  damping={0.5}
                  elasticity={0.5}
                  breeze={0.5}
                  interactive
                  intro
                />
              </Reveal>
            </div>
          </div>
        </Reveal>

        {/* GALLERY */}
        <Reveal delay={0.15}>
          <div className="mx-auto mt-16 flex w-full max-w-7xl min-w-0 flex-col items-center sm:mt-20">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400">
              My Gallery
            </p>

            <h2 className="mb-4 text-center text-2xl font-bold sm:text-3xl md:text-4xl">
              Moments &amp; Inspiration
            </h2>

            <p className="mb-8 max-w-xl text-center text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
              A small collection of images that inspire my creativity.
            </p>

            <div className="relative flex h-[280px] w-full min-w-0 items-center justify-center sm:h-[340px] md:h-[380px]">
              <div className="h-[210px] w-[210px] sm:h-[260px] sm:w-[260px] md:h-[300px] md:w-[300px]">
                <Stack
                  layout="fan"
                  sendToBackOnClick={false}
                  cards={images.map((src, index) => (
                    <Image
                      key={src}
                      src={src}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 210px, (max-width: 768px) 260px, 300px"
                      draggable={false}
                      className="h-full w-full object-cover"
                    />
                  ))}
                  visible={4}
                  spread={0.5}
                  depth={0.5}
                  radius={16}
                  frame={2}
                  frameColor="#ffffff"
                  shadow
                  tilt={25}
                  threshold={90}
                  speed={0.8}
                  autoplay={false}
                  autoplayDelay={3000}
                  pauseOnHover={false}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* EXPERIENCE */}
      <section
        id="experience"
        className="scroll-mt-24 bg-white dark:bg-gray-950 px-6 py-24 md:px-10"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-14">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
              My Journey
            </p>

            <h2 className="text-4xl font-bold tracking-tight text-gray-950 dark:text-white md:text-5xl">
              Experience<span className="text-blue-600 dark:text-blue-400">.</span>
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-gray-500 dark:text-gray-400">
              My journey in web development, from continuously learning
              modern technologies to building my own website development
              business and gaining professional experience.
            </p>
          </div>

          <div className="relative ml-2 border-l border-gray-200 dark:border-gray-800 pl-8 md:ml-3 md:pl-10">
            {experiences.map((exp, index) => {
              const isLast = index === experiences.length - 1

              return (
                <article
                  key={`${exp.title}-${exp.subtitle}`}
                  className={`relative ${isLast ? '' : 'pb-14'}`}
                >
                  <span
                    className={`absolute -left-[37px] top-1.5 h-3 w-3 rounded-full border-2 bg-white dark:bg-gray-950 md:-left-[45px] ${exp.active ? 'border-blue-600' : 'border-gray-400'
                      }`}
                  />

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-950 dark:text-white md:text-2xl">
                        {exp.title}
                      </h3>

                      {exp.subtitleHref ? (
                        <a
                          href={exp.subtitleHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 transition hover:text-blue-800 dark:hover:text-blue-300"
                        >
                          {exp.subtitle}
                          <span aria-hidden="true">↗</span>
                        </a>
                      ) : (
                        <p
                          className={`mt-2 text-sm font-medium ${exp.active ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                            }`}
                        >
                          {exp.subtitle}
                        </p>
                      )}
                    </div>

                    <span
                      className={`w-fit rounded-full px-4 py-2 text-xs font-semibold ${exp.active
                        ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}
                    >
                      {exp.period}
                    </span>
                  </div>

                  <p className="mt-5 leading-7 text-gray-600 dark:text-gray-400">
                    {exp.description}
                  </p>

                  <ul className="mt-4 space-y-3 text-sm leading-7 text-gray-600 dark:text-gray-400 md:text-base">
                    {exp.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span
                          className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${exp.active ? 'bg-blue-600' : 'bg-gray-400'
                            }`}
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-gray-200 dark:border-gray-800 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 transition-colors hover:border-blue-200 dark:hover:border-blue-800 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {exp.links && (
                    <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                      {exp.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          {link.label} ↗
                        </a>
                      ))}
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* CERTIFICATES */}
      <section
        id="certificates"
        className="scroll-mt-24 bg-white dark:bg-gray-950 px-6 py-24 md:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400">
                  Achievements
                </p>

                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Certificates<span className="text-blue-500">.</span>
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
                  Sertifikat dan pencapaian yang mendukung perjalanan belajar
                  dan pengembangan keterampilanku.
                </p>
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  aria-label="Geser sertifikat ke kiri"
                  onClick={() => scrollCertificates('left')}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 transition hover:bg-gray-100 dark:hover:bg-gray-800 sm:h-11 sm:w-11"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>

                <button
                  type="button"
                  aria-label="Geser sertifikat ke kanan"
                  onClick={() => scrollCertificates('right')}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 transition hover:bg-gray-100 dark:hover:bg-gray-800 sm:h-11 sm:w-11"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </Reveal>

          <div
            ref={certificatesRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-6"
          >
            {certificates.map((cert, index) => (
              <Reveal
                key={`${cert.title}-${index}`}
                delay={index * 0.05}
                className="h-full shrink-0 snap-start"
              >
                <button
                  type="button"
                  onClick={() => setSelectedCertificate(cert)}
                  aria-label={`Lihat sertifikat ${cert.title}`}
                  className="group flex h-full w-[280px] flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 sm:w-[320px]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                    {cert.image ? (
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        sizes="320px"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-gray-400">
                        <svg
                          viewBox="0 0 24 24"
                          width="40"
                          height="40"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="9" r="6" />
                          <path d="m8.5 14.5-1.5 7 5-3 5 3-1.5-7" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-gray-100">
                      {cert.title}
                    </h3>

                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {cert.issuer}
                    </p>

                    <p className="mt-auto pt-4 text-xs text-gray-500 dark:text-gray-400">
                      {cert.date}
                    </p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>

          <p className="mt-1 text-xs text-gray-400">
            Geser ke samping untuk melihat sertifikat lainnya →
          </p>
        </div>
      </section>

      {/* MY PROJECTS CAROUSEL */}
      <section
        id="projects"
        className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20 md:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400">
                  My Projects
                </p>

                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Selected Works
                  <span className="text-blue-500">.</span>
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
                  A collection of projects I&apos;ve worked on and the
                  technologies I&apos;ve explored.
                </p>
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  aria-label="Geser project ke kiri"
                  onClick={() => scrollProjects('left')}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 transition hover:bg-gray-100 dark:hover:bg-gray-800 sm:h-11 sm:w-11"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>

                <button
                  type="button"
                  aria-label="Geser project ke kanan"
                  onClick={() => scrollProjects('right')}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 transition hover:bg-gray-100 dark:hover:bg-gray-800 sm:h-11 sm:w-11"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </Reveal>

          <div
            ref={projectsRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-6"
          >
            {projects.map((project, index) => (
              <Reveal
                key={project.title}
                delay={index * 0.05}
                className="h-full shrink-0 snap-start"
              >
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  aria-label={`Lihat detail ${project.title}`}
                  className="group flex h-full w-[280px] flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 sm:w-[320px]"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="320px"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                      {project.category}
                    </p>

                    <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-gray-100">
                      {project.title}
                    </h3>

                    <p className="mb-5 min-h-14 text-sm leading-6 text-gray-600 dark:text-gray-400">
                      {project.description}
                    </p>

                    <div className="mb-5 flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Lihat detail
                      </span>

                      <span className="text-lg transition group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>

          <p className="mt-1 text-xs text-gray-400">
            Geser ke samping untuk melihat project lainnya →
          </p>
        </div>
      </section>

      {/* CERTIFICATE MODAL */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-modal-title"
            className="relative max-h-[85dvh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white dark:bg-gray-900 p-5 shadow-2xl sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="mb-1 text-xs font-semibold text-blue-700 dark:text-blue-400">
                  {selectedCertificate.issuer} · {selectedCertificate.date}
                </p>

                <h2
                  id="certificate-modal-title"
                  className="text-2xl font-bold text-gray-900 dark:text-gray-100"
                >
                  {selectedCertificate.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCertificate(null)}
                aria-label="Tutup sertifikat"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-2xl text-gray-500 dark:text-gray-400 transition hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                &times;
              </button>
            </div>

            <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
              {selectedCertificate.image ? (
                <Image
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-contain"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                  Gambar sertifikat belum ditambahkan.
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3 border-t border-gray-100 dark:border-gray-800 pt-5">
              {selectedCertificate.credentialUrl && (
                <a
                  href={selectedCertificate.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-blue-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-800"
                >
                  Lihat Kredensial ↗
                </a>
              )}

              <button
                type="button"
                onClick={() => setSelectedCertificate(null)}
                className="rounded-lg border border-gray-300 dark:border-gray-700 px-5 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 transition hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROJECT DETAIL MODAL */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="relative max-h-[85dvh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white dark:bg-gray-950 p-5 shadow-2xl sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                  {selectedProject.category}
                </p>

                <h2
                  id="project-modal-title"
                  className="text-2xl font-bold text-gray-900 dark:text-gray-100"
                >
                  {selectedProject.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Tutup detail project"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-2xl text-gray-500 dark:text-gray-400 transition hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                &times;
              </button>
            </div>

            <div className="relative mb-5 aspect-video overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                sizes="(max-width: 640px) 100vw, 512px"
                className="object-cover"
              />
            </div>

            <p className="mb-6 text-sm leading-7 text-gray-600 dark:text-gray-400">
              {selectedProject.description}
            </p>

            <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">
              Fitur yang Dikerjakan
            </h3>

            <ul className="mb-6 list-inside list-disc space-y-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
              {selectedProject.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">Tantangan</h3>

            <p className="mb-6 text-sm leading-7 text-gray-600 dark:text-gray-400">
              {selectedProject.challenges}
            </p>

            <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
              Yang Dipelajari
            </h3>

            <p className="mb-6 text-sm leading-7 text-gray-600 dark:text-gray-400">
              {selectedProject.learnings}
            </p>

            <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">Technologies</h3>

            <div className="mb-6 flex flex-wrap gap-2">
              {selectedProject.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 border-t border-gray-100 dark:border-gray-800 pt-5">
              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  View GitHub ↗
                </a>
              )}

              {selectedProject.demo && (
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-blue-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-800"
                >
                  Live Demo ↗
                </a>
              )}

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="rounded-lg border border-gray-300 dark:border-gray-700 px-5 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 transition hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TECH STACK */}
      <section id="tech-stack" className="w-full">
        <TechStack />
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="scroll-mt-20 bg-gray-50 dark:bg-gray-900 px-4 py-20 sm:px-6 md:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400">
                Get In Touch
              </p>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Let&apos;s Build Something Together.
                <span className="text-blue-500">.</span>
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
                Punya project atau ide yang ingin dikerjakan bareng? Kirim
                pesan lewat form di bawah atau hubungi langsung lewat kontak
                di samping.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {/* Info Contact */}
            <Reveal className="lg:col-span-2" delay={0.1}>
              <div className="flex h-full flex-col gap-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-950">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    Contact Information
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">
                    Aku terbuka untuk kolaborasi, proyek freelance, maupun
                    sekadar ngobrol soal frontend dan UI/UX.
                  </p>
                </div>

                <div className="flex flex-col gap-5">
                  {/* Email */}
                  <a
                    href="satriaubaidah398@gmail.com"
                    className="group flex items-start gap-4 rounded-2xl border border-gray-100 p-4 transition hover:border-blue-200 hover:bg-blue-50/50 dark:border-gray-800 dark:hover:border-blue-800 dark:hover:bg-blue-950/30"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                      <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m2 7 10 6 10-6" />
                      </svg>
                    </span>

                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Email
                      </span>
                      <span className="block truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                        satriaubaida398@gmail.com
                      </span>
                    </span>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/6281348417456"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 rounded-2xl border border-gray-100 p-4 transition hover:border-blue-200 hover:bg-blue-50/50 dark:border-gray-800 dark:hover:border-blue-800 dark:hover:bg-blue-950/30"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                      <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8A8.38 8.38 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" />
                      </svg>
                    </span>

                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        WhatsApp
                      </span>
                      <span className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                        +62 813-4841-7456
                      </span>
                    </span>
                  </a>

                  {/* Lokasi */}
                  <div className="flex items-start gap-4 rounded-2xl border border-gray-100 p-4 dark:border-gray-800">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                      <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </span>

                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Location
                      </span>
                      <span className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                        Indonesia
                      </span>
                    </span>
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-auto border-t border-gray-100 pt-6 dark:border-gray-800">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Follow Me
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://github.com/Ubaii"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-300 hover:text-blue-700 dark:border-gray-700 dark:text-gray-300 dark:hover:border-blue-700 dark:hover:text-blue-400"
                    >
                      GitHub ↗
                    </a>

                    <a
                      href="https://www.instagram.com/uwebdev._"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-300 hover:text-blue-700 dark:border-gray-700 dark:text-gray-300 dark:hover:border-blue-700 dark:hover:text-blue-400"
                    >
                      Instagram ↗
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Form Contact */}
            <Reveal className="lg:col-span-3" delay={0.2}>
              <div className="h-full rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-950">
                {isMessageSent ? (
                  <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400">
                      <svg
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      Pesan Terkirim!
                    </h3>

                    <p className="max-w-sm text-sm leading-7 text-gray-600 dark:text-gray-400">
                      Terima kasih sudah menghubungi. Aku akan membalas
                      pesanmu secepatnya.
                    </p>

                    <button
                      type="button"
                      onClick={() => setIsMessageSent(false)}
                      className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      Kirim Pesan Lain
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <label className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Nama
                        </span>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="Nama kamu"
                          className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                        />
                      </label>

                      <label className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email
                        </span>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="email@example.com"
                          className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                        />
                      </label>
                    </div>

                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Subjek
                      </span>
                      <input
                        type="text"
                        name="subject"
                        required
                        placeholder="Ada yang bisa dibantu?"
                        className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                      />
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Pesan
                      </span>
                      <textarea
                        name="message"
                        required
                        rows={6}
                        placeholder="Tulis pesanmu di sini..."
                        className="resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                      />
                    </label>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-800 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-900"
                    >
                      Kirim Pesan
                      <span aria-hidden="true">→</span>
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 dark:border-gray-800 px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        © {currentYear} Ubai. Built with Next.js and Tailwind
        CSS.
      </footer>
    </main>
  )
}