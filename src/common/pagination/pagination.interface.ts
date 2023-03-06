export enum QuerySort {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface IPaginationQuery<T> {
  search?: string;
  filter?: T | Record<string, any>;
  order?: any;
  group?: string;
  from?: Date;
  to?: Date;
  [key: string]: any;
}

export interface IPaginationRequest<T> extends IPaginationQuery<T> {
  take: number;
  page: number;
  skip: number;
}
