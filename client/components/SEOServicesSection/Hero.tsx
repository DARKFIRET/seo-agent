import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

export function Hero() {
  return (
    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 to-accent/10">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            SEO-продвижение вашего сайта
          </h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-8">
            Комплексный подход к органическому росту трафика и позиций в
            поисковых системах. Результаты гарантированы за 3-6 месяцев.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { label: "Среднее увеличение трафика", value: "+350%" },
            { label: "Время до первых результатов", value: "1-3 мес" },
            { label: "Долгосрочный ROI", value: "7-10x" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              {...fadeInUp}
              className="text-center p-6 bg-white rounded-xl border-2 border-border"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <p className="text-foreground/70">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
