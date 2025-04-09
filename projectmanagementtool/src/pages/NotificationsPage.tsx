
import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check, Trash2, Clock, MessageSquare, AlertTriangle, FileText, Sparkles, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { toast } from "sonner";
import { format, formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const notificationIcons = {
  assignment: FileText,
  comment: MessageSquare,
  status: Clock,
  alert: AlertTriangle,
};

const NotificationsPage = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead, deleteNotification } = useAppContext();
  const [activeTab, setActiveTab] = useState("all");
  const [displayedNotifications, setDisplayedNotifications] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  
  useEffect(() => {
    let filteredNotifications = [...notifications];
    
    // Apply tab filter
    if (activeTab === "unread") {
      filteredNotifications = filteredNotifications.filter(n => !n.read);
    } else if (activeTab !== "all") {
      filteredNotifications = filteredNotifications.filter(n => n.type === activeTab);
    }
    
    // Apply sorting
    filteredNotifications.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
    
    setDisplayedNotifications(filteredNotifications);
  }, [activeTab, notifications, sortOrder]);

  const handleMarkAsRead = (id) => {
    markNotificationRead(id);
    toast.success("Notification marked as read", {
      icon: <Check className="h-4 w-4 text-green-500" />
    });
  };
  
  const handleMarkAllAsRead = () => {
    markAllNotificationsRead();
    toast.success("All notifications marked as read", {
      icon: <Check className="h-4 w-4 text-green-500" />
    });
  };
  
  const handleDeleteNotification = (id) => {
    deleteNotification(id);
    toast.success("Notification deleted", {
      icon: <Trash2 className="h-4 w-4 text-red-500" />
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    },
    exit: { opacity: 0 }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="container py-8 max-w-4xl"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="p-2 rounded-lg bg-primary/10">
          <motion.div
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Bell className="h-6 w-6 text-primary" />
          </motion.div>
        </div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">Notifications</h1>
      </motion.div>

      <div className="flex items-center justify-between mb-6">
        <Tabs 
          defaultValue="all" 
          className="w-full" 
          onValueChange={setActiveTab}
        >
          <TabsList className="bg-card border border-border shadow-sm p-1 rounded-lg">
            <TabsTrigger 
              value="all"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md px-5"
            >
              All
              <Badge variant="outline" className="ml-2 bg-muted text-muted-foreground">{notifications.length}</Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="unread"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md px-5"
            >
              Unread
              <Badge variant="outline" className="ml-2 bg-muted text-muted-foreground">
                {notifications.filter(n => !n.read).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="comment"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md px-5"
            >
              Comments
            </TabsTrigger>
            <TabsTrigger 
              value="assignment"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md px-5"
            >
              Tasks
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-primary/10 flex items-center gap-1"
            onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
          >
            <Filter className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="hidden sm:inline">Sort:</span> {sortOrder === "newest" ? "Newest" : "Oldest"}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-primary/10 hover:bg-primary/5"
            onClick={handleMarkAllAsRead}
          >
            Mark all read
          </Button>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTab + sortOrder} 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible" 
          exit="exit"
          className="space-y-3"
        >
          {displayedNotifications.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="text-center py-16 border border-dashed border-primary/10 rounded-lg bg-card/50 shadow-sm"
            >
              <Bell className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="font-medium text-lg">No notifications</h3>
              <p className="text-muted-foreground">When you receive notifications, they'll appear here.</p>
            </motion.div>
          ) : (
            displayedNotifications.map((notification) => {
              const IconComponent = notificationIcons[notification.type] || Bell;
              return (
                <motion.div 
                  key={notification.id}
                  variants={itemVariants}
                  layoutId={notification.id}
                  className={cn(
                    "border rounded-lg p-4 flex items-start gap-4 hover:bg-accent/30 transition-colors",
                    notification.read ? "bg-card border-border/50" : "bg-accent/50 border-primary/10"
                  )}
                  whileHover={{
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                    y: -2
                  }}
                >
                  <motion.div 
                    className={cn(
                      "rounded-full p-2 text-white",
                      notification.type === "assignment" ? "bg-gradient-to-br from-blue-500 to-blue-600" :
                      notification.type === "comment" ? "bg-gradient-to-br from-amber-500 to-amber-600" :
                      notification.type === "status" ? "bg-gradient-to-br from-green-500 to-green-600" : 
                      "bg-gradient-to-br from-purple-500 to-purple-600"
                    )}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <IconComponent className="h-5 w-5" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <p className={cn("text-sm", !notification.read && "font-medium")}>
                      {notification.content}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                      </div>
                      {!notification.read && (
                        <Badge className="text-[10px] py-0 px-1.5 bg-primary/80 hover:bg-primary/90">New</Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {!notification.read && (
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 text-primary hover:text-primary/80 hover:bg-primary/10"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Mark as read</span>
                        </Button>
                      </motion.div>
                    )}
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        size="icon" 
                        variant="ghost"
                        className="h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-50"
                        onClick={() => handleDeleteNotification(notification.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete notification</span>
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })
          )}
        </motion.div>
      </AnimatePresence>

      {displayedNotifications.length > 0 && displayedNotifications.length > 5 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-8"
        >
          <Button 
            variant="outline"
            size="sm"
            className="border-primary/10 hover:bg-primary/5"
          >
            <Sparkles className="h-3.5 w-3.5 mr-2 text-primary" />
            Load more notifications
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default NotificationsPage;
