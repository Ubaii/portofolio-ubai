
'use client'

import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import Image from 'next/image'
import Lanyard from '@/components/Lanyard'
import Reveal from '@/components/Reveal'
import TechStack from '@/components/TechStack'
import Stack from '@/components/Stack'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { useLanguage } from '@/components/context/LanguageContext'
import Skills from '@/components/Skills'

const CONTACT_EMAIL = 'satriaubaidah398@gmail.com'

const images = Array.from(
  { length: 14 },
  (_, index) => `/picture/galeri/${index + 1}.jpeg`
)

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
  image: string
  credentialUrl: string
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
      'Mempelajari Next.js, TypeScript, reusable components, responsive design, dan Supabase.',
    github: 'https://github.com/Ubaii/vespera',
    demo: '',
  },
  {
    title: 'Ubai AI',
    category: 'AI Application',
    description:
      'AI assistant berbasis web untuk membantu pengguna berinteraksi dengan kecerdasan buatan.',
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
      'Membuat desain menarik yang nyaman digunakan di berbagai perangkat.',
    learnings:
      'Mempelajari HTML, CSS, JavaScript, dan pengembangan website personal.',
    github: 'https://github.com/Ubaii/birthday-page',
    demo: '',
  },
  {
    title: 'Coffee Senja Dashboard',
    category: 'Dashboard Application',
    description:
      'Dashboard manajemen coffee shop untuk mengelola menu, meja, dan transaksi.',
    image: '/project/dashboard-kasir-coffe.jpeg',
    tech: ['Laravel', 'PHP', 'Blade', 'Tailwind CSS', 'SQLite'],
    features: [
      'Membuat dashboard administrator dan kasir.',
      'Mengembangkan pengelolaan menu dan kategori.',
      'Membuat halaman meja dan status meja.',
      'Mengembangkan antarmuka transaksi kasir.',
    ],
    challenges:
      'Menghubungkan data aplikasi dengan dashboard dan menjaga alur transaksi.',
    learnings:
      'Mempelajari Laravel, Blade, Tailwind CSS, database, dan debugging.',
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
      'Menjaga konsistensi data dan memperbaiki masalah layout serta transaksi.',
    learnings:
      'Mempelajari Laravel, Blade, database relasional, dan debugging.',
    github: 'https://github.com/Ubaii/Mieayam-Application',
    demo: '',
  },
  {
    title: 'Personal Portfolio',
    category: 'Frontend Engineer',
    description:
      'Website portfolio pribadi untuk menampilkan profil, keterampilan, galeri, dan project.',
    image: '/project/portofolio.jpeg',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    features: [
      'Membuat bagian Hero dan About Me.',
      'Menampilkan galeri foto interaktif.',
      'Mengintegrasikan animasi Reveal dan Lanyard.',
      'Membuat carousel project dengan modal detail.',
    ],
    challenges:
      'Menggabungkan komponen interaktif dan animasi sambil menjaga responsivitas.',
    learnings:
      'Mempelajari React state, reusable components, responsive design, dan integrasi komponen.',
    github: '',
    demo: '',
  },
  {
    title: 'UI Bank BCA',
    category: 'Frontend Engineer',
    description:
      'Website UI Bank BCA dengan Next.js dan Tailwind CSS yang rapi, responsif, dan mudah digunakan.',
    image: '/project/bank.jpeg',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    features: [
      'Membangun antarmuka perbankan dengan Next.js.',
      'Membuat layout responsif menggunakan Tailwind CSS.',
      'Menyusun reusable components agar tampilan konsisten.',
    ],
    challenges:
      'Menyajikan informasi keuangan dengan jelas pada berbagai ukuran layar.',
    learnings:
      'Mempelajari Next.js, Tailwind CSS, reusable components, dan responsive design.',
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
  'Google Ads',
  'Google Analytics',
  'Graphic Design',
  'Content Creation',
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
    title: 'Google Ads Certification',
    issuer: 'Google',
    date: '2026',
    image: '/sertifikat/google-ads.png',
    credentialUrl: '',
  },
  {
    title: 'Dicoding Certification',
    issuer: 'Dicoding Indonesia',
    date: '2026',
    image: '/sertifikat/dicoding.png',
    credentialUrl: '',
  },
  {
    title: 'Google Analytics Certification',
    issuer: 'Google',
    date: '2026',
    image: '/sertifikat/google-analytic.png',
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
    title: 'Belajar Dasar Manajemen Proyek',
    issuer: 'Dicoding Indonesia',
    date: '21 Oktober 2026',
    image: '/sertifikat/sertifikat-manajemen-proyek.png',
    credentialUrl: 'https://www.dicoding.com/certificates/RVZKME40NXD5',
  },
  {
    title: 'Surat Pengalaman Kerja',
    issuer: 'PT Baoshuo Taman Industry Investment Group',
    date: '17 Desember 2023 – 29 April 2024',
    image: '/sertifikat/sertifikat-pengalaman-huobao.png',
    credentialUrl: '',
  },
  {
    title: 'Peserta Tangkai Lomba Menyanyi POP',
    issuer: 'Universitas Negeri Yogyakarta',
    date: '25 Juni 2026',
    image: '/sertifikat/sertifikat-menyanyi-pop.png',
    credentialUrl: '',
  },
  {
    title: 'Certificate of Employment · Team Support Staff',
    issuer: 'PT Daya Intiguna Yasa (MR.DIY)',
    date: '26 April 2025',
    image: '/sertifikat/sertifikat34.jpeg',
    credentialUrl: '',
  },
]

