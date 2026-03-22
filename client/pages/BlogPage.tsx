import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";


const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
  image: string;
  tags: string[];
}

export default function BlogPage() {
  useSEO({
    title: 'Блог | Статьи о SEO и Яндекс Директ | Lumina Agency',
    description: 'Полезные статьи и гайды по SEO, Яндекс Директ и цифровому маркетингу. Советы и стратегии для развития вашего бизнеса.',
    keywords: [
      'SEO статьи',
      'Директ советы',
      'интернет маркетинг',
      'гайды по SEO',
      'контент маркетинг',
      'цифровой маркетинг блог',
    ],
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Все");

  const articles: Article[] = [
    {
      id: 1,
      title: "SEO-аудит 2024: полный чек-лист по оптимизации",
      excerpt:
        "Узнайте, как провести полный SEO-аудит вашего сайта и выявить основные проблемы, которые могут препятствовать ранжированию в поиске.",
      content: "Полный текст статьи...",
      category: "SEO",
      author: "Иван Петров",
      date: "15 Марта 2024",
      readTime: 12,
      image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      tags: ["SEO", "Аудит", "Оптимизация"],
    },
    {
      id: 2,
      title: "Яндекс Директ: как снизить CPA в 2 раза",
      excerpt:
        "Практические советы по оптимизации кампаний Яндекс Директ. Проверенные методы, которые работают в 2024 году.",
      content: "Полный текст статьи...",
      category: "Директ",
      author: "Мария Сидорова",
      date: "12 Марта 2024",
      readTime: 8,
      image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      tags: ["Директ", "CPA", "Оптимизация"],
    },
    {
      id: 3,
      title: "Контент-маркетинг: стратегия для B2B компаний",
      excerpt:
        "Как создавать контент, который привлекает целевых клиентов и увеличивает объем сделок в B2B сегменте.",
      content: "Полный текст статьи...",
      category: "Маркетинг",
      author: "Алексей Иванов",
      date: "10 Марта 2024",
      readTime: 15,
      image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      tags: ["Контент", "B2B", "Маркетинг"],
    },
    {
      id: 4,
      title: "Google Ads vs Яндекс Директ: какой выбрать?",
      excerpt:
        "Сравнение двух платформ контекстной рекламы. Преимущества и недостатки каждой, для какого бизнеса подходит.",
      content: "Полный текст статьи...",
      category: "Директ",
      author: "Софья Морозова",
      date: "8 Марта 2024",
      readTime: 11,
      image: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      tags: ["Реклама", "Сравнение", "Директ"],
    },
    {
      id: 5,
      title: "Основные факторы ранжирования Google 2024",
      excerpt:
        "Актуальный список сигналов, которые влияют на позиции в поиске. Что изменилось за последний год и на что фокусироваться.",
      content: "Полный текст статьи...",
      category: "SEO",
      author: "Иван Петров",
      date: "5 Марта 2024",
      readTime: 14,
      image: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      tags: ["SEO", "Google", "Факторы"],
    },
    {
      id: 6,
      title: "Ретаргетинг: как вернуть потерянных клиентов",
      excerpt:
        "Стратегия ретаргетинга в Яндекс Директ и Google Ads. Как увеличить конверсию и снизить стоимость привлечения клиента.",
      content: "Полный текст статьи...",
      category: "Директ",
      author: "Марк Сергеев",
      date: "1 Марта 2024",
      readTime: 9,
      image: "linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)",
      tags: ["Ретаргетинг", "Конверсия", "Стратегия"],
    },
    {
      id: 7,
      title: "Как создать SEO-friendly URL структуру сайта",
      excerpt:
        "Подробное руководство по правильной структурированию URL адресов для лучшего ранжирования в поиске.",
      content: "Полный текст статьи...",
      category: "SEO",
      author: "Елена Козлова",
      date: "25 Февраля 2024",
      readTime: 10,
      image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      tags: ["SEO", "URL", "Структура"],
    },
    {
      id: 8,
      title: "Метрики для отслеживания эффективности рекламы",
      excerpt:
        "Какие показатели реально важны при оценке эффективности маркетинговых кампаний. Как настроить правильный трекинг.",
      content: "Полный текст статьи...",
      category: "Маркетинг",
      author: "Мария Сидорова",
      date: "20 Февраля 2024",
      readTime: 13,
      image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      tags: ["Аналитика", "Метрики", "Трекинг"],
    },
  ];

  const categories = ["Все", "SEO", "Директ", "Маркетинг"];

  const filteredArticles = articles.filter((article) => {
    const categoryMatch =
      selectedCategory === "Все" || article.category === selectedCategory;
    const searchMatch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-secondary">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Блог Lumina Agency
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Актуальные статьи об SEO, маркетинге и цифровом развитии вашего
              бизнеса
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-border">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <motion.div {...fadeInUp} className="mb-8">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/40"
                size={20}
              />
              <input
                type="text"
                placeholder="Найти статью..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-border focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div {...fadeInUp}>
            <h3 className="font-semibold text-foreground mb-4">Категории</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${selectedCategory === cat
                      ? "bg-primary text-white"
                      : "bg-secondary text-foreground hover:border-primary border-2 border-transparent"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          {filteredArticles.length > 0 ? (
            <>
              {/* Featured Article */}
              {filteredArticles[0] && (
                <motion.article
                  {...fadeInUp}
                  className="mb-16 rounded-xl overflow-hidden border-2 border-border hover:border-primary transition-all hover:shadow-lg"
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Image */}
                    <div
                      className="h-64 md:h-full min-h-96"
                      style={{
                        background: filteredArticles[0].image,
                      }}
                    >
                      <div className="absolute inset-0 bg-black/20" />
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col justify-center">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-semibold rounded-full w-fit mb-4">
                        {filteredArticles[0].category}
                      </span>
                      <h2 className="text-3xl font-bold text-foreground mb-4">
                        {filteredArticles[0].title}
                      </h2>
                      <p className="text-lg text-foreground/70 mb-6">
                        {filteredArticles[0].excerpt}
                      </p>

                      <div className="flex items-center gap-6 mb-6 text-sm text-foreground/60 flex-wrap">
                        <div className="flex items-center gap-2">
                          <User size={16} />
                          {filteredArticles[0].author}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          {filteredArticles[0].date}
                        </div>
                        <div className="text-primary font-semibold">
                          {filteredArticles[0].readTime} мин чтения
                        </div>
                      </div>

                      <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors w-fit group">
                        Читать полностью
                        <ArrowRight
                          size={18}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </button>
                    </div>
                  </div>
                </motion.article>
              )}

              {/* Articles Grid */}
              {filteredArticles.length > 1 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles.slice(1).map((article) => (
                    <motion.article
                      key={article.id}
                      {...fadeInUp}
                      className="rounded-xl overflow-hidden border-2 border-border hover:border-primary transition-all hover:shadow-lg flex flex-col"
                    >
                      {/* Image */}
                      <div
                        className="h-40"
                        style={{
                          background: article.image,
                        }}
                      >
                        <div className="w-full h-full bg-black/10" />
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full w-fit mb-3">
                          {article.category}
                        </span>

                        <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2">
                          {article.title}
                        </h3>

                        <p className="text-sm text-foreground/70 mb-4 line-clamp-2 flex-1">
                          {article.excerpt}
                        </p>

                        <div className="flex items-center gap-4 mb-4 text-xs text-foreground/60">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            {article.date}
                          </div>
                          <div className="text-primary font-semibold">
                            {article.readTime} мин
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="mb-4 flex flex-wrap gap-2">
                          {article.tags.slice(0, 2).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 bg-secondary text-foreground/70 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <button className="inline-flex items-center gap-2 px-4 py-2 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors group text-sm">
                          Читать
                          <ArrowRight
                            size={14}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </button>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </>
          ) : (
            <motion.div {...fadeInUp} className="text-center py-12">
              <p className="text-lg text-foreground/60 mb-4">
                Статей не найдено
              </p>
              <p className="text-foreground/50">
                Попробуйте изменить фильтры или поисковый запрос
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary via-purple-600 to-accent text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl font-bold mb-4">Подпишитесь на новости</h2>
            <p className="text-xl text-white/90 mb-8">
              Получайте свежие статьи и советы по маркетингу прямо на почту
            </p>

            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
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
    </Layout>
  );
}
