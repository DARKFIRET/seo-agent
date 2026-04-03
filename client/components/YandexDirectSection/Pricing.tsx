import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

const packages = [
  {
    name: "Управление кампанией",
    price: "от 20%",
    period: "от расходов на рекламу",
  },
  {
    name: "Профессиональное ведение",
    price: "от 50 тыс.",
    period: "в месяц",
  },
];

export function Pricing() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-foreground to-foreground/95 text-white">
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Гибкая ценовая политика</h2>
          <p className="text-xl text-white/70">
            Мы работаем с проектами любого размера. Обсудим бюджет и результаты при
            первой консультации.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {packages.map((pkg, idx) => (
            <motion.div
              key={idx}
              {...fadeInUp}
              className="rounded-xl p-8 border-2 border-white/20"
            >
              <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">{pkg.price}</span>
                <span className="text-white/70"> {pkg.period}</span>
              </div>
              <p className="text-white/70">
                Полное управление вашей рекламной кампанией с ежедневной оптимизацией
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
