import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, ExternalLink } from "lucide-react";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] } },
};

const links = [
  { icon: Github, label: "GitHub", href: "https://github.com/abhiwikky/" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/abhiwikky/" },
  { icon: Mail, label: "Email", href: "mailto:connect.abhijiths@gmail.com" },
];

const AboutSection = () => {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="max-w-3xl"
    >
      <motion.div variants={fadeUp} className="label-caps mb-4">
        // ABOUT
      </motion.div>

      <motion.h1
        variants={fadeUp}
        className="font-mono-display text-4xl md:text-5xl font-bold text-foreground leading-tight"
      >
        ABHIJITH S
      </motion.h1>

      <motion.div variants={fadeUp} className="mt-3 flex flex-wrap gap-2">
        {["Malware Analysis", "Detection Engineering", "Security Research"].map((tag) => (
          <span key={tag} className="tech-pill text-[11px]">{tag}</span>
        ))}
      </motion.div>

      <motion.p
        variants={fadeUp}
        className="mt-8 text-muted-foreground leading-relaxed text-[15px] max-w-2xl"
      >
        Cybersecurity student focused on building practical security tools and defensive technologies. 
        Work centers on malware analysis, ransomware detection, automation tools, and endpoint security concepts. 
        Particularly interested in threat detection engineering, behavioral malware detection, 
        and building security-focused software systems.
      </motion.p>

      <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="surface-card surface-card-hover flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <link.icon className="h-4 w-4" strokeWidth={1.5} />
            <span className="font-mono-data uppercase tracking-wider">{link.label}</span>
            <ExternalLink className="h-3 w-3 opacity-40" />
          </a>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="mt-4">
        <a
          href="#"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium transition-all hover:opacity-90"
        >
          <Download className="h-4 w-4" />
          <span className="font-mono-data uppercase tracking-wider">Download Resume</span>
        </a>
      </motion.div>

      {/* Status indicator */}
      <motion.div variants={fadeUp} className="mt-12 flex items-center gap-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
        </span>
        <span className="label-caps text-[10px]">Available for opportunities</span>
      </motion.div>
    </motion.div>
  );
};

export default AboutSection;
