import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

interface CTAProps {
  onLeadClick: () => void;
}

export function CTA({ onLeadClick }: CTAProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary via-[#84AD26] to-accent text-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div {...fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Готовы увеличить продажи?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Первая консультация бесплатна. Узнайте, как мы можем помочь вашему
            бизнесу за 30 минут.
          </p>
          <button
            onClick={onLeadClick}
            className="px-10 py-4 bg-white text-primary rounded-lg font-bold text-lg hover:bg-white/90 transition-colors hover:shadow-xl"
          >
            Заказать бесплатную консультацию
          </button>
        </motion.div>
      </div>
    </section>
  );
}
