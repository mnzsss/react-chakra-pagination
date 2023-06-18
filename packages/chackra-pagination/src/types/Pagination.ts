import { SortingState } from '@tanstack/react-table';

export type Options<I> = {
  totalRegisters: number;
  page: number;
  items: I[];
  itemsPerPage?: number;
  siblingsCount?: number;
  sorting?: SortingState;
};

export type Pagination<I> = {
  pageItems: I[];
  totalPages: number;
  itemsPerPage: number;
  currentPage: number;
  lastPage: number;
  nextPages: number[];
  previousPages: number[];
  siblingsCount: number;
};

export interface BasePagination {
  /**
   * Initial page of pagination.
   * @default 1
   */
  initialPage: number;
  /**
    Control registers to show
   */
  totalRegisters: number;
  /** Listener change page */
  onPageChange: (page: number) => void;
}
