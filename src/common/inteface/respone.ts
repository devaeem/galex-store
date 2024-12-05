interface PaginateResponse<T> {
  rows: T[];
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

interface Response<T> {
  status: number;
  message: string;
  data: T;
}

export { PaginateResponse, Response };
