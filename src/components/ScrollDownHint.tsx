"use client";

import { useCallback, useEffect, useState } from "react";

type ScrollDownHintProps = {
  targetId?: string;
  label?: string;
};

export default function ScrollDownHint({
  targetId = "below-content",
  label = "아래로 내리면 더 볼 수 있어요",
}: ScrollDownHintProps) {
  const [visible, setVisible] = useState(true);

  const scrollToTarget = useCallback(() => {
    const target = document.getElementById(targetId);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [targetId]);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const updateVisibility = () => {
      const scrolled = window.scrollY > 120;
      const rect = target.getBoundingClientRect();
      const targetVisible = rect.top < window.innerHeight * 0.85;
      setVisible(!scrolled && !targetVisible);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(false);
      },
      { threshold: 0.15, rootMargin: "-80px 0px 0px 0px" },
    );
    observer.observe(target);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
      observer.disconnect();
    };
  }, [targetId]);

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <button
        type="button"
        onClick={scrollToTarget}
        className="pointer-events-auto group flex flex-col items-center gap-1 rounded-full border border-gray-200/80 bg-white/90 px-5 py-3 shadow-lg backdrop-blur-sm transition hover:border-blue-200 hover:bg-blue-50/90 hover:shadow-xl active:scale-95"
        aria-label={label}
      >
        <span className="text-xs font-medium text-gray-600 transition group-hover:text-blue-700">
          {label}
        </span>
        <span className="flex flex-col items-center text-gray-400 transition group-hover:text-blue-500">
          <svg
            className="scroll-hint-chevron -mb-2 h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
          <svg
            className="scroll-hint-chevron scroll-hint-chevron-delay h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>
    </div>
  );
}
