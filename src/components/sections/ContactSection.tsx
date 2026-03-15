import { motion } from "framer-motion";
import { useState } from "react";
import { Github, Linkedin, Mail, Phone, ExternalLink, Send } from "lucide-react";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] } },
};

const contactLinks = [
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/abhiwikky/", display: "abhiwikky" },
  { icon: Github, label: "GitHub", href: "https://github.com/abhiwikky/", display: "abhiwikky" },
  { icon: Mail, label: "Email", href: "mailto:connect.abhijiths@gmail.com", display: "connect.abhijiths@gmail.com" },
  { icon: Phone, label: "Phone", href: "tel:+91974532205", display: "+91-974532205" },
];

const ContactSection = () => {
  const [activeTab, setActiveTab] = useState<"links" | "direct">("links");

  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <motion.div variants={fadeUp} className="label-caps mb-4">// CONTACT</motion.div>
      <motion.h2 variants={fadeUp} className="section-header mb-8">CONTACT_</motion.h2>

      <motion.div variants={fadeUp} className="flex gap-6">
        {/* Selector */}
        <div className="w-40 shrink-0 space-y-1">
          <button
            onClick={() => setActiveTab("links")}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 font-mono-data uppercase tracking-wider text-[11px] ${
              activeTab === "links"
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
          >
            Links
          </button>
          <button
            onClick={() => setActiveTab("direct")}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 font-mono-data uppercase tracking-wider text-[11px] ${
              activeTab === "direct"
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
          >
            Direct Contact
          </button>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "links" ? (
            <div className="space-y-3">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface-card surface-card-hover border border-border rounded-xl p-4 flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <link.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <div className="label-caps text-[10px]">{link.label}</div>
                    <div className="text-sm text-foreground mt-0.5">{link.display}</div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          ) : (
            <div className="surface-card border border-border rounded-xl p-6">
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="label-caps text-[10px] block mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-border pb-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="label-caps text-[10px] block mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full bg-transparent border-b border-border pb-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="label-caps text-[10px] block mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full bg-transparent border-b border-border pb-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <Send className="h-4 w-4" />
                  <span className="font-mono-data uppercase tracking-wider">Send Message</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactSection;
