export interface DataStatus {
  loading: boolean;
  loaded: boolean;
  //eslint-disable-next-line  @typescript-eslint/no-explicit-any
  error?: any;
}

export interface PaginationDataStatus {
  hasNextPage: boolean;
  loadingNextPage: boolean;
}

export interface MetadataNotification {
  code: string;
  type: string;
  message: string;
}

export interface ResultSet<T> {
  resultSet: {
    innerResponse: T;
  };
  metaData: {
    notifications: MetadataNotification[];
  };
}

export interface gamAPIPaginationParams {
  skip: number;
  take: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  count: number;
  first: boolean;
  last: boolean;
  page: number;
  pages: number;
  size: number;
}

export interface gamAPIError<TSubError = unknown> {
  status: string;
  timestamp: string;
  code: string;
  message: string;
  localizedMessage: string;
  subErrors: TSubError[];
  extraData: string;
}
