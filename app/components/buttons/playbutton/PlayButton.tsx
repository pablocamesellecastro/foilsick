"use client";

export default function PlayButton({ active, play, stop, size = 40 }) {
  return (
    <button
      onClick={active ? stop : play}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: active ? "#4f46e5" : "#111",
        color: "white",
        border: "none",
        cursor: "pointer",
      }}
    >
      {active ? "⏸" : "▶️"}
    </button>
  );
}
