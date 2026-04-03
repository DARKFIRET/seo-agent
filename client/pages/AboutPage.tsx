import { Layout } from "@/components/Layout";
import { useSEO } from "@/hooks/useSEO";

// Section Components
import { Hero } from "@/components/AboutSection/Hero";
import { Mission } from "@/components/AboutSection/Mission";
import { Values } from "@/components/AboutSection/Values";
import { Team } from "@/components/AboutSection/Team";
import { History } from "@/components/AboutSection/History";
import { CTA } from "@/components/AboutSection/CTA";

export default function AboutPage() {
  useSEO({
    title: "О нас | НОБЕРЛИН — SEO и Яндекс Директ",
    description:
      "Узнайте о НОБЕРЛИН. Команда профессионалов с 6+ годами опыта в SEO и Яндекс Директ. Помогаем бизнесу расти через цифровой маркетинг.",
    keywords: [
      "о нас",
      "НОБЕРЛИН",
      "команда",
      "SEO агентство Ижевск",
      "digital маркетинг",
    ],
  });

  return (
    <Layout>
      <Hero />
      <Mission />
      <Values />
      <Team />
      <History />
      <CTA />
    </Layout>
  );
}
