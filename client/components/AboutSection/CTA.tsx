import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

export function CTA() {
  return (
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
  );
}
