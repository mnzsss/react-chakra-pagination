import React from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";

export type NoContentProps = {
  text: string;
  icon?: IconType;
  children?: ReactNode;
  noShadow?: boolean;
};

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
      {icon && (
        <Flex
          p="6"
          align="center"
          justify="baseline"
          borderRadius="full"
          bg="gray.50"
        >
          <Icon as={icon} fontSize="24" color="teal.700" />
        </Flex>
      )}

      <Text mt="4">{text}</Text>

      {children}
    </Flex>
  );
}
