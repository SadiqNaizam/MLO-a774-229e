import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MailQuestion, AlertCircle, CheckCircle } from 'lucide-react';

const PasswordRecoveryPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  console.log('PasswordRecoveryPage loaded');

  const handleSendResetLink = (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);
    setError(null);
    console.log('Attempting to send password reset link for:', email);

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    // Placeholder logic
    // In a real app, call API to send reset link
    if (email.includes('@')) { // Basic email format check
      setMessage(`If an account exists for ${email}, a password reset link has been sent.`);
      // Simulate API call delay and then perhaps redirect or clear form
      setTimeout(() => {
        // navigate('/login'); // Optionally redirect
      }, 3000);
    } else {
      setError('Please enter a valid email address.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <MailQuestion className="mx-auto h-10 w-10 text-primary" />
          <CardTitle className="text-2xl font-bold">Forgot Your Password?</CardTitle>
          <CardDescription>
            No worries! Enter your email below, and we'll send you a link to reset it.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {message && (
            <Alert variant="default" className="bg-blue-100 border-blue-400 text-blue-700 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-300">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Instructions Sent</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSendResetLink} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={!!message} // Disable input after message is shown
              />
            </div>
            <Button type="submit" className="w-full" disabled={!!message}>
              Send Reset Link
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm">
          <p className="w-full">
            Remember your password?{' '}
            <Button asChild variant="link" className="p-0 h-auto">
                <Link to="/login">Back to Login</Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PasswordRecoveryPage;