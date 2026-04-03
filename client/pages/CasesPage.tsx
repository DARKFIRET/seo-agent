import { Layout } from "@/components/Layout";
import { useState, useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import type { Case } from "@shared/api";

// Section Components
import { Hero } from "@/components/CasesPageSection/Hero";
import { CaseFilters } from "@/components/CasesPageSection/CaseFilters";
import { CaseGrid } from "@/components/CasesPageSection/CaseGrid";
import { Stats } from "@/components/CasesPageSection/Stats";
import { CTA } from "@/components/CasesPageSection/CTA";
import { CaseModal } from "@/components/CasesPageSection/CaseModal";

export default function CasesPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("Все");
  const [selectedNiche, setSelectedNiche] = useState<string>("Все");
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  useEffect(() => {
    fetch("/api/cases")
      .then((r) => r.json())
      .then((d) => setCases(d.cases ?? []))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  useSEO({
    title: "Кейсы и результаты | SEO и Яндекс Директ | НОБЕРЛИН",
    description:
      "Реальные проекты с реальными результатами. Смотрите, как мы помогли компаниям привлечь трафик и увеличить продажи.",
    keywords: [
      "кейсы SEO",
      "примеры работ",
      "результаты Директ",
      "результаты SEO",
      "портфолио",
      "успешные проекты",
    ],
  });

  const categories = ["Все", ...Array.from(new Set(cases.map((c) => c.category).filter(Boolean)))];
  const niches = ["Все", ...Array.from(new Set(cases.map((c) => c.niche).filter(Boolean)))];

  const filteredCases = cases.filter((c) => {
    const categoryMatch = selectedCategory === "Все" || c.category === selectedCategory;
    const nicheMatch = selectedNiche === "Все" || c.niche === selectedNiche;
    return categoryMatch && nicheMatch;
  });

  return (
    <Layout>
      <Hero />
      {!loading && cases.length > 0 && (
        <CaseFilters
          categories={categories}
          niches={niches}
          selectedCategory={selectedCategory}
          selectedNiche={selectedNiche}
          onCategoryChange={setSelectedCategory}
          onNicheChange={setSelectedNiche}
        />
      )}
      <CaseGrid
        cases={filteredCases}
        loading={loading}
        onSelectCase={setSelectedCase}
        allCasesLength={cases.length}
      />
      <Stats />
      <CTA />

      {selectedCase && (
        <CaseModal
          caseItem={selectedCase}
          onClose={() => setSelectedCase(null)}
        />
      )}
    </Layout>
  );
}
