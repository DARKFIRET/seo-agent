import { motion } from "framer-motion";
import { Users, TrendingUp } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

export function Stats() {
  return (
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
  );
}
