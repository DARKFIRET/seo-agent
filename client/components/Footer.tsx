import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Send,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img src="/logo.png" alt="Logo" className="h-20 w-auto" />
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Цифровое маркетинговое агентство, специализирующееся на SEO и
              Яндекс Директ.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} aria-hidden="true" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                aria-label="Telegram"
              >
                <Send size={18} aria-hidden="true" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Услуги</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <Link
                  to="/services/seo"
                  className="hover:text-primary transition-colors"
                >
                  SEO-продвижение
                </Link>
              </li>
              <li>
                <Link
                  to="/services/yandex-direct"
                  className="hover:text-primary transition-colors"
                >
                  Яндекс Директ
                </Link>
              </li>
              <li>
                <Link
                  to="/cases"
                  className="hover:text-primary transition-colors"
                >
                  Кейсы
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Компания</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary transition-colors"
                >
                  О нас
                </Link>
              </li>
              <li>
                <Link
                  to="/contacts"
                  className="hover:text-primary transition-colors"
                >
                  Контакты
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-primary transition-colors"
                >
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-primary transition-colors"
                >
                  Условия использования
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Контакты</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex gap-3">
                <Phone size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <a href="tel:+74951234567" className="hover:text-primary transition-colors">
                  +7 (495) 123-45-67
                </a>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:hello@luminaagency.ru"
                  className="hover:text-primary transition-colors"
                >
                  hello@luminaagency.ru
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span>г. Ижевск, ул. Нижняя, 30</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/50">
              © {currentYear} НОБЕРЛИН. Все права защищены.
            </p>
            <div className="flex gap-6 text-sm text-white/50">
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Политика конфиденциальности
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
