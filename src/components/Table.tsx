import React from "react";
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  ThemeTypings,
} from "@chakra-ui/react";
import { Column, useTable } from "react-table";
import { usePagination } from "../hooks/usePagination";
import { MdBrokenImage } from "react-icons/md";

import { NoContentProps, NoContent } from "./NoContent";
import { Pagination } from "./Pagination";

type DataType = {
  [key: string]: JSX.Element | string;
};

type EmptyMessage = Partial<NoContentProps>;

interface TableProps {
  columns: Column<DataType>[];
  data: DataType[];
  page: number;
  totalRegisters: number;
  onPageChange: (page: number) => void;
  colorScheme?: ThemeTypings["colorSchemes"];
  emptyData?: EmptyMessage;
}

export function Table({
  page,
  onPageChange,
  totalRegisters,
  data,
  columns,
  colorScheme = "teal",
  emptyData,
}: TableProps) {
  const pagination = usePagination({
    totalRegisters,
    page,
    items: data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: pagination.pageItems });

  if (data.length === 0) {
    return (
      <NoContent
        {...emptyData}
        icon={emptyData?.icon ?? MdBrokenImage}
        text={emptyData?.text ?? "Nenhum dado para ser exibido."}
      >
        {emptyData?.children ?? null}
      </NoContent>
    );
  }

  return (
    <Box py="6" px="8" borderRadius="8" w="full" h="100%">
      <ChakraTable {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <React.Fragment key={column.id}>
                  <Th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </Th>
                </React.Fragment>
              ))}
            </Tr>
          ))}
        </Thead>

        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell, index) => (
                  <React.Fragment key={cell.column.id + index}>
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  </React.Fragment>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </ChakraTable>

      <Pagination
        {...pagination}
        colorScheme={colorScheme}
        onPageChange={onPageChange}
      />
    </Box>
  );
}
