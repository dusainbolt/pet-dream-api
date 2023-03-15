import * as querystrings from 'querystring';
import { PaginateOptionsDto } from './pagination.dto';
import { PAGINATION } from '../constant';
import { trim } from 'lodash';
import { IPaginationRequest, QuerySort } from './pagination.interface';
export * from './pagination.dto';
export * from './pagination.decorator';
export * from './pagination.interface';

/**
 * @UTIL_PAGINATION
 * url?search=string&filter={field1=value1,field2=value2}&page=0&size=10&sort=fieldName.asc(desc)&sort=fieldName.desc;
 */
export const getDefaultQuery = <T>({
  search,
  filter,
  sort,
  page,
  limit,
  ...options
}: PaginateOptionsDto): IPaginationRequest<T> => {
  let sortDefault: any = { createdOn: QuerySort.DESC };
  if (sort !== undefined && sort !== '') {
    const [sortBy, orderBy]: string[] = sort.split('.');
    sortDefault = { [sortBy]: orderBy };
  }
  const formatFilter = (filter ? querystrings.parse(filter.slice(1, -1).replace(/,/g, '&')) : {}) as any;
  const limitResult = Number(limit || PAGINATION.SIZE_DEFAULT);
  const pageResult = Number(page || PAGINATION.PAGE_DEFAULT);
  const skip = (pageResult - 1) * limitResult;
  return {
    order: sortDefault,
    page: pageResult,
    take: limitResult,
    skip: skip < 0 ? 0 : skip,
    filter: formatFilter,
    search: search ? trim(search) : '',
    ...options,
  };
};
