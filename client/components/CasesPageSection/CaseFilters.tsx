import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

interface CaseFiltersProps {
  categories: string[];
  niches: string[];
  selectedCategory: string;
  selectedNiche: string;
  onCategoryChange: (cat: string) => void;
  onNicheChange: (niche: string) => void;
}

export function CaseFilters({
  categories,
  niches,
  selectedCategory,
  selectedNiche,
  onCategoryChange,
  onNicheChange,
}: CaseFiltersProps) {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div {...fadeInUp}>
            <h3 className="font-semibold text-foreground mb-4">По направлению</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
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
                  onClick={() => onNicheChange(niche)}
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
  );
}
