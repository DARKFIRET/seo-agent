import { AdminLayout } from "@/components/AdminLayout";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
};

export default function SEOManagement() {
  return (
    <AdminLayout>
      <div className="max-w-7xl">
        <motion.div {...fadeInUp} className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            SEO управление
          </h1>
          <p className="text-foreground/60">
            Управление SEO и оптимизацией
          </p>
        </motion.div>

        <motion.div
          {...fadeInUp}
          className="bg-white rounded-xl border-2 border-border p-8"
        >
          <p className="text-foreground/60">
            Раздел находится в разработке
          </p>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
