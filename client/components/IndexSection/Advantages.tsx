import { motion } from "framer-motion";
import { Award, Users, BarChart3 } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

const advantages = [
  {
    icon: Award,
    value: "6+",
    label: "Лет опыта в цифровом маркетинге",
  },
  {
    icon: Users,
    value: "100+",
    label: "Успешных проектов для клиентов",
  },
  {
    icon: BarChart3,
    value: "3x",
    label: "Средний рост ROI для клиентов",
  },
];

export function Advantages() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-white to-accent/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          {...fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            Наша команда объединяет опыт и инновации для достижения
            исключительных результатов
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <motion.div
                key={idx}
                {...fadeInUp}
                className="text-center p-8"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <Icon className="text-primary" size={32} />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {adv.value}
                </div>
                <p className="text-foreground/70 text-lg">{adv.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
