import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  CheckCircle,
  TrendingUp,
  Zap,
  Target,
  Users,
  BarChart3,
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { PhoneInput } from "@/components/PhoneInput";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

export default function SEOServices() {
  useSEO({
    title: 'SEO продвижение сайта | Услуги SEO | Lumina Agency',
    description: 'Профессиональное SEO продвижение сайта. Органический рост трафика за 3-6 месяцев. Техническое SEO, контент, линкбилдинг. Гарантированные результаты.',
    keywords: [
      'SEO продвижение',
      'услуги SEO',
      'оптимизация сайта',
      'поисковая оптимизация',
      'SEO аудит',
      'техническое SEO',
      'линкбилдинг',
      'контент для SEO',
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'SEO-продвижение',
      description: 'Органический рост трафика вашего сайта через современные методы SEO. Гарантированные результаты за 3-6 месяцев.',
      provider: {
        '@type': 'Organization',
        name: 'Lumina Agency',
        url: 'https://luminaagency.com',
      },
      areaServed: 'RU',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'SEO услуги',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Аудит и анализ',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Техническое SEO',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Контент оптимизация',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Линкбилдинг',
            },
          },
        ],
      },
    },
  });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    site: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, service: "SEO-продвижение" }),
      });
      if (!res.ok) throw new Error("Server error");
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", phone: "", email: "", company: "", site: "" });
      }, 3000);
    } catch {
      setFormError("Ошибка отправки. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  const stages = [
    {
      number: "01",
      title: "Аудит и анализ",
      description:
        "Глубокий анализ вашего сайта, конкурентов и рынка. Выявляем возможности для роста.",
    },
    {
      number: "02",
      title: "Техническое SEO",
      description:
        "Оптимизация структуры сайта, скорости, мобильности и индексируемости.",
    },
    {
      number: "03",
      title: "Контент-маркетинг",
      description:
        "Создание и оптимизация контента для целевых ключевых слов с высоким потенциалом.",
    },
    {
      number: "04",
      title: "Линкбилдинг",
      description:
        "Получение качественных ссылок от авторитетных источников для повышения авторитета.",
    },
    {
      number: "05",
      title: "Мониторинг и отчетность",
      description:
        "Ежемесячные отчеты о прогрессе с подробным анализом метрик и рекомендациями.",
    },
    {
      number: "06",
      title: "Оптимизация",
      description:
        "Постоянное совершенствование стратегии на основе данных и результатов.",
    },
  ];

  const benefits = [
    { icon: TrendingUp, text: "Органический рост трафика на 200-500%" },
    { icon: Zap, text: "Устойчивые результаты в течение долгого времени" },
    { icon: Target, text: "Высокого качества целевой трафик" },
    { icon: Users, text: "Улучшение имиджа и доверия бренда" },
    { icon: BarChart3, text: "Рост конверсий и продаж" },
    { icon: CheckCircle, text: "Отсутствие зависимости от рекламного бюджета" },
  ];

  return (
    <Layout>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              SEO-продвижение вашего сайта
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-8">
              Комплексный подход к органическому росту трафика и позиций в
              поисковых системах. Результаты гарантированы за 3-6 месяцев.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: "Среднее увеличение трафика", value: "+350%" },
              { label: "Время до первых результатов", value: "1-3 мес" },
              { label: "Долгосрочный ROI", value: "7-10x" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                className="text-center p-6 bg-white rounded-xl border-2 border-border"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <p className="text-foreground/70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-8">
              Как мы работаем
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stages.map((stage, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  className="p-8 rounded-xl border-2 border-border hover:border-primary/50 transition-all hover:shadow-lg"
                >
                  <div className="text-5xl font-bold text-primary/20 mb-4">
                    {stage.number}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {stage.title}
                  </h3>
                  <p className="text-foreground/70">{stage.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeInUp}>
            <h2 className="text-4xl font-bold text-foreground mb-8">
              Преимущества SEO
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={idx}
                    {...fadeInUp}
                    className="flex gap-4 p-6 rounded-lg bg-secondary/50"
                  >
                    <Icon className="text-accent flex-shrink-0 mt-1" size={24} />
                    <span className="text-foreground/80 text-lg">
                      {benefit.text}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-secondary">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Пакеты услуг
            </h2>
            <p className="text-lg text-foreground/70">
              Выберите пакет, подходящий вашему бизнесу
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Старт",
                price: "от 50 тысяч",
                period: "в месяц",
                features: [
                  "Аудит сайта",
                  "Техническое SEO",
                  "Базовая оптимизация контента",
                  "Ежемесячный отчет",
                ],
                highlighted: false,
              },
              {
                name: "Профессионал",
                price: "от 100 тысяч",
                period: "в месяц",
                features: [
                  "Все из пакета Старт",
                  "Расширенный контент-маркетинг",
                  "Линкбилдинг",
                  "Еженедельные отчеты",
                  "Консультации",
                ],
                highlighted: true,
              },
              {
                name: "Эксперт",
                price: "от 200 тысяч",
                period: "в месяц",
                features: [
                  "Все из пакета Профессионал",
                  "Полный контроль над стратегией",
                  "Выделенный менеджер проекта",
                  "Быстрая реакция на изменения",
                  "Дополнительные каналы привлечения",
                ],
                highlighted: false,
              },
            ].map((pkg, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                className={`rounded-xl p-8 transition-all ${pkg.highlighted
                    ? "border-2 border-primary bg-primary/5 shadow-xl scale-105"
                    : "border-2 border-border hover:border-primary/50"
                  }`}
              >
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {pkg.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">
                    {pkg.price}
                  </span>
                  <span className="text-foreground/60"> {pkg.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, fidx) => (
                    <li key={fidx} className="flex gap-3 text-foreground/80">
                      <CheckCircle size={18} className="text-accent flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${pkg.highlighted
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "border-2 border-primary text-primary hover:bg-primary/5"
                    }`}
                >
                  Начать сейчас
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Получить бесплатный SEO-аудит сайта
            </h2>
            <p className="text-lg text-foreground/70">
              Оставьте заявку и мы проведем полный анализ вашего сайта за
              24 часа
            </p>
          </motion.div>

          <form
            onSubmit={handleSubmit}
            className="bg-secondary/50 rounded-xl p-8 border-2 border-border"
          >
            {submitted && (
              <div className="mb-6 p-4 bg-accent/10 border-2 border-accent rounded-lg text-accent font-semibold">
                Спасибо! Мы получили вашу заявку и скоро свяжемся с вами.
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-primary focus:outline-none transition-colors"
                  placeholder="Иван Иванов"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Номер телефона *
                </label>
                <PhoneInput
                  required
                  value={formData.phone}
                  onChange={(v) => setFormData({ ...formData, phone: v })}
                  className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-primary focus:outline-none transition-colors"
                  placeholder="ivan@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Название компании
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-primary focus:outline-none transition-colors"
                  placeholder="ООО Компания"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-foreground mb-2">
                URL вашего сайта
              </label>
              <input
                type="url"
                value={formData.site}
                onChange={(e) =>
                  setFormData({ ...formData, site: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-primary focus:outline-none transition-colors"
                placeholder="https://example.com"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-bold text-lg hover:shadow-lg transition-all"
            >
              Получить бесплатный аудит
            </button>

            <p className="text-sm text-foreground/60 text-center mt-4">
              Мы не передаем ваши данные третьим лицам. Ознакомьтесь с{" "}
              <a href="#" className="text-primary hover:underline">
                политикой конфиденциальности
              </a>
            </p>
          </form>
        </div>
      </section>

    </Layout>
  );
}
