
import axios from 'axios';
import { mockGraphData } from '@/data';

// Determine if we're running in a Lovable environment or local
const isLovablePreview = window.location.hostname.includes('lovable.app');

// API base URL (default to localhost in development)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Short timeout in Lovable preview to fail fast and use fallbacks
  timeout: isLovablePreview ? 3000 : 10000
});

// Helper function to handle API calls with fallbacks
const safeApiCall = async (apiCall: () => Promise<any>, fallbackData: any) => {
  try {
    // If in Lovable preview, skip API call and use fallback
    if (isLovablePreview) {
      console.log("Using fallback data in preview environment");
      return fallbackData;
    }
    
    const response = await apiCall();
    return response.data;
  } catch (error) {
    console.warn("API call failed, using fallback data", error);
    return fallbackData;
  }
};

// Expert API services
export const expertsApi = {
  getAll: async () => {
    return safeApiCall(
      () => api.get('/experts'),
      []
    );
  },
  
  getById: async (id: string) => {
    return safeApiCall(
      () => api.get(`/experts/${id}`),
      null
    );
  },
  
  search: async (query: string) => {
    return safeApiCall(
      () => api.get(`/experts/search/${query}`),
      []
    );
  },
  
  create: async (expertData: any) => {
    return safeApiCall(
      () => api.post('/experts', expertData),
      { success: false }
    );
  },
  
  update: async (id: string, expertData: any) => {
    return safeApiCall(
      () => api.put(`/experts/${id}`, expertData),
      { success: false }
    );
  },
  
  delete: async (id: string) => {
    return safeApiCall(
      () => api.delete(`/experts/${id}`),
      { success: false }
    );
  }
};

// Topic API services
export const topicsApi = {
  getAll: async () => {
    return safeApiCall(
      () => api.get('/topics'),
      []
    );
  },
  
  getById: async (id: string) => {
    return safeApiCall(
      () => api.get(`/topics/${id}`),
      null
    );
  },
  
  create: async (topicData: any) => {
    return safeApiCall(
      () => api.post('/topics', topicData),
      { success: false }
    );
  },
  
  update: async (id: string, topicData: any) => {
    return safeApiCall(
      () => api.put(`/topics/${id}`, topicData),
      { success: false }
    );
  },
  
  delete: async (id: string) => {
    return safeApiCall(
      () => api.delete(`/topics/${id}`),
      { success: false }
    );
  },
  
  analyze: async () => {
    return safeApiCall(
      () => api.get('/topics/analyze/stats'),
      { topics: [], stats: {} }
    );
  }
};

// Connection API services
export const connectionsApi = {
  getAll: async () => {
    return safeApiCall(
      () => api.get('/connections'),
      []
    );
  },
  
  getForExpert: async (expertId: string) => {
    return safeApiCall(
      () => api.get(`/connections/expert/${expertId}`),
      []
    );
  },
  
  create: async (connectionData: any) => {
    return safeApiCall(
      () => api.post('/connections', connectionData),
      { success: false }
    );
  },
  
  update: async (id: string, connectionData: any) => {
    return safeApiCall(
      () => api.put(`/connections/${id}`, connectionData),
      { success: false }
    );
  },
  
  delete: async (id: string) => {
    return safeApiCall(
      () => api.delete(`/connections/${id}`),
      { success: false }
    );
  },
  
  getGraphData: async () => {
    return safeApiCall(
      () => api.get('/connections/graph'),
      mockGraphData
    );
  }
};

// Export the API client and service methods
export default {
  experts: expertsApi,
  topics: topicsApi,
  connections: connectionsApi
};
