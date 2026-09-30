import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { stagger, fadeUp } from "@/lib/animations";

type Project = {
  title: string;
  subtitle: string;
  date?: string;
  description: string;
  highlights?: string[];
  tech: string[];
  github?: string;
};

const projects: Project[] = [
  {
    title: "SentinelGuard",
    subtitle: "Behaviour-Based Ransomware Detection & Response",
    date: "Jan 2025",
    description:
      "Real-time detection engine monitoring file entropy spikes, mass I/O anomalies, shadow copy deletions and ransom-note drop patterns at the host level.",
    highlights: [
      "Detection latency under 10ms",
      "C++ Windows kernel minifilter driver for low-overhead event tracing, paired with a Rust agent doing ML-driven threat correlation (trained and validated on a 100,000-sample synthetic dataset)",
      "Automated process quarantine via native NT APIs, plus a real-time SOC dashboard (React / Node.js / gRPC) with one-click response",
    ],
    tech: ["C++", "Rust", "ONNX/ML", "React", "Node.js", "gRPC", "NT APIs", "Kernel Minifilter"],
    github: "https://github.com/abhiwikky/SentinelGuard",
  },
  {
    title: "AWS Cloud Security Monitoring",
    subtitle: "Multi-Region Threat Detection",
    date: "Feb 2026",
    description:
      "Multi-region cloud threat detection built on CloudTrail log streams and CloudWatch metric filters and alarms to surface unauthorized access, IAM policy misconfigurations and sensitive data exposure.",
    highlights: [
      "Cut mean time to detect security events by 90% with automated SNS alerting",
      "S3-based centralized log storage with integrity validation for compliance auditing and forensic workflows",
    ],
    tech: ["AWS CloudTrail", "CloudWatch", "SNS", "S3", "IAM"],
  },
  {
    title: "dfir-collector",
    subtitle: "Forensic Data Collection Tool",
    description: "Cross-platform Python 3 forensic data collection tool intended for incident response and DFIR.",
    tech: ["Python", "DFIR"],
    github: "https://github.com/abhiwikky/dfir-collector",
  },
  {
    title: "LPU WiCon",
    subtitle: "WiFi Authentication Automation",
    description: "Automation tool that logs into the university Wi-Fi portal automatically using Selenium, removing repetitive manual authentication.",
    tech: ["Python", "Selenium"],
    github: "https://github.com/abhiwikky/LPU-WiC0n",
  },
  {
    title: "Auto File Backup",
    subtitle: "Automated Backup System",
    description: "Linux-based automated file backup system that replicates directories at scheduled intervals for reliable data protection.",
    tech: ["Python", "Shutil", "Cron"],
    github: "https://github.com/abhiwikky/auto-file-backup",
  },
];

const ProjectsSection = () => {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <motion.div variants={fadeUp} className="label-caps mb-4">// PROJECTS</motion.div>
      <motion.h2 variants={fadeUp} className="section-header mb-8">PROJECTS_</motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {projects.map((project) => (
          <motion.div
            key={project.title}
            variants={fadeUp}
            className="surface-card surface-card-hover border border-border rounded-xl p-5 flex flex-col"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-mono-display text-lg font-semibold text-foreground">{project.title}</h3>
                <p className="label-caps text-[10px] mt-0.5">{project.subtitle}</p>
              </div>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub`} className="text-muted-foreground hover:text-primary transition-colors">
                  <Github className="h-4 w-4" strokeWidth={1.5} />
                </a>
              )}
            </div>
            {project.date && <p className="font-mono-data text-muted-foreground mb-2">{project.date}</p>}
            <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
            {project.highlights && (
              <ul className="mt-3 space-y-1.5 flex-1">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                    <span className="w-1 h-1 rounded-full bg-primary shrink-0 mt-1.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
            {!project.highlights && <div className="flex-1" />}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span key={t} className="tech-pill text-[10px]">{t}</span>
              ))}
            </div>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-accent text-xs hover:underline">
                View on GitHub <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectsSection;
