export interface ApiResponse<T = null> {
  code: number;
  message: string;
  result: T;
}

export interface PaginatedResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}
