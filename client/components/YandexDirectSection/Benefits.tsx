import { motion } from "framer-motion";
import { Zap, Target, BarChart3, CheckCircle, TrendingUp, AlertCircle } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

const benefits = [
  { icon: Zap, text: "Быстрые результаты - первые лиды за 1-2 дня" },
  { icon: Target, text: "Точный таргетинг по ключевым словам и аудитории" },
  { icon: BarChart3, text: "Полный контроль над бюджетом и результатами" },
  { icon: CheckCircle, text: "Оплата только за клики или заявки" },
  { icon: TrendingUp, text: "Постоянная оптимизация для снижения CPC и CPA" },
  { icon: AlertCircle, text: "Экспертная поддержка и консультации" },
];

export function Benefits() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Почему выбирают Яндекс Директ
          </h2>
          <p className="text-lg text-foreground/70">
            Основные преимущества контекстной рекламы для вашего бизнеса
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={idx}
                {...fadeInUp}
                className="flex gap-4 p-6 rounded-lg bg-secondary/50 border-l-4 border-accent"
              >
                <Icon className="text-accent flex-shrink-0 mt-1" size={24} />
                <span className="text-foreground/80 font-medium">
                  {benefit.text}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
