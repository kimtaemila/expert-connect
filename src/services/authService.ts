
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserSession {
  user: {
    id: string;
    email: string;
  } | null;
  session: any | null;
}

export async function signIn(credentials: UserCredentials): Promise<UserSession> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      console.error('Error signing in:', error);
      throw error;
    }

    return {
      user: data.user ? {
        id: data.user.id,
        email: data.user.email || '',
      } : null,
      session: data.session
    };
  } catch (error: any) {
    // Handle Supabase connection issues
    console.error('Auth service error:', error);
    
    // Check for specific error types
    if (error.message?.includes('email_not_confirmed')) {
      toast({
        title: "Email Not Verified",
        description: "Please check your email and click the verification link before logging in.",
        variant: "destructive",
      });
    } else if (error.message?.includes('Invalid login credentials')) {
      toast({
        title: "Invalid Credentials",
        description: "The email or password you entered is incorrect.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Authentication Error",
        description: error.message || "Could not connect to authentication service. Please try again later.",
        variant: "destructive",
      });
    }
    throw error;
  }
}

export async function signUp(credentials: UserCredentials): Promise<UserSession> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        emailRedirectTo: window.location.origin + '/dashboard'
      }
    });
    
    if (error) {
      console.error('Error signing up:', error);
      throw error;
    }
    
    return {
      user: data.user ? {
        id: data.user.id,
        email: data.user.email || '',
      } : null,
      session: data.session
    };
  } catch (error: any) {
    console.error('Sign up error:', error);
    throw error;
  }
}

export async function signOut(): Promise<void> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  } catch (error) {
    console.error('Sign out error:', error);
    toast({
      title: "Sign Out Error",
      description: "There was a problem signing out.",
      variant: "destructive",
    });
    throw error;
  }
}

export async function getCurrentUser(): Promise<UserSession> {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error getting current user:', error);
      throw error;
    }

    return {
      user: data.session?.user ? {
        id: data.session.user.id,
        email: data.session.user.email || '',
      } : null,
      session: data.session
    };
  } catch (error) {
    console.error('Get current user error:', error);
    return { user: null, session: null };
  }
}
