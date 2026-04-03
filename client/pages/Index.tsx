import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadModal } from "@/components/LeadModal";
import { useState, useRef, useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import type { Case } from "@shared/api";

// Section Components
import { Hero } from "@/components/IndexSection/Hero";
import { Services } from "@/components/IndexSection/Services";
import { Advantages } from "@/components/IndexSection/Advantages";
import { CasesSection } from "@/components/IndexSection/Cases";
import { CTA } from "@/components/IndexSection/CTA";

export default function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const [cases, setCases] = useState<Case[]>([]);
  const [loadingCases, setLoadingCases] = useState(true);

  useSEO({
    title: 'SEO и Яндекс Директ в Ижевске - Цифровой маркетинг | НОБЕРЛИН',
    description: 'Помогаем компаниям Ижевска привлекать целевой трафик и увеличивать продажи через SEO и Яндекс Директ. 6+ лет опыта. 100+ успешных проектов.',
    keywords: [
      'SEO услуги',
      'SEO продвижение',
      'Яндекс Директ',
      'контекстная реклама',
      'цифровой маркетинг',
      'интернет маркетинг',
      'Ижевск',
      'продвижение сайта',
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'НОБЕРЛИН',
      url: 'https://luminaagency.com',
      description: 'Цифровое агентство в Ижевске. SEO и Яндекс Директ для вашего бизнеса',
      image: 'https://luminaagency.com/logo.png',
      telephone: '+7 (999) 999-99-99',
      areaServed: 'Izhevsk',
      knowsAbout: [
        'SEO',
        'Яндекс Директ',
        'контекстная реклама',
        'интернет маркетинг',
      ],
      hasPart: [
        {
          '@type': 'Service',
          name: 'SEO-продвижение',
          description: 'Органический рост трафика вашего сайта через современные методы SEO. Гарантированные результаты за 3-6 месяцев.',
        },
        {
          '@type': 'Service',
          name: 'Яндекс Директ',
          description: 'Настройка и ведение контекстной рекламы в Яндекс.Директ. Максимум конверсий, минимум затрат.',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '50',
        reviewCount: '50',
      },
    },
  });

  useEffect(() => {
    fetch("/api/cases")
      .then((r) => r.json())
      .then((d) => setCases((d.cases ?? []).slice(0, 3)))
      .catch(() => { })
      .finally(() => setLoadingCases(false));
  }, []);

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onLeadClick={() => setIsModalOpen(true)} />

      <main className="flex-1">
        <Hero
          onLeadClick={() => setIsModalOpen(true)}
          onMoreClick={scrollToServices}
        />

        <div ref={servicesRef}>
          <Services />
        </div>

        <Advantages />

        <CasesSection cases={cases} loading={loadingCases} />

        <CTA onLeadClick={() => setIsModalOpen(true)} />
      </main>

      <Footer />

      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
