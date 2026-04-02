// Standardized API Response Wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export class ResponseHandler {
  static success<T>(
    data: T,
    message?: string,
    pagination?: any,
  ): ApiResponse<T> {
    return {
      success: true,
      data,
      message,
      ...(pagination && { pagination }),
    };
  }

  static error(message: string, errors?: string[]): ApiResponse {
    return {
      success: false,
      message,
      ...(errors && { errors }),
    };
  }
}
