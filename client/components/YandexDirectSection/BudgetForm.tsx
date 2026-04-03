import { motion } from "framer-motion";
import { useState } from "react";
import { PhoneInput } from "@/components/PhoneInput";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

export function BudgetForm() {
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

  return (
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
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-accent to-green-700 text-white rounded-lg font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? "Отправка..." : "Рассчитать бюджет"}
          </button>

          <p className="text-sm text-foreground/60 text-center mt-4">
            Мы не передаем ваши данные третьим лицам. Ознакомьтесь с{" "}
            <a href="/privacy" className="text-accent hover:underline">
              политикой конфиденциальности
            </a>
          </p>
        </motion.form>
      </div>
    </section>
  );
}
