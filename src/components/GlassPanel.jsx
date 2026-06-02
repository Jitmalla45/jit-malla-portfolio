import { motion } from "framer-motion";
import React from "react";

export default function GlassPanel({ children, className = "", ...props }) {
  return (
    <motion.div
      className={`glass-panel rounded-lg border border-white/10 bg-white/[0.065] shadow-panel backdrop-blur-2xl ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
