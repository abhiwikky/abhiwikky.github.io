import { motion } from "framer-motion";

interface SectionBackgroundProps {
  sectionId: string;
  direction: number;
}

// Wireframe geometric node with label
const WireNode = ({
  x,
  y,
  delay = 0,
  label,
}: {
  x: string;
  y: string;
  delay?: number;
  label?: string;
}) => (
  <motion.div
    className="absolute"
    style={{ left: x, top: y }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="relative">
      <div className="w-3 h-3 rounded-full border border-primary/40 bg-primary/10" />
      <div className="absolute inset-0 w-3 h-3 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: "3s" }} />
      {label && (
        <span className="absolute left-5 top-0 font-mono-data text-[9px] text-primary/30 whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  </motion.div>
);

// Animated wireframe line
const WireLine = ({
  x1,
  y1,
  x2,
  y2,
  delay = 0,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay?: number;
}) => (
  <motion.line
    x1={`${x1}%`}
    y1={`${y1}%`}
    x2={`${x2}%`}
    y2={`${y2}%`}
    stroke="hsl(210, 100%, 50%)"
    strokeWidth="0.5"
    strokeOpacity="0.15"
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
  />
);

// Geometric shape outlines
const WireShape = ({
  type,
  x,
  y,
  size,
  rotation = 0,
  delay = 0,
  color = "primary",
}: {
  type: "circle" | "square" | "diamond" | "hexagon";
  x: string;
  y: string;
  size: number;
  rotation?: number;
  delay?: number;
  color?: "primary" | "accent";
}) => {
  const colorClass = color === "primary" ? "border-primary/20" : "border-accent/25";
  const glowColor = color === "primary" ? "shadow-primary/5" : "shadow-accent/5";

  const shapeStyles: Record<string, string> = {
    circle: `rounded-full ${colorClass}`,
    square: `${colorClass}`,
    diamond: `${colorClass} rotate-45`,
    hexagon: `rounded-xl ${colorClass}`,
  };

  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.3, rotate: rotation - 20 }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
    >
      <div
        className={`border ${shapeStyles[type]} shadow-lg ${glowColor}`}
        style={{ width: size, height: size }}
      />
    </motion.div>
  );
};

// Floating grid pattern
const FloatingGrid = ({ x, y, delay = 0 }: { x: string; y: string; delay?: number }) => (
  <motion.div
    className="absolute"
    style={{ left: x, top: y }}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 0.12, y: 0 }}
    transition={{ duration: 1.2, delay }}
  >
    <div className="grid grid-cols-4 gap-3">
      {Array.from({ length: 16 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-2 h-2 border border-primary/25 rounded-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5] }}
          transition={{ duration: 2, delay: delay + i * 0.05, repeat: Infinity, repeatType: "reverse" }}
        />
      ))}
    </div>
  </motion.div>
);

// Scanning line effect
const ScanLine = ({ direction: dir, delay = 0 }: { direction: "horizontal" | "vertical"; delay?: number }) => (
  <motion.div
    className={`absolute ${dir === "horizontal" ? "left-0 right-0 h-px" : "top-0 bottom-0 w-px"}`}
    style={dir === "horizontal" ? { top: "50%" } : { left: "50%" }}
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 0.15, 0] }}
    transition={{ duration: 3, delay, repeat: Infinity, ease: "easeInOut" }}
  >
    <div
      className={`${
        dir === "horizontal"
          ? "w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          : "h-full w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent"
      }`}
    />
  </motion.div>
);

