import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageOff } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  title: string;
}

const CertificateModal = ({ isOpen, onClose, image, title }: Props) => {
  const [errored, setErrored] = useState(false);

  // Reseta o estado de erro sempre que a imagem mudar (modal reaproveitado).
  useEffect(() => {
    setErrored(false);
  }, [image]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-card rounded-xl p-4 max-w-xl w-full border border-border"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-4 text-center">{title}</h3>

            {errored ? (
              <div className="flex flex-col items-center justify-center gap-3 rounded-lg bg-secondary py-16 text-muted-foreground">
                <ImageOff className="h-8 w-8" />
                <span className="text-sm">Imagem do certificado indisponível.</span>
              </div>
            ) : (
              <img
                src={image}
                alt={title}
                loading="lazy"
                onError={() => setErrored(true)}
                className="w-full rounded-lg"
              />
            )}

            <button
              onClick={onClose}
              className="mt-4 w-full py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              Fechar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CertificateModal;
