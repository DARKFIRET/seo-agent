import { Layout } from "@/components/Layout";
import { useSEO } from "@/hooks/useSEO";

// Section Components
import { Hero } from "@/components/ContactsSection/Hero";
import { ContactMethods } from "@/components/ContactsSection/ContactMethods";
import { MapSection } from "@/components/ContactsSection/MapSection";
import { ContactForm } from "@/components/ContactsSection/ContactForm";
import { FAQ } from "@/components/ContactsSection/FAQ";

export default function ContactsPage() {
  useSEO({
    title: 'Контакты | НОБЕРЛИН - Цифровой маркетинг',
    description: 'Свяжитесь с нами для консультации по SEO и Яндекс Директ. Помощь в развитии вашего бизнеса. Бесплатная первая консультация.',
    keywords: [
      'контакты',
      'связаться с нами',
      'консультация',
      'SEO агентство',
      'контакты агентства',
    ],
  });

  return (
    <Layout>
      <Hero />
      <ContactMethods />
      <MapSection />
      <ContactForm />
      <FAQ />
    </Layout>
  );
}
