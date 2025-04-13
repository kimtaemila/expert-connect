
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, User, Shield, Bell, Key, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "Data Analyst",
    company: "Tech Innovations Inc.",
    avatar: ""
  });
  
  const handleSave = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully."
    });
  };
  
  const handleLogout = () => {
    toast({
      title: "Logging out",
      description: "You have been logged out successfully."
    });
    
    // In a real app, we would clear auth state here
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
          </Button>
          <h1 className="text-xl font-bold">Profile Settings</h1>
        </div>
        
        <Button className="gap-2" onClick={handleSave}>
          <Save size={16} />
          <span>Save Changes</span>
        </Button>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 border-r border-border p-4">
          <div className="flex flex-col items-center mb-6 pt-4">
            <Avatar className="w-20 h-20 mb-4">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-lg font-medium">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.role}</p>
          </div>
          
          <Separator className="mb-4" />
          
          <nav className="space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <User size={16} />
              <span>Personal Info</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Shield size={16} />
              <span>Security</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Bell size={16} />
              <span>Notifications</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Key size={16} />
              <span>API Access</span>
            </Button>
            
            <Separator className="my-4" />
            
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              <span>Log Out</span>
            </Button>
          </nav>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input 
                      value={user.name} 
                      onChange={(e) => setUser({...user, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input 
                      type="email"
                      value={user.email} 
                      onChange={(e) => setUser({...user, email: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Role</label>
                    <Input 
                      value={user.role} 
                      onChange={(e) => setUser({...user, role: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company</label>
                    <Input 
                      value={user.company} 
                      onChange={(e) => setUser({...user, company: e.target.value})}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bio</label>
                  <textarea 
                    className="w-full h-32 rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="preferences" className="space-y-6">
                <h3 className="text-lg font-medium">Interface Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-muted-foreground">Toggle between light and dark themes</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive email updates about your account</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Compact View</p>
                      <p className="text-sm text-muted-foreground">Display more data with less spacing</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
