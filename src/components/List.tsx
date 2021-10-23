import React from "react";
import {
  Box,
  List as ChakraList,
  ListItem as ChakraListItem,
  OrderedList,
  UnorderedList,
  ListIcon,
  Text,
  ListProps as ChakraListProps,
} from "@chakra-ui/react";

import { ListItem } from "../types/List";
import { BasePagination } from "../types/Pagination";
import { usePagination } from "../hooks/usePagination";
import { Pagination } from "./Pagination";

interface ListProps extends Omit<ChakraListProps, "listStyle">, BasePagination {
  /** Items List */
  items: ListItem[];
  /** Control list style */
  listStyle?: "ordered" | "unordered" | "none";
}

export function List({
  items,
  listStyle: style = "none",
  onPageChange,
  page,
  totalRegisters,
  ...props
}: ListProps) {
  const Tag =
    style === "none"
      ? ChakraList
      : style === "ordered"
      ? OrderedList
      : UnorderedList;

  const { pageItems, ...pagination } = usePagination({
    items,
    page,
    totalRegisters,
  });

  return (
    <Box py="6" px="8" borderRadius="8" w="full" h="100%">
      <Tag spacing={3} {...props}>
        {pageItems.map((item, i) => (
          <ChakraListItem key={i}>
            {item.iconPosition === "start" ? (
              <ListIcon as={item.icon} color={item.iconColor} />
            ) : null}

            <Text>{item.content}</Text>

            {item.iconPosition === "end" ? (
              <ListIcon as={item.icon} color={item.iconColor} />
            ) : null}
          </ChakraListItem>
        ))}
      </Tag>

      <Pagination {...pagination} onPageChange={onPageChange} />
    </Box>
  );
}
