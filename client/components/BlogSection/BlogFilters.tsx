import { motion } from "framer-motion";
import { Search } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

interface BlogFiltersProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  categories: string[];
}

export function BlogFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: BlogFiltersProps) {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-border">
      <div className="max-w-6xl mx-auto">
        {/* Search Bar */}
        <motion.div {...fadeInUp} className="mb-8">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/40"
              size={20}
            />
            <input
              type="text"
              placeholder="Найти статью..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-border focus:border-primary focus:outline-none transition-colors"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div {...fadeInUp}>
          <h3 className="font-semibold text-foreground mb-4">Категории</h3>
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
      </div>
    </section>
  );
}
