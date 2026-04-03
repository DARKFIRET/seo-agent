import { motion } from "framer-motion";
import { TrendingUp, Zap, Target, Users, BarChart3, CheckCircle } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

const benefits = [
  { icon: TrendingUp, text: "Органический рост трафика на 200-500%" },
  { icon: Zap, text: "Устойчивые результаты в течение долгого времени" },
  { icon: Target, text: "Высокого качества целевой трафик" },
  { icon: Users, text: "Улучшение имиджа и доверия бренда" },
  { icon: BarChart3, text: "Рост конверсий и продаж" },
  { icon: CheckCircle, text: "Отсутствие зависимости от рекламного бюджета" },
];

export function Benefits() {
  return (
    <motion.div {...fadeInUp}>
      <h2 className="text-4xl font-bold text-foreground mb-8">
        Преимущества SEO
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {benefits.map((benefit, idx) => {
          const Icon = benefit.icon;
          return (
            <motion.div
              key={idx}
              {...fadeInUp}
              className="flex gap-4 p-6 rounded-lg bg-secondary/50"
            >
              <Icon className="text-accent flex-shrink-0 mt-1" size={24} />
              <span className="text-foreground/80 text-lg">
                {benefit.text}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
