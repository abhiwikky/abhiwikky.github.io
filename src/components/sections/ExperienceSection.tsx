import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { stagger, fadeUp } from "@/lib/animations";

const experience = [
  {
    role: "Freelance Incident Response Investigator",
    context: "Referral-based engagement",
    period: "June 2026",
    bullets: [
      "Led solo incident response for a 15-host malware outbreak on a flat LAN, from triage through containment and remediation, for a non-technical small business referred via personal network.",
      "Reverse-engineered 2 multi-layer VBS malware samples, decoding obfuscated dropper stages and tracing the full payload delivery chain to the exploited weakness and the final-stage persistence mechanism (ManageEngine UEMS RMM agent).",
      "Documented 5 indicators of compromise and mapped adversary TTPs to MITRE ATT&CK; identified C2 infrastructure hosted on Chinese dynamic DNS providers.",
      "Authored an IR audit methodology and remediation playbook covering IOC sweeping, registry forensics, and network traffic analysis.",
    ],
    tags: ["Incident Response", "Malware Analysis", "MITRE ATT&CK", "IOC Sweeping", "Registry Forensics", "Network Traffic Analysis"],
  },
];

const ExperienceSection = () => {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-4xl">
      <motion.div variants={fadeUp} className="label-caps mb-4">// EXPERIENCE</motion.div>
      <motion.h2 variants={fadeUp} className="section-header mb-8">EXPERIENCE_</motion.h2>

      <div className="space-y-4">
        {experience.map((job) => (
          <motion.div key={job.role} variants={fadeUp} className="surface-card border border-border rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                <Briefcase className="h-5 w-5 text-primary" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="font-mono-display text-base font-semibold text-foreground">{job.role}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{job.context}</p>
                  </div>
                  <span className="font-mono-data text-muted-foreground shrink-0">{job.period}</span>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {job.tags.map((t) => (
                    <span key={t} className="tech-pill text-[10px]">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ExperienceSection;
