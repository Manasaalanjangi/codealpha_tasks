
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";
import { Search, UserPlus, Filter } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const teamRoles = ["Developer", "Designer", "Product Manager", "Marketing", "QA"];

const TeamMemberCard = ({ member }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardContent className="p-0">
          <div className="relative">
            <div className="h-20 bg-gradient-to-r from-purple-400 to-blue-500"></div>
            <Avatar className="absolute bottom-0 left-4 transform translate-y-1/2 ring-4 ring-white h-16 w-16">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="text-lg">{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="pt-10 px-4 pb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role || "Team Member"}</p>
              </div>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {member.role || "Team Member"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{member.email}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">Message</Button>
              <Button variant="outline" size="sm" className="flex-1">Profile</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Team = () => {
  const { currentUser, projects } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");

  // Collect all team members from projects
  const allMembers = projects.reduce((acc, project) => {
    project.members.forEach(member => {
      if (!acc.some(m => m.id === member.id)) {
        acc.push({...member, role: teamRoles[Math.floor(Math.random() * teamRoles.length)]});
      }
    });
    return acc;
  }, []);
  
  const filteredMembers = searchQuery 
    ? allMembers.filter(member => 
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (member.role && member.role.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : allMembers;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="container py-8"
    >
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold mb-8">Team</h1>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 items-end justify-between mb-8">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            className="pl-10" 
            placeholder="Search team members..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSearchQuery("")}>All Members</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchQuery("Developer")}>Developers</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchQuery("Designer")}>Designers</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchQuery("Product")}>Product</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" onClick={() => toast.info("Invite feature would be implemented here")}>
            <UserPlus className="h-4 w-4 mr-2" />
            Invite
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMembers.map((member, index) => (
          <motion.div 
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <TeamMemberCard member={member} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Team;
