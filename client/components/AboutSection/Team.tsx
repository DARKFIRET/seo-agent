import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

const team = [
  {
    name: "Александр Архипов",
    role: "Основатель и CEO",
    experience: "10 лет в digital-маркетинге",
    description:
      "Руководит стратегией компании, выстраивает партнёрства и отвечает за конечный результат для каждого клиента.",
    initials: "АА",
  },
  {
    name: "Мария Селиванова",
    role: "Руководитель SEO-отдела",
    experience: "8 лет в SEO",
    description:
      "Специалист по техническому и контентному SEO. Под её руководством сайты клиентов выходят в топ в самых конкурентных нишах.",
    initials: "МС",
  },
  {
    name: "Дмитрий Козлов",
    role: "Head of Paid Ads",
    experience: "7 лет в Яндекс Директ",
    description:
      "Настраивает рекламные кампании с окупаемостью от 500%. Аналитик с глубоким пониманием аукционных алгоритмов.",
    initials: "ДК",
  },
  {
    name: "Екатерина Лобанова",
    role: "Контент-директор",
    experience: "6 лет в контент-маркетинге",
    description:
      "Создаёт контентные стратегии, которые одновременно привлекают органический трафик и вовлекают аудиторию.",
    initials: "ЕЛ",
  },
];

export function Team() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Команда
          </h2>
          <p className="text-lg text-foreground/70">
            Люди, которые делают результат
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              {...fadeInUp}
              className="text-center p-6 rounded-xl border-2 border-border hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                {member.initials}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-primary font-medium text-sm mb-1">
                {member.role}
              </p>
              <p className="text-foreground/50 text-xs mb-3">
                {member.experience}
              </p>
              <p className="text-foreground/60 text-sm leading-relaxed">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
