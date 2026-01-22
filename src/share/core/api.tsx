// api.ts
import React from 'react';
import ApiClient from './ApiClient';
import { ApiOptions } from './ApiOptions';

export const api = {
  get: <T,>(url: string, options?: ApiOptions) => 
    ApiClient<T>(url, { ...options, method: 'GET' }),

  post: <T,>(url: string, data: any, options?: ApiOptions) => 
    ApiClient<T>(url, { ...options, method: 'POST', body: data }),

  put: <T,>(url: string, data: any, options?: ApiOptions) => 
    ApiClient<T>(url, { ...options, method: 'PUT', body: data }),

  delete: <T,>(url: string, options?: ApiOptions) => 
    ApiClient<T>(url, { ...options, method: 'DELETE' }),
};