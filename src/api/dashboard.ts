import axiosInstance from './axiosInstance';

export const dashboardApi = {
  getStats: () => axiosInstance.get('/dashboard/stats'),
  getReports: (params?: any) => axiosInstance.get('/dashboard/reports', { params }),
  getRecentActivity: () => axiosInstance.get('/dashboard/activity'),
};
