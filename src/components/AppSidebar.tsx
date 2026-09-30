import { User, Briefcase, FolderGit2, Cpu, Award, Trophy, GraduationCap, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "about", label: "ABOUT", icon: User },
  { id: "experience", label: "EXPERIENCE", icon: Briefcase },
  { id: "projects", label: "PROJECTS", icon: FolderGit2 },
  { id: "skills", label: "SKILLS", icon: Cpu },
  { id: "certifications", label: "CERTS", icon: Award },
  { id: "achievements", label: "ACHIEVEMENTS", icon: Trophy },
  { id: "education", label: "EDUCATION", icon: GraduationCap },
  { id: "contact", label: "CONTACT", icon: Mail },
];

interface AppSidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  collapsed?: boolean;
}

const AppSidebar = ({ activeSection, onNavigate, collapsed = false }: AppSidebarProps) => {
  return (
    <aside
      className={cn(
        "h-screen bg-sidebar border-r border-border flex flex-col transition-all duration-300 z-30",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <div className="font-mono-display text-sm font-semibold text-foreground tracking-tight">
          {collapsed ? "AS" : "ABHIJITH_S"}
        </div>
        {!collapsed && (
          <div className="label-caps mt-1 text-[10px]">IR // DFIR // DETECTION</div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group relative",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary-foreground nav-active-pulse"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              {!collapsed && (
                <span className="font-mono-data uppercase tracking-wider text-[11px]">
                  {item.label}
                </span>
              )}
              {isActive && (
                <span className={cn(
                  "absolute right-2 w-1.5 h-1.5 rounded-full bg-primary",
                  collapsed && "right-1"
                )} />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-border">
          <div className="label-caps text-[9px]">© 2026 ABHIJITH S</div>
        </div>
      )}
    </aside>
  );
};

export default AppSidebar;
