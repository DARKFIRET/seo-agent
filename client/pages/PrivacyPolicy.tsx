import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function PrivacyPolicy() {
  return (
    <Layout>
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Политика конфиденциальности
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
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Общие положения</h2>
              <p className="text-foreground/70 leading-relaxed mb-4">
                Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. №152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые нашим агентством (далее – Оператор).
              </p>
              <p className="text-foreground/70 leading-relaxed">
                Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Персональные данные, которые мы обрабатываем</h2>
              <ul className="list-disc pl-6 space-y-2 text-foreground/70">
                <li>Фамилия, имя, отчество;</li>
                <li>Номер телефона;</li>
                <li>Адрес электронной почты;</li>
                <li>Данные об использовании сайта (файлы cookie, IP-адрес, данные о браузере).</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Цели обработки персональных данных</h2>
              <p className="text-foreground/70 leading-relaxed mb-4">
                Цель обработки персональных данных Пользователя:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/70">
                <li>Информирование Пользователя посредством отправки электронных писем;</li>
                <li>Заключение, исполнение и прекращение гражданско-правовых договоров;</li>
                <li>Предоставление доступа Пользователю к сервисам, информации и/или материалам, содержащимся на веб-сайте;</li>
                <li>Уточнение деталей заявки и оказание консультационных услуг.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Файлы Cookie</h2>
              <p className="text-foreground/70 leading-relaxed">
                Мы используем файлы cookie для того, чтобы сделать наш сайт максимально удобным для вас. Файлы cookie позволяют нам анализировать трафик сайта и подбирать контент под ваши интересы. Вы можете в любой момент изменить настройки своего браузера и заблокировать файлы cookie, однако это может повлиять на функциональность сайта.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Заключительные положения</h2>
              <p className="text-foreground/70 leading-relaxed mb-4">
                Пользователь может получить любые разъяснения по интересующим вопросам, касающимся обработки его персональных данных, обратившись к Оператору с помощью электронной почты.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                Настоящий документ будет отражать любые изменения политики обработки персональных данных Оператором. Политика действует бессрочно до замены ее новой версией.
              </p>
            </section>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
