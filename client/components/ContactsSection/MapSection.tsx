import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

export function MapSection() {
  return (
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
          <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A076bf97585c4a67cc2ef4885a00ae7fbbc1fe9ca03149e0c0a2653221398a408&amp;source=constructor" width="100%" height="100%" frameBorder="0"></iframe>
        </motion.div>
      </div>
    </section>
  );
}
