import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

const workProcess = [
  {
    number: "01",
    title: "Анализ и стратегия",
    description:
      "Изучаем ваш бизнес, конкурентов, аудиторию и подбираем оптимальные ключевые слова.",
  },
  {
    number: "02",
    title: "Настройка кампаний",
    description:
      "Создаём объявления, настраиваем таргетинг, устанавливаем ставки и бюджеты.",
  },
  {
    number: "03",
    title: "Оптимизация",
    description:
      "Ежедневный мониторинг, тестирование объявлений, оптимизация ставок и текстов.",
  },
  {
    number: "04",
    title: "Отчётность",
    description:
      "Подробные отчёты о результатах, стоимости привлечения лида и ROI кампании.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Как мы работаем
          </h2>
          <p className="text-lg text-foreground/70">
            Четыре этапа успешной рекламной кампании
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workProcess.map((step, idx) => (
            <motion.div
              key={idx}
              {...fadeInUp}
              className="p-6 rounded-xl bg-white border-2 border-border"
            >
              <div className="text-4xl font-bold text-accent/30 mb-3">
                {step.number}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-foreground/70 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
