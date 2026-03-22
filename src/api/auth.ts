import axiosInstance from './axiosInstance';

export const authApi = {
  login: (credentials: any) => axiosInstance.post('/auth/login', credentials),
  register: (userData: any) => axiosInstance.post('/auth/register', userData),
  verifyEmail: (data: { email: string; code: string }) => axiosInstance.post('/auth/verify-email', data),
  resendOtp: (email: string) => axiosInstance.post('/auth/resend-otp', { email }),
  logout: () => axiosInstance.post('/auth/logout'),
  getMe: () => axiosInstance.get('/auth/me'),
};
