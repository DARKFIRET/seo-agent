import { Layout } from "@/components/Layout";
import { useSEO } from "@/hooks/useSEO";

// Section Components
import { Hero } from "@/components/SEOServicesSection/Hero";
import { HowWeWork } from "@/components/SEOServicesSection/HowWeWork";
import { Benefits } from "@/components/SEOServicesSection/Benefits";
import { Pricing } from "@/components/SEOServicesSection/Pricing";
import { AuditForm } from "@/components/SEOServicesSection/AuditForm";

export default function SEOServices() {
  useSEO({
    title: 'SEO продвижение сайта в Ижевске | Услуги SEO | НОБЕРЛИН',
    description: 'Профессиональное SEO продвижение сайта в Ижевске. Органический рост трафика за 3-6 месяцев. Техническое SEO, контент, линкбилдинг. Гарантированные результаты.',
    keywords: [
      'SEO продвижение',
      'услуги SEO',
      'оптимизация сайта',
      'поисковая оптимизация',
      'SEO аудит',
      'техническое SEO',
      'линкбилдинг',
      'контент для SEO',
      'Ижевск',
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'SEO-продвижение в Ижевске',
      description: 'Органический рост трафика вашего сайта через современные методы SEO. Гарантированные результаты за 3-6 месяцев.',
      provider: {
        '@type': 'Organization',
        name: 'НОБЕРЛИН',
        url: 'https://luminaagency.com',
      },
      areaServed: 'Izhevsk',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'SEO услуги',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Аудит и анализ',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Техническое SEO',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Контент оптимизация',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Линкбилдинг',
            },
          },
        ],
      },
    },
  });

  return (
    <Layout>
      <Hero />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <HowWeWork />
          <Benefits />
        </div>
      </section>

      <Pricing />
      <AuditForm />
    </Layout>
  );
}
