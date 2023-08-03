import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
  Box,
  Table as ChakraTable,
  Tbody,
  Td,
  Th,
  Thead,
  ThemeTypings,
  Tr,
  chakra,
} from '@chakra-ui/react';
import {
  ColumnDef,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

import { usePagination } from '../hooks/usePagination';

import { BasePagination } from '../types/Pagination';
import { EmptyMessage } from '../types/Table';
import { NoContent } from './NoContent';
import { Pagination } from './Pagination';

interface TableProps<Data extends object> extends Partial<BasePagination> {
  /** List parsed data columns using string or custom component */
  columns: ColumnDef<Data, any>[];
  /** Pass the array of Table Headers */
  data: Data[];
  /**
   * Custom color schemes using Chakra UI
   * @default 'teal'
   */
  colorScheme?: ThemeTypings['colorSchemes'];
  /** Fallback for empty data  */
  emptyData?: EmptyMessage;
  /**
   * Define how many items displayed per page
   * @default 10
   */
  itemsPerPage?: number;
  /**
   * Define sort icons
   */
  sortIcons?: {
    up?: React.ElementType;
    down?: React.ElementType;
  };
}

export function Table<Data extends object>({
  data,
  columns,
  initialPage = 1,
  itemsPerPage = 10,
  emptyData = {},
  onPageChange = () => { },
  colorScheme = 'teal',
  totalRegisters = data.length,
  sortIcons = { up: TriangleUpIcon, down: TriangleDownIcon },
}: TableProps<Data>) {
  const realTotalRegisters = React.useMemo(() => {
    if (totalRegisters > data.length) {
      return data.length;
    }

    return totalRegisters;
  }, [data.length, totalRegisters]);

  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: initialPage - 1,
      pageSize: itemsPerPage,
    });

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const paginationState = usePagination<Data>({
    totalRegisters: realTotalRegisters,
    page: pageIndex + 1,
    items: data,
    itemsPerPage: pageSize,
    sorting,
  });

  const table = useReactTable({
    columns,
    data: paginationState.pageItems,
    getCoreRowModel: getCoreRowModel(),
    pageCount: paginationState.totalPages,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    manualSorting: true,
    manualPagination: true,
    state: {
      sorting,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
  });

  if (data.length === 0) {
    return (
      <NoContent {...emptyData} text={emptyData?.text ?? 'Nothing to show.'}>
        {emptyData?.children}
      </NoContent>
    );
  }

  return (
    <Box py="6" px="8" borderRadius="8" w="full" h="100%" color="">
      <ChakraTable>
        <Thead>
          {table.getHeaderGroups().map(headerGroup => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                const meta: any = header.column.columnDef.meta;

                const UpIcon = sortIcons.up;
                const DownIcon = sortIcons.down;

                return (
                  <React.Fragment key={header.id}>
                    <Th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      isNumeric={meta?.isNumeric}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}

                      <chakra.span pl="4">
                        {header.column.getIsSorted() ? (
                          header.column.getIsSorted() === 'desc' ? (
                            DownIcon ? (
                              <DownIcon aria-label="sorted descending" />
                            ) : null
                          ) : UpIcon ? (
                            <UpIcon aria-label="sorted ascending" />
                          ) : null
                        ) : null}
                      </chakra.span>
                    </Th>
                  </React.Fragment>
                );
              })}
            </Tr>
          ))}
        </Thead>

        <Tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell, index) => {
                  const meta: any = cell.column.columnDef.meta;

                  return (
                    <Td
                      key={cell.column.id + index}
                      isNumeric={meta?.isNumeric}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </ChakraTable>

      <Pagination
        {...paginationState}
        colorScheme={colorScheme}
        onPageChange={page => {
          table.setPageIndex(page - 1);
          onPageChange(page);
        }}
      />
    </Box>
  );
}
