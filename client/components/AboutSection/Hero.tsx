import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 to-accent/10">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div {...fadeInUp}>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Мы — <span className="text-primary">НОБЕРЛИН</span>
          </h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-10">
            Цифровое агентство из Ижевска, которое помогает местному бизнесу расти за счёт
            органического трафика и эффективной рекламы с 2020 года.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "6+", label: "лет на рынке" },
            { value: "100+", label: "реализованных проектов" },
            { value: "10+", label: "специалистов в команде" },
            { value: "98%", label: "клиентов рекомендуют нас" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              {...fadeInUp}
              className="bg-white rounded-xl border-2 border-border p-6"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <p className="text-sm text-foreground/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
