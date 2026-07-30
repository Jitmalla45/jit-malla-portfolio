import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";

const codeRows = [
  "graph.reason(nodes, edges)",
  "vision.encode(frame)",
  "policy.align(signal)",
  "trust.verify(trace)",
  "model.explain(output)",
  "logic.compose(rule)",
];

export default function CodeScrollTrail() {
  const { scrollYProgress } = useScroll();
  const yPrimary = useTransform(scrollYProgress, [0, 1], ["0%", "-42%"]);
  const ySecondary = useTransform(scrollYProgress, [0, 1], ["18%", "-32%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  return (
    <div className="code-scroll-trail" aria-hidden="true">
      <motion.div className="code-stream code-stream-left" style={{ y: yPrimary }}>
        {[...codeRows, ...codeRows].map((row, index) => (
          <span key={`${row}-${index}`}>{row}</span>
        ))}
      </motion.div>
      <motion.div className="code-orbit" style={{ rotate }}>
        <span />
        <span />
        <span />
      </motion.div>
      <motion.div className="code-stream code-stream-right" style={{ y: ySecondary }}>
        {[...codeRows].reverse().concat(codeRows).map((row, index) => (
          <span key={`${row}-${index}`}>{row}</span>
        ))}
      </motion.div>
    </div>
  );
}
