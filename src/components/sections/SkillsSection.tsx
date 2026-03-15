import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { stagger, fadeUp } from "@/lib/animations";

const skillCategories: Record<string, string[]> = {
  Languages: ["Python", "Bash", "C++", "Rust"],
  "Operating Systems": ["Linux", "Windows"],
  "Security Tools": ["Nmap", "Nessus", "Burp Suite", "Wireshark", "Metasploit", "Hydra", "FTK Imager", "Autopsy", "Splunk"],
  "Platforms & Tech": ["Git", "Docker", "AWS"],
  "Frameworks & Knowledge": ["MITRE ATT&CK", "OWASP Top 10", "OSINT"],
  "Soft Skills": ["Problem Solving", "Adaptability", "Communication", "Team Management", "Leadership"],
};

const categories = Object.keys(skillCategories);

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const activeSkills = useMemo(() => skillCategories[activeCategory] || [], [activeCategory]);
  const activeCatIdx = categories.indexOf(activeCategory);

  const catY = (idx: number) => 40 + idx * 64;
  const skillY = (idx: number) => 40 + idx * 44;

  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <motion.div variants={fadeUp} className="label-caps mb-4">// SKILLS</motion.div>
      <motion.h2 variants={fadeUp} className="section-header mb-8">SKILLS_</motion.h2>

      <motion.div variants={fadeUp} className="relative flex gap-8 min-h-[500px]">
        <div className="w-48 shrink-0 space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                activeCategory === cat ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full shrink-0 transition-colors ${activeCategory === cat ? "bg-primary" : "bg-muted"}`} />
                <span className="font-mono-data uppercase tracking-wider text-[11px]">{cat}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="w-24 relative hidden md:block">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <AnimatePresence>
              {activeSkills.map((_, idx) => (
                <motion.path
                  key={`${activeCategory}-${idx}`}
                  d={`M 0 ${catY(activeCatIdx)} C 48 ${catY(activeCatIdx)}, 48 ${skillY(idx)}, 96 ${skillY(idx)}`}
                  fill="none"
                  stroke="hsl(210, 100%, 50%)"
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ pathLength: 0, opacity: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.03 }}
                />
              ))}
            </AnimatePresence>
          </svg>
        </div>

        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              {activeSkills.map((skill) => (
                <div key={skill} className="surface-card border border-border rounded-lg px-4 py-3 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  <span className="text-sm text-foreground">{skill}</span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SkillsSection;
