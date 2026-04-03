import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Loader2 } from "lucide-react";
import type { ContentItem } from "@shared/api";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

interface BlogGridProps {
  posts: ContentItem[];
  loading: boolean;
}

export function BlogGrid({ posts, loading }: BlogGridProps) {
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

  if (loading) {
    return (
      <div className="flex justify-center py-20 bg-white">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center py-12">
            <p className="text-lg text-foreground/60 mb-4">
              Статей не найдено
            </p>
            <p className="text-foreground/50">
              Попробуйте изменить фильтры или поисковый запрос
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Featured Article */}
        {posts[0] && (
          <motion.article
            {...fadeInUp}
            className="mb-16 rounded-xl overflow-hidden border-2 border-border hover:border-primary transition-all hover:shadow-lg relative"
          >
            <Link to={`/blog/${posts[0].id}`} className="absolute inset-0 z-10" />
            <div className="grid md:grid-cols-2 gap-8">
              {/* Image */}
              <div
                className="h-64 md:h-full min-h-96 bg-cover bg-center"
                style={{
                  backgroundImage: (posts[0].imageUrl || getFirstImage(posts[0].body))
                    ? `url(${posts[0].imageUrl || getFirstImage(posts[0].body)})`
                    : 'linear-gradient(135deg, #95C12B 0%, #7DA324 100%)',
                }}
              >
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-semibold rounded-full w-fit mb-4">
                  {posts[0].category}
                </span>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {posts[0].title}
                </h2>
                <p className="text-lg text-foreground/70 mb-6 line-clamp-3">
                  {posts[0].excerpt}
                </p>

                <div className="flex items-center gap-6 mb-6 text-sm text-foreground/60 flex-wrap">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    {posts[0].author || "НОБЕРЛИН"}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {formatDate(posts[0].createdAt)}
                  </div>
                  <div className="text-primary font-semibold">
                    {posts[0].readTime} мин чтения
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

        {/* Grid */}
        {posts.length > 1 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((article) => (
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
      </div>
    </section>
  );
}
