import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import {
  Users,
  Target,
  TrendingUp,
  Award,
  CheckCircle,
  Star,
} from "lucide-react";

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
    initials: "АВ",
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

const milestones = [
  { year: "2020", event: "Основание агентства в Ижевске" },
  { year: "2022", event: "Формирование команды экспертов и запуск направления SEO" },
  { year: "2024", event: "Лидерство на рынке digital-услуг Удмуртии. Более 80 успешных кейсов" },
  { year: "2026", event: "100+ реализованных проектов только внутри Ижевска" },
];

export default function AboutPage() {
  useSEO({
    title: "О нас | НОБЕРЛИН — SEO и Яндекс Директ",
    description:
      "Узнайте о НОБЕРЛИН. Команда профессионалов с 6+ годами опыта в SEO и Яндекс Директ. Помогаем бизнесу расти через цифровой маркетинг.",
    keywords: [
      "о нас",
      "НОБЕРЛИН",
      "команда",
      "SEO агентство Ижевск",
      "digital маркетинг",
    ],
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Мы — <span className="text-primary">НОБЕРЛИН</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-10">
              Цифровое агентство из Ижевска, которое помогает местному бизнесу расти за счёт
              органического трафика и эффективной рекламы с 2020 года.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "6+", label: "лет на рынке" },
              { value: "100+", label: "реализованных проектов" },
              { value: "10+", label: "специалистов в команде" },
              { value: "98%", label: "клиентов рекомендуют нас" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                className="bg-white rounded-xl border-2 border-border p-6"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <p className="text-sm text-foreground/60">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
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
                <p className="font-semibold">Алексей Воронов</p>
                <p className="text-white/70 text-sm">Основатель НОБЕРЛИН</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
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

      {/* Team */}
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

      {/* History */}
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

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-accent">
        <motion.div
          {...fadeInUp}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-4">
            Давайте работать вместе
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Расскажите нам о своём бизнесе — и мы предложим стратегию роста
          </p>
          <a
            href="/contacts"
            className="inline-block px-10 py-4 bg-white text-primary font-bold rounded-xl hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            Связаться с нами
          </a>
        </motion.div>
      </section>
    </Layout>
  );
}
