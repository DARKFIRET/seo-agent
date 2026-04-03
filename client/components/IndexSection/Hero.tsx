import { motion } from "framer-motion";

interface HeroProps {
  onLeadClick: () => void;
  onMoreClick: () => void;
}

export function Hero({ onLeadClick, onMoreClick }: HeroProps) {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-background to-secondary overflow-hidden relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
              Растите ваш бизнес в Ижевске с цифровым маркетингом
            </h1>
            <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
              Мы помогаем местным компаниям привлекать целевой трафик, увеличивать
              продажи и доминировать в поисковых результатах через SEO и
              Яндекс Директ.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onLeadClick}
                className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
              >
                Оставить заявку
              </button>
              <button
                onClick={onMoreClick}
                className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
              >
                Узнать больше
              </button>
            </div>

            {/* Trust Items */}
            <div className="mt-12 flex items-center gap-6">
              <div>
                <div className="text-3xl font-bold text-primary">98%</div>
                <p className="text-sm text-foreground/60">Клиентов довольны</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <div className="text-3xl font-bold text-accent">6+</div>
                <p className="text-sm text-foreground/60">Лет опыта</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative h-96 hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-3xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="flex h-20 items-end justify-center gap-2.5 mb-6">
                  {[35, 60, 45, 80, 100].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0, opacity: 0 }}
                      whileInView={{ height: `${height}%`, opacity: 1 }}
                      transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="w-5 bg-gradient-to-t from-primary to-accent rounded-t-md opacity-80"
                    />
                  ))}
                </div>
                <p className="text-foreground/40 font-medium">
                  Получите результаты за 30 дней
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
