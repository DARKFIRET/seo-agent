import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

export function Hero() {
  return (
    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeInUp} className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Блог НОБЕРЛИН
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Актуальные статьи об SEO, маркетинге и цифровом развитии вашего
            бизнеса
          </p>
        </motion.div>
      </div>
    </section>
  );
}
