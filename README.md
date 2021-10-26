# React Chakra UI Pagination

[![npm version](https://badge.fury.io/js/react-chakra-pagination.svg)](https://badge.fury.io/js/react-chakra-pagination.svg)

Easy way for paginate lists using Chakra UI, using lists components and hooks.

### Demo

<https://codesandbox.io/s/demo-react-chakra-pagination-1ywkt/>

![image](https://user-images.githubusercontent.com/51327920/136720412-338fd697-ff57-4af8-a23f-606b99bb7a65.png)

### Installing as a package

This packages needs to others libs, so install that first using:

#### Chakra UI

Follow the getting started guide [here](https://chakra-ui.com/docs/getting-started).

#### React Table

```
$ npm install react-table --save
```

```
$ yarn add react-table
```

---

### Install this package

```
$ yarn add react-chakra-pagination
```

or

```
$ npm install react-chakra-pagination --save
```

---

## Usage

```typescript
import * as React from "react";
import { render } from "react-dom";

import { Table } from "react-chakra-pagination";

import { ChakraProvider } from "@chakra-ui/react";

// Use Chakra Ui for create a custom component for display field data in table
import {
  Flex,
  Avatar,
  Text,
  Box,
  Icon,
  Button,
  Heading
} from "@chakra-ui/react";

// Recommended for icons
import { FiTrash2, FiUser } from "react-icons/fi";


type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  avatar_url: string;
};

// Example list of users
// Generated using https://www.mockaroo.com/
const users: User[] = [
  {
    id: 1,
    name: "Carlin Gwinn",
    email: "cgwinn0@buzzfeed.com",
    phone: "(684) 9842794",
    birthday: "04/11/2009",
    avatar_url:
      "https://robohash.org/assumendanihilodio.png?size=50x50&set=set1"
  },
  {
    id: 2,
    name: "Yetta Snape",
    email: "ysnape1@princeton.edu",
    phone: "(645) 8617506",
    birthday: "06/08/1989",
    avatar_url:
      "https://robohash.org/liberorationequasi.png?size=50x50&set=set1"
  },
  ...
];

function App() {
  // Control current Page
  const [page, setPage] = React.useState(1);

  // Formatter for each user
  const tableData = users.map((user) => ({
    name: (
      <Flex align="center">
        <Avatar name={user.name} src={user.avatar_url} size="sm" mr="4" />
        <Text>{user.name}</Text>
      </Flex>
    ),
    email: user.email,
    phone: user.phone,
    birthday: user.birthday,
    action: (
      <Button
        colorScheme="gray"
        onClick={() => console.log("remove user!")}
        size="sm"
      >
        <Icon as={FiTrash2} fontSize="20" />
      </Button>
    )
  }));

  // Accessor to get a data in user object
  const tableColumns = [
    {
      Header: "Name",
      accessor: "name" as const
    },
    {
      Header: "Email",
      accessor: "email" as const
    },
    {
      Header: "Phone",
      accessor: "phone" as const
    },
    {
      Header: "Birthday",
      accessor: "birthday" as const
    },
    {
      Header: "",
      accessor: "action" as const
    }
  ];

  return (
    <Box p="12">
      <Heading size="sm" as="h3">
        List of Users
      </Heading>

      <Box mt="6">
        <Table
          colorScheme="blue"
          // Fallback component when list is empty
          emptyData={{
            icon: <FiUser />,
            text: "Nobody is registered here."
          }}
          totalRegisters={users.length}
          page={page}
          // Listen change page event and control the current page using state
          onPageChange={(page) => setPage(page)}
          columns={tableColumns}
          data={tableData}
        />
      </Box>
    </Box>
  );
}

const rootElement = document.getElementById("root");

// Use ChakraProvider to get styles of Chakra
render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  rootElement
);

```

---

## Functionalities

### Table

Use this component for list data in table mode.

#### Props

| Name           | Value                    | Description                                                                         |
| -------------- | ------------------------ | ----------------------------------------------------------------------------------- |
| data           | `DataType[]`             | List parsed data columns using string or custom component                           |
| columns        | `Column<DataType>[]`     | Pass the array of Table Headers.                                                    |
| page           | `number`                 | Current page.                                                                       |
| totalRegisters | `number`                 | If you paginate your list in server use this prop to pass the total length of list. |
| onPageChange   | `(page: number) => void` | Listen change page.                                                                 |
| colorScheme    | `string`                 | Custom color schemes using Chakra UI.                                               |
| emptyData      | `EmptyMessage`           | Fallback for empty data .                                                           |
