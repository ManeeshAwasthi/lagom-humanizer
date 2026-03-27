"use client";

interface ScorePillProps {
  score: number;
  label: string;
  size?: "sm" | "md";
}

function getColors(score: number) {
  if (score <= 30) {
    return {
      bg: "bg-emerald-950",
      border: "border-emerald-700",
      text: "text-emerald-400",
      dot: "bg-emerald-400",
    };
  }
  if (score <= 60) {
    return {
      bg: "bg-yellow-950",
      border: "border-yellow-700",
      text: "text-yellow-400",
      dot: "bg-yellow-400",
    };
  }
  if (score <= 80) {
    return {
      bg: "bg-orange-950",
      border: "border-orange-700",
      text: "text-orange-400",
      dot: "bg-orange-400",
    };
  }
  return {
    bg: "bg-red-950",
    border: "border-red-800",
    text: "text-red-400",
    dot: "bg-red-400",
  };
}

export default function ScorePill({ score, label, size = "md" }: ScorePillProps) {
  const colors = getColors(score);
  const isSmall = size === "sm";

  return (
    <span
      className={`score-pill inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-medium transition-all duration-400 ${colors.bg} ${colors.border} ${colors.text} ${isSmall ? "text-xs" : "text-xs"}`}
    >
      <span className={`inline-block w-1.5 h-1.5 rounded-full ${colors.dot}`} />
      <span>{score}</span>
      <span className="opacity-70">·</span>
      <span>{label}</span>
    </span>
  );
}
