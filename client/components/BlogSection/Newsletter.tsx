import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

export function Newsletter() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary via-[#84AD26] to-accent text-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div {...fadeInUp}>
          <h2 className="text-4xl font-bold mb-4">Подпишитесь на новости</h2>
          <p className="text-xl text-white/90 mb-8">
            Получайте свежие статьи и советы по маркетингу прямо на почту
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-1 px-6 py-3 rounded-lg text-foreground focus:outline-none"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-primary rounded-lg font-bold hover:bg-white/90 transition-colors"
            >
              Подписаться
            </button>
          </form>

          <p className="text-sm text-white/70 mt-4">
            Мы не будем спамить. Письма только с полезным контентом.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
