import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

const milestones = [
  { year: "2020", event: "Основание агентства в Ижевске" },
  { year: "2022", event: "Формирование команды экспертов и запуск направления SEO" },
  { year: "2024", event: "Лидерство на рынке digital-услуг Удмуртии. Более 80 успешных кейсов" },
  { year: "2026", event: "100+ реализованных проектов только внутри Ижевска" },
];

export function History() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-secondary">
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            История компании
          </h2>
          <p className="text-lg text-foreground/70">
            Путь от маленькой команды до лидера рынка в Ижевске
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-8">
            {milestones.map((milestone, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                className="flex gap-8 items-start"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 bg-white border-2 border-primary rounded-full flex items-center justify-center z-10 relative">
                    <span className="text-primary font-bold text-sm">
                      {milestone.year}
                    </span>
                  </div>
                </div>
                <div className="bg-white rounded-xl border-2 border-border p-6 flex-1 hover:border-primary/50 transition-colors">
                  <p className="text-foreground/80 leading-relaxed">
                    {milestone.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
