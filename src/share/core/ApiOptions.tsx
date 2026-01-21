export interface ApiOptions extends RequestInit {
  body?: any;
  params?: Record<any, any>; 
  requiresAuth?: boolean;
  localToken?: any;
}

export interface ApiError {
  message: string;
  status?: number;
}
