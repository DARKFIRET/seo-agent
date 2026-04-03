import { motion } from "framer-motion";
import { X } from "lucide-react";
import type { Case } from "@shared/api";

const GRADIENTS = [
  "linear-gradient(135deg, #95C12B 0%, #7DA324 100%)",
  "linear-gradient(135deg, #A8E063 0%, #56AB2F 100%)",
  "linear-gradient(135deg, #D4FC79 0%, #96E6A1 100%)",
];

interface CaseModalProps {
  caseItem: Case;
  onClose: () => void;
}

export function CaseModal({ caseItem, onClose }: CaseModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl w-full max-w-4xl my-8 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header with Image */}
        <div
          className="relative h-48 md:h-64 bg-cover bg-center flex-shrink-0"
          style={
            caseItem.imageUrl
              ? { backgroundImage: `url(${caseItem.imageUrl})` }
              : { background: GRADIENTS[0] }
          }
        >
          <div className="absolute inset-0 bg-black/60" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors backdrop-blur-sm"
          >
            <X size={24} />
          </button>
          <div className="absolute bottom-6 left-6 right-6">
            <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full mb-3">
              {caseItem.category ?? "Кейс"}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white line-clamp-2">
              {caseItem.title}
            </h2>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 md:p-8 overflow-y-auto">
          {/* Highlight Stats Bar */}
          <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-border mb-6">
            {caseItem.trafficUp && (
              <div>
                <div className="text-sm text-foreground/60 mb-1">
                  Рост трафика
                </div>
                <div className="text-2xl font-bold text-accent">
                  {caseItem.trafficUp}
                </div>
              </div>
            )}
            {caseItem.roi && (
              <div>
                <div className="text-sm text-foreground/60 mb-1">ROI</div>
                <div className="text-2xl font-bold text-primary">
                  {caseItem.roi}
                </div>
              </div>
            )}
            {caseItem.duration && (
              <div>
                <div className="text-sm text-foreground/60 mb-1">Сроки</div>
                <div className="text-xl font-bold text-foreground">
                  {caseItem.duration}
                </div>
              </div>
            )}
            {caseItem.niche && (
              <div>
                <div className="text-sm text-foreground/60 mb-1">Ниша</div>
                <div className="text-lg font-semibold text-foreground/80">
                  {caseItem.niche}
                </div>
              </div>
            )}
          </div>

          {/* Main Body */}
          <div className="prose prose-lg max-w-none text-foreground/80">
            {caseItem.body ? (
              <div dangerouslySetInnerHTML={{ __html: caseItem.body }} />
            ) : (
              <>
                {caseItem.description && (
                  <p className="text-lg mb-6">{caseItem.description}</p>
                )}
                {caseItem.resultText && (
                  <div className="bg-secondary/50 p-6 rounded-xl border border-border">
                    <h3 className="text-xl font-bold text-foreground mt-0 mb-3">
                      Результат
                    </h3>
                    {caseItem.resultText}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
