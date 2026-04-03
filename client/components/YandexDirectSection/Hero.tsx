import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

export function Hero() {
  return (
    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-lime-50 to-accent/10">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Яндекс Директ - Контекстная реклама
          </h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-8">
            Привлекайте целевых клиентов через контекстную рекламу Яндекс
            Директ. Полный контроль над бюджетом, быстрые результаты и
            гарантированная окупаемость рекламы.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { label: "Среднее увеличение заявок", value: "+250%" },
            { label: "Снижение CPA", value: "-45%" },
            { label: "ROI кампаний", value: "7-12x" },
            { label: "Результаты за", value: "1-3 дня" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              {...fadeInUp}
              className="text-center p-6 bg-white rounded-xl border-2 border-border"
            >
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                {stat.value}
              </div>
              <p className="text-foreground/70 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
