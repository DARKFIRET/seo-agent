import { motion } from "framer-motion";
import { Target, TrendingUp, Zap, CheckCircle } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

const adTypes = [
  {
    icon: Target,
    title: "Поиск (Search)",
    description:
      "Объявления показываются при поиске релевантных ключевых слов. Максимально целевой трафик.",
    features: ["Высокая конверсия", "Контроль за трафиком", "Быстрые результаты"],
  },
  {
    icon: TrendingUp,
    title: "РСЯ (Display)",
    description:
      "Баннеры на партнерских сайтах и мобильных приложениях. Охват и узнаваемость бренда.",
    features: ["Широкая аудитория", "Брендирование", "Переметраживание"],
  },
  {
    icon: Zap,
    title: "Ретаргетинг",
    description:
      "Показываем объявления тем, кто уже посещал ваш сайт. Увеличивает конверсию.",
    features: ["Восстановление потерянных", "Повышение ROI", "Персонализация"],
  },
];

export function AdTypes() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Форматы объявлений
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Выберите оптимальный формат рекламы для вашего бизнеса
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {adTypes.map((type, idx) => {
            const Icon = type.icon;
            return (
              <motion.div
                key={idx}
                {...fadeInUp}
                className="p-8 rounded-xl border-2 border-border hover:border-accent/50 transition-all hover:shadow-lg"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-accent/10 mb-4">
                  <Icon className="text-accent" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {type.title}
                </h3>
                <p className="text-foreground/70 mb-6">{type.description}</p>
                <ul className="space-y-2">
                  {type.features.map((feature, fidx) => (
                    <li
                      key={fidx}
                      className="flex gap-3 text-sm text-foreground/70"
                    >
                      <CheckCircle size={16} className="text-accent flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
