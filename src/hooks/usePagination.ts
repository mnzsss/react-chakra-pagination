type Options<I = any> = {
  totalRegisters: number;
  page: number;
  items: I[];
  registersPerPage?: number;
  siblingsCount?: number;
};

type Pagination<I = any> = {
  pageItems: I[];
  totalPages: number;
  registersPerPage: number;
  currentPage: number;
  lastPage: number;
  nextPages: number[];
  previousPages: number[];
  siblingsCount: number;
};

function generatePagesArray(from: number, to: number): number[] {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter((page) => page > 0);
}

export function usePagination<I = any>({
  totalRegisters,
  page,
  items,
  registersPerPage = 10,
  siblingsCount = 1,
}: Options<I>): Pagination<I> {
  const currentPage = page;
  const lastPage = Math.ceil(totalRegisters / registersPerPage);
  const totalPages = lastPage === 0 ? 1 : lastPage;

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];
  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];

  const pageStart = (page - 1) * registersPerPage;
  const pageEnd = pageStart + registersPerPage;

  const pageItems = items.slice(pageStart, pageEnd);

  return {
    pageItems,
    currentPage,
    totalPages,
    lastPage,
    nextPages,
    previousPages,
    registersPerPage,
    siblingsCount,
  };
}
