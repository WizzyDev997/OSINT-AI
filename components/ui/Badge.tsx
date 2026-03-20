"use client";

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  bg?: string;
}

export function Badge({ children, color = "#3b82f6", bg }: BadgeProps) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: 4,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: 0.5,
        textTransform: "uppercase",
        color,
        background: bg || `${color}18`,
        border: `1px solid ${color}30`,
      }}
    >
      {children}
    </span>
  );
}
