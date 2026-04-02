import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { useState, useEffect, ReactNode } from "react";
import { ArrowRight, TrendingUp, Users, Loader2, X } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import type { Case } from "@shared/api";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

// Gradient palette for cards without an image
const GRADIENTS = [
  "linear-gradient(135deg, #95C12B 0%, #7DA324 100%)",
  "linear-gradient(135deg, #A8E063 0%, #56AB2F 100%)",
  "linear-gradient(135deg, #D4FC79 0%, #96E6A1 100%)",
  "linear-gradient(135deg, #95C12B 0%, #56AB2F 100%)",
  "linear-gradient(135deg, #A8E063 0%, #7DA324 100%)",
  "linear-gradient(135deg, #D4FC79 0%, #56AB2F 100%)",
];

export default function CasesPage() {
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

  // Dynamic filter values from loaded data
  const categories = ["Все", ...Array.from(new Set(cases.map((c) => c.category).filter(Boolean)))];
  const niches = ["Все", ...Array.from(new Set(cases.map((c) => c.niche).filter(Boolean)))];

  const filteredCases = cases.filter((c) => {
    const categoryMatch = selectedCategory === "Все" || c.category === selectedCategory;
    const nicheMatch = selectedNiche === "Все" || c.niche === selectedNiche;
    return categoryMatch && nicheMatch;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-secondary">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Наши кейсы и результаты
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Реальные проекты с реальными результатами. Смотрите, как мы помогли
              компаниям достичь своих целей
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      {!loading && cases.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-border">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div {...fadeInUp}>
                <h3 className="font-semibold text-foreground mb-4">По направлению</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full font-medium transition-all ${selectedCategory === cat
                        ? "bg-primary text-white"
                        : "bg-secondary text-foreground hover:border-primary border-2 border-transparent"
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.div {...fadeInUp}>
                <h3 className="font-semibold text-foreground mb-4">По нише</h3>
                <div className="flex flex-wrap gap-2">
                  {niches.map((niche) => (
                    <button
                      key={niche}
                      onClick={() => setSelectedNiche(niche)}
                      className={`px-4 py-2 rounded-full font-medium transition-all ${selectedNiche === niche
                        ? "bg-primary text-white"
                        : "bg-secondary text-foreground hover:border-primary border-2 border-transparent"
                        }`}
                    >
                      {niche}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Cases Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-16 text-foreground/50">
              <Loader2 size={28} className="animate-spin mr-3" />
              Загрузка кейсов...
            </div>
          ) : filteredCases.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCases.map((caseItem, idx) => (
                <motion.div
                  key={caseItem.id}
                  {...fadeInUp}
                  className="rounded-xl overflow-hidden border-2 border-border hover:border-primary/50 transition-all hover:shadow-lg group cursor-pointer"
                >
                  {/* Card header with gradient or image */}
                  <div
                    className="h-40 relative overflow-hidden bg-cover bg-center"
                    style={
                      caseItem.imageUrl
                        ? { backgroundImage: `url(${caseItem.imageUrl})` }
                        : { background: GRADIENTS[idx % GRADIENTS.length] }
                    }
                  >
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all" />
                    <div className="absolute inset-0 flex flex-col justify-end p-4">
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur text-white text-xs font-semibold rounded-full mb-2 w-fit">
                        {caseItem.category ?? "Кейс"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2">
                      {caseItem.title}
                    </h3>
                    <div className="mb-4 pb-4 border-b border-border">
                      {caseItem.trafficUp && (
                        <p className="text-accent font-bold text-2xl">{caseItem.trafficUp}</p>
                      )}
                      {caseItem.roi && (
                        <p className="text-primary font-semibold">ROI: {caseItem.roi}</p>
                      )}
                      <p className="text-sm text-foreground/60 mt-1">
                        {caseItem.niche ?? ""}
                      </p>
                    </div>

                    {caseItem.description && (
                      <p className="text-sm text-foreground/70 line-clamp-2 mb-4">
                        {caseItem.description}
                      </p>
                    )}

                    <button
                      onClick={() => setSelectedCase(caseItem)}
                      className="w-full py-2 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors flex items-center justify-center gap-2 group/btn"
                    >
                      Подробнее
                      <ArrowRight
                        size={16}
                        className="group-hover/btn:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div {...fadeInUp} className="text-center py-16">
              <p className="text-lg text-foreground/60">
                {cases.length === 0
                  ? "Кейсы появятся здесь после добавления через панель администратора"
                  : "Кейсы по выбранным фильтрам не найдены"}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-foreground to-foreground/95 text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Наша статистика</h2>
            <p className="text-xl text-white/70">
              Результаты работы с клиентами за все время
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Users, label: "Довольных клиентов", value: "50+" },
              { icon: TrendingUp, label: "Успешных проектов", value: "100+" },
              { icon: TrendingUp, label: "Средний рост трафика", value: "+280%" },
              { icon: TrendingUp, label: "Среднее увеличение ROI", value: "5.5x" },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div key={idx} {...fadeInUp} className="text-center">
                  <Icon className="w-12 h-12 mx-auto mb-4 text-accent" />
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <p className="text-white/70">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Хотите похожих результатов?
            </h2>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              Закажите бесплатную консультацию и мы разработаем индивидуальную стратегию
            </p>
            <a
              href="/contacts"
              className="inline-block px-10 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-bold text-lg hover:shadow-lg transition-all"
            >
              Получить консультацию
            </a>
          </motion.div>
        </div>
      </section>
      {/* Full Detail Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl w-full max-w-4xl my-8 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Modal Header with Image */}
            <div
              className="relative h-48 md:h-64 bg-cover bg-center flex-shrink-0"
              style={
                selectedCase.imageUrl
                  ? { backgroundImage: `url(${selectedCase.imageUrl})` }
                  : { background: GRADIENTS[0] }
              }
            >
              <div className="absolute inset-0 bg-black/60" />
              <button
                onClick={() => setSelectedCase(null)}
                className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors backdrop-blur-sm"
              >
                <X size={24} />
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full mb-3">
                  {selectedCase.category ?? "Кейс"}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white line-clamp-2">
                  {selectedCase.title}
                </h2>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 overflow-y-auto">
              {/* Highlight Stats Bar */}
              <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-border mb-6">
                {selectedCase.trafficUp && (
                  <div>
                    <div className="text-sm text-foreground/60 mb-1">
                      Рост трафика
                    </div>
                    <div className="text-2xl font-bold text-accent">
                      {selectedCase.trafficUp}
                    </div>
                  </div>
                )}
                {selectedCase.roi && (
                  <div>
                    <div className="text-sm text-foreground/60 mb-1">ROI</div>
                    <div className="text-2xl font-bold text-primary">
                      {selectedCase.roi}
                    </div>
                  </div>
                )}
                {selectedCase.duration && (
                  <div>
                    <div className="text-sm text-foreground/60 mb-1">Сроки</div>
                    <div className="text-xl font-bold text-foreground">
                      {selectedCase.duration}
                    </div>
                  </div>
                )}
                {selectedCase.niche && (
                  <div>
                    <div className="text-sm text-foreground/60 mb-1">Ниша</div>
                    <div className="text-lg font-semibold text-foreground/80">
                      {selectedCase.niche}
                    </div>
                  </div>
                )}
              </div>

              {/* Main Body */}
              <div className="prose prose-lg max-w-none text-foreground/80">
                {selectedCase.body ? (
                  <div dangerouslySetInnerHTML={{ __html: selectedCase.body }} />
                ) : (
                  <>
                    {selectedCase.description && (
                      <p className="text-lg mb-6">{selectedCase.description}</p>
                    )}
                    {selectedCase.resultText && (
                      <div className="bg-secondary/50 p-6 rounded-xl border border-border">
                        <h3 className="text-xl font-bold text-foreground mt-0 mb-3">
                          Результат
                        </h3>
                        {selectedCase.resultText}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </Layout>
  );
}
