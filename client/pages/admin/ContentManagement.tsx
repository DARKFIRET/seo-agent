import { AdminLayout } from "@/components/AdminLayout";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Trash2, Edit, Plus, Loader2, Eye } from "lucide-react";
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
  type: "Статья" as ContentItem["type"],
  category: "Маркетинг",
  status: "Черновик" as ContentItem["status"],
  author: "",
  body: "",
};

export default function ContentManagement() {
  const { authFetch } = useAuth();
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);

  // ── Fetch ──────────────────────────────────────────────────
  const fetchContents = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await authFetch("/api/content");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setContents(data.content ?? []);
    } catch {
      setError("Не удалось загрузить контент");
    } finally {
      setLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    fetchContents();
  }, [fetchContents]);

  // ── Handlers ───────────────────────────────────────────────
  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ ...emptyForm });
    setShowModal(true);
  };

  const handleEdit = (item: ContentItem) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      type: item.type ?? "Статья",
      category: item.category ?? "Маркетинг",
      status: item.status,
      author: item.author ?? "",
      body: item.body ?? "",
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.title.trim()) return;
    setSaving(true);
    try {
      if (editingId) {
        const res = await authFetch(`/api/content/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        setContents((prev) =>
          prev.map((c) => (c.id === editingId ? data.content : c)),
        );
      } else {
        const res = await authFetch("/api/content", {
          method: "POST",
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        setContents((prev) => [data.content, ...prev]);
      }
      setShowModal(false);
    } finally {
      setSaving(false);
    }
  };

  const handleStatusToggle = async (item: ContentItem) => {
    const newStatus = item.status === "Опубликовано" ? "Черновик" : "Опубликовано";
    // Optimistic
    setContents((prev) =>
      prev.map((c) => (c.id === item.id ? { ...c, status: newStatus } : c)),
    );
    await authFetch(`/api/content/${item.id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status: newStatus }),
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить запись?")) return;
    setContents((prev) => prev.filter((c) => c.id !== id));
    await authFetch(`/api/content/${id}`, { method: "DELETE" });
  };

  // ── Render ─────────────────────────────────────────────────
  return (
    <AdminLayout>
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          {...fadeInUp}
          className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-1 md:mb-2">
              Управление контентом
            </h1>
            <p className="text-sm md:text-base text-foreground/60">
              Записей: {contents.length}
            </p>
          </div>
          <button
            onClick={handleAddNew}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            <Plus size={18} />
            Добавить запись
          </button>
        </motion.div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-foreground/50">
            <Loader2 size={28} className="animate-spin mr-3" />
            Загрузка...
          </div>
        ) : error ? (
          <div className="py-10 text-center text-red-600 font-medium">{error}</div>
        ) : (
          <motion.div
            {...fadeInUp}
            className="bg-white rounded-xl border-2 border-border overflow-hidden"
          >
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary/50 text-foreground/70 text-xs md:text-sm font-semibold">
                    <th className="text-left p-3 md:p-4">Название</th>
                    <th className="text-left p-3 md:p-4 hidden sm:table-cell">Тип</th>
                    <th className="text-left p-3 md:p-4 hidden md:table-cell">Категория</th>
                    <th className="text-left p-3 md:p-4">Статус</th>
                    <th className="text-left p-3 md:p-4 hidden lg:table-cell">Просмотры</th>
                    <th className="text-center p-3 md:p-4">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {contents.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-border hover:bg-secondary/30 transition-colors"
                    >
                      <td className="p-3 md:p-4">
                        <p className="font-semibold text-foreground text-sm md:text-base line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-xs text-foreground/50">
                          {item.author ?? "—"}
                        </p>
                      </td>
                      <td className="p-3 md:p-4 hidden sm:table-cell text-sm text-foreground/70">
                        {item.type}
                      </td>
                      <td className="p-3 md:p-4 hidden md:table-cell text-sm text-foreground/70">
                        {item.category ?? "—"}
                      </td>
                      <td className="p-3 md:p-4">
                        <button
                          onClick={() => handleStatusToggle(item)}
                          className={`px-2 md:px-3 py-1 rounded-full text-xs font-semibold transition-opacity hover:opacity-80 ${
                            item.status === "Опубликовано"
                              ? "bg-green-100/50 text-green-700"
                              : "bg-yellow-100/50 text-yellow-700"
                          }`}
                        >
                          {item.status}
                        </button>
                      </td>
                      <td className="p-3 md:p-4 hidden lg:table-cell text-sm text-foreground/70">
                        <div className="flex items-center gap-1">
                          <Eye size={14} />
                          {item.views ?? 0}
                        </div>
                      </td>
                      <td className="p-3 md:p-4">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-1.5 md:p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                            title="Редактировать"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 md:p-2 hover:bg-red-100 rounded-lg text-red-600 transition-colors"
                            title="Удалить"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {contents.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-foreground/50">
                        Записей нет — добавьте первую
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 md:p-8 w-full max-w-2xl my-4"
          >
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
              {editingId ? "Редактировать запись" : "Добавить запись"}
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  Заголовок *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none"
                  placeholder="Заголовок записи"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  Тип
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value as ContentItem["type"] })
                  }
                  className="w-full px-3 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none"
                >
                  <option>Статья</option>
                  <option>Кейс</option>
                  <option>Страница</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  Категория
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none"
                  placeholder="Маркетинг"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  Автор
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none"
                  placeholder="Имя автора"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  Статус
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as ContentItem["status"] })
                  }
                  className="w-full px-3 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none"
                >
                  <option>Черновик</option>
                  <option>Опубликовано</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  Содержимое
                </label>
                <RichTextEditor
                  content={formData.body}
                  onChange={(html) => setFormData({ ...formData, body: html })}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border-2 border-border rounded-lg font-semibold hover:bg-secondary transition-colors"
              >
                Отмена
              </button>
              <button
                disabled={saving || !formData.title.trim()}
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60"
              >
                {saving ? "Сохранение..." : "Сохранить"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
}
