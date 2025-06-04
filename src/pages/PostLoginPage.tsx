import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Textarea } from '@/components/ui/textarea';
import { LogOut, Home, Settings, UserCircle } from 'lucide-react';

const PostLoginPage = () => {
  const navigate = useNavigate();
  console.log('PostLoginPage loaded');

  const handleLogout = () => {
    console.log('User logging out');
    // In a real app, clear auth token here
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <NavigationMenu className="max-w-7xl mx-auto p-2 flex justify-between items-center">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/post-login-page" className={navigationMenuTriggerStyle()}>
                <Home className="h-4 w-4 mr-2" /> Dashboard
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
                <Settings className="h-4 w-4 mr-2" /> Settings
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
          <div className="flex items-center space-x-4">
             <Avatar>
                <AvatarImage src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff" alt="Admin User" />
                <AvatarFallback>AU</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </div>
        </NavigationMenu>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-4">
                <UserCircle className="h-12 w-12 text-primary" />
                <div>
                    <CardTitle className="text-2xl">Welcome, Admin User!</CardTitle>
                    <CardDescription>This is your authenticated dashboard area.</CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              You have successfully logged in. This page represents the main application content
              area that users would see after authentication.
            </p>
            <Label htmlFor="main-content-area" className="text-lg font-semibold mb-2 block">Main Content Area (Placeholder)</Label>
            <Textarea
              id="main-content-area"
              placeholder="Your application's main features and content would go here..."
              className="min-h-[200px]"
              readOnly
              defaultValue="Example: User-specific data, interactive modules, settings, etc."
            />
          </CardContent>
        </Card>
      </main>

      <footer className="text-center p-4 border-t text-sm text-muted-foreground">
        © {new Date().getFullYear()} Your Application. All rights reserved.
      </footer>
    </div>
  );
};

export default PostLoginPage;