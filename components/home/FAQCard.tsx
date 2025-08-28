"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

function FAQCard({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="cursor-pointer border-b border-black/25 pb-6"
      onClick={() => setIsOpen((isOpen) => !isOpen)}
    >
      <p className="font-ibm flex items-center justify-between gap-8 font-medium">
        {q}
        <ChevronDown
          className={`w-5 flex-none transition-[rotate] duration-150 ${isOpen ? "rotate-180" : ""}`}
        />
      </p>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "mt-4 max-h-200 lg:mt-5" : "max-h-0 opacity-0"}`}
      >
        {a}
      </div>
    </div>
  );
}

export default FAQCard;
