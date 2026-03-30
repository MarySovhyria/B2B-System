import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type ToastType = "success" | "error" | "info";

type ToastItem = {
  id: string;
  type: ToastType;
  message: string;
};

type ToastApi = {
  push: (t: { type?: ToastType; message: string; timeoutMs?: number }) => void;
};

const ToastContext = createContext<ToastApi | null>(null);

function id() {
  return Math.random().toString(16).slice(2);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const push = useCallback(
    (t: { type?: ToastType; message: string; timeoutMs?: number }) => {
      const toast: ToastItem = {
        id: id(),
        type: t.type ?? "info",
        message: t.message,
      };
      setToasts((prev) => [toast, ...prev]);

      const timeout = t.timeoutMs ?? 1800;
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== toast.id));
      }, timeout);
    },
    [],
  );

  const api = useMemo(() => ({ push }), [push]);

  return (
    <ToastContext.Provider value={api}>
      {children}

      <div
        style={{
          position: "fixed",
          right: 16,
          bottom: 16,
          display: "grid",
          gap: 10,
          zIndex: 60,
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="ui-card"
            style={{
              padding: "10px 12px",
              minWidth: 260,
              borderColor:
                t.type === "success"
                  ? "#bfe8cc"
                  : t.type === "error"
                    ? "#f2b8b8"
                    : "#e6e6e6",
              background:
                t.type === "success"
                  ? "#e8f7ee"
                  : t.type === "error"
                    ? "#fdecec"
                    : "white",
            }}
          >
            <div style={{ fontSize: 14, color: "#111" }}>{t.message}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
