import { useState, useCallback, useTransition } from 'react';
import { AlertContext } from './alertContextDef';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  X
} from 'lucide-react';

export function AlertProvider({ children }) {
  // Modal State (middle and center)
  const [modal, setModal] = useState(null);
  // Toast State (optional quick pop-ups)
  const [toast, setToast] = useState(null);
  const [, startTransition] = useTransition();

  const closeModal = useCallback((result = false) => {
    startTransition(() => {
      if (modal?.resolve) {
        modal.resolve(result);
      }
      setModal(null);
    });
  }, [modal]);

  /**
   * Professional custom modal alert (replaces window.alert)
   * Pops in exact middle & center of viewport.
   *
   * @param {string|object} options Message string or config object { title, message, type, confirmText }
   */
  const showAlert = useCallback((options) => {
    return new Promise((resolve) => {
      const config = typeof options === 'string'
        ? { message: options }
        : (options || {});

      startTransition(() => {
        setModal({
          isOpen: true,
          isConfirm: false,
          title: config.title || 'Institutional Notice',
          message: config.message || '',
          type: config.type || 'info', // 'info' | 'success' | 'warning' | 'error'
          confirmText: config.confirmText || 'Acknowledged',
          resolve
        });
      });
    });
  }, []);

  /**
   * Professional custom modal confirmation (replaces window.confirm)
   * Pops in exact middle & center of viewport.
   *
   * @param {string|object} options Message string or config object { title, message, type, confirmText, cancelText }
   */
  const showConfirm = useCallback((options) => {
    return new Promise((resolve) => {
      const config = typeof options === 'string'
        ? { message: options }
        : (options || {});

      startTransition(() => {
        setModal({
          isOpen: true,
          isConfirm: true,
          title: config.title || 'Please Confirm Action',
          message: config.message || '',
          type: config.type || 'warning',
          confirmText: config.confirmText || 'Yes, Proceed',
          cancelText: config.cancelText || 'Cancel',
          destructive: config.destructive !== false,
          resolve
        });
      });
    });
  }, []);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    startTransition(() => {
      setToast({ id, message, type });
    });
    setTimeout(() => {
      startTransition(() => {
        setToast((current) => (current?.id === id ? null : current));
      });
    }, 4000);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-6 w-6 text-emerald-600" />;
      case 'error':
        return <XCircle className="h-6 w-6 text-rose-600" />;
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-amber-600" />;
      default:
        return <Info className="h-6 w-6 text-[#A68238]" />;
    }
  };

  const getBadgeStyle = (type) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'error':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'warning':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      default:
        return 'bg-[#FAF8F5] text-[#A68238] border-[#E3DCCB]';
    }
  };

  return (
    <AlertContext.Provider value={{ alert: showAlert, confirm: showConfirm, showToast }}>
      {children}

      {/* Professional Modal Pop-Up in Exact Middle and Center */}
      {modal && modal.isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop with elegant institutional blur */}
          <div
            onClick={() => closeModal(false)}
            className="fixed inset-0 bg-[#071322]/65 backdrop-blur-sm transition-opacity animate-fade-in"
          />

          {/* Modal Container: centered, responsive, institutional aesthetic */}
          <div className="relative z-10 w-full max-w-lg transform overflow-hidden rounded-2xl border border-[#E3DCCB] bg-white p-6 sm:p-8 text-left shadow-2xl transition-all animate-scale-up">
            {/* Header with Icon, Category & Close */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl border ${getBadgeStyle(modal.type)}`}>
                  {getIcon(modal.type)}
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#A68238]">
                    Khwopa Official Notification
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#101B2D] tracking-tight mt-0.5">
                    {modal.title}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => closeModal(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="mt-4 pt-3 border-t border-[#EFECE3]">
              <p className="text-sm sm:text-base leading-relaxed text-slate-600 whitespace-pre-line font-normal">
                {modal.message}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-[#EFECE3] flex flex-wrap items-center justify-end gap-3">
              {modal.isConfirm && (
                <button
                  type="button"
                  onClick={() => closeModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#E3DCCB] bg-[#FAF8F5] text-xs sm:text-sm font-semibold text-slate-700 hover:bg-white hover:text-[#101B2D] transition shadow-xs"
                >
                  {modal.cancelText || 'Cancel'}
                </button>
              )}
              <button
                type="button"
                autoFocus
                onClick={() => closeModal(true)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-md ${
                  modal.isConfirm && modal.destructive
                    ? 'bg-rose-700 hover:bg-rose-800 text-white'
                    : 'bg-[#101B2D] text-[#C5A15B] hover:bg-[#1B293E]'
                }`}
              >
                {modal.confirmText || 'Acknowledge'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Middle Toast (if activated) */}
      {toast && (
        <div className="fixed inset-x-0 top-6 z-[9998] flex justify-center pointer-events-none px-4">
          <div className="pointer-events-auto max-w-md w-full p-4 bg-[#101B2D] text-white rounded-2xl shadow-2xl flex items-center justify-between border-l-4 border-[#C5A15B] animate-fade-in gap-3">
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle2 className="h-5 w-5 text-[#C5A15B] shrink-0" />
              <span className="font-medium">{toast.message}</span>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
}

