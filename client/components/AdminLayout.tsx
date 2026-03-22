import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, BarChart3, Settings, FileText, Zap, Home, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { admin, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  const navItems = [
    { path: "/admin", label: "Дашборд", icon: Home },
    { path: "/admin/leads", label: "Заявки (CRM)", icon: BarChart3 },
    { path: "/admin/content", label: "Контент", icon: FileText },
    { path: "/admin/cases", label: "Кейсы", icon: Briefcase },
    { path: "/admin/seo", label: "SEO", icon: Zap },
    { path: "/admin/settings", label: "Настройки", icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed md:relative z-40 transition-all duration-300",
          sidebarOpen ? "w-64" : "w-0"
        )}
      >
        <div className={cn(
          "h-screen bg-foreground text-white flex flex-col overflow-hidden transition-all",
          sidebarOpen ? "w-64" : "w-0"
        )}>
          {/* Logo */}
          <div className="p-4 md:p-6 border-b border-white/10">
            <Link to="/admin" className="flex items-center gap-2 md:gap-3 font-bold text-base md:text-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold text-sm">
                LA
              </div>
              <span className="hidden md:inline">Admin Panel</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 md:py-6 px-2 md:px-3 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  title={item.label}
                  className={cn(
                    "flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg transition-colors font-medium text-xs md:text-sm",
                    active
                      ? "bg-accent text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  )}
                >
                  <Icon size={18} />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 md:p-6 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center md:justify-start gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors font-medium text-xs md:text-sm"
              title="Выход"
            >
              <LogOut size={18} />
              <span className="hidden md:inline">Выход</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-border h-14 md:h-16 flex items-center px-3 md:px-6 gap-3 md:gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex-1" />

          {/* User Info */}
          <div className="hidden sm:flex items-center gap-2 md:gap-4">
            <div className="text-right">
              <div className="font-semibold text-foreground text-xs md:text-sm">
                {admin?.name ?? admin?.email ?? "Admin"}
              </div>
              <div className="text-foreground/60 text-xs">Администратор</div>
            </div>
            <div className="w-9 h-9 md:w-10 md:h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
              {(admin?.name ?? admin?.email ?? "A").charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="sm:hidden w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xs">
            {(admin?.name ?? admin?.email ?? "A").charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-3 md:p-6">
            {children}
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
