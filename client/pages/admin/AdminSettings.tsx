import { AdminLayout } from "@/components/AdminLayout";
import { motion } from "framer-motion";
import { useState } from "react";
import { Save } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteTitle: "Агентство",
    siteDescription: "Цифровое агентство",
    contactEmail: "info@example.com",
    contactPhone: "+7 (999) 999-99-99",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // TODO: Save settings to backend
    console.log("Сохранено:", settings);
  };

  return (
    <AdminLayout>
      <div className="w-full max-w-2xl mx-auto">
        <motion.div {...fadeInUp} className="mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-1 md:mb-2">
            Настройки
          </h1>
          <p className="text-sm md:text-base text-foreground/60">
            Общие настройки сайта и системы
          </p>
        </motion.div>

        <motion.div
          {...fadeInUp}
          className="bg-white rounded-xl border-2 border-border p-4 md:p-8"
        >
          <div className="space-y-4 md:space-y-6">
            {/* Site Title */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Название сайта
              </label>
              <input
                type="text"
                name="siteTitle"
                value={settings.siteTitle}
                onChange={handleChange}
                className="w-full px-3 md:px-4 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none text-sm md:text-base"
              />
            </div>

            {/* Site Description */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Описание сайта
              </label>
              <input
                type="text"
                name="siteDescription"
                value={settings.siteDescription}
                onChange={handleChange}
                className="w-full px-3 md:px-4 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none text-sm md:text-base"
              />
            </div>

            {/* Contact Email */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Email контакт
              </label>
              <input
                type="email"
                name="contactEmail"
                value={settings.contactEmail}
                onChange={handleChange}
                className="w-full px-3 md:px-4 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none text-sm md:text-base"
              />
            </div>

            {/* Contact Phone */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Телефон контакт
              </label>
              <input
                type="tel"
                name="contactPhone"
                value={settings.contactPhone}
                onChange={handleChange}
                className="w-full px-3 md:px-4 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none text-sm md:text-base"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors mt-8 text-sm md:text-base"
            >
              <Save size={18} />
              Сохранить изменения
            </button>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
