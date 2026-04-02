import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, User, ArrowLeft, Loader2, Clock, Tag } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import type { ContentItem } from "@shared/api";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // В реальном приложении здесь должен быть запрос к /api/content/:id
    // Но так как у нас публичный доступ, используем список всех новостей и фильтруем
    fetch("/api/content/public/news")
      .then((res) => res.json())
      .then((data) => {
        const found = (data.news ?? []).find((n: ContentItem) => n.id === Number(id));
        setPost(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  useSEO({
    title: post ? `${post.title} | Блог НОБЕРЛИН` : "Статья | НОБЕРЛИН",
    description: post?.excerpt || "Читайте интересные статьи в нашем блоге.",
  });

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="animate-spin text-primary" size={40} />
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <h1 className="text-4xl font-bold mb-4">Статья не найдена</h1>
          <Link to="/blog" className="text-primary hover:underline flex items-center gap-2">
            <ArrowLeft size={18} /> Вернуться в блог
          </Link>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Layout>
      <article className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-secondary/10 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <motion.div {...fadeInUp} className="mb-8">
            <Link to="/blog" className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors">
              <ArrowLeft size={18} />
              Назад в блог
            </Link>
          </motion.div>

          {/* Main Article Card */}
          <motion.div 
            {...fadeInUp} 
            className="bg-white rounded-[2.5rem] p-6 md:p-12 lg:p-16 border-2 border-border shadow-xl shadow-primary/5 overflow-hidden"
          >
            {/* Header */}
            <header className="mb-12 flex flex-col items-center text-center">
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <span className="px-3 py-1 bg-primary/10 text-primary font-bold rounded-full text-sm">
                  {post.category}
                </span>
                <div className="flex items-center gap-2 text-foreground/60 text-sm">
                  <Calendar size={16} />
                  {formatDate(post.createdAt)}
                </div>
                <div className="flex items-center gap-2 text-foreground/60 text-sm">
                  <Clock size={16} />
                  {post.readTime} мин чтения
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 p-6 bg-secondary/30 rounded-2xl border-2 border-border max-w-md">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {(post.author || "Н").charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-bold text-foreground">{post.author || "Команда НОБЕРЛИН"}</p>
                  <p className="text-sm text-foreground/60">Эксперт по digital-маркетингу</p>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            {post.imageUrl && (
              <div className="mb-12 rounded-3xl overflow-hidden flex justify-center">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="max-w-full h-auto object-cover block" 
                  style={{ minWidth: "40%" }}
                />
              </div>
            )}

            {/* Content Body */}
            <div 
              className="prose prose-lg prose-primary max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 article-content"
              dangerouslySetInnerHTML={{ __html: post.body || "" }}
            />

            {/* Footer / Tags */}
            <div className="mt-16 pt-8 border-t border-border flex flex-col items-center">
              <div className="flex flex-col items-center gap-4 text-foreground/60">
                <div className="flex items-center gap-2">
                  <Tag size={18} />
                  <span className="font-semibold">Теги:</span>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {(post.tags || "Маркетинг, SEO").split(',').map((tag, idx) => (
                    <span key={idx} className="bg-secondary px-4 py-1.5 rounded-xl text-sm font-medium">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </article>

      <style dangerouslySetInnerHTML={{ __html: `
        .article-content img {
          min-width: 40% !important;
          max-width: 100%;
          margin-left: auto !important;
          margin-right: auto !important;
          display: block !important;
          margin-top: 2rem;
          margin-bottom: 2rem;
        }
        .article-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
          color: hsl(var(--foreground) / 0.8);
        }
      `}} />
    </Layout>
  );
}
