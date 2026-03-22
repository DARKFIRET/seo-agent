import { AdminLayout } from "@/components/AdminLayout";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import {
  Trash2,
  Edit,
  MessageSquare,
  Filter,
  Download,
  Plus,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import type { Lead } from "@shared/api";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

const statusColors: Record<string, string> = {
  "Новая": "bg-accent/20 text-accent",
  "В работе": "bg-blue-100/50 text-blue-700",
  "Успешно реализовано": "bg-green-100/50 text-green-700",
  "Отказ": "bg-red-100/50 text-red-700",
};

export default function LeadsManagement() {
  const { authFetch } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("Все");
  const [filterService, setFilterService] = useState<string>("Все");
  const [modalComment, setModalComment] = useState("");
  const [saving, setSaving] = useState(false);

  // ── Fetch ──────────────────────────────────────────────
  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await authFetch("/api/leads");
      if (!res.ok) throw new Error("Ошибка загрузки");
      const data = await res.json();
      setLeads(data.leads);
    } catch {
      setError("Не удалось загрузить заявки");
    } finally {
      setLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // ── Filtered list ──────────────────────────────────────
  const filteredLeads = leads.filter((lead) => {
    const statusMatch = filterStatus === "Все" || lead.status === filterStatus;
    const serviceMatch =
      filterService === "Все" || lead.service === filterService;
    return statusMatch && serviceMatch;
  });

  // ── Actions ────────────────────────────────────────────
  const handleStatusChange = async (leadId: number, newStatus: Lead["status"]) => {
    // Optimistic update
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l)),
    );
    await authFetch(`/api/leads/${leadId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status: newStatus }),
    });
  };

  const handleAddComment = async (leadId: number) => {
    setSaving(true);
    try {
      await authFetch(`/api/leads/${leadId}/comment`, {
        method: "PATCH",
        body: JSON.stringify({ comment: modalComment }),
      });
      setLeads((prev) =>
        prev.map((l) =>
          l.id === leadId ? { ...l, comment: modalComment } : l,
        ),
      );
      setShowModal(false);
      setModalComment("");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (leadId: number) => {
    if (!confirm("Удалить заявку?")) return;
    setLeads((prev) => prev.filter((l) => l.id !== leadId));
    await authFetch(`/api/leads/${leadId}`, { method: "DELETE" });
  };

  const handleExport = async () => {
    const res = await authFetch("/api/leads/export");
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Render ─────────────────────────────────────────────
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
              Управление заявками
            </h1>
            <p className="text-sm md:text-base text-foreground/60">
              Всего заявок: {leads.length}
            </p>
          </div>
          <button className="w-full md:w-auto flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm md:text-base">
            <Plus size={18} />
            Добавить заявку
          </button>
        </motion.div>

        {/* Filters */}
        <motion.div
          {...fadeInUp}
          className="bg-white rounded-xl border-2 border-border p-4 md:p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
            <Filter size={18} className="text-foreground/60 hidden md:block" />

            <div className="w-full md:w-auto">
              <label className="text-xs md:text-sm font-semibold text-foreground/60 mb-1 block">
                Статус
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full md:w-auto px-3 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none text-sm"
              >
                <option>Все</option>
                <option>Новая</option>
                <option>В работе</option>
                <option>Успешно реализовано</option>
                <option>Отказ</option>
              </select>
            </div>

            <div className="w-full md:w-auto">
              <label className="text-xs md:text-sm font-semibold text-foreground/60 mb-1 block">
                Услуга
              </label>
              <select
                value={filterService}
                onChange={(e) => setFilterService(e.target.value)}
                className="w-full md:w-auto px-3 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none text-sm"
              >
                <option>Все</option>
                <option>SEO-продвижение</option>
                <option>Яндекс Директ</option>
              </select>
            </div>

            <div className="hidden md:block flex-1" />

            <button
              onClick={handleExport}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-3 md:px-4 py-2 border-2 border-border rounded-lg font-semibold hover:bg-secondary transition-colors text-sm md:text-base"
            >
              <Download size={18} />
              Экспортировать
            </button>
          </div>
        </motion.div>

        {/* State: loading / error / empty / table */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-foreground/50">
            <Loader2 size={32} className="animate-spin mr-3" />
            Загрузка заявок...
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
                    <th className="text-left p-2 md:p-4">Контакт</th>
                    <th className="text-left p-2 md:p-4 hidden sm:table-cell">Услуга</th>
                    <th className="text-left p-2 md:p-4">Статус</th>
                    <th className="text-left p-2 md:p-4 hidden md:table-cell">Дата</th>
                    <th className="text-center p-2 md:p-4">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-b border-border hover:bg-secondary/30 transition-colors"
                    >
                      <td className="p-2 md:p-4">
                        <div>
                          <p className="font-semibold text-foreground text-sm md:text-base">
                            {lead.name}
                          </p>
                          <p className="text-xs md:text-sm text-foreground/60">
                            {lead.email}
                          </p>
                          <p className="text-xs md:text-sm text-foreground/60 hidden sm:block">
                            {lead.phone}
                          </p>
                        </div>
                      </td>
                      <td className="p-2 md:p-4 text-foreground/70 hidden sm:table-cell text-sm">
                        {lead.service ?? "—"}
                      </td>
                      <td className="p-2 md:p-4">
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            handleStatusChange(lead.id, e.target.value as Lead["status"])
                          }
                          className={`px-2 md:px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer ${statusColors[lead.status] ?? ""}`}
                        >
                          <option>Новая</option>
                          <option>В работе</option>
                          <option>Успешно реализовано</option>
                          <option>Отказ</option>
                        </select>
                      </td>
                      <td className="p-2 md:p-4 text-foreground/60 text-xs md:text-sm hidden md:table-cell">
                        {new Date(lead.createdAt).toLocaleString("ru-RU")}
                      </td>
                      <td className="p-2 md:p-4">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => {
                              setSelectedLead(lead);
                              setModalComment(lead.comment ?? "");
                              setShowModal(true);
                            }}
                            className="p-1.5 md:p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                            title="Комментарий"
                          >
                            <MessageSquare size={16} className="md:w-5 md:h-5" />
                          </button>
                          <button
                            className="p-1.5 md:p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                            title="Редактировать"
                          >
                            <Edit size={16} className="md:w-5 md:h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(lead.id)}
                            className="p-1.5 md:p-2 hover:bg-red-100 rounded-lg text-red-600 transition-colors"
                            title="Удалить"
                          >
                            <Trash2 size={16} className="md:w-5 md:h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredLeads.length === 0 && (
              <div className="p-8 text-center text-foreground/60">
                Нет заявок по выбранным фильтрам
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Comment Modal */}
      {showModal && selectedLead && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-3 md:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-4 md:p-8 max-w-md w-full"
          >
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">
              Комментарий к заявке
            </h2>
            <p className="text-foreground/60 mb-3 md:mb-4 text-sm md:text-base">
              {selectedLead.name}
            </p>

            <textarea
              value={modalComment}
              onChange={(e) => setModalComment(e.target.value)}
              rows={5}
              className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none resize-none mb-4 text-sm md:text-base"
              placeholder="Введите комментарий..."
            />

            <div className="flex gap-2 md:gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-3 md:px-4 py-2 border-2 border-border rounded-lg font-semibold hover:bg-secondary transition-colors text-sm md:text-base"
              >
                Отмена
              </button>
              <button
                disabled={saving}
                onClick={() => handleAddComment(selectedLead.id)}
                className="flex-1 px-3 md:px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm md:text-base disabled:opacity-60"
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
