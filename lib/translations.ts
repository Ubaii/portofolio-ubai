export const translations = {
  id: {
    navHome: 'Beranda', navAbout: 'Tentang', navExperience: 'Pengalaman', navProjects: 'Proyek', navSkills: 'Keahlian', navContact: 'Hubungi Saya',
    heroGreeting: 'Halo, saya Ubai', heroRole: 'Frontend Engineer', heroDescription: 'Saya membangun pengalaman web yang modern, responsif, dan mudah digunakan dengan desain yang bersih.',
    heroButton: 'Lihat Proyek', heroContact: 'Hubungi Saya',
    aboutTitle: 'Tentang Saya', aboutDescription: 'Saya adalah mahasiswa Informatika yang berfokus pada pengembangan web, khususnya frontend. Saya senang mempelajari teknologi baru dan mengubah ide menjadi pengalaman digital yang menarik.',
    experienceTitle: 'Pengalaman', experienceRole: 'Junior Frontend Engineer', experienceDescription: 'Perjalanan saya di bidang web development, mulai dari mempelajari teknologi modern hingga membangun layanan pengembangan website dan mendapatkan pengalaman profesional.',
    projectsTitle: 'Proyek Pilihan', projectsDescription: 'Kumpulan proyek yang pernah saya kerjakan dan teknologi yang telah saya eksplorasi.',
    skillsTitle: 'Keahlian dan Teknologi', skillsDescription: 'Teknologi dan tools yang saya gunakan dalam proses pengembangan web.',
    contactTitle: 'Mari Membangun Sesuatu Bersama', contactDescription: 'Punya proyek atau ide yang ingin dikerjakan bersama? Kirim pesan melalui formulir atau hubungi saya langsung.',
    contactButton: 'Hubungi Saya', footerText: 'Dibuat dengan semangat untuk terus belajar dan berkembang.',
    aboutEyebrow: 'Tentang Saya', aboutHeading: 'Halo, saya Ubai.', galleryEyebrow: 'Galeri Saya', galleryTitle: 'Momen dan Inspirasi', galleryDescription: 'Kumpulan gambar yang menginspirasi kreativitas saya.',
    experienceEyebrow: 'Perjalanan Saya', certificatesEyebrow: 'Pencapaian', certificatesTitle: 'Sertifikat', certificatesDescription: 'Sertifikat dan pencapaian yang mendukung perjalanan belajar dan pengembangan keterampilan saya.',
    scrollCertificates: 'Geser untuk melihat sertifikat lainnya →', projectsEyebrow: 'Proyek Saya', scrollProjects: 'Geser untuk melihat proyek lainnya →',
    viewDetails: 'Lihat detail', projectFeatures: 'Fitur yang Dikerjakan', projectChallenges: 'Tantangan', projectLearnings: 'Hal yang Dipelajari', projectTechnologies: 'Teknologi',
    viewGithub: 'Lihat GitHub ↗', liveDemo: 'Demo Langsung ↗', contactEyebrow: 'Hubungi Saya', contactInformation: 'Informasi Kontak',
    contactIntro: 'Saya terbuka untuk kolaborasi, proyek freelance, maupun sekadar berdiskusi tentang frontend dan UI/UX.',
    location: 'Lokasi', followMe: 'Ikuti Saya', sendMessage: 'Kirim Pesan'
  },
  en: {
    navHome: 'Home', navAbout: 'About', navExperience: 'Experience', navProjects: 'Projects', navSkills: 'Skills', navContact: 'Contact Me',
    heroGreeting: "Hi, I'm Ubai", heroRole: 'A Frontend Engineer', heroDescription: 'I build modern, responsive, and user-friendly web experiences with a passion for clean design.',
    heroButton: 'View Projects', heroContact: 'Contact Me',
    aboutTitle: 'About Me', aboutDescription: "I'm an Informatics student focused on web development, especially frontend development. I enjoy learning new technologies and turning ideas into engaging digital experiences.",
    experienceTitle: 'Experience', experienceRole: 'Junior Frontend Engineer', experienceDescription: 'My journey in web development, from continuously learning modern technologies to building my own website development business and gaining professional experience.',
    projectsTitle: 'Selected Works', projectsDescription: "A collection of projects I've worked on and the technologies I've explored.",
    skillsTitle: 'Skills and Technologies', skillsDescription: 'Technologies and tools I use throughout the web development process.',
    contactTitle: "Let's Build Something Together", contactDescription: 'Have a project or idea you would like to work on together? Send a message through the form or contact me directly.',
    contactButton: 'Contact Me', footerText: 'Built with a passion for continuous learning and growth.',
    aboutEyebrow: 'Who I Am', aboutHeading: "Hi, I'm Ubai.", galleryEyebrow: 'My Gallery', galleryTitle: 'Moments & Inspiration', galleryDescription: 'A small collection of images that inspire my creativity.',
    experienceEyebrow: 'My Journey', certificatesEyebrow: 'Achievements', certificatesTitle: 'Certificates', certificatesDescription: 'Certificates and achievements that support my learning journey and skills development.',
    scrollCertificates: 'Scroll to see more certificates →', projectsEyebrow: 'My Projects', scrollProjects: 'Scroll to see more projects →',
    viewDetails: 'View details', projectFeatures: 'Features Built', projectChallenges: 'Challenges', projectLearnings: 'What I Learned', projectTechnologies: 'Technologies',
    viewGithub: 'View GitHub ↗', liveDemo: 'Live Demo ↗', contactEyebrow: 'Get In Touch', contactInformation: 'Contact Information',
    contactIntro: "I'm open to collaborations, freelance projects, or simply chatting about frontend and UI/UX.",
    location: 'Location', followMe: 'Follow Me', sendMessage: 'Send Message'
  }
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.id;