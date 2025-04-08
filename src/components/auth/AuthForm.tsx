
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login successful",
        description: "Welcome back to SocialWeave!",
      });
      navigate('/');
    }, 1500);
  };
  
  const handleSignUp = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created",
        description: "Welcome to SocialWeave!",
      });
      navigate('/');
    }, 1500);
  };
  
  return (
    <div className="max-w-md w-full mx-auto">
      <div className="text-center mb-8">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-social-indigo to-social-blue flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-lg">SW</span>
        </div>
        <h1 className="text-2xl font-bold mb-1">Welcome to SocialWeave</h1>
        <p className="text-muted-foreground">Connect and share with the people in your life</p>
      </div>
      
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="login">Log In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="name@example.com" type="email" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted-foreground/20"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button variant="outline" type="button" disabled={isLoading}>
                Continue with Google
              </Button>
              <Button variant="outline" type="button" disabled={isLoading}>
                Continue with Facebook
              </Button>
            </div>
          </form>
        </TabsContent>
        
        <TabsContent value="signup">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signupEmail">Email</Label>
              <Input id="signupEmail" placeholder="name@example.com" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signupPassword">Password</Label>
              <Input id="signupPassword" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input id="confirmPassword" type="password" required />
            </div>
            <p className="text-xs text-muted-foreground">
              By signing up, you agree to our{" "}
              <a href="/terms" className="text-primary underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-primary underline">
                Privacy Policy
              </a>
              .
            </p>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted-foreground/20"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button variant="outline" type="button" disabled={isLoading}>
                Sign up with Google
              </Button>
              <Button variant="outline" type="button" disabled={isLoading}>
                Sign up with Facebook
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
