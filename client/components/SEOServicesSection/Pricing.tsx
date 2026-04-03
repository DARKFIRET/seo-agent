import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

const packages = [
  {
    name: "Старт",
    price: "от 50 тысяч",
    period: "в месяц",
    features: [
      "Аудит сайта",
      "Техническое SEO",
      "Базовая оптимизация контента",
      "Ежемесячный отчет",
    ],
    highlighted: false,
  },
  {
    name: "Профессионал",
    price: "от 100 тысяч",
    period: "в месяц",
    features: [
      "Все из пакета Старт",
      "Расширенный контент-маркетинг",
      "Линкбилдинг",
      "Еженедельные отчеты",
      "Консультации",
    ],
    highlighted: true,
  },
  {
    name: "Эксперт",
    price: "от 200 тысяч",
    period: "в месяц",
    features: [
      "Все из пакета Профессионал",
      "Полный контроль над стратегией",
      "Выделенный менеджер проекта",
      "Быстрая реакция на изменения",
      "Дополнительные каналы привлечения",
    ],
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Пакеты услуг
          </h2>
          <p className="text-lg text-foreground/70">
            Выберите пакет, подходящий вашему бизнесу
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => (
            <motion.div
              key={idx}
              {...fadeInUp}
              className={`rounded-xl p-8 transition-all ${pkg.highlighted
                ? "border-2 border-primary bg-primary/5 shadow-xl scale-105"
                : "border-2 border-border hover:border-primary/50"
                }`}
            >
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {pkg.name}
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">
                  {pkg.price}
                </span>
                <span className="text-foreground/60"> {pkg.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, fidx) => (
                  <li key={fidx} className="flex gap-3 text-foreground/80">
                    <CheckCircle size={18} className="text-accent flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${pkg.highlighted
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "border-2 border-primary text-primary hover:bg-primary/5"
                  }`}
              >
                Начать сейчас
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
