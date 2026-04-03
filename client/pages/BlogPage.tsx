import { Layout } from "@/components/Layout";
import { useState, useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";
import type { ContentItem } from "@shared/api";

// Section Components
import { Hero } from "@/components/BlogSection/Hero";
import { BlogFilters } from "@/components/BlogSection/BlogFilters";
import { BlogGrid } from "@/components/BlogSection/BlogGrid";
import { Newsletter } from "@/components/BlogSection/Newsletter";

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

  return (
    <Layout>
      <Hero />
      <BlogFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />
      <BlogGrid posts={filteredArticles} loading={loading} />
      <Newsletter />
    </Layout>
  );
}
