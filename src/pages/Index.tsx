import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import AppSidebar from "@/components/AppSidebar";
import CursorTrail from "@/components/CursorTrail";
import GridBackground from "@/components/GridBackground";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import EducationSection from "@/components/sections/EducationSection";
import ContactSection from "@/components/sections/ContactSection";

const sectionList = [
  { id: "about", Component: AboutSection },
  { id: "experience", Component: ExperienceSection },
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
  const touchStartAtEdge = useRef<{ top: boolean; bottom: boolean }>({ top: true, bottom: true });
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastInnerScroll = useRef(0);

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
    // The active section is an overflow-y-auto container. Scroll it first,
    // and only move to another section once its top/bottom edge is reached.
    const edges = () => {
      const el = scrollRef.current;
      if (!el) return { top: true, bottom: true, scrollable: false };
      return {
        top: el.scrollTop <= 0,
        bottom: el.scrollTop + el.clientHeight >= el.scrollHeight - 1,
        scrollable: el.scrollHeight > el.clientHeight + 1,
      };
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isTransitioning.current) return;
      if (Math.abs(e.deltaY) < 1) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      const el = scrollRef.current;
      const { top, bottom, scrollable } = edges();

      if (el && scrollable && (dir > 0 ? !bottom : !top)) {
        el.scrollTop += e.deltaY;
        lastInnerScroll.current = Date.now();
        return;
      }
      // Ignore trackpad momentum that just carried us to the edge.
      if (scrollable && Date.now() - lastInnerScroll.current < 300) return;
      if (Math.abs(e.deltaY) < 30) return;
      goTo(currentIndex + dir);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const down = e.key === "ArrowDown" || e.key === "PageDown";
      const up = e.key === "ArrowUp" || e.key === "PageUp";
      if (!down && !up) return;
      e.preventDefault();
      const dir = down ? 1 : -1;
      const el = scrollRef.current;
      const { top, bottom, scrollable } = edges();

      if (el && scrollable && (dir > 0 ? !bottom : !top)) {
        const step = e.key.startsWith("Page") ? el.clientHeight * 0.9 : 80;
        el.scrollBy({ top: dir * step, behavior: "smooth" });
        lastInnerScroll.current = Date.now();
        return;
      }
      goTo(currentIndex + dir);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      const { top, bottom } = edges();
      touchStartAtEdge.current = { top, bottom };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 50) return;
      const dir = delta > 0 ? 1 : -1;
      const { top, bottom } = touchStartAtEdge.current;
      // Only change section if the swipe began at the edge in that direction.
      if (dir > 0 ? !bottom : !top) return;
      goTo(currentIndex + dir);
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
            ref={scrollRef}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 flex items-start pt-20 md:pt-16 px-6 md:px-12 pb-16 overflow-y-auto"
          >
            <div className="max-w-[1200px] mx-auto w-full">
              <ActiveComponent />
            </div>
          </motion.div>
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
