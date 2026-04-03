import { motion } from "framer-motion";
import { Phone, Mail, MessageSquare, MapPin, Clock } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
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

export function ContactMethods() {
  return (
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
  );
}
