import axiosInstance from './axiosInstance';

export interface CreateWorkspaceData {
  name: string;
  teamSize: string;
}

export const workspaceApi = {
  createWorkspace: (data: CreateWorkspaceData) => axiosInstance.post('/workspaces', data),
  getWorkspaces: () => axiosInstance.get('/workspaces'),
};
