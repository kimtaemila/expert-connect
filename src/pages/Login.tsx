
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const validateEmail = (email: string) => {
    // Simple email validation to avoid Supabase errors
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast({
        title: "Invalid email format",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      if (isSigningUp) {
        // Sign up with Supabase
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin + '/dashboard'
          }
        });

        if (error) throw error;

        setEmailSent(true);
        toast({
          title: "Account created!",
          description: "Check your email for confirmation link.",
        });
      } else {
        // Log in
        await signIn({ email, password });
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Login/Signup error:', error);
      toast({
        title: isSigningUp ? "Sign up failed" : "Sign in failed",
        description: error.message || "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Create a real working test user
  const createTestUser = async () => {
    const testEmail = "user@example.com";
    const testPassword = "password123";

    if (!validateEmail(testEmail)) {
      toast({
        title: "Invalid test email",
        description: "The test email is in an invalid format. Please modify the code to use a valid test email.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // First check if user exists
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: testPassword,
      });
      
      if (signInError && signInError.message.includes("Invalid")) {
        // User doesn't exist, create one
        const { data, error } = await supabase.auth.signUp({
          email: testEmail,
          password: testPassword,
          options: {
            // This makes it auto-confirm the user for testing only
            // Note: This requires "Confirm email" to be disabled in Supabase Auth settings
            data: {
              email_confirmed: true
            }
          }
        });
        
        if (error) throw error;
        
        toast({
          title: "Test account created",
          description: `You can now sign in with ${testEmail} and ${testPassword}`,
        });
      } else {
        // User exists
        toast({
          title: "Test account exists",
          description: `You can sign in with ${testEmail} and ${testPassword}`,
        });
      }
      
      // Auto-fill credentials
      setEmail(testEmail);
      setPassword(testPassword);
      
    } catch (error: any) {
      console.error('Create test user error:', error);
      toast({
        title: "Could not create test account",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            {isSigningUp ? "Create Account" : "Expert Dashboard Login"}
          </CardTitle>
          <CardDescription>
            {isSigningUp 
              ? "Enter your details to create a new account" 
              : "Enter your credentials to access the expert knowledge graph"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {emailSent && (
            <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
              <Info className="h-4 w-4" />
              <AlertDescription>
                Check your email for a confirmation link. You must confirm your email before you can sign in.
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button 
            onClick={handleSubmit} 
            className="w-full mb-2" 
            disabled={isSubmitting}
          >
            {isSubmitting 
              ? (isSigningUp ? 'Creating account...' : 'Signing in...') 
              : (isSigningUp ? 'Sign up' : 'Sign in')}
          </Button>
          <div className="w-full flex justify-between mt-2">
            <Button
              variant="ghost"
              onClick={() => {
                setIsSigningUp(!isSigningUp);
                setEmailSent(false);
              }}
              className="text-sm"
              type="button"
            >
              {isSigningUp ? "Already have an account? Sign in" : "Need an account? Sign up"}
            </Button>
            <Button
              variant="outline"
              onClick={createTestUser}
              className="text-sm"
              type="button"
            >
              Create test user
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
