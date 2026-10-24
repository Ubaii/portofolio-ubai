
"use client";

import Reveal from "@/components/Reveal";
import {
  Code2,
  Users,
  CheckCircle2,
  Workflow,
} from "lucide-react";
import { useLanguage } from "@/components/context/LanguageContext";

const skillSections = [
  {
    title: {
      id: "Hard Skills",
      en: "Hard Skills",
    },
    description: {
      id: "Kemampuan teknis dan tools pengembangan.",
      en: "Technical skills and development tools.",
    },
    icon: Code2,
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "PHP",
      "Laravel",
      "Node.js",
      "MySQL",
      "XAMPP",
      "Git & GitHub",
      "Figma",
      "Responsive Web Design",
    ],
  },
  {
    title: {
      id: "Soft Skills",
      en: "Soft Skills",
    },
    description: {
      id: "Kemampuan untuk mendukung kolaborasi dan produktivitas.",
      en: "Skills that support collaboration and productivity.",
    },
    icon: Users,
    skills: [
      "Problem Solving",
      "Teamwork",
      "Communication",
      "Adaptability",
      "Time Management",
      "Willingness to Learn",
      "Attention to Detail",
    ],
  },
];

const frontendKnowledge = [
  {
    title: {
      id: "Frontend Web Applications",
      en: "Frontend Web Applications",
    },
    description: {
      id: "Mengenal pengembangan aplikasi web yang responsif dan interaktif.",
      en: "Familiar with developing responsive and interactive web applications.",
    },
  },
  {
    title: {
      id: "Frontend Mobile Applications",
      en: "Frontend Mobile Applications",
    },
    description: {
      id: "Memahami konsep dasar frontend untuk aplikasi mobile.",
      en: "Familiar with frontend concepts for mobile applications.",
    },
  },
  {
    title: {
      id: "Konsumsi & Integrasi API",
      en: "API Consumption & Integration",
    },
    description: {
      id: "Memahami cara menggunakan REST API dan mengintegrasikan data eksternal ke aplikasi frontend.",
      en: "Understanding how to consume REST APIs and integrate external data into frontend applications.",
    },
  },
  {
    title: {
      id: "Arsitektur Microfrontend",
      en: "Microfrontend Architecture",
    },
    description: {
      id: "Mengenal konsep dan arsitektur pengembangan aplikasi microfrontend.",
      en: "Familiar with microfrontend concepts and application architecture.",
    },
  },
  {
    title: {
      id: "Unit Testing Frontend",
      en: "Frontend Unit Testing",
    },
    description: {
      id: "Memahami tujuan unit testing untuk memeriksa komponen dan logika aplikasi frontend.",
      en: "Understanding unit testing to verify frontend components and application logic.",
    },
  },
  {
    title: {
      id: "UI/UX",
      en: "UI/UX",
    },
    description: {
      id: "Memahami desain antarmuka, kemudahan penggunaan, dan prinsip desain responsif.",
      en: "Understanding user interface design, usability, and responsive design principles.",
    },
  },
  {
    title: {
      id: "SDLC — Agile / Scrum",
      en: "SDLC — Agile / Scrum",
    },
    description: {
      id: "Memahami siklus pengembangan perangkat lunak dan alur kerja Agile/Scrum.",
      en: "Understanding the software development lifecycle and Agile/Scrum workflows.",
    },
  },
];

export default function Skills() {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  const text = {
    eyebrow: isEnglish ? "MY EXPERTISE" : "KEAHLIAN SAYA",
    heading: isEnglish ? "Skills & Knowledge" : "Keahlian & Pengetahuan",
    intro: isEnglish
      ? "My technical skills, personal strengths, and understanding of frontend development concepts."
      : "Kemampuan teknis, keahlian personal, dan pemahaman saya tentang konsep pengembangan frontend.",
    knowledgeEyebrow: isEnglish
      ? "TECHNICAL KNOWLEDGE"
      : "PENGETAHUAN TEKNIS",
    knowledgeHeading: isEnglish
      ? "Frontend Development Knowledge"
      : "Pengetahuan Frontend Development",
    knowledgeIntro: isEnglish
      ? "Concepts and workflows related to frontend engineering and software development."
      : "Konsep dan alur kerja yang berkaitan dengan frontend engineering dan pengembangan perangkat lunak.",
    learningHeading: isEnglish
      ? "Continuous Learning"
      : "Terus Belajar",
    learningDescription: isEnglish
      ? "Continuously improving frontend development skills, exploring new technologies, and learning software engineering best practices."
      : "Terus meningkatkan kemampuan frontend development, mengeksplorasi teknologi baru, dan mempelajari praktik terbaik software engineering.",
  };

  return (
    <section
      id="skills"
      className="scroll-mt-24 px-5 py-16 sm:px-8 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-blue-500">
              {text.eyebrow}
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {text.heading}
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
              {text.intro}
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {skillSections.map((section) => {
            const Icon = section.icon;

            return (
              <Reveal key={section.title.en}>
                <div className="h-full rounded-2xl border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5">
                  <div className="mb-5 flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                      <Icon size={22} />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">
                        {isEnglish
                          ? section.title.en
                          : section.title.id}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {isEnglish
                          ? section.description.en
                          : section.description.id}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {section.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-blue-500/40 hover:text-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mb-7 mt-16">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-blue-500">
              {text.knowledgeEyebrow}
            </p>

            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {text.knowledgeHeading}
            </h3>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              {text.knowledgeIntro}
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {frontendKnowledge.map((item) => (
            <Reveal key={item.title.en}>
              <div className="group flex h-full gap-3 rounded-xl border border-border/70 p-5 transition-all duration-300 hover:border-blue-500/40 'hover:bg-blue-500/[0.03]'">
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-blue-500"
                />

                <div>
                  <h4 className="font-semibold tracking-tight">
                    {isEnglish
                      ? item.title.en
                      : item.title.id}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {isEnglish
                      ? item.description.en
                      : item.description.id}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-border/70 bg-muted/20 p-5 sm:p-6">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
              <Workflow size={22} />
            </div>

            <div>
              <h3 className="font-semibold">
                {text.learningHeading}
              </h3>

              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {text.learningDescription}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
