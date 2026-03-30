export function EmptyState({
  title = "No results",
  description = "Try adjusting your filters.",
  action,
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div style={{ padding: 18, color: "#111" }}>
      <div style={{ fontWeight: 800 }}>{title}</div>
      <div className="ui-help" style={{ marginTop: 6 }}>
        {description}
      </div>
      {action && <div style={{ marginTop: 12 }}>{action}</div>}
    </div>
  );
}
