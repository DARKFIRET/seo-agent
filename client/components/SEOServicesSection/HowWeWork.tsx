import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

const stages = [
  {
    number: "01",
    title: "Аудит и анализ",
    description:
      "Глубокий анализ вашего сайта, конкурентов и рынка. Выявляем возможности для роста.",
  },
  {
    number: "02",
    title: "Техническое SEO",
    description:
      "Оптимизация структуры сайта, скорости, мобильности и индексируемости.",
  },
  {
    number: "03",
    title: "Контент-маркетинг",
    description:
      "Создание и оптимизация контента для целевых ключевых слов с высоким потенциалом.",
  },
  {
    number: "04",
    title: "Линкбилдинг",
    description:
      "Получение качественных ссылок от авторитетных источников для повышения авторитета.",
  },
  {
    number: "05",
    title: "Мониторинг и отчетность",
    description:
      "Ежемесячные отчеты о прогрессе с подробным анализом метрик и рекомендациями.",
  },
  {
    number: "06",
    title: "Оптимизация",
    description:
      "Постоянное совершенствование стратегии на основе данных и результатов.",
  },
];

export function HowWeWork() {
  return (
    <div className="mb-16">
      <motion.h2 {...fadeInUp} className="text-4xl font-bold text-foreground mb-8">
        Как мы работаем
      </motion.h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stages.map((stage, idx) => (
          <motion.div
            key={idx}
            {...fadeInUp}
            className="p-8 rounded-xl border-2 border-border hover:border-primary/50 transition-all hover:shadow-lg"
          >
            <div className="text-5xl font-bold text-primary/20 mb-4">
              {stage.number}
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              {stage.title}
            </h3>
            <p className="text-foreground/70">{stage.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
