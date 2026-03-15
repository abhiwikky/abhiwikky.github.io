import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { stagger, fadeUp } from "@/lib/animations";

const achievements = [
  { title: "CRACCON 2025", description: "Participated in workshops, technical labs, and CXO panels related to cybersecurity.", year: "2025" },
  { title: "DSCI AISS 2024", description: "Gained exposure to industry cybersecurity practices and emerging threat landscapes.", year: "2024" },
  { title: "Startup Seed Funding", description: "Secured INR 1,00,000 seed funding for early-stage startup development.", year: "2024" },
];

const AchievementsSection = () => {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <motion.div variants={fadeUp} className="label-caps mb-4">// ACHIEVEMENTS</motion.div>
      <motion.h2 variants={fadeUp} className="section-header mb-8">ACHIEVEMENTS_</motion.h2>

      <div className="relative">
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />
        <div className="space-y-6">
          {achievements.map((item) => (
            <motion.div key={item.title} variants={fadeUp} className="relative pl-12">
              <div className="absolute left-3 top-3 w-3 h-3 rounded-full bg-primary border-2 border-background" />
              <div className="surface-card border border-border rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" strokeWidth={1.5} />
                    <h3 className="font-mono-display text-base font-semibold text-foreground">{item.title}</h3>
                  </div>
                  <span className="font-mono-data text-muted-foreground">{item.year}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AchievementsSection;
