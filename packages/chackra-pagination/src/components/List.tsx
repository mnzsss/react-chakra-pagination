import {
  Box,
  List as ChakraList,
  ListItem as ChakraListItem,
  ListProps as ChakraListProps,
  ListIcon,
  OrderedList,
  Text,
  UnorderedList,
} from '@chakra-ui/react';

import { usePagination } from '../hooks/usePagination';

import { ListItem } from '../types/List';
import { BasePagination } from '../types/Pagination';
import { Pagination } from './Pagination';

interface ListProps extends Omit<ChakraListProps, 'listStyle'>, BasePagination {
  /** Items List */
  items: ListItem[];
  /** Control list style */
  listStyle?: 'ordered' | 'unordered' | 'none';
}

export function List({
  items,
  listStyle: style = 'none',
  onPageChange,
  totalRegisters,
  ...props
}: ListProps) {
  const Tag =
    style === 'none'
      ? ChakraList
      : style === 'ordered'
      ? OrderedList
      : UnorderedList;

  const { pageItems, ...pagination } = usePagination({
    items,
    page: 0,
    totalRegisters,
  });

  return (
    <Box py="6" px="8" borderRadius="8" w="full" h="100%">
      <Tag spacing={3} {...props}>
        {pageItems.map((item, i) => (
          <ChakraListItem key={i}>
            {item.iconPosition === 'start' ? (
              <ListIcon as={item.icon} color={item.iconColor} />
            ) : null}

            <Text>{item.content}</Text>

            {item.iconPosition === 'end' ? (
              <ListIcon as={item.icon} color={item.iconColor} />
            ) : null}
          </ChakraListItem>
        ))}
      </Tag>

      <Pagination {...pagination} onPageChange={onPageChange} />
    </Box>
  );
}