export default function Page() {
  const { t, language } = useLanguage()
  const isEnglish = language === 'en'

  const projectsRef = useRef<HTMLDivElement>(null)
  const certificatesRef = useRef<HTMLDivElement>(null)

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null)
  const [isMessageSent, setIsMessageSent] = useState(false)

  // Tanggal dan tahun dihitung setelah komponen terpasang di browser.
  // Ini mencegah perbedaan hasil saat Next.js melakukan prerender.
  const [age, setAge] = useState<{
    years: number
    months: number
    days: number
  } | null>(null)

  const [currentYear, setCurrentYear] = useState<number | null>(null)

  useEffect(() => {
    const birthDate = new Date(2004, 9, 9)
    const today = new Date()

    let years = today.getFullYear() - birthDate.getFullYear()
    let months = today.getMonth() - birthDate.getMonth()
    let days = today.getDate() - birthDate.getDate()

    if (days < 0) {
      months--

      const previousMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      )

      days += previousMonth.getDate()
    }

    if (months < 0) {
      years--
      months += 12
    }

    setAge({ years, months, days })
    setCurrentYear(today.getFullYear())
  }, [])

  const ageText = age
    ? `${age.years} tahun ${age.months} bulan ${age.days} hari`
    : '...'

  const ageTextEnglish = age
    ? `${age.years} years ${age.months} months ${age.days} days`
    : '...'

  const experiences: Experience[] = [
    {
      title: 'Frontend Engineer',
      subtitle: 'UWebDev_',
      subtitleHref: 'https://www.instagram.com/uwebdev._',
      period: 'Sep 2026 – Present',
      description:
        'Mengembangkan website modern, responsif, dan mudah digunakan sesuai kebutuhan klien.',
      points: [
        'Mengembangkan website responsif sesuai kebutuhan proyek.',
        'Membangun antarmuka web menggunakan teknologi frontend modern.',
        'Terus meningkatkan keterampilan frontend engineering.',
      ],
      tags: ['Frontend Engineering', 'React', 'Next.js', 'UI/UX'],
      links: [
        {
          label: 'Instagram',
          href: 'https://www.instagram.com/uwebdev._',
        },
        {
          label: 'TikTok',
          href: 'https://www.tiktok.com/@uwebdevv_',
        },
      ],
      active: true,
    },
    {
      title: 'Ketua Divisi Humas',
      subtitle: 'Himpunan Mahasiswa Informatika',
      period: 'Feb 2026 – Present',
      description:
        'Memimpin divisi Hubungan Masyarakat serta mengembangkan komunikasi, kerja sama tim, dan kontribusi organisasi.',
      points: [
        'Mengelola komunikasi dan strategi hubungan masyarakat organisasi.',
        'Berkoordinasi dengan anggota tim untuk merencanakan dan menjalankan program.',
        'Membangun hubungan dengan pihak internal dan eksternal.',
        'Mengembangkan kemampuan kepemimpinan dan pengelolaan organisasi.',
      ],
      tags: [
        'Leadership',
        'Public Relations',
        'Communication',
        'Teamwork',
        'Event Management',
      ],
      active: true,
    },
    {
      title: 'Anggota PDD (Publikasi dan Dokumentasi)',
      subtitle: 'Himpunan Mahasiswa Informatika',
      period: 'Feb 2026 – Present',
      description:
        'Berkontribusi dalam publikasi, dokumentasi kegiatan organisasi, dan pembuatan konten visual untuk informasi serta promosi acara.',
      points: [
        'Membuat konten visual untuk informasi organisasi dan promosi acara.',
        'Mendukung kebutuhan desain dan media publikasi.',
        'Berkolaborasi dengan anggota tim dalam menjalankan program.',
        'Mendokumentasikan kegiatan organisasi untuk komunikasi internal dan eksternal.',
      ],
      tags: [
        'Graphic Design',
        'Content Creation',
        'Visual Communication',
        'Documentation',
        'Teamwork',
      ],
      active: true,
    },
    {
      title: 'Frontend Engineer',
      subtitle: 'Belajar Mandiri & Proyek Pribadi',
      period: 'Ongoing',
      description:
        'Terus mempelajari dan mengembangkan keterampilan frontend melalui belajar mandiri serta proyek praktik.',
      points: [
        'Mempelajari dan menerapkan HTML, CSS, JavaScript, React, dan Next.js.',
        'Membangun proyek pribadi untuk meningkatkan kemampuan coding dan responsive layout.',
        'Mengeksplorasi teknologi web modern dan praktik pengembangan frontend.',
        'Mengembangkan keterampilan teknis serta prinsip UI/UX.',
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
      title: 'Frontend Engineer',
      subtitle: 'Magang · Yogyakarta',
      period: '3 Months',
      description:
        'Menyelesaikan program magang selama tiga bulan dan memperoleh pengalaman praktis dalam pengembangan antarmuka web modern.',
      points: [
        'Mengerjakan tugas frontend dan implementasi antarmuka web.',
        'Memperdalam responsive web design dan praktik pengembangan frontend modern.',
        'Mengembangkan kemampuan pemecahan masalah dalam lingkungan kerja profesional.',
      ],
      tags: [
        'Frontend Engineering',
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
        'Mendukung operasional harian sekaligus mengembangkan komunikasi, kerja sama tim, dan kemampuan menyelesaikan masalah di lingkungan kerja profesional.',
      points: [
        'Berkoordinasi dengan anggota tim untuk mendukung operasional harian.',
        'Berkomunikasi dengan rekan kerja dan pelanggan untuk menyelesaikan tugas tepat waktu.',
        'Membantu menyelesaikan kendala operasional dan bertanggung jawab atas tugas.',
      ],
      tags: [
        'Communication',
        'Teamwork',
        'Problem Solving',
        'Time Management',
      ],
      active: false,
    },
  ]

  const localizedExperiences: Experience[] = experiences.map((exp, index) => {
    if (!isEnglish) return exp

    const englishTranslations: Partial<Experience>[] = [
      {
        title: 'Frontend Engineer',
        description:
          'Developing modern, responsive, and user-friendly websites based on client requirements.',
        points: [
          'Developing responsive websites based on project requirements.',
          'Building web interfaces using modern frontend technologies.',
          'Continuously improving frontend engineering skills.',
        ],
      },
      {
        title: 'Public Relations Division Lead',
        description:
          'Leading the Public Relations division of the Informatics Student Association while developing communication, teamwork, and organizational skills.',
        points: [
          'Managing organizational communications and public relations strategies.',
          'Coordinating with team members to plan and execute programs.',
          'Building relationships with internal and external stakeholders.',
          'Developing leadership and organizational management skills.',
        ],
      },
      {
        title: 'Publication and Documentation Team Member',
        description:
          'Contributing to organizational publications and event documentation while creating visual content for information and promotion.',
        points: [
          'Creating visual content for organizational information and event promotion.',
          'Supporting design and publication media needs.',
          'Collaborating with team members to implement programs.',
          'Documenting activities for internal and external communications.',
        ],
      },
      {
        title: 'Frontend Engineer',
        subtitle: 'Self-Learning & Personal Projects',
        description:
          'Continuously developing frontend engineering skills through self-study and hands-on projects.',
        points: [
          'Learning and applying HTML, CSS, JavaScript, React, and Next.js.',
          'Building personal projects to improve coding skills and responsive layouts.',
          'Exploring modern web technologies and frontend development practices.',
          'Improving technical skills and UI/UX principles.',
        ],
      },
      {
        title: 'Frontend Engineer Intern',
        subtitle: 'Internship · Yogyakarta',
        description:
          'Completed a three-month internship and gained practical experience in modern web interface development.',
        points: [
          'Working on frontend tasks and web interface implementation.',
          'Improving responsive web design and modern frontend development practices.',
          'Developing problem-solving skills in a professional work environment.',
        ],
      },
      {
        title: 'Team Support',
        description:
          'Supported daily operations while developing communication, teamwork, and problem-solving skills in a professional work environment.',
        points: [
          'Coordinating with team members to support daily operations.',
          'Communicating with colleagues and customers to complete tasks on time.',
          'Helping resolve operational issues and taking responsibility for assigned tasks.',
        ],
      },
    ]

    return { ...exp, ...englishTranslations[index] }
  })

  const localizedProjects: Project[] = projects.map((project) => {
    const englishTranslations: Record<string, Partial<Project>> = {
      Vespera: {
        description:
          'A PlayStation booking website that allows users to explore rooms and make reservations.',
        features: [
          'Building a responsive website interface.',
          'Designing the Home, Profile, Contact, and Location pages.',
          'Developing the PlayStation room booking interface.',
          'Exploring authentication and database integration.',
        ],
        challenges:
          'Designing an intuitive booking flow while maintaining a consistent interface across screen sizes.',
        learnings:
          'Learning Next.js, TypeScript, reusable components, responsive design, and Supabase.',
      },
      'Ubai AI': {
        description:
          'A web-based AI assistant designed to help users interact with artificial intelligence.',
        features: [
          'Building an AI assistant interface.',
          'Developing conversational interactions.',
          'Integrating AI services into a web application.',
        ],
        challenges:
          'Connecting the interface to AI services and managing conversational responses.',
        learnings:
          'Exploring AI API integration, state management, and AI-powered web application development.',
      },
      'Birthday Website': {
        description:
          'A personalized birthday website designed to create a special digital experience.',
        features: [
          'Creating a birthday greeting page.',
          'Designing personalized layouts and content.',
          'Developing website interactions and visual elements.',
        ],
        challenges:
          'Creating an engaging design that works comfortably across different devices.',
        learnings:
          'Learning HTML, CSS, JavaScript, and personalized website development.',
      },
      'Coffee Senja Dashboard': {
        description:
          'A coffee shop management dashboard for handling menus, tables, and transactions.',
        features: [
          'Building administrator and cashier dashboards.',
          'Developing menu and category management.',
          'Creating table and table-status pages.',
          'Developing cashier transaction interfaces.',
        ],
        challenges:
          'Connecting application data to the dashboard and maintaining a reliable transaction flow.',
        learnings:
          'Learning Laravel, Blade, Tailwind CSS, databases, and debugging.',
      },
      'Mie Ayam Wengi’57': {
        description:
          'A restaurant management application for handling menus, categories, tables, and cashier transactions.',
        features: [
          'Building administrator and cashier dashboards.',
          'Developing menu and category management.',
          'Creating table and table-status pages.',
          'Developing the cashier payment workflow.',
        ],
        challenges:
          'Maintaining data consistency and fixing layout and transaction-flow issues.',
        learnings:
          'Learning Laravel, Blade, relational databases, and debugging.',
      },
      'Personal Portfolio': {
        description:
          'A personal portfolio website showcasing my profile, skills, gallery, and projects.',
        features: [
          'Building the Hero and About Me sections.',
          'Displaying an interactive photo gallery.',
          'Integrating Reveal and Lanyard animations.',
          'Creating a project carousel with detailed modals.',
        ],
        challenges:
          'Combining interactive components and animations while maintaining responsiveness.',
        learnings:
          'Learning React state, reusable components, responsive design, and component integration.',
      },
      'UI Bank BCA': {
        description:
          'A Bank BCA UI website built with Next.js and Tailwind CSS, featuring a clean, responsive, and user-friendly interface.',
        features: [
          'Building a banking interface with Next.js.',
          'Creating responsive layouts using Tailwind CSS.',
          'Developing reusable components for a consistent interface.',
        ],
        challenges:
          'Presenting financial information clearly and consistently across different screen sizes.',
        learnings:
          'Learning Next.js, Tailwind CSS, reusable components, and responsive design.',
      },
    }

    const translation = englishTranslations[project.title]

    return {
      ...project,
      ...(isEnglish && translation ? translation : {}),
    }
  })

  const localizedCertificates: Certificate[] = certificates.map((cert) => ({
    ...cert,
    date: isEnglish
      ? ({
          '27 – 28 Maret 2026': 'March 27–28, 2026',
          '9 Mei 2026': 'May 9, 2026',
          '26 April 2025': 'April 26, 2025',
        }[cert.date] ?? cert.date)
      : cert.date,
  }))

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

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '')
    const email = String(data.get('email') ?? '')
    const subject = String(data.get('subject') ?? '')
    const message = String(data.get('message') ?? '')

    const body = isEnglish
      ? `Name: ${name}\nEmail: ${email}\n\n${message}`
      : `Nama: ${name}\nEmail: ${email}\n\n${message}`

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

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

  const text = {
    about: isEnglish ? 'About Me' : 'Tentang Saya',

    aboutParagraph1: isEnglish
      ? `I am ${ageTextEnglish} old and was born on October 9, 2004. I am an Informatics Engineering student with a strong interest in Front-End Development and Web Development. I focus on building responsive, user-friendly, and visually appealing web applications using React.js, Next.js, JavaScript, TypeScript, and Tailwind CSS. Outside of coding, I enjoy singing, listening to music, playing football, gaming, watching movies, traveling, long-distance running, and hiking mountains.`
      : `Saya adalah mahasiswa Informatika berusia ${ageText} yang lahir pada 9 Oktober 2004. Saya memiliki minat besar dalam Front-End Development dan Web Development, khususnya membangun aplikasi web yang responsif, mudah digunakan, dan menarik secara visual menggunakan React.js, Next.js, JavaScript, TypeScript, dan Tailwind CSS. Di luar dunia pemrograman, saya memiliki berbagai hobi, seperti menyanyi, mendengarkan musik, ngoding, bermain sepak bola, nge-game, menonton film, traveling, lari jarak jauh, dan mendaki gunung.`,

    aboutParagraph2: isEnglish
      ? 'I have developed web-based solutions for business needs, including a cashier system and a PlayStation rental booking website. These projects have helped me gain experience in responsive UI development, front-end and back-end integration, and practical digital solutions.'
      : 'Saya telah mengembangkan solusi berbasis web untuk kebutuhan bisnis, termasuk sistem kasir dan website pemesanan rental PlayStation. Melalui project tersebut, saya mendapatkan pengalaman dalam pengembangan UI responsif, integrasi front-end dan back-end, serta pembuatan solusi digital yang praktis.',

    aboutParagraph3: isEnglish
      ? 'I am also actively involved in the Informatics Student Association, where I continue to develop my communication, teamwork, and organizational skills.'
      : 'Saya juga aktif dalam Himpunan Mahasiswa Informatika untuk mengembangkan kemampuan komunikasi, kerja sama tim, dan organisasi.',

    aboutParagraph4: isEnglish
      ? 'I continuously explore new technologies, including Artificial Intelligence and Machine Learning, to broaden my knowledge of the technology field.'
      : 'Saya terus mempelajari teknologi baru, termasuk Artificial Intelligence dan Machine Learning, untuk memperluas pengetahuan di bidang teknologi.',

    aboutParagraph5: isEnglish
      ? 'I am open to collaboration, freelance projects, internships, and opportunities to grow as a Front-End Developer while creating meaningful digital experiences.'
      : 'Saya terbuka untuk kolaborasi, project freelance, magang, dan kesempatan untuk berkembang sebagai Front-End Developer sambil menciptakan pengalaman digital yang bermanfaat.',

    gallery: isEnglish ? 'My Gallery' : 'Galeri Saya',
    experience: isEnglish ? 'Experience' : 'Pengalaman',
    certificates: isEnglish ? 'Certificates' : 'Sertifikat',
    projects: isEnglish ? 'My Projects' : 'Project Saya',
    contact: isEnglish ? 'Get In Touch' : 'Hubungi Saya',
    viewDetails: isEnglish ? 'View Details' : 'Lihat Detail',
    features: isEnglish ? 'Project Features' : 'Fitur Project',
    challenges: isEnglish ? 'Challenges' : 'Tantangan',
    learnings: isEnglish ? 'What I Learned' : 'Hal yang Dipelajari',
    technologies: isEnglish ? 'Technologies' : 'Teknologi',
    github: isEnglish ? 'View on GitHub' : 'Lihat di GitHub',
    demo: isEnglish ? 'Live Demo' : 'Demo Langsung',
    close: isEnglish ? 'Close' : 'Tutup',
    viewCredential: isEnglish ? 'View Credential' : 'Lihat Kredensial',

    noCertificate: isEnglish
      ? 'Certificate image has not been added.'
      : 'Gambar sertifikat belum ditambahkan.',

    contactInformation: isEnglish
      ? 'Contact Information'
      : 'Informasi Kontak',

    contactIntro: isEnglish
      ? 'Feel free to reach out for collaboration, projects, or other opportunities.'
      : 'Jangan ragu untuk menghubungi saya untuk kolaborasi, project, atau kesempatan lainnya.',

    location: isEnglish ? 'Location' : 'Lokasi',
    followMe: isEnglish ? 'Follow Me' : 'Ikuti Saya',
    name: isEnglish ? 'Name' : 'Nama',
    yourName: isEnglish ? 'Your name' : 'Nama kamu',
    subject: isEnglish ? 'Subject' : 'Subjek',

    subjectPlaceholder: isEnglish
      ? 'How can I help you?'
      : 'Ada yang bisa dibantu?',

    message: isEnglish ? 'Message' : 'Pesan',

    messagePlaceholder: isEnglish
      ? 'Write your message here...'
      : 'Tulis pesanmu di sini...',

    emailPlaceholder: 'email@example.com',

    sent: isEnglish ? 'Message Prepared!' : 'Pesan Disiapkan!',

    sentDescription: isEnglish
      ? 'Thank you for reaching out. Your email application should open so you can send your message.'
      : 'Terima kasih sudah menghubungi. Aplikasi email kamu akan terbuka agar kamu bisa mengirim pesan.',

    sendAnother: isEnglish ? 'Send Another Message' : 'Kirim Pesan Lain',

    scroll: isEnglish
      ? 'Scroll to explore more'
      : 'Geser untuk melihat lebih banyak',

    footer: isEnglish
      ? 'Built with Next.js and a passion for web development.'
      : 'Dibuat dengan Next.js dan semangat untuk web development.',
  }

  return (
    <main className="w-full overflow-x-clip bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      {/* HERO */}
      <section
        id="home"
        className="flex min-h-screen scroll-mt-20 items-center px-4 py-20 sm:px-6 md:px-16"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-10 md:flex-row md:gap-12">
          <Reveal className="w-full min-w-0 flex-1">
            <p className="mb-4 text-base font-medium text-gray-500 dark:text-gray-400 sm:text-lg">
              {t('heroGreeting')}
            </p>

            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl">
              <span className="text-blue-800 dark:text-blue-400">
                {t('heroRole')}
              </span>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg">
              {t('heroDescription')}
            </p>

            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <a
                href="#projects"
                className="rounded-lg bg-blue-800 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-900 sm:px-6 sm:text-base"
              >
                {t('heroButton')}
              </a>

              <a
                href="#contact"
                className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 sm:px-6 sm:text-base"
              >
                {t('heroContact')}
              </a>
            </div>

            <div className="mt-6 flex items-center gap-4">
              {[
                {
                  href: 'https://github.com/Ubaii',
                  label: 'GitHub',
                  Icon: FaGithub,
                },
                {
                  href: 'https://www.instagram.com/satriaa.u',
                  label: 'Instagram',
                  Icon: FaInstagram,
                },
                {
                  href: 'https://www.linkedin.com/in/satria-ubaidah-6041673b8/',
                  label: 'LinkedIn',
                  Icon: FaLinkedin,
                },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:-translate-y-1 hover:border-blue-500 hover:text-blue-600 dark:border-gray-700 dark:text-gray-300"
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal
            className="flex w-full flex-1 justify-center"
            delay={0.2}
          >
            <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-blue-500/20 shadow-xl sm:h-72 sm:w-72 md:h-96 md:w-96">
              <Image
                src="/picture/ube.jpeg"
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

      {/* ABOUT */}
      <section
        id="about"
        className="scroll-mt-20 overflow-hidden px-4 py-16 sm:px-6 sm:py-20 md:px-16"
      >
        <Reveal>
          <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <div className="grid grid-cols-1 items-center gap-6 p-5 sm:gap-8 sm:p-8 md:grid-cols-2 md:gap-12 md:p-12">
              <div className="min-w-0">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400">
                  {t('aboutEyebrow')}
                </p>

                <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
                  {text.about}
                </h2>

                <div className="space-y-5 text-base leading-8 text-gray-600 dark:text-gray-400 md:text-lg">
                  <p>{text.aboutParagraph1}</p>
                  <p>{text.aboutParagraph2}</p>
                  <p>{text.aboutParagraph3}</p>
                  <p>{text.aboutParagraph4}</p>
                  <p>{text.aboutParagraph5}</p>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {skills.slice(0, 5).map((skill, index) => (
                    <Reveal key={skill} delay={index * 0.06}>
                      <span className="inline-block rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
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

        <Reveal delay={0.15}>
          <div className="mx-auto mt-16 flex w-full max-w-7xl min-w-0 flex-col items-center sm:mt-20">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400">
              {t('galleryEyebrow')}
            </p>

            <h2 className="mb-4 text-center text-2xl font-bold sm:text-3xl md:text-4xl">
              {t('galleryTitle')}
            </h2>

            <p className="mb-8 max-w-xl text-center text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
              {t('galleryDescription')}
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
                      alt={`${isEnglish ? 'Gallery image' : 'Foto galeri'} ${index + 1}`}
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
        className="scroll-mt-24 bg-white px-6 py-24 dark:bg-gray-950 md:px-10"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-14">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
              {t('experienceEyebrow')}
            </p>

            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              {t('experienceTitle')}
              <span className="text-blue-600">.</span>
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-gray-500 dark:text-gray-400">
              {t('experienceDescription')}
            </p>
          </div>

          <div className="relative ml-2 border-l border-gray-200 pl-8 dark:border-gray-800 md:ml-3 md:pl-10">
            {localizedExperiences.map((exp, index) => (
              <article
                key={`${exp.title}-${index}`}
                className={`relative ${index === localizedExperiences.length - 1 ? '' : 'pb-14'}`}
              >
                <span
                  className={`absolute -left-[37px] top-1.5 h-3 w-3 rounded-full border-2 bg-white dark:bg-gray-950 md:-left-[45px] ${
                    exp.active ? 'border-blue-600' : 'border-gray-400'
                  }`}
                />

                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-bold md:text-2xl">
                      {exp.title}
                    </h3>

                    {exp.subtitleHref ? (
                      <a
                        href={exp.subtitleHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400"
                      >
                        {exp.subtitle} ↗
                      </a>
                    ) : (
                      <p className="mt-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                        {exp.subtitle}
                      </p>
                    )}
                  </div>

                  <span
                    className={`w-fit rounded-full px-4 py-2 text-xs font-semibold ${
                      exp.active
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                    }`}
                  >
                    {isEnglish
                      ? exp.period
                      : ({
                          'Sep 2026 – Present': 'Sep 2026 – Sekarang',
                          'Feb 2026 – Present': 'Feb 2026 – Sekarang',
                          '3 Months': '3 Bulan',
                          Ongoing: 'Berlangsung',
                          'Dec 2024 – Apr 2025': 'Des 2024 – Apr 2025',
                        }[exp.period] ?? exp.period)}
                  </span>
                </div>

                <p className="mt-5 leading-7 text-gray-600 dark:text-gray-400">
                  {exp.description}
                </p>

                <ul className="mt-4 space-y-3 text-sm leading-7 text-gray-600 dark:text-gray-400 md:text-base">
                  {exp.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span
                        className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                          exp.active ? 'bg-blue-600' : 'bg-gray-400'
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
                      className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 dark:border-gray-800 dark:text-gray-400"
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
                        className="hover:text-blue-600"
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATES */}
      <section
        id="certificates"
        className="scroll-mt-24 bg-white px-6 py-24 dark:bg-gray-950 md:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400">
                  {t('certificatesEyebrow')}
                </p>

                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  {t('certificatesTitle')}
                  <span className="text-blue-500">.</span>
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
                  {t('certificatesDescription')}
                </p>
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  aria-label={isEnglish ? 'Scroll certificates left' : 'Geser sertifikat ke kiri'}
                  onClick={() => scrollCertificates('left')}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  ←
                </button>

                <button
                  type="button"
                  aria-label={isEnglish ? 'Scroll certificates right' : 'Geser sertifikat ke kanan'}
                  onClick={() => scrollCertificates('right')}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  →
                </button>
              </div>
            </div>
          </Reveal>

          <div
            ref={certificatesRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-6"
          >
            {localizedCertificates.map((cert, index) => (
              <Reveal
                key={`${cert.title}-${index}`}
                delay={index * 0.05}
                className="h-full shrink-0 snap-start"
              >
                <button
                  type="button"
                  onClick={() => setSelectedCertificate(cert)}
                  aria-label={`${isEnglish ? 'View certificate' : 'Lihat sertifikat'} ${cert.title}`}
                  className="group flex h-full w-[280px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950 sm:w-[320px]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      sizes="320px"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-1 text-lg font-bold">{cert.title}</h3>
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
            {t('scrollCertificates')}
          </p>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20 md:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400">
                  {t('projectsEyebrow')}
                </p>

                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  {t('projectsTitle')}
                  <span className="text-blue-500">.</span>
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
                  {t('projectsDescription')}
                </p>
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  aria-label={isEnglish ? 'Scroll projects left' : 'Geser project ke kiri'}
                  onClick={() => scrollProjects('left')}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  ←
                </button>

                <button
                  type="button"
                  aria-label={isEnglish ? 'Scroll projects right' : 'Geser project ke kanan'}
                  onClick={() => scrollProjects('right')}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  →
                </button>
              </div>
            </div>
          </Reveal>

          <div
            ref={projectsRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-6"
          >
            {localizedProjects.map((project, index) => (
              <Reveal
                key={project.title}
                delay={index * 0.05}
                className="h-full shrink-0 snap-start"
              >
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  aria-label={`${text.viewDetails}: ${project.title}`}
                  className="group flex h-full w-[280px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950 sm:w-[320px]"
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

                    <h3 className="mb-3 text-xl font-bold">{project.title}</h3>

                    <p className="mb-5 min-h-14 text-sm leading-6 text-gray-600 dark:text-gray-400">
                      {project.description}
                    </p>

                    <div className="mb-5 flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium dark:border-gray-800 dark:bg-gray-900"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                      <span className="text-sm font-medium">
                        {text.viewDetails}
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

          <p className="mt-1 text-xs text-gray-400">{t('scrollProjects')}</p>
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
            className="relative max-h-[85dvh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl dark:bg-gray-900 sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="mb-1 text-xs font-semibold text-blue-700 dark:text-blue-400">
                  {selectedCertificate.issuer} · {selectedCertificate.date}
                </p>

                <h2 id="certificate-modal-title" className="text-2xl font-bold">
                  {selectedCertificate.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCertificate(null)}
                aria-label={text.close}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-2xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                &times;
              </button>
            </div>

            <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
              <Image
                src={selectedCertificate.image}
                alt={selectedCertificate.title}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-contain"
              />
            </div>

            <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-5 dark:border-gray-800">
              {selectedCertificate.credentialUrl && (
                <a
                  href={selectedCertificate.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-blue-700 px-5 py-3 text-sm font-medium text-white"
                >
                  {text.viewCredential} ↗
                </a>
              )}

              <button
                type="button"
                onClick={() => setSelectedCertificate(null)}
                className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium dark:border-gray-700"
              >
                {text.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROJECT MODAL */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="relative max-h-[85dvh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl dark:bg-gray-950 sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                  {selectedProject.category}
                </p>

                <h2 id="project-modal-title" className="text-2xl font-bold">
                  {selectedProject.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label={text.close}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-2xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
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

            <h3 className="mb-3 font-semibold">{text.features}</h3>

            <ul className="mb-6 list-inside list-disc space-y-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
              {selectedProject.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <h3 className="mb-2 font-semibold">{text.challenges}</h3>

            <p className="mb-6 text-sm leading-7 text-gray-600 dark:text-gray-400">
              {selectedProject.challenges}
            </p>

            <h3 className="mb-2 font-semibold">{text.learnings}</h3>

            <p className="mb-6 text-sm leading-7 text-gray-600 dark:text-gray-400">
              {selectedProject.learnings}
            </p>

            <h3 className="mb-3 font-semibold">{text.technologies}</h3>

            <div className="mb-6 flex flex-wrap gap-2">
              {selectedProject.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium dark:border-gray-800 dark:bg-gray-900"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-5 dark:border-gray-800">
              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white dark:bg-gray-700"
                >
                  {text.github}
                </a>
              )}

              {selectedProject.demo && (
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-blue-700 px-5 py-3 text-sm font-medium text-white"
                >
                  {text.demo}
                </a>
              )}

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium dark:border-gray-700"
              >
                {text.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TECH STACK */}
      <section id="tech-stack" className="w-full">
        <Skills />
        <TechStack />
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="scroll-mt-20 bg-gray-50 px-4 py-20 dark:bg-gray-900 sm:px-6 md:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400">
                {t('contactEyebrow')}
              </p>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                {t('contactTitle')}
                <span className="text-blue-500">.</span>
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base">
                {t('contactDescription')}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            <Reveal className="lg:col-span-2" delay={0.1}>
              <div className="flex h-full flex-col gap-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950 sm:p-8">
                <div>
                  <h3 className="text-lg font-bold">
                    {text.contactInformation}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">
                    {text.contactIntro}
                  </p>
                </div>

                <div className="flex flex-col gap-5">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="rounded-2xl border border-gray-100 p-4 transition hover:border-blue-200 hover:bg-blue-50/50 dark:border-gray-800 dark:hover:bg-blue-950/30"
                  >
                    <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Email
                    </span>
                    <span className="block truncate text-sm font-medium">
                      {CONTACT_EMAIL}
                    </span>
                  </a>

                  <a
                    href="https://wa.me/6281348417605"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl border border-gray-100 p-4 transition hover:border-blue-200 hover:bg-blue-50/50 dark:border-gray-800 dark:hover:bg-blue-950/30"
                  >
                    <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                      WhatsApp
                    </span>
                    <span className="block text-sm font-medium">
                      +62 813-4841-7605
                    </span>
                  </a>

                  <div className="rounded-2xl border border-gray-100 p-4 dark:border-gray-800">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                      {text.location}
                    </span>
                    <span className="block text-sm font-medium">
                      Indonesia
                    </span>
                  </div>
                </div>

                <div className="mt-auto border-t border-gray-100 pt-6 dark:border-gray-800">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {text.followMe}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://github.com/Ubaii"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium dark:border-gray-700"
                    >
                      GitHub ↗
                    </a>

                    <a
                      href="https://www.instagram.com/satriaa.u"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium dark:border-gray-700"
                    >
                      Instagram ↗
                    </a>

                    <a
                      href="https://www.linkedin.com/in/satria-ubaidah-6041673b8/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium dark:border-gray-700"
                    >
                      LinkedIn ↗
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-3" delay={0.2}>
              <div className="h-full rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950 sm:p-8">
                {isMessageSent ? (
                  <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-2xl text-green-600 dark:bg-green-950 dark:text-green-400">
                      ✓
                    </span>

                    <h3 className="text-xl font-bold">{text.sent}</h3>

                    <p className="max-w-sm text-sm leading-7 text-gray-600 dark:text-gray-400">
                      {text.sentDescription}
                    </p>

                    <button
                      type="button"
                      onClick={() => setIsMessageSent(false)}
                      className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium dark:border-gray-700"
                    >
                      {text.sendAnother}
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleContactSubmit}
                    className="flex flex-col gap-5"
                  >
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <label className="flex flex-col gap-2">
                        <span className="text-sm font-medium">
                          {text.name}
                        </span>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder={text.yourName}
                          className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600 dark:border-gray-700 dark:bg-gray-900"
                        />
                      </label>

                      <label className="flex flex-col gap-2">
                        <span className="text-sm font-medium">Email</span>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder={text.emailPlaceholder}
                          className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600 dark:border-gray-700 dark:bg-gray-900"
                        />
                      </label>
                    </div>

                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-medium">
                        {text.subject}
                      </span>
                      <input
                        type="text"
                        name="subject"
                        required
                        placeholder={text.subjectPlaceholder}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600 dark:border-gray-700 dark:bg-gray-900"
                      />
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-medium">
                        {text.message}
                      </span>
                      <textarea
                        name="message"
                        required
                        rows={6}
                        placeholder={text.messagePlaceholder}
                        className="resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600 dark:border-gray-700 dark:bg-gray-900"
                      />
                    </label>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-800 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-900"
                    >
                      {t('sendMessage')}
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
      <footer className="border-t border-gray-200 px-4 py-6 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
        © {currentYear ?? 2026} Ubai. {text.footer}
      </footer>
    </main>
  )
}
