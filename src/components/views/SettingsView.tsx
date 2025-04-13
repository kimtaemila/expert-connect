
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { setupDatabase, seedDatabase } from "@/services/expertService";

export function SettingsView() {
  const [apiUrl, setApiUrl] = useState(import.meta.env.VITE_API_URL || 'http://localhost:3001/api');
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [isDatabaseSetup, setIsDatabaseSetup] = useState(false);

  const handleSaveApiConfig = () => {
    setIsConfiguring(true);
    
    // Simulate saving configuration
    setTimeout(() => {
      setIsConfiguring(false);
      toast({
        title: "Settings saved",
        description: `API URL updated to ${apiUrl}`,
      });
    }, 1000);
  };

  const handleSetupDatabase = async () => {
    setIsConfiguring(true);
    
    try {
      const result = await setupDatabase();
      setIsDatabaseSetup(result);
      
      if (result) {
        toast({
          title: "Database setup successful",
          description: "Database tables have been created",
        });
      } else {
        toast({
          title: "Database setup failed",
          description: "There was an error setting up the database tables",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Database setup error:", error);
      toast({
        title: "Database setup error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsConfiguring(false);
    }
  };

  const handleSeedDatabase = async () => {
    setIsConfiguring(true);
    
    try {
      const result = await seedDatabase();
      
      if (result) {
        toast({
          title: "Database seeded successfully",
          description: "Sample data has been added to the database",
        });
      } else {
        toast({
          title: "Database seeding failed",
          description: "There was an error adding sample data to the database",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Database seeding error:", error);
      toast({
        title: "Database seeding error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsConfiguring(false);
    }
  };

  return (
    <>
      <Header title="Settings" />
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <Tabs defaultValue="api" className="space-y-4">
          <TabsList>
            <TabsTrigger value="api">API Configuration</TabsTrigger>
            <TabsTrigger value="database">Database</TabsTrigger>
            <TabsTrigger value="display">Display</TabsTrigger>
          </TabsList>
          
          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Settings</CardTitle>
                <CardDescription>
                  Configure the connection to your Express API server
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="apiUrl">API Base URL</Label>
                  <Input
                    id="apiUrl"
                    value={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                    placeholder="http://localhost:3001/api"
                  />
                </div>
                <Button onClick={handleSaveApiConfig} disabled={isConfiguring}>
                  {isConfiguring ? 'Saving...' : 'Save API Settings'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="database" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Database Management</CardTitle>
                <CardDescription>
                  Setup and seed your Supabase database
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Setup Database Tables</h3>
                    <p className="text-sm text-muted-foreground">
                      Create required tables in your Supabase database
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleSetupDatabase} 
                    disabled={isConfiguring || isDatabaseSetup}
                  >
                    {isConfiguring ? 'Setting up...' : isDatabaseSetup ? 'Tables Created' : 'Create Tables'}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Seed Database</h3>
                    <p className="text-sm text-muted-foreground">
                      Add sample expert data to your database
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleSeedDatabase} 
                    disabled={isConfiguring || !isDatabaseSetup}
                  >
                    {isConfiguring ? 'Seeding...' : 'Seed Database'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="display" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Display Settings</CardTitle>
                <CardDescription>
                  Customize the appearance of your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Toggle dark mode for the dashboard
                    </p>
                  </div>
                  <Switch id="dark-mode" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="animations">Animations</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable or disable animations
                    </p>
                  </div>
                  <Switch id="animations" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
