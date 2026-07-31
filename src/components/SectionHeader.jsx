import React from "react";

export default function SectionHeader({ eyebrow, title, children }) {
  return (
    <div data-reveal className="mx-auto mb-12 max-w-3xl text-center">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-labCyan">
        {eyebrow}
      </p>
      <h2 className="text-balance text-4xl font-semibold text-white md:text-6xl">
        {title}
      </h2>
      {children && (
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
          {children}
        </p>
      )}
    </div>
  );
}
