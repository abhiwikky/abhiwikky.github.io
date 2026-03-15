import { motion } from "framer-motion";

interface SectionBackgroundProps {
  sectionId: string;
  direction: number;
}

// Each section gets unique geometric shapes that parallax with the transition
const sectionElements: Record<string, React.ReactNode> = {
  about: (
    <>
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 0.06, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-[10%] right-[8%] w-72 h-72 border border-primary/20 rounded-full"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.04, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.2 }}
        className="absolute bottom-[15%] left-[5%] w-96 h-96 border border-accent/15 rotate-45"
      />
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 0.05, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-[30%] right-[25%] w-1 h-32 bg-gradient-to-b from-primary/30 to-transparent"
      />
    </>
  ),
  projects: (
    <>
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 0.05, rotate: 15 }}
        transition={{ duration: 1.2 }}
        className="absolute top-[5%] left-[10%] w-64 h-64 border border-primary/20"
      />
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 0.04, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-[10%] right-[12%] w-48 h-48 border border-accent/15 rounded-full"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.06 }}
        transition={{ duration: 1.4, delay: 0.1 }}
        className="absolute top-[50%] left-[50%] w-px h-64 bg-gradient-to-b from-transparent via-primary/40 to-transparent -translate-x-1/2"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.03, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="absolute top-[20%] right-[30%] w-32 h-32 rotate-12 border border-muted/30"
      />
    </>
  ),
  skills: (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 1.3 }}
        className="absolute top-[8%] right-[5%] w-80 h-80 rounded-full border border-primary/15"
      />
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 0.04, x: 0 }}
        transition={{ duration: 1, delay: 0.15 }}
        className="absolute bottom-[20%] left-[8%] w-40 h-40 border border-accent/20 rotate-[30deg]"
      />
      {/* Node-like dots */}
      {[
        { top: "15%", left: "60%", delay: 0.2 },
        { top: "35%", left: "80%", delay: 0.35 },
        { top: "60%", left: "70%", delay: 0.5 },
        { top: "75%", left: "85%", delay: 0.4 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.12, scale: 1 }}
          transition={{ duration: 0.6, delay: dot.delay }}
          className="absolute w-2 h-2 rounded-full bg-primary/40"
          style={{ top: dot.top, left: dot.left }}
        />
      ))}
    </>
  ),
  certifications: (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 0.04, y: 0 }}
        transition={{ duration: 1.2 }}
        className="absolute top-[10%] left-[15%] w-56 h-56 rounded-2xl border border-primary/15 rotate-[20deg]"
      />
      <motion.div
        initial={{ opacity: 0, rotate: -20 }}
        animate={{ opacity: 0.05, rotate: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-[8%] right-[10%] w-72 h-72 border border-accent/10 rounded-full"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.06 }}
        transition={{ duration: 1.4, delay: 0.3 }}
        className="absolute top-[40%] right-[20%] w-px h-48 bg-gradient-to-b from-transparent via-accent/30 to-transparent"
      />
    </>
  ),
  achievements: (
    <>
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 0.05, x: 0 }}
        transition={{ duration: 1.2 }}
        className="absolute top-[12%] right-[8%] w-64 h-1 bg-gradient-to-r from-primary/30 to-transparent"
      />
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 0.05, x: 0 }}
        transition={{ duration: 1.2, delay: 0.15 }}
        className="absolute top-[45%] right-[5%] w-48 h-1 bg-gradient-to-l from-accent/20 to-transparent"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.04, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-[15%] left-[10%] w-52 h-52 border border-primary/15 rotate-45"
      />
    </>
  ),
  education: (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 0.05, y: 0 }}
        transition={{ duration: 1.2 }}
        className="absolute top-[8%] left-[8%] w-60 h-60 rounded-full border border-primary/15"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 0.04, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute bottom-[10%] right-[15%] w-44 h-44 border border-accent/15 rounded-lg rotate-[15deg]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.06 }}
        transition={{ duration: 1.4, delay: 0.25 }}
        className="absolute top-[55%] left-[50%] w-40 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />
    </>
  ),
  contact: (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 0.06, scale: 1 }}
        transition={{ duration: 1.4 }}
        className="absolute top-[10%] right-[10%] w-80 h-80 rounded-full border border-primary/20"
      />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 0.04, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-[20%] left-[12%] w-48 h-48 border border-accent/15 rotate-[25deg]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="absolute top-[30%] left-[30%] w-1 h-40 bg-gradient-to-b from-primary/20 to-transparent"
      />
    </>
  ),
};

const SectionBackground = ({ sectionId, direction }: SectionBackgroundProps) => {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      initial={{ opacity: 0, y: direction > 0 ? 60 : -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {sectionElements[sectionId] || null}
    </motion.div>
  );
};

export default SectionBackground;
