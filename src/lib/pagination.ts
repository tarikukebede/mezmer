export type ApiSortOrder = 'asc' | 'desc';

export interface PaginationParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: ApiSortOrder;
  query?: string | null;
  meta?: object;
}

export const DEFAULT_PAGINATION_PARAMS: PaginationParams = {
  page: 1,
  size: 20,
  query: '',
};

export const DEFAULT_PAGINATION_PARAM = DEFAULT_PAGINATION_PARAMS;
