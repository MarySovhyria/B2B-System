import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "danger";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  loading?: boolean;
};

export function Button({
  variant = "primary",
  loading = false,
  disabled,
  children,
  style,
  ...rest
}: Props) {
  const isDisabled = disabled || loading;

  const stylesByVariant: Record<Variant, React.CSSProperties> = {
    primary: { background: "#111", color: "white", border: "1px solid #111" },
    secondary: { background: "white", color: "#111", border: "1px solid #ddd" },
    danger: { background: "#d33", color: "white", border: "1px solid #d33" },
  };

  return (
    <button
      {...rest}
      disabled={isDisabled}
      className="ui-focus"
      style={{
        padding: "10px 14px",
        borderRadius: 10,
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.75 : 1,
        height: 40,
        ...stylesByVariant[variant],
        ...style,
      }}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
