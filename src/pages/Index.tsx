import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import AppSidebar from "@/components/AppSidebar";
import CursorTrail from "@/components/CursorTrail";
import GridBackground from "@/components/GridBackground";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import EducationSection from "@/components/sections/EducationSection";
import ContactSection from "@/components/sections/ContactSection";

const sections: Record<string, React.ComponentType> = {
  about: AboutSection,
  projects: ProjectsSection,
  skills: SkillsSection,
  certifications: CertificationsSection,
  achievements: AchievementsSection,
  education: EducationSection,
  contact: ContactSection,
};

const Index = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const ActiveComponent = sections[activeSection];

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <GridBackground />
      <CursorTrail />

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed left-0 top-0 h-screen z-30">
        <AppSidebar activeSection={activeSection} onNavigate={handleNavigate} />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-card border-b border-border flex items-center px-4 z-40">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-foreground p-2"
        >
          <Menu className="h-5 w-5" strokeWidth={1.5} />
        </button>
        <span className="font-mono-display text-sm font-semibold text-foreground ml-3">ABHIJITH_S</span>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ backgroundColor: "hsla(222, 47%, 4%, 0.8)" }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 top-0 h-screen z-50 md:hidden"
            >
              <AppSidebar activeSection={activeSection} onNavigate={handleNavigate} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Content */}
      <main className="flex-1 md:ml-60 pt-20 md:pt-16 px-6 md:px-12 pb-16 relative z-10">
        <div className="max-w-[1200px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Index;
