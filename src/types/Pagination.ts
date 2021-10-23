export type Options<I = any> = {
  totalRegisters: number;
  page: number;
  items: I[];
  registersPerPage?: number;
  siblingsCount?: number;
};

export type Pagination<I = any> = {
  pageItems: I[];
  totalPages: number;
  registersPerPage: number;
  currentPage: number;
  lastPage: number;
  nextPages: number[];
  previousPages: number[];
  siblingsCount: number;
};

export interface BasePagination {
  page: number;
  /**
   * If you paginate your list in server use this
   * prop to pass the total length of list.
   */
  totalRegisters: number;
  /** Listener change page */
  onPageChange: (page: number) => void;
}
