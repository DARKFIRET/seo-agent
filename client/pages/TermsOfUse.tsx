import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function TermsOfUse() {
  return (
    <Layout>
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Условия использования
            </h1>
            <p className="text-lg text-foreground/70">
              Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
            </p>
          </motion.div>

          <motion.div 
            {...fadeInUp}
            className="bg-white rounded-2xl border-2 border-border p-8 md:p-12 shadow-xl prose prose-slate max-w-none"
          >
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Согласие с условиями</h2>
              <p className="text-foreground/70 leading-relaxed">
                Используя данный сайт, вы подтверждаете свое согласие с настоящими Условиями использования. Если вы не согласны с какими-либо пунктами данных условий, пожалуйста, прекратите использование сайта.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Интеллектуальная собственность</h2>
              <p className="text-foreground/70 leading-relaxed mb-4">
                Весь контент, представленный на сайте (тексты, графические изображения, логотипы, дизайн), является собственностью нашего агентства и защищен законами об авторском праве.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                Копирование, распространение или иное использование материалов сайта без предварительного письменного согласия Оператора запрещено.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Ограничение ответственности</h2>
              <p className="text-foreground/70 leading-relaxed mb-4">
                Мы прилагаем все усилия для обеспечения точности информации на сайте, однако не гарантируем отсутствие ошибок или актуальность всех данных в реальном времени.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                Оператор не несет ответственности за любые прямые или косвенные убытки, возникшие в результате использования или невозможности использования данного сайта.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Ссылки на сторонние ресурсы</h2>
              <p className="text-foreground/70 leading-relaxed">
                Наш сайт может содержать ссылки на сторонние веб-сайты. Мы не несем ответственности за содержание, политику конфиденциальности или деятельность таких сайтов.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Изменение условий</h2>
              <p className="text-foreground/70 leading-relaxed">
                Мы оставляем за собой право изменять настоящие Условия использования в любое время без предварительного уведомления. Изменения вступают в силу с момента их публикации на сайте.
              </p>
            </section>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
