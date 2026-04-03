import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Case } from "@shared/api";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

const GRADIENTS = [
  "linear-gradient(135deg, #95C12B 0%, #7DA324 100%)",
  "linear-gradient(135deg, #A8E063 0%, #56AB2F 100%)",
  "linear-gradient(135deg, #D4FC79 0%, #96E6A1 100%)",
];

interface CasesSectionProps {
  cases: Case[];
  loading: boolean;
}

export function CasesSection({ cases, loading }: CasesSectionProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          {...fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Наши лучшие кейсы
          </h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto mb-8">
            Реальные результаты, которые мы сделали для наших клиентов
          </p>
          <Link
            to="/cases"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-colors"
          >
            Посмотреть все кейсы
            <ArrowRight size={18} />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {loading ? (
            <div className="md:col-span-3 text-center py-10 text-foreground/50">
              Загрузка кейсов...
            </div>
          ) : cases.length > 0 ? (
            cases.map((c, idx) => (
              <motion.div
                key={c.id}
                {...fadeInUp}
                className="rounded-xl overflow-hidden border-2 border-border hover:border-primary/50 transition-all hover:shadow-lg group cursor-pointer"
              >
                <div
                  className="h-48 relative overflow-hidden bg-cover bg-center"
                  style={
                    c.imageUrl
                      ? { backgroundImage: `url(${c.imageUrl})` }
                      : { background: GRADIENTS[idx % GRADIENTS.length] }
                  }
                >
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all" />
                  <div className="absolute inset-0 flex items-end p-6">
                    <div className="w-full">
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur text-white text-xs font-semibold rounded-full mb-3">
                        {c.category ?? "Кейс"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
                    {c.title}
                  </h3>
                  <p className="text-accent font-semibold text-lg line-clamp-2">
                    {c.trafficUp || c.resultText || c.description || ""}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="md:col-span-3 text-center py-10 text-foreground/50">
              Нет добавленных кейсов
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
