import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../api/authApi';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { CheckSquare } from 'lucide-react';

const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const res = await authApi.register({
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword
      });
      if (res.code === 1000) {
        setSuccessMsg('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg('Failed to register. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-8">
      <Card className="w-full max-w-md p-8 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary/10 text-primary p-3 rounded-xl mb-4">
            <CheckSquare size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Create Account</h1>
          <p className="text-slate-500 mt-2 text-sm">Join us to start managing tasks</p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-100 text-center">
            {errorMsg}
          </div>
        )}
        
        {successMsg && (
          <div className="bg-emerald-50 text-emerald-600 p-3 rounded-lg text-sm mb-6 border border-emerald-100 text-center">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Username"
            placeholder="Choose a username"
            {...register('username')}
            error={errors.username?.message}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Create a password"
            {...register('password')}
            error={errors.password?.message}
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
          <Button type="submit" className="w-full h-11 text-base mt-4" isLoading={isSubmitting}>
            Create Account
          </Button>
        </form>

        <p className="text-center mt-8 text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
};
