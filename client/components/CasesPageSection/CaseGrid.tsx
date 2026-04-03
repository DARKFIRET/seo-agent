import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
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
  "linear-gradient(135deg, #95C12B 0%, #56AB2F 100%)",
  "linear-gradient(135deg, #A8E063 0%, #7DA324 100%)",
  "linear-gradient(135deg, #D4FC79 0%, #56AB2F 100%)",
];

interface CaseGridProps {
  cases: Case[];
  loading: boolean;
  onSelectCase: (c: Case) => void;
  allCasesLength: number;
}

export function CaseGrid({ cases, loading, onSelectCase, allCasesLength }: CaseGridProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-foreground/50">
            <Loader2 size={28} className="animate-spin mr-3" />
            Загрузка кейсов...
          </div>
        ) : cases.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.map((caseItem, idx) => (
              <motion.div
                key={caseItem.id}
                {...fadeInUp}
                className="rounded-xl overflow-hidden border-2 border-border hover:border-primary/50 transition-all hover:shadow-lg group cursor-pointer"
                onClick={() => onSelectCase(caseItem)}
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
              {allCasesLength === 0
                ? "Кейсы появятся здесь после добавления через панель администратора"
                : "Кейсы по выбранным фильтрам не найдены"}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
