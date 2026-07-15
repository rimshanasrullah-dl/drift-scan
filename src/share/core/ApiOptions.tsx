export interface ApiOptions extends RequestInit {
  body?: any;
  params?: Record<any, any>; 
  requiresAuth?: boolean;
  localToken?: any;
  timeout?: number;
}

export interface ApiError {
  message: string;
  status?: number;
}
