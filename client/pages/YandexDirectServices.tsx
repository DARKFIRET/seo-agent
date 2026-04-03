import { Layout } from "@/components/Layout";
import { useSEO } from "@/hooks/useSEO";

// Section Components
import { Hero } from "@/components/YandexDirectSection/Hero";
import { AdTypes } from "@/components/YandexDirectSection/AdTypes";
import { HowItWorks } from "@/components/YandexDirectSection/HowItWorks";
import { Benefits } from "@/components/YandexDirectSection/Benefits";
import { Pricing } from "@/components/YandexDirectSection/Pricing";
import { BudgetForm } from "@/components/YandexDirectSection/BudgetForm";

export default function YandexDirectServices() {
  useSEO({
    title: 'Яндекс Директ в Ижевске | Контекстная реклама | НОБЕРЛИН',
    description: 'Управление контекстной рекламой в Яндекс Директ в Ижевске. Максимум конверсий, минимум затрат. Профессиональная настройка и оптимизация CPA.',
    keywords: [
      'Яндекс Директ',
      'контекстная реклама',
      'управление Директ',
      'реклама Яндекс',
      'оптимизация CPA',
      'поисковая реклама',
      'интернет реклама',
      'Ижевск',
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Яндекс Директ в Ижевске',
      description: 'Настройка и ведение контекстной рекламы в Яндекс.Директ. Максимум конверсий, минимум затрат.',
      provider: {
        '@type': 'Organization',
        name: 'НОБЕРЛИН',
        url: 'https://luminaagency.com',
      },
      areaServed: 'Izhevsk',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Услуги Яндекс Директ',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Стратегия и планирование',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Настройка кампаний',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Оптимизация бюджета',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Регулярный отчетинг',
            },
          },
        ],
      },
    },
  });

  return (
    <Layout>
      <Hero />
      <AdTypes />
      <HowItWorks />
      <Benefits />
      <Pricing />
      <BudgetForm />
    </Layout>
  );
}
