import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  CheckCircle,
  Target,
  Zap,
  BarChart3,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { PhoneInput } from "@/components/PhoneInput";


const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

export default function YandexDirectServices() {
  useSEO({
    title: 'Яндекс Директ | Контекстная реклама | Lumina Agency',
    description: 'Управление контекстной рекламой в Яндекс Директ. Максимум конверсий, минимум затрат. Профессиональная настройка и оптимизация CPA.',
    keywords: [
      'Яндекс Директ',
      'контекстная реклама',
      'управление Директ',
      'реклама Яндекс',
      'оптимизация CPA',
      'поисковая реклама',
      'интернет реклама',
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Яндекс Директ',
      description: 'Настройка и ведение контекстной рекламы в Яндекс.Директ. Максимум конверсий, минимум затрат.',
      provider: {
        '@type': 'Organization',
        name: 'Lumina Agency',
        url: 'https://luminaagency.com',
      },
      areaServed: 'RU',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Услуги Яндекс Директ',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Стратегия и планирование',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Настройка кампаний',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Оптимизация бюджета',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Регулярный отчетинг',
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
    budget: "",
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
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: "Яндекс Директ",
          comment: formData.budget ? `Бюджет: ${formData.budget}` : undefined,
        }),
      });
      if (!res.ok) throw new Error("Server error");
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", phone: "", email: "", budget: "" });
      }, 3000);
    } catch {
      setFormError("Ошибка отправки. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  const adTypes = [
    {
      icon: Target,
      title: "Поиск (Search)",
      description:
        "Объявления показываются при поиске релевантных ключевых слов. Максимально целевой трафик.",
      features: ["Высокая конверсия", "Контроль за трафиком", "Быстрые результаты"],
    },
    {
      icon: TrendingUp,
      title: "РСЯ (Display)",
      description:
        "Баннеры на партнерских сайтах и мобильных приложениях. Охват и узнаваемость бренда.",
      features: ["Широкая аудитория", "Брендирование", "Переметраживание"],
    },
    {
      icon: Zap,
      title: "Ретаргетинг",
      description:
        "Показываем объявления тем, кто уже посещал ваш сайт. Увеличивает конверсию.",
      features: ["Восстановление потерянных", "Повышение ROI", "Персонализация"],
    },
  ];

  const workProcess = [
    {
      number: "01",
      title: "Анализ и стратегия",
      description:
        "Изучаем ваш бизнес, конкурентов, аудиторию и подбираем оптимальные ключевые слова.",
    },
    {
      number: "02",
      title: "Настройка кампаний",
      description:
        "Создаём объявления, настраиваем таргетинг, устанавливаем ставки и бюджеты.",
    },
    {
      number: "03",
      title: "Оптимизация",
      description:
        "Ежедневный мониторинг, тестирование объявлений, оптимизация ставок и текстов.",
    },
    {
      number: "04",
      title: "Отчётность",
      description:
        "Подробные отчёты о результатах, стоимости привлечения лида и ROI кампании.",
    },
  ];

  const benefits = [
    { icon: Zap, text: "Быстрые результаты - первые лиды за 1-2 дня" },
    { icon: Target, text: "Точный таргетинг по ключевым словам и аудитории" },
    { icon: BarChart3, text: "Полный контроль над бюджетом и результатами" },
    { icon: CheckCircle, text: "Оплата только за клики или заявки" },
    { icon: TrendingUp, text: "Постоянная оптимизация для снижения CPC и CPA" },
    { icon: AlertCircle, text: "Экспертная поддержка и консультации" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-accent/10">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Яндекс Директ - Контекстная реклама
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-8">
              Привлекайте целевых клиентов через контекстную рекламу Яндекс
              Директ. Полный контроль над бюджетом, быстрые результаты и
              гарантированный ROI.
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

      {/* Ad Types */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Форматы объявлений
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Выберите оптимальный формат рекламы для вашего бизнеса
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {adTypes.map((type, idx) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  className="p-8 rounded-xl border-2 border-border hover:border-accent/50 transition-all hover:shadow-lg"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-accent/10 mb-4">
                    <Icon className="text-accent" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {type.title}
                  </h3>
                  <p className="text-foreground/70 mb-6">{type.description}</p>
                  <ul className="space-y-2">
                    {type.features.map((feature, fidx) => (
                      <li
                        key={fidx}
                        className="flex gap-3 text-sm text-foreground/70"
                      >
                        <CheckCircle size={16} className="text-accent flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-secondary">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Как мы работаем
            </h2>
            <p className="text-lg text-foreground/70">
              Четыре этапа успешной рекламной кампании
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workProcess.map((step, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                className="p-6 rounded-xl bg-white border-2 border-border"
              >
                <div className="text-4xl font-bold text-accent/30 mb-3">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-foreground/70 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Почему выбирают Яндекс Директ
            </h2>
            <p className="text-lg text-foreground/70">
              Основные преимущества контекстной рекламы для вашего бизнеса
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  className="flex gap-4 p-6 rounded-lg bg-secondary/50 border-l-4 border-accent"
                >
                  <Icon className="text-accent flex-shrink-0 mt-1" size={24} />
                  <span className="text-foreground/80 font-medium">
                    {benefit.text}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-foreground to-foreground/95 text-white">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Гибкая ценовая политика</h2>
            <p className="text-xl text-white/70">
              Мы работаем с проектами любого размера. Обсудим бюджет и результаты при
              первой консультации.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Управление кампанией",
                price: "от 20%",
                period: "от расходов на рекламу",
              },
              {
                name: "Профессиональное ведение",
                price: "от 50 тыс.",
                period: "в месяц",
              },
            ].map((pkg, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                className="rounded-xl p-8 border-2 border-white/20"
              >
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{pkg.price}</span>
                  <span className="text-white/70"> {pkg.period}</span>
                </div>
                <p className="text-white/70">
                  Полное управление вашей рекламной кампанией с ежедневной оптимизацией
                </p>
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
              Рассчитать бюджет на рекламу
            </h2>
            <p className="text-lg text-foreground/70">
              Оставьте заявку и наш специалист подберёт оптимальный бюджет для вашего
              бизнеса
            </p>
          </motion.div>

          <motion.form
            {...fadeInUp}
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
                  className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-accent focus:outline-none transition-colors"
                  placeholder="Иван Иванов"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Телефон *
                </label>
                <PhoneInput
                  required
                  value={formData.phone}
                  onChange={(v) => setFormData({ ...formData, phone: v })}
                  className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-accent focus:outline-none transition-colors"
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
                  className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-accent focus:outline-none transition-colors"
                  placeholder="ivan@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Ориентировочный бюджет
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-accent focus:outline-none transition-colors"
                >
                  <option value="">Выберите бюджет</option>
                  <option value="10-30">10 000 - 30 000 ₽</option>
                  <option value="30-100">30 000 - 100 000 ₽</option>
                  <option value="100-300">100 000 - 300 000 ₽</option>
                  <option value="300+">Более 300 000 ₽</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-accent to-orange-600 text-white rounded-lg font-bold text-lg hover:shadow-lg transition-all"
            >
              Рассчитать бюджет
            </button>

            <p className="text-sm text-foreground/60 text-center mt-4">
              Мы не передаем ваши данные третьим лицам. Ознакомьтесь с{" "}
              <a href="#" className="text-accent hover:underline">
                политикой конфиденциальности
              </a>
            </p>
          </motion.form>
        </div>
      </section>
    </Layout>
  );
}
