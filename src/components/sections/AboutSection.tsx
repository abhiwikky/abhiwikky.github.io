import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, ExternalLink, ShieldAlert, Cloud, Bug, Cpu } from "lucide-react";
import { stagger, fadeUp } from "@/lib/animations";

const links = [
  { icon: Github, label: "GitHub", href: "https://github.com/abhiwikky/" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/abhiwikky/" },
  { icon: Mail, label: "Email", href: "mailto:abhijiths01022@gmail.com" },
];

const stats = [
  { value: "15", label: "Hosts triaged in a solo IR engagement" },
  { value: "<10ms", label: "Ransomware detection latency" },
  { value: "90%", label: "Reduction in MTTD via SNS alerting" },
  { value: "5", label: "Industry certifications" },
];

const focus = [
  {
    icon: ShieldAlert,
    title: "Incident response & DFIR",
    text: "Triage, containment and remediation; IOC sweeping, registry forensics and network traffic analysis, with adversary TTPs mapped to MITRE ATT&CK.",
  },
  {
    icon: Bug,
    title: "Malware analysis",
    text: "Decoding obfuscated multi-stage VBS droppers and tracing the full payload delivery chain to the exploited weakness and final persistence mechanism.",
  },
  {
    icon: Cpu,
    title: "Detection engineering",
    text: "A Windows kernel minifilter driver paired with a Rust agent and ML correlation to catch ransomware behaviour at the host level.",
  },
  {
    icon: Cloud,
    title: "Cloud security monitoring",
    text: "Multi-region AWS detection on CloudTrail and CloudWatch, with automated SNS alerting and integrity-validated log storage.",
  },
];

const AboutSection = () => {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-4xl">
      <motion.div variants={fadeUp} className="label-caps mb-4">// ABOUT</motion.div>

      <motion.h1 variants={fadeUp} className="font-mono-display text-4xl md:text-6xl font-bold text-foreground leading-tight">
        ABHIJITH S<span className="text-primary">_</span>
      </motion.h1>

      <motion.p variants={fadeUp} className="mt-3 font-mono-data text-primary uppercase tracking-widest">
        Incident Response · Malware Analysis · Detection Engineering
      </motion.p>

      <motion.div variants={fadeUp} className="mt-5 flex flex-wrap gap-2">
        {["SOC Analyst", "Incident Responder", "DFIR", "Malware Analyst", "Cloud Security"].map((tag) => (
          <span key={tag} className="tech-pill text-[11px]">{tag}</span>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="mt-8 space-y-4 text-muted-foreground leading-relaxed text-[15px] max-w-2xl">
        <p>
          I'm a security-focused Computer Science graduate (B.Tech, Lovely Professional University, 2026) with hands-on
          experience in network administration, analysing compromised systems, and mapping adversary TTPs to MITRE ATT&amp;CK.
        </p>
        <p>
          Most recently I led a solo incident response engagement for a small business, investigating a 15-host malware
          outbreak from initial triage through containment and remediation. Reverse-engineering the VBS droppers exposed a
          persistence mechanism built on a legitimate RMM agent, and the C2 infrastructure turned out to be hosted on Chinese
          dynamic DNS providers.
        </p>
        <p>
          I like turning what I learn into tooling: a kernel-level ransomware detection engine and an automated AWS
          threat-monitoring system. I'm looking to bring that investigative rigour to a SOC or incident response team
          working in a production environment.
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-10">
        <div className="label-caps mb-4">// WHAT I DO</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {focus.map((f) => (
            <div key={f.title} className="surface-card surface-card-hover border border-border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <f.icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
                <h3 className="font-mono-display text-sm font-semibold text-foreground">{f.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
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
        <a
          href="/Abhijith_S_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium transition-all hover:opacity-90"
        >
          <Download className="h-4 w-4" />
          <span className="font-mono-data uppercase tracking-wider">Download Resume</span>
        </a>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-10 flex items-center gap-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ backgroundColor: "hsl(142, 71%, 45%)" }} />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: "hsl(142, 71%, 45%)" }} />
        </span>
        <span className="label-caps text-[10px]">Open to SOC, IR / DFIR, malware analysis and cloud security roles</span>
      </motion.div>
    </motion.div>
  );
};

export default AboutSection;
