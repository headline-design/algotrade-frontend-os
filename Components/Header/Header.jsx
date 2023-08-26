import React from "react";
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

export default function HeadersComp() {
  return (
    <Flex
      bg={useColorModeValue("#F9FAFB", "gray.800")}
      p={50}
      pl="0"
      pr="0"
      w="full"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Box bg={useColorModeValue("gray.50", "gray.800")}>
        <Box
          maxW="7xl"
          w={{ md: "3xl", lg: "4xl" }}
          mx="auto"
          paddingLeft="0"
          display={{ lg: "flex" }}
          alignItems={{ lg: "center" }}
          justifyContent={{ lg: "space-between" }}
        >
          <chakra.h2
            fontSize={{ base: "3xl", sm: "4xl" }}
            fontWeight="extrabold"
            letterSpacing="tight"
            lineHeight="shorter"
            color={useColorModeValue("gray.900", "gray.100")}
          >
            <Box display="flex" alignItems="center">
            <WarningIcon fontSize="0.9rem" />
            <chakra.span fontSize="0.9rem" marginLeft="10px" display="block">PSA!</chakra.span>
            </Box>
            <chakra.span fontSize="0.9rem" fontWeight="500" display="block">You are currently on AlgoTrade's beta app. The statistics and numbers may not be real-time and accurate.<br />Hop over to Tinyman for real-time data before making any trades.</chakra.span>
          </chakra.h2>
        </Box>
      </Box>
    </Flex>
  );
}
