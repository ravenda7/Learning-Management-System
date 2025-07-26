
'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Building2, Eye, EyeOff } from 'lucide-react';

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must have than 8 characters'), // Fix typo in message below
});

const SignInForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      setError('');
      console.log('Submitting credentials:', values);

      const signInData = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      console.log('Sign-in response:', signInData);

      if (signInData?.error) {
        console.error('Sign-in error:', signInData.error);
        setError('Invalid email or password');
        return;
      }

      // Fetch session to get user role
      const response = await fetch('/api/auth/session');
      const sessionData = await response.json();
      console.log('Session data:', sessionData);

      if (sessionData?.user?.role) {
        const role = sessionData.user.role;
        if (role === 'admin') {
          console.log('Redirecting admin to /admin');
          router.push('/admin/dashboard');
        } else if (role === 'instructor') {
          console.log('Redirecting instructor to /instructor');
          router.push('/instructor/dashboard');
        } else if (role === 'student') {
          console.log('Redirecting student to /student');
          router.push('/student/dashboard');
        } else {
          console.log('Unknown role, redirecting to /');
          router.push('/sign-in');
        }
      } else {
        console.error('No role found in session');
        setError('Unable to determine user role');
        router.push('/sign-in');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error during sign-in';
      console.error('Unexpected error in onSubmit:', errorMessage);
      setError('Something went wrong, please try again');
    }
  };

  return (
    <>{error && <p className='text-red-500 text-center mt-4'>{error}</p>}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
            <div className='space-y-2'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='mail@example.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                    <div className='relative'>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter your password'
                        {...field}
                      />
                      <button onClick={()=> setShowPassword(!showPassword)} type='button' className='absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500'>
                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>
                    </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className='w-full mt-6' type='submit'>
              Sign in
            </Button>
          </form>
        </Form>
    </>
  );
};

export default SignInForm;