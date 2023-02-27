import { Flex, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";

export interface NoContentProps {
  text: string;
  icon?: any;
  children?: ReactNode;
  noShadow?: boolean;
}

export function NoContent({ icon, text, children, noShadow }: NoContentProps) {
  return (
    <Flex
      mt="8"
      mb="12"
      p="10"
      borderRadius="8"
      direction="column"
      align="center"
      justify="center"
      boxShadow={noShadow ? "unset" : "sm"}
      h="100%"
    >
      {icon ? (
        <Flex
          p="6"
          align="center"
          justify="baseline"
          borderRadius="full"
          bg="gray.50"
        >
          {icon}
        </Flex>
      ) : null}

      <Text mt="4">{text}</Text>

      {children}
    </Flex>
  );
}
