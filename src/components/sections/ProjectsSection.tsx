import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { stagger, fadeUp } from "@/lib/animations";

const projects = [
  {
    title: "SentinelGuard",
    subtitle: "Ransomware Detection System",
    description: "Real-time ransomware detection monitoring file entropy changes, mass file operations, shadow copy deletion, and ransom note indicators.",
    tech: ["C++", "Rust", "ONNX", "Electron", "React", "Windows Kernel"],
    github: "https://github.com/abhiwikky/SentinelGuard",
  },
  {
    title: "LPU WiCon",
    subtitle: "WiFi Authentication Automation",
    description: "Automation tool that logs into university Wi-Fi portals automatically using Selenium to eliminate repetitive manual authentication.",
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span key={t} className="tech-pill text-[10px]">{t}</span>
              ))}
            </div>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-accent text-xs hover:underline">
              View on GitHub <ExternalLink className="h-3 w-3" />
            </a>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectsSection;
