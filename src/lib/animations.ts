// Shared animation variants for framer-motion
export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};
