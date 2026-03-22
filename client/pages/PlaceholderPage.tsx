import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

interface PlaceholderPageProps {
  title: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
}

export function PlaceholderPage({
  title,
  description,
  seoTitle,
  seoDescription
}: PlaceholderPageProps) {
  useSEO({
    title: seoTitle || `${title} | Lumina Agency`,
    description: seoDescription || description,
  });
  return (
    <Layout>
      <div className="flex items-center justify-center pt-24 pb-12 px-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Zap className="text-primary" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>
          <p className="text-lg text-foreground/70 mb-8">{description}</p>
          <p className="text-foreground/60 mb-8">
            Эта страница находится в разработке. Продолжайте исследовать другие
            разделы сайта или вернитесь позже для получения дополнительной
            информации.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Вернуться на главную
          </Link>
        </div>
      </div>
    </Layout>
  );
}
