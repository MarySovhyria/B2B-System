import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string | null;
  hint?: string;
};

export function Input({ label, error, hint, style, id, ...rest }: Props) {
  const inputId = id ?? rest.name ?? undefined;

  return (
    <div className="ui-col">
      {label && (
        <label className="ui-label" htmlFor={inputId}>
          {label}
        </label>
      )}

      <input
        {...rest}
        id={inputId}
        className="ui-focus"
        style={{
          padding: "10px 12px",
          borderRadius: 10,
          border: error ? "1px solid #d33" : "1px solid #ccc",
          outline: "none",
          ...style,
        }}
      />

      {error ? (
        <div className="ui-error">{error}</div>
      ) : hint ? (
        <div className="ui-help">{hint}</div>
      ) : null}
    </div>
  );
}
