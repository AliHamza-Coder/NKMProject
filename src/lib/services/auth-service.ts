import { LoginCredentials, SignupData } from '../models/user';
import { signIn, signOut, useSession } from 'next-auth/react';

// Function to handle user signup
export async function signupUser(userData: SignupData): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Signup failed',
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Signup error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred during signup',
    };
  }
}

// Function to handle user login with credentials
export async function loginUser(credentials: LoginCredentials): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    // First, check if the user exists and if it's a Google OAuth user
    const checkResponse = await fetch('/api/auth/check-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email }),
    });

    if (checkResponse.ok) {
      const checkData = await checkResponse.json();
      
      if (checkData.userExists && checkData.isGoogleUser) {
        return {
          success: false,
          error: 'This account was created using Google. Please sign in with Google instead.',
        };
      }

      if (checkData.userExists && !checkData.isActive) {
        return {
          success: false,
          error: 'Your account has been deactivated.',
        };
      }
    } else if (checkResponse.status === 503) {
      // Handle database not configured error
      const errorData = await checkResponse.json();
      return {
        success: false,
        error: errorData.error || 'Please configure backend database connection',
      };
    }

    // Proceed with normal login
    const result = await signIn('credentials', {
      redirect: false,
      email: credentials.email,
      password: credentials.password,
    });

    if (result?.error) {
      return {
        success: false,
        error: result.error === 'CredentialsSignin' ? 'Invalid email or password' : result.error || 'Login failed',
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred during login',
    };
  }
}

// Function to handle Google login
export async function loginWithGoogle(): Promise<void> {
  await signIn('google', { callbackUrl: '/' });
}

// Function to logout user
export async function logoutUser(): Promise<void> {
  await signOut({ callbackUrl: '/account' });
}

// Custom hook to get session data
export function useAuth() {
  const { data: session, status } = useSession();
  
  return {
    user: session?.user,
    isAuthenticated: !!session,
    isLoading: status === 'loading',
  };
}