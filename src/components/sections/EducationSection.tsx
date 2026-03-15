import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] } },
};

const education = [
  {
    institution: "Lovely Professional University",
    location: "Jalandhar, Punjab",
    degree: "Bachelor of Technology — CSE (Honours)",
    detail: "CGPA: 7.38",
    period: "Aug 2022 – Present",
  },
  {
    institution: "Sree Narayana Central School",
    location: "Mavelikkara, Kerala",
    degree: "12th Grade — Science",
    detail: "Percentage: 98%",
    period: "",
  },
  {
    institution: "Sree Narayana Central School",
    location: "Mavelikkara, Kerala",
    degree: "10th Grade — Science",
    detail: "Percentage: 91.4%",
    period: "",
  },
];

const EducationSection = () => {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <motion.div variants={fadeUp} className="label-caps mb-4">// EDUCATION</motion.div>
      <motion.h2 variants={fadeUp} className="section-header mb-8">EDUCATION_</motion.h2>

      <div className="space-y-4">
        {education.map((edu) => (
          <motion.div
            key={edu.degree}
            variants={fadeUp}
            className="surface-card border border-border rounded-xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                <GraduationCap className="h-5 w-5 text-primary" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-mono-display text-base font-semibold text-foreground">{edu.institution}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{edu.location}</p>
                  </div>
                  {edu.period && (
                    <span className="font-mono-data text-muted-foreground shrink-0">{edu.period}</span>
                  )}
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
