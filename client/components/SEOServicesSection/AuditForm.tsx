import { motion } from "framer-motion";
import { useState } from "react";
import { PhoneInput } from "@/components/PhoneInput";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

export function AuditForm() {
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

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Оставьте заявку и получите бесплатный SEO-аудит сайта
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
          {formError && (
            <div className="mb-6 p-4 bg-red-100 border-2 border-red-500 rounded-lg text-red-700 font-semibold">
              {formError}
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
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? "Отправка..." : "Получить бесплатный аудит"}
          </button>

          <p className="text-sm text-foreground/60 text-center mt-4">
            Мы не передаем ваши данные третьим лицам. Ознакомьтесь с{" "}
            <a href="/privacy" className="text-primary hover:underline">
              политикой конфиденциальности
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
