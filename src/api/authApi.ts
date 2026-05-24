import type { ApiResponse } from '../types/api';
import type { User, AuthResponse } from '../types/auth';
import axiosClient from './axiosClient';

export const authApi = {
  register: (data: any): Promise<ApiResponse<User>> => {
    return axiosClient.post('/auth/register', data);
  },

  login: (data: any): Promise<ApiResponse<AuthResponse>> => {
    return axiosClient.post('/auth/login', data);
  },

  logout: (): Promise<ApiResponse<null>> => {
    return axiosClient.post('/auth/logout');
  },

  getMyInfo: (): Promise<ApiResponse<User>> => {
    return axiosClient.get('/users/me');
  },
};
