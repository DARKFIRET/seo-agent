import { motion } from "framer-motion";
import { Target, TrendingUp, Users, Award } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

const values = [
  {
    icon: Target,
    title: "Ориентация на результат",
    description:
      "Мы работаем ради конкретных цифр: роста трафика, лидов и выручки клиента, а не красивых отчётов.",
  },
  {
    icon: TrendingUp,
    title: "Прозрачность",
    description:
      "Ежемесячные отчёты с понятными метриками и честными выводами — вы всегда знаете, за что платите.",
  },
  {
    icon: Users,
    title: "Командная работа",
    description:
      "Мы становимся частью вашей команды, глубоко погружаемся в бизнес и думаем о нём как о своём.",
  },
  {
    icon: Award,
    title: "Экспертиза",
    description:
      "6+ лет практики, более 100 реализованных проектов в Ижевске и постоянное обучение позволяют нам быть лидерами в регионе.",
  },
];

export function Values() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Наши ценности
          </h2>
          <p className="text-lg text-foreground/70">
            Принципы, которые определяют каждое наше решение
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, idx) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={idx}
                {...fadeInUp}
                className="bg-white rounded-xl p-8 border-2 border-border hover:border-primary/50 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
