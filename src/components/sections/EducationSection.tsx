import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { stagger, fadeUp } from "@/lib/animations";

const education = [
  { institution: "Lovely Professional University", location: "Jalandhar, Punjab", degree: "B.Tech — CSE (Honours)", detail: "CGPA: 7.38", period: "Aug 2022 – Present" },
  { institution: "Sree Narayana Central School", location: "Mavelikkara, Kerala", degree: "12th Grade — Science", detail: "98%", period: "" },
  { institution: "Sree Narayana Central School", location: "Mavelikkara, Kerala", degree: "10th Grade — Science", detail: "91.4%", period: "" },
];

const EducationSection = () => {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <motion.div variants={fadeUp} className="label-caps mb-4">// EDUCATION</motion.div>
      <motion.h2 variants={fadeUp} className="section-header mb-8">EDUCATION_</motion.h2>

      <div className="space-y-4">
        {education.map((edu) => (
          <motion.div key={edu.degree} variants={fadeUp} className="surface-card border border-border rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                <GraduationCap className="h-5 w-5 text-primary" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="font-mono-display text-base font-semibold text-foreground">{edu.institution}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{edu.location}</p>
                  </div>
                  {edu.period && <span className="font-mono-data text-muted-foreground shrink-0">{edu.period}</span>}
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <span className="tech-pill text-[11px]">{edu.degree}</span>
                  <span className="text-sm text-accent">{edu.detail}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default EducationSection;
