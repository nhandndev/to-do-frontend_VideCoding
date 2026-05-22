import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../api/authApi';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { CheckSquare } from 'lucide-react';

const loginSchema = z.object({
  username: z.string().min(1, 'Username or email is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setErrorMsg('');
    try {
      const res = await authApi.login(data);
      if (res.code === 1000 && res.result.token) {
        await login(res.result.token);
        navigate('/');
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg('Invalid username or password');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md p-8 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary/10 text-primary p-3 rounded-xl mb-4">
            <CheckSquare size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Welcome Back</h1>
          <p className="text-slate-500 mt-2 text-sm">Sign in to manage your tasks</p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-100 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Username or Email"
            placeholder="Enter your username"
            {...register('username')}
            error={errors.username?.message}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register('password')}
            error={errors.password?.message}
          />
          <Button type="submit" className="w-full h-11 text-base mt-2" isLoading={isSubmitting}>
            Sign In
          </Button>
        </form>

        <p className="text-center mt-8 text-sm text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary font-medium hover:underline">
            Create one
          </Link>
        </p>
      </Card>
    </div>
  );
};
