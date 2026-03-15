import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import AppSidebar from "@/components/AppSidebar";
import CursorTrail from "@/components/CursorTrail";
import GridBackground from "@/components/GridBackground";
import SectionBackground from "@/components/SectionBackground";
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

const variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    y: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

const Index = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isTransitioning = useRef(false);
  const touchStartY = useRef(0);

  const activeSection = sectionList[currentIndex].id;
  const ActiveComponent = sectionList[currentIndex].Component;

  const goTo = useCallback((index: number) => {
    if (index === currentIndex || isTransitioning.current || index < 0 || index >= sectionList.length) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    isTransitioning.current = true;
    setTimeout(() => { isTransitioning.current = false; }, 600);
  }, [currentIndex]);

  const handleNavigate = useCallback((section: string) => {
    const idx = sectionList.findIndex(s => s.id === section);
    if (idx !== -1) goTo(idx);
    setMobileMenuOpen(false);
  }, [goTo]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isTransitioning.current) return;
      if (Math.abs(e.deltaY) < 30) return;
      goTo(currentIndex + (e.deltaY > 0 ? 1 : -1));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goTo(currentIndex + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goTo(currentIndex - 1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 50) return;
      goTo(currentIndex + (delta > 0 ? 1 : -1));
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentIndex, goTo]);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <GridBackground />
      <CursorTrail />

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed left-0 top-0 h-screen z-30">
        <AppSidebar activeSection={activeSection} onNavigate={handleNavigate} />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-card border-b border-border flex items-center px-4 z-40">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-foreground p-2">
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

      {/* Full-page section transitions */}
      <main className="flex-1 md:ml-60 h-screen relative z-10 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeSection}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 overflow-y-auto"
          >
            <SectionBackground sectionId={activeSection} direction={direction} />
            <div className="relative z-10 pt-20 md:pt-16 px-6 md:px-12 pb-16">
              <div className="max-w-[1200px] mx-auto w-full">
                <ActiveComponent />
              </div>
            </div>
        </AnimatePresence>

        {/* Section indicators */}
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-2">
          {sectionList.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentIndex ? "bg-primary scale-125" : "bg-muted hover:bg-muted-foreground"
              }`}
              aria-label={s.id}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
