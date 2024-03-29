import { Options, Pagination } from '../types/Pagination';

function generatePagesArray(from: number, to: number): number[] {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter(page => page > 0);
}

export function usePagination<I>({
  totalRegisters,
  page,
  items,
  itemsPerPage = 10,
  siblingsCount = 1,
  sorting = [],
}: Options<I>): Pagination<I> {
  const currentPage = page;
  const lastPage = Math.ceil(totalRegisters / itemsPerPage);
  const totalPages = lastPage === 0 ? 1 : lastPage;

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];
  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage),
        )
      : [];

  const pageStart = (page - 1) * itemsPerPage;
  const pageEnd = pageStart + itemsPerPage;

  const pageItems = items
    // Sort the items according to the sorting
    .sort((a, b) => {
      const { desc, id } = sorting[0] ?? {};

      // @ts-ignore
      if (typeof a[id] !== 'string') {
        return undefined;
      }

      let order: any = desc ? b : a;
      let compare = desc ? a : b;

      // @ts-ignore
      return order[id].localeCompare(compare[id], 'pt-BR', {
        sensitivity: 'base',
      });
    })
    // Get the items for the current page size
    .slice(pageStart, pageEnd);

  return {
    pageItems,
    currentPage,
    totalPages,
    lastPage,
    nextPages,
    previousPages,
    itemsPerPage,
    siblingsCount,
  };
}
