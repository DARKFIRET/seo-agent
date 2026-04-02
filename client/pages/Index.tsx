import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadModal } from "@/components/LeadModal";
import { Link } from "react-router-dom";
import {
  Search,
  TrendingUp,
  Target,
  Zap,
  CheckCircle,
  ArrowRight,
  Award,
  Users,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import type { Case } from "@shared/api";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

export default function Index() {
  const [selectedService, setSelectedService] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useSEO({
    title: 'SEO и Яндекс Директ в Ижевске - Цифровой маркетинг | НОБЕРЛИН',
    description: 'Помогаем компаниям Ижевска привлекать целевой трафик и увеличивать продажи через SEO и Яндекс Директ. 6+ лет опыта. 100+ успешных проектов.',
    keywords: [
      'SEO услуги',
      'SEO продвижение',
      'Яндекс Директ',
      'контекстная реклама',
      'цифровой маркетинг',
      'интернет маркетинг',
      'Ижевск',
      'продвижение сайта',
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'НОБЕРЛИН',
      url: 'https://luminaagency.com',
      description: 'Цифровое агентство в Ижевске. SEO и Яндекс Директ для вашего бизнеса',
      image: 'https://luminaagency.com/logo.png',
      telephone: '+7 (999) 999-99-99',
      areaServed: 'Izhevsk',
      knowsAbout: [
        'SEO',
        'Яндекс Директ',
        'контекстная реклама',
        'интернет маркетинг',
      ],
      hasPart: [
        {
          '@type': 'Service',
          name: 'SEO-продвижение',
          description: 'Органический рост трафика вашего сайта через современные методы SEO. Гарантированные результаты за 3-6 месяцев.',
        },
        {
          '@type': 'Service',
          name: 'Яндекс Директ',
          description: 'Настройка и ведение контекстной рекламы в Яндекс.Директ. Максимум конверсий, минимум затрат.',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '50',
        reviewCount: '50',
      },
    },
  });

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const services = [
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

  const [cases, setCases] = useState<Case[]>([]);
  const [loadingCases, setLoadingCases] = useState(true);

  useEffect(() => {
    fetch("/api/cases")
      .then((r) => r.json())
      .then((d) => setCases((d.cases ?? []).slice(0, 3)))
      .catch(() => { })
      .finally(() => setLoadingCases(false));
  }, []);

  const GRADIENTS = [
    "linear-gradient(135deg, #95C12B 0%, #7DA324 100%)",
    "linear-gradient(135deg, #A8E063 0%, #56AB2F 100%)",
    "linear-gradient(135deg, #D4FC79 0%, #96E6A1 100%)",
  ];

  const trusts = ["Яндекс", "Google", "Avast", "Kaspersky"];

  return (
    <div className="flex flex-col min-h-screen">
      <Header onLeadClick={() => setIsModalOpen(true)} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-background to-secondary overflow-hidden relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
                  Растите ваш бизнес в Ижевске с цифровым маркетингом
                </h1>
                <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
                  Мы помогаем местным компаниям привлекать целевой трафик, увеличивать
                  продажи и доминировать в поисковых результатах через SEO и
                  Яндекс Директ.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
                  >
                    Оставить заявку
                  </button>
                  <button
                    onClick={scrollToServices}
                    className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
                  >
                    Узнать больше
                  </button>
                </div>

                {/* Trust Items */}
                <div className="mt-12 flex items-center gap-6">
                  <div>
                    <div className="text-3xl font-bold text-primary">98%</div>
                    <p className="text-sm text-foreground/60">Клиентов довольны</p>
                  </div>
                  <div className="w-px h-12 bg-border" />
                  <div>
                    <div className="text-3xl font-bold text-accent">6+</div>
                    <p className="text-sm text-foreground/60">Лет опыта</p>
                  </div>
                </div>
              </div>

              {/* Right Visual */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative h-96 hidden lg:block"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-3xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="flex h-20 items-end justify-center gap-2.5 mb-6">
                      {[35, 60, 45, 80, 100].map((height, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0, opacity: 0 }}
                          whileInView={{ height: `${height}%`, opacity: 1 }}
                          transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                          viewport={{ once: true }}
                          className="w-5 bg-gradient-to-t from-primary to-accent rounded-t-md opacity-80"
                        />
                      ))}
                    </div>
                    <p className="text-foreground/40 font-medium">
                      Получите результаты за 30 дней
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          ref={servicesRef}
          className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
        >
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

        {/* Advantages Section */}
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

        {/* Cases Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              {...fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Наши лучшие кейсы
              </h2>
              <p className="text-xl text-foreground/60 max-w-2xl mx-auto mb-8">
                Реальные результаты, которые мы сделали для наших клиентов
              </p>
              <Link
                to="/cases"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-colors"
              >
                Посмотреть все кейсы
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {loadingCases ? (
                <div className="md:col-span-3 text-center py-10 text-foreground/50">
                  Загрузка кейсов...
                </div>
              ) : cases.length > 0 ? (
                cases.map((c, idx) => (
                  <motion.div
                    key={c.id}
                    {...fadeInUp}
                    className="rounded-xl overflow-hidden border-2 border-border hover:border-primary/50 transition-all hover:shadow-lg group cursor-pointer"
                  >
                    <div
                      className="h-48 relative overflow-hidden bg-cover bg-center"
                      style={
                        c.imageUrl
                          ? { backgroundImage: `url(${c.imageUrl})` }
                          : { background: GRADIENTS[idx % GRADIENTS.length] }
                      }
                    >
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all" />
                      <div className="absolute inset-0 flex items-end p-6">
                        <div className="w-full">
                          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur text-white text-xs font-semibold rounded-full mb-3">
                            {c.category ?? "Кейс"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
                        {c.title}
                      </h3>
                      <p className="text-accent font-semibold text-lg line-clamp-2">
                        {c.trafficUp || c.resultText || c.description || ""}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="md:col-span-3 text-center py-10 text-foreground/50">
                  Нет добавленных кейсов
                </div>
              )}
            </div>
          </div>
        </section>



        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary via-[#84AD26] to-accent text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Готовы увеличить продажи?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Первая консультация бесплатна. Узнайте, как мы можем помочь вашему
                бизнесу за 30 минут.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-10 py-4 bg-white text-primary rounded-lg font-bold text-lg hover:bg-white/90 transition-colors hover:shadow-xl"
              >
                Заказать бесплатную консультацию
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Lead Modal */}
      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
