import { AdminLayout } from "@/components/AdminLayout";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { BarChart3, Users, AlertCircle, TrendingUp, Loader2 } from "lucide-react";
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

export default function AdminDashboard() {
  const { authFetch, admin } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authFetch("/api/leads")
      .then((r) => r.json())
      .then((d) => setLeads(d.leads ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Compute real stats from leads
  const newLeads = leads.filter((l) => l.status === "Новая").length;
  const totalLeads = leads.length;
  const successLeads = leads.filter((l) => l.status === "Успешно реализовано").length;
  const conversion = totalLeads > 0 ? ((successLeads / totalLeads) * 100).toFixed(1) : "0";

  // Today's new leads
  const today = new Date().toDateString();
  const todayNew = leads.filter(
    (l) => new Date(l.createdAt).toDateString() === today,
  ).length;

  const stats = [
    {
      icon: AlertCircle,
      label: "Новых заявок",
      value: loading ? "…" : String(newLeads),
      change: `+${todayNew} сегодня`,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: Users,
      label: "Всего заявок",
      value: loading ? "…" : String(totalLeads),
      change: "за всё время",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: TrendingUp,
      label: "Конверсия",
      value: loading ? "…" : `${conversion}%`,
      change: "Новая → Успех",
      color: "text-green-500",
      bgColor: "bg-green-100/20",
    },
    {
      icon: BarChart3,
      label: "Успешно реализовано",
      value: loading ? "…" : String(successLeads),
      change: "закрытых заявок",
      color: "text-blue-500",
      bgColor: "bg-blue-100/20",
    },
  ];

  const recentLeads = leads.slice(0, 5);

  return (
    <AdminLayout>
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div {...fadeInUp} className="mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-1 md:mb-2">
            Добро пожаловать{admin?.name ? `, ${admin.name}` : ""}!
          </h1>
          <p className="text-sm md:text-base text-foreground/60">
            Вот обзор ваших данных и активности
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                {...fadeInUp}
                className="bg-white rounded-xl border-2 border-border p-4 md:p-6 hover:border-primary/50 transition-all"
              >
                <div className="flex items-start justify-between mb-3 md:mb-4">
                  <div className={`p-2 md:p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`${stat.color}`} size={20} />
                  </div>
                </div>
                <p className="text-foreground/60 text-xs md:text-sm mb-1">{stat.label}</p>
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <p className="text-xs text-foreground/50">{stat.change}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Recent Leads */}
        <motion.div
          {...fadeInUp}
          className="bg-white rounded-xl border-2 border-border overflow-hidden"
        >
          <div className="p-4 md:p-6 border-b border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              Последние заявки
            </h2>
            <a
              href="/admin/leads"
              className="text-primary hover:text-primary/80 font-semibold text-sm"
            >
              Все заявки →
            </a>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12 text-foreground/50">
              <Loader2 size={24} className="animate-spin mr-2" />
              Загрузка...
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary/50 text-foreground/70 text-xs md:text-sm font-semibold">
                    <th className="text-left p-2 md:p-4">Контакт</th>
                    <th className="text-left p-2 md:p-4 hidden sm:table-cell">Услуга</th>
                    <th className="text-left p-2 md:p-4">Статус</th>
                    <th className="text-left p-2 md:p-4 hidden md:table-cell">Дата</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-b border-border hover:bg-secondary/30 transition-colors"
                    >
                      <td className="p-2 md:p-4">
                        <p className="font-semibold text-foreground text-sm md:text-base">
                          {lead.name}
                        </p>
                        <p className="text-xs md:text-sm text-foreground/60">{lead.email}</p>
                      </td>
                      <td className="p-2 md:p-4 text-foreground/70 hidden sm:table-cell text-sm">
                        {lead.service ?? "—"}
                      </td>
                      <td className="p-2 md:p-4">
                        <span
                          className={`px-2 md:px-3 py-1 rounded-full text-xs font-semibold ${statusColors[lead.status] ?? ""}`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="p-2 md:p-4 text-foreground/60 text-xs md:text-sm hidden md:table-cell">
                        {new Date(lead.createdAt).toLocaleString("ru-RU")}
                      </td>
                    </tr>
                  ))}
                  {recentLeads.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-foreground/50">
                        Заявок пока нет
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  );
}
