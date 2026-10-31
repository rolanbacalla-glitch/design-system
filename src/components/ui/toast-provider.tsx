"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, Info } from "phosphor-react";

interface ToastContextType {
  showToast: (message: string, type?: "success" | "info") => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{ id: number; message: string; type: "success" | "info" } | null>(null);

  const showToast = useCallback((message: string, type: "success" | "info" = "success") => {
    const id = Date.now();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 2400);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] pointer-events-none animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <div
            style={{
              backdropFilter: "blur(40px) saturate(190%)",
              WebkitBackdropFilter: "blur(40px) saturate(190%)",
            }}
            className="liquid-glass-regular backdrop-blur-2xl px-4 py-2.5 rounded-full shadow-2xl border border-[var(--sys-outline)] flex items-center gap-2.5 text-xs font-medium text-[var(--sys-on-surface)]"
          >
            {toast.type === "success" ? (
              <CheckCircle size={16} weight="fill" className="text-emerald-400 shrink-0" />
            ) : (
              <Info size={16} weight="fill" className="text-[var(--sys-primary)] shrink-0" />
            )}
            <span className="truncate max-w-[280px] sm:max-w-md">{toast.message}</span>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};
