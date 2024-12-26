import "katex/dist/katex.min.css";
import "../../app/globals.css";
import katex from "katex";
import { TMathBlock } from "@/types";
import { useEffect, useRef } from "react";

export const MathBlock = ({ block }: { block: TMathBlock }) => {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (element.current) {
      katex.render("c = \\pm\\sqrt{a^2 + b^2}", element.current, {
        throwOnError: false,
      });
    }
  }, [element]);

  return (
    <div className="border all-initial math-block">
      <div ref={element} id={block.id} className="py-5 h-200 w-200 text-5xl" />
    </div>
  );
};
