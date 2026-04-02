import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Link } from "react-router-dom";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-50"
        >
          <div className="bg-white rounded-2xl border-2 border-border p-6 shadow-2xl relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
            
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-xl text-primary">
                <Cookie size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground mb-1">Файлы cookie</h3>
                <p className="text-sm text-foreground/70 leading-relaxed mb-4">
                  Мы используем файлы cookie для улучшения работы нашего сайта и анализа трафика. Продолжая просмотр, вы соглашаетесь с нашей{" "}
                  <Link to="/privacy" className="text-primary hover:underline font-medium">
                    политикой конфиденциальности
                  </Link>.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleAccept}
                    className="flex-1 px-6 py-2.5 bg-primary text-white rounded-lg font-bold text-sm hover:shadow-lg transition-all active:scale-95"
                  >
                    Принимаю
                  </button>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="p-2.5 text-foreground/40 hover:text-foreground transition-colors"
                    aria-label="Закрыть"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
