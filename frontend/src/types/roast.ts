export type RoastMode = 'mild' | 'medium' | 'savage' | 'grandma';

export interface RoastModeOption {
  id: RoastMode;
  name: string;
  emoji: string;
  description: string;
}

export interface RoastResponse {
  roast: string;
  roastScore: number;
  roastMode: RoastMode;
  techStack: string;
  fallback?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    responseTime: number;
    timestamp: string;
  };
}

export interface ApiError {
  error: string;
  message: string;
}