const sectionElements: Record<string, React.ReactNode> = {
  about: (
    <>
      <WireShape type="circle" x="75%" y="8%" size={280} delay={0.1} />
      <WireShape type="diamond" x="5%" y="60%" size={160} rotation={0} delay={0.3} color="accent" />
      <WireShape type="square" x="82%" y="55%" size={100} rotation={15} delay={0.4} />
      <FloatingGrid x="70%" y="70%" delay={0.2} />
      <WireNode x="80%" y="15%" delay={0.2} label="0x01" />
      <WireNode x="90%" y="30%" delay={0.35} label="0xA3" />
      <WireNode x="72%" y="40%" delay={0.5} label="0xF7" />
      <WireNode x="85%" y="50%" delay={0.4} />
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <WireLine x1={80} y1={17} x2={90} y2={32} delay={0.3} />
        <WireLine x1={90} y1={32} x2={72} y2={42} delay={0.5} />
        <WireLine x1={72} y1={42} x2={85} y2={52} delay={0.6} />
        <WireLine x1={85} y1={52} x2={80} y2={17} delay={0.7} />
      </svg>
      <ScanLine direction="horizontal" delay={1} />
    </>
  ),
  projects: (
    <>
      <WireShape type="square" x="8%" y="5%" size={200} rotation={12} delay={0.1} />
      <WireShape type="circle" x="78%" y="60%" size={180} delay={0.25} color="accent" />
      <WireShape type="hexagon" x="70%" y="8%" size={120} rotation={-8} delay={0.35} />
      <FloatingGrid x="80%" y="15%" delay={0.15} />
      <WireNode x="15%" y="20%" delay={0.2} label="proj" />
      <WireNode x="25%" y="10%" delay={0.3} label="git" />
      <WireNode x="5%" y="35%" delay={0.4} />
      <WireNode x="88%" y="45%" delay={0.35} label="src" />
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <WireLine x1={15} y1={22} x2={25} y2={12} delay={0.3} />
        <WireLine x1={15} y1={22} x2={5} y2={37} delay={0.45} />
        <WireLine x1={70} y1={15} x2={88} y2={47} delay={0.5} />
      </svg>
      <ScanLine direction="vertical" delay={0.8} />
    </>
  ),
  skills: (
    <>
      <WireShape type="circle" x="80%" y="5%" size={240} delay={0.1} />
      <WireShape type="diamond" x="75%" y="65%" size={140} delay={0.3} color="accent" />
      <FloatingGrid x="85%" y="40%" delay={0.2} />
      {[
        { x: "78%", y: "12%", label: "sys", d: 0.15 },
        { x: "92%", y: "20%", label: "net", d: 0.25 },
        { x: "85%", y: "35%", label: "sec", d: 0.35 },
        { x: "75%", y: "50%", label: "dev", d: 0.45 },
        { x: "90%", y: "55%", label: "ops", d: 0.5 },
        { x: "82%", y: "70%", d: 0.55 },
      ].map((n, i) => (
        <WireNode key={i} x={n.x} y={n.y} delay={n.d} label={n.label} />
      ))}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <WireLine x1={78} y1={14} x2={92} y2={22} delay={0.3} />
        <WireLine x1={92} y1={22} x2={85} y2={37} delay={0.4} />
        <WireLine x1={85} y1={37} x2={75} y2={52} delay={0.5} />
        <WireLine x1={75} y1={52} x2={90} y2={57} delay={0.55} />
        <WireLine x1={90} y1={57} x2={82} y2={72} delay={0.6} />
        <WireLine x1={82} y1={72} x2={78} y2={14} delay={0.7} />
      </svg>
      <ScanLine direction="horizontal" delay={1.2} />
    </>
  ),
  certifications: (
    <>
      <WireShape type="hexagon" x="10%" y="8%" size={180} rotation={10} delay={0.1} />
      <WireShape type="circle" x="80%" y="55%" size={220} delay={0.2} color="accent" />
      <WireShape type="square" x="75%" y="10%" size={90} rotation={20} delay={0.35} />
      <FloatingGrid x="5%" y="70%" delay={0.25} />
      <WireNode x="20%" y="15%" delay={0.2} label="cert" />
      <WireNode x="85%" y="25%" delay={0.3} label="key" />
      <WireNode x="90%" y="70%" delay={0.4} />
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <WireLine x1={20} y1={17} x2={75} y2={15} delay={0.4} />
        <WireLine x1={85} y1={27} x2={90} y2={72} delay={0.5} />
      </svg>
      <ScanLine direction="vertical" delay={0.6} />
    </>
  ),
  achievements: (
    <>
      <WireShape type="diamond" x="80%" y="10%" size={200} delay={0.1} />
      <WireShape type="circle" x="8%" y="55%" size={160} delay={0.25} color="accent" />
      <FloatingGrid x="75%" y="60%" delay={0.2} />
      <WireNode x="85%" y="18%" delay={0.2} label="ach" />
      <WireNode x="92%" y="35%" delay={0.3} label="flag" />
      <WireNode x="78%" y="45%" delay={0.4} />
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <WireLine x1={85} y1={20} x2={92} y2={37} delay={0.35} />
        <WireLine x1={92} y1={37} x2={78} y2={47} delay={0.5} />
        <WireLine x1={78} y1={47} x2={85} y2={20} delay={0.6} />
      </svg>
      <ScanLine direction="horizontal" delay={0.8} />
    </>
  ),
  education: (
    <>
      <WireShape type="circle" x="5%" y="10%" size={200} delay={0.1} />
      <WireShape type="square" x="78%" y="55%" size={150} rotation={-10} delay={0.25} color="accent" />
      <FloatingGrid x="82%" y="12%" delay={0.2} />
      <WireNode x="12%" y="20%" delay={0.2} label="edu" />
      <WireNode x="8%" y="40%" delay={0.35} label="grad" />
      <WireNode x="85%" y="65%" delay={0.4} />
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <WireLine x1={12} y1={22} x2={8} y2={42} delay={0.4} />
        <WireLine x1={78} y1={60} x2={85} y2={67} delay={0.5} />
      </svg>
      <ScanLine direction="vertical" delay={1} />
    </>
  ),
  contact: (
    <>
      <WireShape type="circle" x="78%" y="8%" size={260} delay={0.1} />
      <WireShape type="diamond" x="8%" y="60%" size={140} delay={0.25} color="accent" />
      <WireShape type="hexagon" x="85%" y="65%" size={100} rotation={15} delay={0.4} />
      <FloatingGrid x="5%" y="15%" delay={0.15} />
      <WireNode x="82%" y="15%" delay={0.2} label="tx" />
      <WireNode x="90%" y="30%" delay={0.3} label="rx" />
      <WireNode x="75%" y="42%" delay={0.4} label="sig" />
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <WireLine x1={82} y1={17} x2={90} y2={32} delay={0.35} />
        <WireLine x1={90} y1={32} x2={75} y2={44} delay={0.5} />
        <WireLine x1={75} y1={44} x2={82} y2={17} delay={0.6} />
      </svg>
      <ScanLine direction="horizontal" delay={0.9} />
    </>
  ),
};

const SectionBackground = ({ sectionId, direction }: SectionBackgroundProps) => {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      initial={{ opacity: 0, y: direction > 0 ? 80 : -80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      {sectionElements[sectionId] || null}
    </motion.div>
  );
};

export default SectionBackground;
