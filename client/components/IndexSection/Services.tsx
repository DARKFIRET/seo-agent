import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, TrendingUp, Target, LucideIcon } from "lucide-react";
import { useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  cta: string;
  link: string;
}

const services: Service[] = [
  {
    icon: TrendingUp,
    title: "SEO-продвижение",
    description:
      "Органический рост трафика вашего сайта через современные методы SEO. Гарантированные результаты за 3-6 месяцев.",
    features: [
      "Аудит и анализ конкурентов",
      "Техническое SEO",
      "Оптимизация контента",
      "Линкбилдинг",
    ],
    cta: "Получить SEO-аудит",
    link: "/services/seo",
  },
  {
    icon: Target,
    title: "Яндекс Директ",
    description:
      "Настройка и ведение контекстной рекламы в Яндекс.Директ. Максимум конверсий, минимум затрат.",
    features: [
      "Стратегия и планирование",
      "Настройка кампаний",
      "Оптимизация бюджета",
      "Регулярный отчетинг",
    ],
    cta: "Рассчитать бюджет",
    link: "/services/yandex-direct",
  },
];

export function Services() {
  const [selectedService, setSelectedService] = useState(0);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          {...fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Наши услуги
          </h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            Полный спектр решений для развития вашего бизнеса в цифровом
            пространстве
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                {...fadeInUp}
                className={`p-8 rounded-2xl border-2 cursor-pointer transition-all ${selectedService === idx
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
                  }`}
                onClick={() => setSelectedService(idx)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="text-primary" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {service.title}
                  </h3>
                </div>
                <p className="text-foreground/70 mb-6">{service.description}</p>

                <div className="space-y-3 mb-8">
                  {service.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-center gap-3">
                      <CheckCircle size={18} className="text-accent flex-shrink-0" />
                      <span className="text-sm text-foreground/70">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to={service.link}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  {service.cta}
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
