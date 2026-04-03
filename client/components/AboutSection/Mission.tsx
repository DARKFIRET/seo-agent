import { motion } from "framer-motion";
import { CheckCircle, Star } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

export function Mission() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Наша миссия
            </h2>
            <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
              Мы верим, что каждый бизнес заслуживает видимости в интернете.
              Наша задача — сделать так, чтобы нужный клиент находил вас
              первым: в поиске, в рекламе, в контенте.
            </p>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              Мы не продаём услуги — мы строим долгосрочное партнёрство,
              в котором ваш рост — это наш главный KPI.
            </p>
            <ul className="space-y-3">
              {[
                "Индивидуальная стратегия для каждого клиента",
                "Измеримые результаты без воды",
                "Честная коммуникация и прозрачные отчёты",
                "Постоянное развитие команды",
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 text-foreground/80">
                  <CheckCircle
                    size={20}
                    className="text-accent flex-shrink-0 mt-0.5"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...fadeInUp} className="relative">
            <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-10 text-white text-center">
              <Star size={48} className="mx-auto mb-4 opacity-80" />
              <blockquote className="text-xl font-medium leading-relaxed mb-6">
                «Мы считаем, что маркетинг — это инвестиция, а не
                расходы. Каждый рубль должен приносить результат.»
              </blockquote>
              <p className="font-semibold">Александр Архипов</p>
              <p className="text-white/70 text-sm">Основатель НОБЕРЛИН</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
