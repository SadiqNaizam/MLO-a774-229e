import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import SocialLoginButton from '@/components/SocialLoginButton'; // Custom component
import { Github, Chrome, AlertCircle, LogIn } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  console.log('LoginPage loaded');

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    console.log('Attempting login with:', { email, password });

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // Placeholder login logic - replace with actual API call
    if (email === 'admin@example.com' && password === 'password123') {
      console.log('Login successful');
      // In a real app, set auth token here
      navigate('/post-login-page');
    } else {
      setError('Invalid email or password. Try admin@example.com and password123.');
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Attempting login with ${provider}`);
    // Placeholder for social login logic
    setError(`Social login with ${provider} is not yet implemented.`);
    // navigate('/post-login-page'); // Example navigation
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <LogIn className="mx-auto h-10 w-10 text-primary" />
          <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
          <CardDescription>Enter your credentials to access your account. (Hint: admin@example.com / password123)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Login Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button asChild variant="link" size="sm" className="p-0 h-auto">
                    <Link to="/recover-password">Forgot password?</Link>
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <SocialLoginButton
              providerName="Google"
              icon={<Chrome />}
              onClick={() => handleSocialLogin('Google')}
            >
              Sign in with Google
            </SocialLoginButton>
            <SocialLoginButton
              providerName="GitHub"
              icon={<Github />}
              onClick={() => handleSocialLogin('GitHub')}
            >
              Sign in with GitHub
            </SocialLoginButton>
          </div>
        </CardContent>
        <CardFooter className="text-center text-sm">
          <p className="w-full">
            Don't have an account?{' '}
            <Button asChild variant="link" className="p-0 h-auto">
                <Link to="/register">Sign up</Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;