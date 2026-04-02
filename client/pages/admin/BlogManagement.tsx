import { AdminLayout } from "@/components/AdminLayout";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Trash2, Edit, Plus, Loader2, Eye, Image as ImageIcon } from "lucide-react";
import { RichTextEditor } from "@/components/RichTextEditor";
import { useAuth } from "@/hooks/useAuth";
import type { ContentItem } from "@shared/api";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

const emptyForm = {
  title: "",
  type: "Новость" as ContentItem["type"],
  category: "SEO",
  status: "Черновик" as ContentItem["status"],
  author: "",
  excerpt: "",
  body: "",
  imageUrl: "",
  tags: "",
  readTime: 5,
};

export default function BlogManagement() {
  const { authFetch } = useAuth();
  const [posts, setPosts] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await authFetch("/api/content");
      if (!res.ok) throw new Error();
      const data = await res.json();
      // Фильтруем только новости
      const newsOnly = (data.content ?? []).filter((c: ContentItem) => c.type === "Новость");
      setPosts(newsOnly);
    } catch {
      setError("Не удалось загрузить новости");
    } finally {
      setLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ ...emptyForm });
    setShowModal(true);
  };

  const handleEdit = (item: ContentItem) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      type: "Новость",
      category: item.category ?? "SEO",
      status: item.status,
      author: item.author ?? "",
      excerpt: item.excerpt ?? "",
      body: item.body ?? "",
      imageUrl: item.imageUrl ?? "",
      tags: item.tags ?? "",
      readTime: item.readTime ?? 5,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.title.trim()) return;
    setSaving(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/content/${editingId}` : "/api/content";
      
      const res = await authFetch(url, {
        method,
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) throw new Error();
      await fetchPosts();
      setShowModal(false);
    } catch {
      alert("Ошибка при сохранении");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить новость?")) return;
    try {
      await authFetch(`/api/content/${id}`, { method: "DELETE" });
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Ошибка при удалении");
    }
  };

  return (
    <AdminLayout>
      <div className="w-full max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Блог / Новости</h1>
            <p className="text-foreground/60">Управление статьями и новостями агентства</p>
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20"
          >
            <Plus size={20} />
            Создать новость
          </button>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={40} /></div>
        ) : (
          <div className="grid gap-4">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                {...fadeInUp}
                className="bg-white p-4 rounded-xl border-2 border-border flex items-center gap-6 hover:border-primary/50 transition-colors"
              >
                <div className="w-24 h-16 bg-secondary rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {post.imageUrl ? (
                    <img src={post.imageUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="text-foreground/20" size={24} />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-foreground mb-1">{post.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-foreground/50">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${post.status === 'Опубликовано' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {post.status}
                    </span>
                    <span>{post.category}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(post)} className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors"><Edit size={20} /></button>
                  <button onClick={() => handleDelete(post.id)} className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"><Trash2 size={20} /></button>
                </div>
              </motion.div>
            ))}
            {posts.length === 0 && <div className="text-center py-20 text-foreground/40 border-2 border-dashed border-border rounded-xl">Новостей пока нет</div>}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">{editingId ? "Редактировать" : "Новая новость"}</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-2">Заголовок</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-primary outline-none" />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2">Категория</label>
                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-primary outline-none">
                  <option value="SEO">SEO</option>
                  <option value="Директ">Директ</option>
                  <option value="Маркетинг">Маркетинг</option>
                  <option value="Новости">Новости компании</option>
                  <option value="Кейсы">Кейсы</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Статус</label>
                <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value as any})} className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-primary outline-none">
                  <option value="Черновик">Черновик</option>
                  <option value="Опубликовано">Опубликовано</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-2">Краткое описание (для списка)</label>
                <textarea value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-primary outline-none h-20" />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">URL картинки</label>
                <input type="text" value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-primary outline-none" placeholder="https://..." />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Время чтения (мин)</label>
                <input type="number" value={formData.readTime} onChange={(e) => setFormData({...formData, readTime: parseInt(e.target.value)})} className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-primary outline-none" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-2">Контент</label>
                <RichTextEditor value={formData.body} onChange={(body) => setFormData({...formData, body})} />
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 border-2 border-border rounded-xl font-bold hover:bg-secondary transition-colors">Отмена</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-50">
                {saving ? "Сохранение..." : "Сохранить новость"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
}
