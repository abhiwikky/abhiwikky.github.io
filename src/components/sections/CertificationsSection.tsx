import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { stagger, fadeUp } from "@/lib/animations";

const certs = [
  "CompTIA Security+",
  "CompTIA Network+",
  "CompTIA CySA+",
  "CompTIA PenTest+",
  "Quick Heal Certified Digital Forensic Investigator",
  "QuickHeal Certified Malware Analyst",
];

const training = {
  title: "Cipher Schools — Programming using C++",
  topics: ["Data Structures and Algorithms", "Binary Search Tree operations", "Algorithm implementation and debugging", "C++ programming concepts"],
};

const CertificationsSection = () => {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <motion.div variants={fadeUp} className="label-caps mb-4">// CERTIFICATIONS</motion.div>
      <motion.h2 variants={fadeUp} className="section-header mb-8">CERTIFICATIONS_</motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {certs.map((cert) => (
          <motion.div key={cert} variants={fadeUp} className="surface-card surface-card-hover border border-border rounded-xl p-5 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-sm font-medium text-foreground mb-3">{cert}</h3>
            <a href="#" className="inline-flex items-center gap-1 text-accent text-xs hover:underline mt-auto">
              Verify <ExternalLink className="h-3 w-3" />
            </a>
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeUp} className="mt-12">
        <div className="label-caps mb-4">// TRAINING</div>
        <div className="surface-card border border-border rounded-xl p-6">
          <h3 className="font-mono-display text-lg font-semibold text-foreground mb-4">{training.title}</h3>
          <ul className="space-y-2">
            {training.topics.map((topic) => (
              <li key={topic} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CertificationsSection;
