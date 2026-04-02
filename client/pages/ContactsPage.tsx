import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
} from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { PhoneInput } from "@/components/PhoneInput";


const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

export default function ContactsPage() {
  useSEO({
    title: 'Контакты | НОБЕРЛИН - Цифровой маркетинг',
    description: 'Свяжитесь с нами для консультации по SEO и Яндекс Директ. Помощь в развитии вашего бизнеса. Бесплатная первая консультация.',
    keywords: [
      'контакты',
      'связаться с нами',
      'консультация',
      'SEO агентство',
      'контакты агентства',
    ],
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
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
          email: formData.email,
          phone: formData.phone,
          comment: [formData.subject, formData.message].filter(Boolean).join(" — "),
        }),
      });
      if (!res.ok) throw new Error("Server error");
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      }, 3000);
    } catch {
      setFormError("Ошибка отправки. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      label: "Телефон",
      value: "+7 (495) 123-45-67",
      href: "tel:+74951234567",
      description: "Позвоните нам в рабочее время",
    },
    {
      icon: Mail,
      label: "Email",
      value: "hello@luminaagency.ru",
      href: "mailto:hello@luminaagency.ru",
      description: "Напишите нам письмо",
    },
    {
      icon: MessageSquare,
      label: "Telegram",
      value: "@luminaagency",
      href: "https://t.me/luminaagency",
      description: "Напишите в Telegram",
    },
    {
      icon: MapPin,
      label: "Адрес",
      value: "г. Ижевск, ул. Нижняя, 30",
      href: "#",
      description: "Посетите наш офис",
    },
  ];

  const workingHours = [
    { day: "Понедельник - Пятница", time: "09:00 - 18:00" },
    { day: "Суббота", time: "10:00 - 16:00" },
    { day: "Воскресенье", time: "Выходной" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-secondary">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Свяжитесь с нами
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Мы всегда готовы ответить на ваши вопросы и обсудить вашу
              маркетинговую стратегию
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactMethods.map((method, idx) => {
              const Icon = method.icon;
              return (
                <motion.a
                  key={idx}
                  href={method.href}
                  {...fadeInUp}
                  target={method.label === "Telegram" ? "_blank" : undefined}
                  rel={method.label === "Telegram" ? "noopener noreferrer" : undefined}
                  className="p-6 rounded-xl border-2 border-border hover:border-primary transition-all group hover:shadow-lg"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4">
                    <Icon className="text-primary" size={28} />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">
                    {method.label}
                  </h3>
                  <p className="text-primary font-semibold mb-2">
                    {method.value}
                  </p>
                  <p className="text-sm text-foreground/60">
                    {method.description}
                  </p>
                </motion.a>
              );
            })}
          </div>

          {/* Working Hours */}
          <motion.div {...fadeInUp} className="bg-secondary/50 rounded-xl p-8 border-2 border-border">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="text-primary" size={28} />
              <h2 className="text-2xl font-bold text-foreground">
                Время работы
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {workingHours.map((hours, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 bg-white rounded-lg border border-border">
                  <span className="font-medium text-foreground">
                    {hours.day}
                  </span>
                  <span className="text-primary font-bold">{hours.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-secondary">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Найдите нас на карте
            </h2>
            <p className="text-lg text-foreground/70">
              Наш офис находится по адресу: г. Ижевск, ул. Нижняя, 30
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            className="rounded-xl overflow-hidden border-2 border-border shadow-lg h-96"
          >
            <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A076bf97585c4a67cc2ef4885a00ae7fbbc1fe9ca03149e0c0a2653221398a408&amp;source=constructor" width="100%" height="100%" frameborder="0"></iframe>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Форма обратной связи
            </h2>
            <p className="text-lg text-foreground/70">
              Заполните форму и мы свяжемся с вами в течение 24 часов
            </p>
          </motion.div>

          <motion.form
            {...fadeInUp}
            onSubmit={handleSubmit}
            className="bg-secondary/50 rounded-xl p-8 border-2 border-border"
          >
            {submitted && (
              <div className="mb-6 p-4 bg-accent/10 border-2 border-accent rounded-lg text-accent font-semibold flex items-center gap-3">
                <Send size={20} />
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
                  Телефон *
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
                  Тема *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-primary focus:outline-none transition-colors"
                  placeholder="Тема сообщения"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-foreground mb-2">
                Сообщение *
              </label>
              <textarea
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={6}
                className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-primary focus:outline-none transition-colors resize-none"
                placeholder="Ваше сообщение..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Send size={20} />
              Отправить сообщение
            </button>

            <p className="text-sm text-foreground/60 text-center mt-4">
              Мы не передаем ваши данные третьим лицам. Ознакомьтесь с{" "}
              <a href="/privacy" className="text-primary hover:underline">
                политикой конфиденциальности
              </a>
            </p>
          </motion.form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-secondary">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Часто задаваемые вопросы
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
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
            ].map((faq, idx) => (
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
    </Layout>
  );
}
