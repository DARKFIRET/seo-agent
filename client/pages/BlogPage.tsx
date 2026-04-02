import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Calendar, User, ArrowRight, Search, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import type { ContentItem } from "@shared/api";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

export default function BlogPage() {
  const [posts, setPosts] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Все");

  useEffect(() => {
    fetch("/api/content/public/news")
      .then(res => res.json())
      .then(data => {
        setPosts(data.news ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useSEO({
    title: 'Блог | Статьи о SEO и Яндекс Директ | НОБЕРЛИН',
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

  const categories = ["Все", "SEO", "Директ", "Маркетинг", "Новости", "Кейсы"];

  const filteredArticles = posts.filter((article) => {
    const categoryMatch =
      selectedCategory === "Все" || article.category === selectedCategory;
    const searchMatch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.excerpt || "").toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getFirstImage = (html: string | null) => {
    if (!html) return null;
    const match = html.match(/<img[^>]+src="([^">]+)"/);
    return match ? match[1] : null;
  };

  return (
    <Layout>
      {/* Hero Section */}
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
          {loading ? (
             <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={40} /></div>
          ) : filteredArticles.length > 0 ? (
            <>
              {/* Featured Article */}
              {filteredArticles[0] && (
                <motion.article
                  {...fadeInUp}
                  className="mb-16 rounded-xl overflow-hidden border-2 border-border hover:border-primary transition-all hover:shadow-lg relative"
                >
                  <Link to={`/blog/${filteredArticles[0].id}`} className="absolute inset-0 z-10" />
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Image */}
                    <div
                      className="h-64 md:h-full min-h-96 bg-cover bg-center"
                      style={{
                        backgroundImage: (filteredArticles[0].imageUrl || getFirstImage(filteredArticles[0].body)) 
                          ? `url(${filteredArticles[0].imageUrl || getFirstImage(filteredArticles[0].body)})` 
                          : 'linear-gradient(135deg, #95C12B 0%, #7DA324 100%)',
                      }}
                    >
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col justify-center">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-semibold rounded-full w-fit mb-4">
                        {filteredArticles[0].category}
                      </span>
                      <h2 className="text-3xl font-bold text-foreground mb-4">
                        {filteredArticles[0].title}
                      </h2>
                      <p className="text-lg text-foreground/70 mb-6 line-clamp-3">
                        {filteredArticles[0].excerpt}
                      </p>

                      <div className="flex items-center gap-6 mb-6 text-sm text-foreground/60 flex-wrap">
                        <div className="flex items-center gap-2">
                          <User size={16} />
                          {filteredArticles[0].author || "НОБЕРЛИН"}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          {formatDate(filteredArticles[0].createdAt)}
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
                      className="rounded-xl overflow-hidden border-2 border-border hover:border-primary transition-all hover:shadow-lg flex flex-col relative"
                    >
                      <Link to={`/blog/${article.id}`} className="absolute inset-0 z-10" />
                      {/* Image */}
                      <div
                        className="h-40 bg-cover bg-center"
                        style={{
                           backgroundImage: (article.imageUrl || getFirstImage(article.body)) 
                             ? `url(${article.imageUrl || getFirstImage(article.body)})` 
                             : 'linear-gradient(135deg, #A8E063 0%, #56AB2F 100%)',
                        }}
                      >
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
                            {formatDate(article.createdAt)}
                          </div>
                          <div className="text-primary font-semibold">
                            {article.readTime} мин
                          </div>
                        </div>

                        <button className="inline-flex items-center gap-2 px-4 py-2 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors group text-sm mt-auto">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary via-[#84AD26] to-accent text-white">
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
