import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Menu } from "lucide-react";
import { AnimatePresence } from "framer-motion";
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

const sectionList = [
  { id: "about", Component: AboutSection },
  { id: "projects", Component: ProjectsSection },
  { id: "skills", Component: SkillsSection },
  { id: "certifications", Component: CertificationsSection },
  { id: "achievements", Component: AchievementsSection },
  { id: "education", Component: EducationSection },
  { id: "contact", Component: ContactSection },
];

const ScrollSection = ({
  id,
  children,
  onInView,
}: {
  id: string;
  children: React.ReactNode;
  onInView: (id: string) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px", amount: 0.1 });

  useEffect(() => {
    if (isInView) onInView(id);
  }, [isInView, id, onInView]);

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-10% 0px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-[60vh] py-16 md:py-24"
    >
      {children}
    </motion.section>
  );
};

const Index = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isScrollingRef = useRef(false);

  const handleInView = useCallback((id: string) => {
    if (!isScrollingRef.current) {
      setActiveSection(id);
    }
  }, []);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    isScrollingRef.current = true;

    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      // Allow intersection observer to take over after scroll finishes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    }
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

      {/* Content — all sections stacked vertically */}
      <main className="flex-1 md:ml-60 pt-16 md:pt-8 px-6 md:px-12 pb-16 relative z-10">
        <div className="max-w-[1200px] mx-auto">
          {sectionList.map(({ id, Component }) => (
            <ScrollSection key={id} id={id} onInView={handleInView}>
              <Component />
            </ScrollSection>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
