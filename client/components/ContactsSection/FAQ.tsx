import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

const faqs = [
  {
    q: "Как долго длится первая консультация?",
    a: "Первая консультация обычно занимает 30-45 минут. Мы обсуждаем ваши цели, текущую ситуацию и предлагаем стратегию.",
  },
  {
    q: "Можете ли вы гарантировать результаты?",
    a: "Мы гарантируем, что будем работать над улучшением показателей вашей компании используя лучшие практики. Результаты зависят от многих факторов, но мы всегда стремимся к максимальному ROI.",
  },
  {
    q: "Какой минимальный бюджет на проект?",
    a: "Минимальный бюджет зависит от типа услуги. Для SEO - от 50 000 ₽ в месяц, для Яндекс Директ - от 20 000 ₽ в месяц.",
  },
  {
    q: "Как часто я буду получать отчеты?",
    a: "Мы предоставляем ежемесячные отчеты по всем ключевым показателям. Для активных проектов доступны еженедельные отчеты.",
  },
];

export function FAQ() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-secondary">
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Часто задаваемые вопросы
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              {...fadeInUp}
              className="p-6 rounded-xl bg-white border-2 border-border hover:border-primary transition-all"
            >
              <h3 className="font-bold text-lg text-foreground mb-2">
                {faq.q}
              </h3>
              <p className="text-foreground/70">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
