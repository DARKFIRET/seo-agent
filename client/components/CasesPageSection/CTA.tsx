import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

export function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div {...fadeInUp}>
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Хотите похожих результатов?
          </h2>
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            Закажите бесплатную консультацию и мы разработаем индивидуальную стратегию
          </p>
          <a
            href="/contacts"
            className="inline-block px-10 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-bold text-lg hover:shadow-lg transition-all"
          >
            Получить консультацию
          </a>
        </motion.div>
      </div>
    </section>
  );
}
