import { AdminLayout } from "@/components/AdminLayout";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { Trash2, Edit, Plus, Loader2, ExternalLink, Image as ImageIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import type { Case } from "@shared/api";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

const emptyForm = {
  title: "",
  slug: "",
  category: "",
  niche: "",
  description: "",
  resultText: "",
  trafficUp: "",
  roi: "",
  duration: "",
  body: "",
  imageUrl: "",
  status: "Черновик" as Case["status"],
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function CasesManagement() {
  const { authFetch } = useAuth();
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Fetch ──────────────────────────────────────────────────
  const fetchCases = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await authFetch("/api/cases/admin/all");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setCases(data.cases ?? []);
    } catch {
      setError("Не удалось загрузить кейсы");
    } finally {
      setLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  // ── Handlers ───────────────────────────────────────────────
  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ ...emptyForm });
    setShowModal(true);
  };

  const handleEdit = (item: Case) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      slug: item.slug,
      category: item.category ?? "",
      niche: item.niche ?? "",
      description: item.description ?? "",
      resultText: item.resultText ?? "",
      trafficUp: item.trafficUp ?? "",
      roi: item.roi ?? "",
      duration: item.duration ?? "",
      body: item.body ?? "",
      imageUrl: item.imageUrl ?? "",
      status: item.status,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.slug.trim()) return;
    setSaving(true);
    try {
      if (editingId) {
        const res = await authFetch(`/api/cases/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        setCases((prev) =>
          prev.map((c) => (c.id === editingId ? data.case : c)),
        );
      } else {
        const res = await authFetch("/api/cases", {
          method: "POST",
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        setCases((prev) => [data.case, ...prev]);
      }
      setShowModal(false);
    } finally {
      setSaving(false);
    }
  };

  const handleStatusToggle = async (item: Case) => {
    const newStatus =
      item.status === "Опубликовано" ? "Черновик" : "Опубликовано";
    // Optimistic
    setCases((prev) =>
      prev.map((c) => (c.id === item.id ? { ...c, status: newStatus } : c)),
    );
    await authFetch(`/api/cases/${item.id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status: newStatus }),
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить кейс?")) return;
    setCases((prev) => prev.filter((c) => c.id !== id));
    await authFetch(`/api/cases/${id}`, { method: "DELETE" });
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      // Auto-generate slug only when creating new case
      ...(editingId === null ? { slug: slugify(title) } : {}),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result as string;
        try {
          const res = await authFetch("/api/upload", {
            method: "POST",
            body: JSON.stringify({
              image: base64Data,
              filename: file.name,
            }),
          });
          const data = await res.json();
          if (data.url) {
            setFormData((prev) => ({ ...prev, imageUrl: data.url }));
          }
        } catch (err) {
          console.error("Upload failed", err);
          alert("Не удалось загрузить изображение");
        } finally {
          setUploadingImage(false);
          if (fileInputRef.current) fileInputRef.current.value = "";
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setUploadingImage(false);
    }
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
              Управление кейсами
            </h1>
            <p className="text-sm md:text-base text-foreground/60">
              Кейсов: {cases.length}
            </p>
          </div>
          <button
            onClick={handleAddNew}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            <Plus size={18} />
            Добавить кейс
          </button>
        </motion.div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-foreground/50">
            <Loader2 size={28} className="animate-spin mr-3" />
            Загрузка...
          </div>
        ) : error ? (
          <div className="py-10 text-center text-red-600 font-medium">
            {error}
          </div>
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
                    <th className="text-left p-3 md:p-4 hidden sm:table-cell">
                      Категория
                    </th>
                    <th className="text-left p-3 md:p-4 hidden md:table-cell">
                      Ниша
                    </th>
                    <th className="text-left p-3 md:p-4 hidden lg:table-cell">
                      Трафик
                    </th>
                    <th className="text-left p-3 md:p-4">Статус</th>
                    <th className="text-center p-3 md:p-4">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {cases.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-border hover:bg-secondary/30 transition-colors"
                    >
                      <td className="p-3 md:p-4">
                        <p className="font-semibold text-foreground text-sm md:text-base line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-xs text-foreground/50 font-mono">
                          /{item.slug}
                        </p>
                      </td>
                      <td className="p-3 md:p-4 hidden sm:table-cell text-sm text-foreground/70">
                        {item.category ?? "—"}
                      </td>
                      <td className="p-3 md:p-4 hidden md:table-cell text-sm text-foreground/70">
                        {item.niche ?? "—"}
                      </td>
                      <td className="p-3 md:p-4 hidden lg:table-cell text-sm text-accent font-semibold">
                        {item.trafficUp ?? "—"}
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
                      <td className="p-3 md:p-4">
                        <div className="flex items-center justify-center gap-1">
                          <a
                            href={`/cases`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 md:p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                            title="Просмотр на сайте"
                          >
                            <ExternalLink size={16} />
                          </a>
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
                  {cases.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-10 text-center text-foreground/50"
                      >
                        Кейсов нет — добавьте первый
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
              {editingId ? "Редактировать кейс" : "Добавить кейс"}
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  Заголовок *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none"
                  placeholder="E-commerce платформа"
                />
              </div>

              {/* Slug */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  Slug (URL) *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none font-mono text-sm"
                  placeholder="ecommerce-case"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  Категория
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none"
                  placeholder="SEO"
                />
              </div>

              {/* Niche */}
              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  Ниша
                </label>
                <input
                  type="text"
                  value={formData.niche}
                  onChange={(e) =>
                    setFormData({ ...formData, niche: e.target.value })
                  }
                  className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none"
                  placeholder="E-commerce"
                />
              </div>

              {/* Traffic Up */}
              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  Рост трафика
                </label>
                <input
                  type="text"
                  value={formData.trafficUp}
                  onChange={(e) =>
                    setFormData({ ...formData, trafficUp: e.target.value })
                  }
                  className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none"
                  placeholder="+320%"
                />
              </div>

              {/* ROI */}
              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  ROI
                </label>
                <input
                  type="text"
                  value={formData.roi}
                  onChange={(e) =>
                    setFormData({ ...formData, roi: e.target.value })
                  }
                  className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none"
                  placeholder="5.5x"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  Длительность
                </label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none"
                  placeholder="4 месяца"
                />
              </div>

              {/* Image Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  Изображение (превью)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-border rounded-lg hover:bg-secondary transition-colors"
                  >
                    {uploadingImage ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <ImageIcon size={18} />
                    )}
                    {uploadingImage ? "Загрузка..." : "Выбрать фото"}
                  </button>
                  {formData.imageUrl && (
                    <div className="flex items-center gap-3">
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="h-10 w-10 object-cover rounded-md border border-border"
                      />
                      <button
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, imageUrl: "" }))
                        }
                        className="text-xs text-red-500 hover:text-red-700"
                        title="Удалить картинку"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  Статус
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as Case["status"],
                    })
                  }
                  className="w-full px-3 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none"
                >
                  <option>Черновик</option>
                  <option>Опубликовано</option>
                </select>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  Краткое описание
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none resize-none"
                  placeholder="Краткое описание кейса..."
                />
              </div>

              {/* Result Text */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  Результат (текст)
                </label>
                <textarea
                  value={formData.resultText}
                  onChange={(e) =>
                    setFormData({ ...formData, resultText: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none resize-none"
                  placeholder="Описание достигнутых результатов..."
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
                disabled={
                  saving ||
                  !formData.title.trim() ||
                  !formData.slug.trim()
                }
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
