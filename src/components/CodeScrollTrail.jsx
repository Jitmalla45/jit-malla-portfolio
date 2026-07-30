import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";

const nodes = [
  { id: "vision", x: 12, y: 23, label: "Computer Vision", tone: "cyan" },
  { id: "detection", x: 26, y: 14, label: "Object Detection", tone: "mint" },
  { id: "segmentation", x: 21, y: 40, label: "Segmentation", tone: "gold" },
  { id: "scene", x: 40, y: 30, label: "Scene Graphs", tone: "cyan" },
  { id: "relations", x: 49, y: 48, label: "Spatial Relations", tone: "mint" },
  { id: "vlm", x: 64, y: 18, label: "Vision-Language", tone: "rose" },
  { id: "grounding", x: 76, y: 31, label: "Grounding", tone: "cyan" },
  { id: "gnn", x: 86, y: 48, label: "Graph Neural Nets", tone: "mint" },
  { id: "message", x: 70, y: 58, label: "Message Passing", tone: "gold" },
  { id: "logic", x: 58, y: 72, label: "Neurosymbolic AI", tone: "cyan" },
  { id: "constraints", x: 39, y: 77, label: "Symbolic Constraints", tone: "rose" },
  { id: "trust", x: 20, y: 70, label: "Trustworthy AI", tone: "mint" },
  { id: "explain", x: 33, y: 58, label: "Explainable Inference", tone: "gold" },
  { id: "policy", x: 73, y: 80, label: "Policy Alignment", tone: "cyan" },
];

const links = [
  ["vision", "detection"],
  ["vision", "segmentation"],
  ["vision", "scene"],
  ["segmentation", "scene"],
  ["detection", "vlm"],
  ["scene", "relations"],
  ["scene", "vlm"],
  ["relations", "explain"],
  ["relations", "message"],
  ["vlm", "grounding"],
  ["grounding", "gnn"],
  ["vlm", "gnn"],
  ["gnn", "message"],
  ["message", "logic"],
  ["gnn", "logic"],
  ["logic", "constraints"],
  ["constraints", "trust"],
  ["logic", "trust"],
  ["logic", "policy"],
  ["policy", "trust"],
  ["scene", "logic"],
  ["vision", "logic"],
  ["trust", "vision"],
];

const nodeById = Object.fromEntries(nodes.map((node) => [node.id, node]));

const narrativePaths = [
  "M 6 28 C 24 5, 45 12, 61 26 S 82 52, 94 31",
  "M 9 72 C 28 55, 35 86, 55 68 S 78 58, 93 78",
  "M 18 12 C 35 36, 44 40, 61 44 S 82 31, 89 55",
  "M 14 88 C 31 65, 44 55, 58 70 S 73 91, 88 64",
];

export default function CodeScrollTrail() {
  const [canAnimateBackground, setCanAnimateBackground] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const update = () => setCanAnimateBackground(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  if (prefersReducedMotion || !canAnimateBackground) {
    return null;
  }

  return <ResearchScrollTrail />;
}

function ResearchScrollTrail() {
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 46, damping: 18, mass: 0.8 });
  const y = useTransform(smoothScroll, [0, 1], ["-5%", "9%"]);
  const rotate = useTransform(smoothScroll, [0, 1], [-4, 6]);
  const scale = useTransform(smoothScroll, [0, 0.45, 1], [0.93, 1.06, 0.98]);
  const orbitRotate = useTransform(smoothScroll, [0, 1], [0, 54]);
  const graphX = useTransform(smoothScroll, [0, 0.35, 0.7, 1], ["-3%", "2%", "-1%", "3%"]);
  const graphY = useTransform(smoothScroll, [0, 0.35, 0.7, 1], ["2%", "-3%", "1%", "4%"]);
  const depthShift = useTransform(smoothScroll, [0, 1], ["-10%", "12%"]);
  const inverseDepthShift = useTransform(smoothScroll, [0, 1], ["10%", "-11%"]);
  const perceptionOpacity = useTransform(smoothScroll, [0, 0.18, 0.34], [0.75, 0.55, 0.2]);
  const reasoningOpacity = useTransform(smoothScroll, [0.2, 0.42, 0.65], [0.15, 0.72, 0.25]);
  const alignmentOpacity = useTransform(smoothScroll, [0.55, 0.78, 1], [0.12, 0.7, 0.46]);
  const ribbonProgress = useTransform(smoothScroll, [0, 1], [0.12, 1]);

  return (
    <div className="code-scroll-trail" aria-hidden="true">
      <motion.div className="research-field" style={{ y, rotate, scale }}>
        <motion.div className="research-depth research-depth-a" style={{ x: depthShift }} />
        <motion.div className="research-depth research-depth-b" style={{ x: inverseDepthShift }} />
        <motion.div className="research-phase research-phase-perception" style={{ opacity: perceptionOpacity }}>
          <span>perception</span>
        </motion.div>
        <motion.div className="research-phase research-phase-reasoning" style={{ opacity: reasoningOpacity }}>
          <span>reasoning</span>
        </motion.div>
        <motion.div className="research-phase research-phase-alignment" style={{ opacity: alignmentOpacity }}>
          <span>alignment</span>
        </motion.div>
        <motion.div className="research-compass" style={{ rotate: orbitRotate }}>
          <span />
          <span />
          <span />
          <span />
        </motion.div>

        <motion.svg
          className="research-graph"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ x: graphX, y: graphY }}
        >
          <defs>
            <linearGradient id="researchEdge" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#35f3ff" stopOpacity="0.12" />
              <stop offset="45%" stopColor="#64ffbd" stopOpacity="0.54" />
              <stop offset="100%" stopColor="#ffd166" stopOpacity="0.16" />
            </linearGradient>
          </defs>
          {narrativePaths.map((path, index) => (
            <motion.path
              key={path}
              d={path}
              className={`research-ribbon research-ribbon-${index + 1}`}
              pathLength={ribbonProgress}
              style={{ animationDelay: `${index * 0.9}s` }}
            />
          ))}
          {links.map(([fromId, toId], index) => {
            const from = nodeById[fromId];
            const to = nodeById[toId];

            return (
              <line
                key={`${fromId}-${toId}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                className="research-edge"
                style={{ animationDelay: `${index * 0.24}s` }}
              />
            );
          })}
          {nodes.map((node, index) => (
            <g
              key={node.id}
              className={`research-node research-node-${node.tone}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <circle cx={node.x} cy={node.y} r="1.2" />
              <circle cx={node.x} cy={node.y} r="3.8" className="research-node-halo" />
            </g>
          ))}
        </motion.svg>

        <div className="circuit-scan circuit-scan-one" />
        <div className="circuit-scan circuit-scan-two" />
        <div className="circuit-scan circuit-scan-three" />
        <div className="inference-ripple inference-ripple-one" />
        <div className="inference-ripple inference-ripple-two" />

        {nodes.map((node, index) => (
          <span
            key={node.label}
            className={`research-label research-label-${node.tone}`}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              animationDelay: `${index * 0.28}s`,
            }}
          >
            {node.label}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
