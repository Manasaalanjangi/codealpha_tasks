
import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Shield, Bell, Palette, Globe, 
  Moon, Sun, Monitor, Check, Save,
  ChevronsUpDown, Sparkles, Laptop, Languages, Lock
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const Settings = () => {
  const { currentUser } = useAppContext();
  const [activeTab, setActiveTab] = useState("profile");
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [bio, setBio] = useState("Product designer and developer based in San Francisco");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    comments: true,
    mentions: true,
  });
  const [theme, setTheme] = useState("system");
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const handleSaveProfile = () => {
    toast.success("Profile information updated successfully", {
      icon: <Sparkles className="h-4 w-4 text-yellow-400" />
    });
  };

  const handleSaveNotifications = () => {
    toast.success("Notification preferences updated", {
      icon: <Bell className="h-4 w-4 text-blue-400" />
    });
  };

  const handleThemeChange = (value) => {
    setTheme(value);
    toast.success(`Theme changed to ${value}`, {
      icon: value === "dark" ? <Moon className="h-4 w-4 text-indigo-400" /> : 
             value === "light" ? <Sun className="h-4 w-4 text-amber-400" /> :
             <Monitor className="h-4 w-4 text-gray-400" />
    });
  };
  
  const menuItems = [
    { icon: User, label: "Profile", value: "profile" },
    { icon: Bell, label: "Notifications", value: "notifications" },
    { icon: Palette, label: "Appearance", value: "appearance" },
    { icon: Shield, label: "Security", value: "security" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="container py-8"
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
            <Palette className="h-6 w-6 text-primary" />
          </motion.div>
        </div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">Settings</h1>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-64"
        >
          <div className="hidden md:block space-y-1">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.value} variants={itemVariants}>
                    <Button 
                      variant={activeTab === item.value ? "secondary" : "ghost"} 
                      className={cn(
                        "w-full justify-start",
                        activeTab === item.value && "bg-secondary/80 hover:bg-secondary/90"
                      )}
                      onClick={() => setActiveTab(item.value)}
                    >
                      <Icon className={cn(
                        "h-4 w-4 mr-2",
                        activeTab === item.value && "text-primary"
                      )} />
                      {item.label}
                    </Button>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
          
          <div className="md:hidden mb-6">
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="w-full border-primary/20 bg-background shadow-sm">
                <SelectValue placeholder="Select tab" />
              </SelectTrigger>
              <SelectContent>
                {menuItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    <div className="flex items-center">
                      <item.icon className="h-4 w-4 mr-2 text-muted-foreground" />
                      {item.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            {activeTab === "profile" && (
              <motion.div variants={cardVariants} initial="hidden" animate="visible">
                <Card className="border-primary/10 shadow-lg shadow-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      Update your personal information and profile settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                      <motion.div 
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Avatar className="h-24 w-24 border-2 border-primary/20 shadow-lg">
                          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                          <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <Button 
                          size="sm" 
                          className="absolute -bottom-2 -right-2 rounded-full bg-primary hover:bg-primary/90"
                          onClick={() => toast.info("Upload image feature would go here")}
                        >
                          <span className="sr-only">Change avatar</span>
                          <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.66667 4L6.5 6.44444M6.5 6.44444L4.33333 4M6.5 6.44444V1M1 8.77778L1.42963 10.0741C1.57958 10.5036 1.85851 10.8741 2.22842 11.1351C2.59834 11.396 3.04128 11.5338 3.49074 11.5278H9.50926C9.95872 11.5338 10.4017 11.396 10.7716 11.1351C11.1415 10.8741 11.4204 10.5036 11.5704 10.0741L13 4.88889" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Button>
                      </motion.div>
                      
                      <div className="space-y-4 flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <motion.div 
                            className="space-y-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <Label htmlFor="name" className="text-muted-foreground">Full name</Label>
                            <Input 
                              id="name" 
                              value={name} 
                              onChange={(e) => setName(e.target.value)}
                              className="border-primary/10 focus:border-primary/30 shadow-sm"
                            />
                          </motion.div>

                          <motion.div 
                            className="space-y-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <Label htmlFor="email" className="text-muted-foreground">Email</Label>
                            <Input 
                              id="email" 
                              type="email" 
                              value={email} 
                              onChange={(e) => setEmail(e.target.value)}
                              className="border-primary/10 focus:border-primary/30 shadow-sm"
                            />
                          </motion.div>
                        </div>

                        <motion.div 
                          className="space-y-2"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <Label htmlFor="bio" className="text-muted-foreground">Bio</Label>
                          <Textarea 
                            id="bio" 
                            placeholder="Write a short bio about yourself" 
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="min-h-[100px] border-primary/10 focus:border-primary/30 shadow-sm"
                          />
                        </motion.div>

                        <motion.div 
                          className="space-y-2"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <Label className="text-muted-foreground">Role</Label>
                          <div className="flex items-center flex-wrap gap-2">
                            <Badge variant="secondary" className="bg-primary/10 hover:bg-primary/20">Product Designer</Badge>
                            <Badge variant="secondary" className="bg-primary/10 hover:bg-primary/20">Developer</Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-7 px-2 border-primary/10 hover:bg-primary/5">+</Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="start">
                                <DropdownMenuItem>Designer</DropdownMenuItem>
                                <DropdownMenuItem>Developer</DropdownMenuItem>
                                <DropdownMenuItem>Project Manager</DropdownMenuItem>
                                <DropdownMenuItem>Marketing</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end border-t pt-4">
                    <Button variant="outline" className="mr-2 border-primary/10">Cancel</Button>
                    <Button 
                      onClick={handleSaveProfile}
                      className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save changes
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {activeTab === "notifications" && (
              <motion.div variants={cardVariants} initial="hidden" animate="visible">
                <Card className="border-primary/10 shadow-lg shadow-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-primary" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>
                      Configure how and when you'd like to be notified
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      {[
                        {
                          title: "Email notifications",
                          description: "Get notified about activity via email",
                          key: "email",
                          icon: <Mail className="h-5 w-5 text-blue-500" />
                        },
                        {
                          title: "Push notifications",
                          description: "Get notified in-app about activity",
                          key: "push",
                          icon: <BellRing className="h-5 w-5 text-amber-500" />
                        },
                        {
                          title: "Comment notifications",
                          description: "Get notified when someone comments on your tasks",
                          key: "comments",
                          icon: <MessageSquare className="h-5 w-5 text-green-500" />
                        },
                        {
                          title: "Mention notifications",
                          description: "Get notified when someone mentions you",
                          key: "mentions",
                          icon: <AtSign className="h-5 w-5 text-purple-500" />
                        }
                      ].map((item, index) => (
                        <motion.div 
                          key={item.key}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                          className="flex items-center justify-between p-4 rounded-lg border border-primary/10 hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex gap-3">
                            {item.icon}
                            <div>
                              <h3 className="font-medium">{item.title}</h3>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                          </div>
                          <Switch 
                            checked={notifications[item.key]} 
                            onCheckedChange={(checked) => setNotifications({...notifications, [item.key]: checked})} 
                            className="data-[state=checked]:bg-primary"
                          />
                        </motion.div>
                      ))}
                      
                      <Collapsible 
                        open={isAdvancedOpen} 
                        onOpenChange={setIsAdvancedOpen}
                        className="pt-4"
                      >
                        <CollapsibleTrigger asChild>
                          <div className="flex items-center justify-between cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                            <span className="font-medium">Advanced notification settings</span>
                            <ChevronsUpDown className="h-4 w-4" />
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pt-2 space-y-2">
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="rounded-md border border-primary/10 p-4"
                          >
                            <h4 className="text-sm font-medium mb-2">Notification Schedule</h4>
                            <div className="grid grid-cols-2 gap-2">
                              <Button variant="outline" className="justify-start border-primary/10">
                                <Clock className="h-4 w-4 mr-2 text-blue-500" /> Set quiet hours
                              </Button>
                              <Button variant="outline" className="justify-start border-primary/10">
                                <Calendar className="h-4 w-4 mr-2 text-green-500" /> Custom schedule
                              </Button>
                            </div>
                          </motion.div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end border-t pt-4">
                    <Button variant="outline" className="mr-2 border-primary/10">Cancel</Button>
                    <Button 
                      onClick={handleSaveNotifications}
                      className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save preferences
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {activeTab === "appearance" && (
              <motion.div variants={cardVariants} initial="hidden" animate="visible">
                <Card className="border-primary/10 shadow-lg shadow-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5 text-primary" />
                      Appearance
                    </CardTitle>
                    <CardDescription>
                      Customize how the application looks on your device
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-4"
                    >
                      <h3 className="font-medium">Theme</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <motion.div whileHover={{ y: -5 }} transition={{ type: "spring" }}>
                          <Button 
                            variant="outline" 
                            className={cn(
                              "flex flex-col items-center justify-center h-24 w-full relative border-2 hover:bg-background",
                              theme === "light" ? "border-primary bg-primary/5" : "border-primary/10"
                            )}
                            onClick={() => handleThemeChange("light")}
                          >
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-50 to-amber-100 rounded-md opacity-20"></div>
                            <Sun className="h-6 w-6 mb-2 text-amber-500" />
                            <span>Light</span>
                            {theme === "light" && (
                              <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-2 right-2 h-5 w-5 bg-primary rounded-full flex items-center justify-center"
                              >
                                <Check className="h-3 w-3 text-white" />
                              </motion.div>
                            )}
                          </Button>
                        </motion.div>
                        
                        <motion.div whileHover={{ y: -5 }} transition={{ type: "spring" }}>
                          <Button 
                            variant="outline" 
                            className={cn(
                              "flex flex-col items-center justify-center h-24 w-full relative border-2 hover:bg-background",
                              theme === "dark" ? "border-primary bg-primary/5" : "border-primary/10"
                            )}
                            onClick={() => handleThemeChange("dark")}
                          >
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/20 to-indigo-800/20 rounded-md opacity-20"></div>
                            <Moon className="h-6 w-6 mb-2 text-indigo-400" />
                            <span>Dark</span>
                            {theme === "dark" && (
                              <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-2 right-2 h-5 w-5 bg-primary rounded-full flex items-center justify-center"
                              >
                                <Check className="h-3 w-3 text-white" />
                              </motion.div>
                            )}
                          </Button>
                        </motion.div>
                        
                        <motion.div whileHover={{ y: -5 }} transition={{ type: "spring" }}>
                          <Button 
                            variant="outline" 
                            className={cn(
                              "flex flex-col items-center justify-center h-24 w-full relative border-2 hover:bg-background",
                              theme === "system" ? "border-primary bg-primary/5" : "border-primary/10"
                            )}
                            onClick={() => handleThemeChange("system")}
                          >
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-md opacity-20"></div>
                            <Laptop className="h-6 w-6 mb-2 text-gray-500" />
                            <span>System</span>
                            {theme === "system" && (
                              <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-2 right-2 h-5 w-5 bg-primary rounded-full flex items-center justify-center"
                              >
                                <Check className="h-3 w-3 text-white" />
                              </motion.div>
                            )}
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-4"
                    >
                      <h3 className="font-medium">Language</h3>
                      <Select defaultValue="en">
                        <SelectTrigger className="border-primary/10 focus:border-primary/30 shadow-sm">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">
                            <div className="flex items-center">
                              <Languages className="h-4 w-4 mr-2 text-muted-foreground" />
                              English
                            </div>
                          </SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                          <SelectItem value="ja">日本語</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "security" && (
              <motion.div variants={cardVariants} initial="hidden" animate="visible">
                <Card className="border-primary/10 shadow-lg shadow-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Security
                    </CardTitle>
                    <CardDescription>
                      Manage your account security and authentication options
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center justify-between p-4 rounded-lg border border-primary/10 hover:bg-accent/50 transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <Lock className="h-5 w-5 text-amber-500" />
                            <h3 className="font-medium">Two-factor authentication</h3>
                          </div>
                          <p className="text-sm text-muted-foreground ml-7">Additional security for your account</p>
                        </div>
                        <Button 
                          variant="outline" 
                          className="border-primary/10 hover:bg-primary/5"
                          onClick={() => toast.info("2FA setup would go here")}
                        >
                          Set up
                        </Button>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center justify-between p-4 rounded-lg border border-primary/10 hover:bg-accent/50 transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <Key className="h-5 w-5 text-blue-500" />
                            <h3 className="font-medium">Password</h3>
                          </div>
                          <p className="text-sm text-muted-foreground ml-7">Last changed 3 months ago</p>
                        </div>
                        <Button 
                          variant="outline" 
                          className="border-primary/10 hover:bg-primary/5"
                          onClick={() => toast.info("Password change would go here")}
                        >
                          Change
                        </Button>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-2"
                      >
                        <Label className="text-muted-foreground">Active sessions</Label>
                        <div className="border border-primary/10 rounded-lg divide-y divide-primary/10 shadow-sm">
                          <motion.div 
                            className="p-4 flex items-center justify-between"
                            whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                          >
                            <div className="flex gap-3">
                              <Monitor className="h-5 w-5 text-indigo-500" />
                              <div>
                                <p className="font-medium">Current session</p>
                                <p className="text-sm text-muted-foreground">San Francisco, USA · Chrome on Mac</p>
                              </div>
                            </div>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active now</Badge>
                          </motion.div>
                          <motion.div 
                            className="p-4 flex items-center justify-between"
                            whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                          >
                            <div className="flex gap-3">
                              <Smartphone className="h-5 w-5 text-teal-500" />
                              <div>
                                <p className="font-medium">Mobile App</p>
                                <p className="text-sm text-muted-foreground">San Francisco, USA · iOS 15</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">Sign out</Button>
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Additional icon components
const Mail = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const BellRing = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    <path d="M4 2C2.8 3.7 2 5.7 2 8" />
    <path d="M22 8c0-2.3-.8-4.3-2-6" />
  </svg>
);

const MessageSquare = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const AtSign = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
  </svg>
);

const Clock = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const Calendar = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </svg>
);

const Key = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <circle cx="7.5" cy="15.5" r="3.5" />
    <path d="m21 2-9.6 9.6" />
    <path d="m15.5 7.5 3 3L22 7l-3-3" />
    <path d="m10 13-3 3 4 4 3-3" />
  </svg>
);

const Smartphone = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
);

export default Settings;
