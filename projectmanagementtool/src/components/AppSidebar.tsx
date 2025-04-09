
import { 
  Home, 
  FolderKanban, 
  Users, 
  Settings, 
  Bell,
  Menu,
  X,
  ChevronRight
} from "lucide-react";
import { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function AppSidebar() {
  const { currentUser, notifications, projects } = useAppContext();
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const unreadNotifications = notifications.filter(n => !n.read).length;

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Animation variants
  const sidebarVariants = {
    expanded: { width: "250px", transition: { duration: 0.3, ease: "easeInOut" } },
    collapsed: { width: "70px", transition: { duration: 0.3, ease: "easeInOut" } }
  };

  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      initial={false}
      animate={collapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      className={cn(
        "min-h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all",
      )}
    >
      {/* Sidebar Header */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="p-4 flex items-center justify-between border-b border-sidebar-border"
      >
        <AnimatePresence initial={false}>
          {!collapsed && mounted && (
            <motion.div 
              key="logo"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={logoVariants}
              className="flex items-center gap-2 overflow-hidden"
            >
              <motion.div 
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.8, repeat: 0, repeatType: "reverse" }}
              >
                <FolderKanban className="h-6 w-6 text-primary" />
              </motion.div>
              <motion.span 
                className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-sidebar-primary to-purple-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                SocialSphere
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button 
          onClick={() => setCollapsed(!collapsed)} 
          className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </motion.button>
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto scrollbar-none">
        <ul className="space-y-1 px-2">
          <NavItem
            to="/"
            icon={<Home size={20} />}
            label="Dashboard"
            collapsed={collapsed}
            isActive={isActive("/")}
            badge={undefined}
            className=""
          />
          <li className="pt-2">
            {!collapsed && mounted && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-3 py-1 text-xs font-medium text-sidebar-foreground/60 flex items-center justify-between"
              >
                <span>PROJECTS</span>
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="h-4 w-4 rounded-full bg-sidebar-accent flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight size={10} />
                </motion.div>
              </motion.div>
            )}
            {projects.slice(0, 3).map((project, index) => (
              <NavItem
                key={project.id}
                to={`/projects/${project.id}`}
                icon={
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="h-5 w-5 rounded-md bg-gradient-to-br from-primary/40 to-primary/20 flex items-center justify-center text-primary text-xs"
                  >
                    {project.title.charAt(0)}
                  </motion.div>
                }
                label={project.title}
                collapsed={collapsed}
                isActive={isActive(`/projects/${project.id}`)}
                badge={undefined}
                className=""
              />
            ))}
            {!collapsed && mounted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Link
                  to="/projects"
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/80 text-sm transition-colors"
                >
                  <span className="pl-8">View all projects</span>
                </Link>
              </motion.div>
            )}
          </li>
          <NavItem
            to="/team" 
            icon={<Users size={20} />}
            label="Team"
            collapsed={collapsed}
            isActive={isActive("/team")}
            badge={undefined}
            className=""
          />
          <NavItem
            to="/notifications" 
            icon={
              <div className="relative">
                <Bell size={20} />
                {unreadNotifications > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-sidebar" 
                  />
                )}
              </div>
            }
            label="Notifications"
            badge={unreadNotifications > 0 ? unreadNotifications : undefined}
            collapsed={collapsed}
            isActive={isActive("/notifications")}
            className=""
          />
          <NavItem
            to="/settings" 
            icon={<Settings size={20} />}
            label="Settings"
            collapsed={collapsed}
            isActive={isActive("/settings")}
            badge={undefined}
            className="mt-auto pt-4"
          />
        </ul>
      </nav>

      {/* User profile */}
      <motion.div 
        className={cn(
          "p-4 border-t border-sidebar-border",
          collapsed ? "flex justify-center" : "flex items-center gap-3"
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Avatar className="h-8 w-8 border-2 border-primary/20">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </motion.div>
        <AnimatePresence initial={false}>
          {!collapsed && mounted && (
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="flex-1 min-w-0 overflow-hidden"
            >
              <p className="text-sm font-medium truncate">{currentUser.name}</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">{currentUser.email}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function NavItem({ 
  to, 
  icon, 
  label, 
  collapsed, 
  isActive,
  badge,
  className
}) {
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 } 
    }
  };

  return (
    <motion.li 
      initial="hidden"
      animate="visible"
      variants={itemVariants}
      className={className}
    >
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link 
              to={to} 
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent text-sidebar-foreground relative transition-all",
                isActive && "bg-sidebar-accent font-medium"
              )}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {icon}
              </motion.div>
              <AnimatePresence initial={false}>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="flex-1 overflow-hidden whitespace-nowrap"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
              {!collapsed && badge && (
                <Badge 
                  variant="destructive" 
                  className="ml-auto text-xs px-1.5 py-0 bg-gradient-to-r from-red-500 to-red-600"
                >
                  {badge}
                </Badge>
              )}

              {isActive && (
                <motion.div
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-primary rounded-r-md"
                  layoutId="activeNavIndicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          </TooltipTrigger>
          {collapsed && (
            <TooltipContent side="right" className="border border-primary/10 bg-card shadow-lg">
              <div className="flex items-center gap-2">
                {label}
                {badge && (
                  <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center rounded-full">
                    {badge}
                  </Badge>
                )}
              </div>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </motion.li>
  );
}
