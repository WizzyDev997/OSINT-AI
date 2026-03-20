"use client";

interface StarRatingProps {
  value: number;
  max?: number;
  size?: number;
}

export function StarRating({ value, max = 5, size = 14 }: StarRatingProps) {
  return (
    <span style={{ display: "inline-flex", gap: 1 }}>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          style={{ color: i < value ? "#f59e0b" : "#374151", fontSize: size, lineHeight: 1 }}
        >
          ★
        </span>
      ))}
    </span>
  );
}
