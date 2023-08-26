import { Box, Link, Text } from "@chakra-ui/react";
import { CheckIcon, ExternalLinkIcon, SmallCloseIcon } from "@chakra-ui/icons";
import ReturnDecimals from "../../utils/returnDecimals";
import TruncateString from "../../utils/truncateString";

import NextLink from "next/link";

export const SuccessToastt = (toast, amount, decimals, assetName, txId) => {
  toast({
    duration: 5000,
    isClosable: true,
    containerStyle: {
      position: "relative",
    },
    render: () => (
      <Box
        borderRadius="8px"
        m={3}
        border="0.5px solid var(--chakra-colors-whiteAlpha-300)"
        color="white"
        p={3}
        bg="#253248"
        display="flex"
        flexDirection="column"
      >
        <Box display="flex" flexDirection="column">
          <Box display="flex" alignItems="center">
            <CheckIcon
              padding="6px"
              w={6}
              h={6}
              borderRadius="8px"
              color="var(--chakra-colors-gray-800)"
              bg="green.400"
            />

            <Text fontWeight="500" ml="5px">
              Success
            </Text>
          </Box>

          <Text mt="5px" fontSize="0.85rem">
            {`Redeemed ${
              decimals == 0 ? amount : amount / ReturnDecimals(decimals)
            } ${assetName}`}
          </Text>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          width="100%"
          justifyContent="space-between"
        >
          <Box>
            <Text fontSize="0.9rem" fontWeight="500" color="#a0aec0">
              {TruncateString(txId, 17)}
            </Text>
          </Box>
          <Box>
            <NextLink
              href={`https://algoexplorer.io/tx/${encodeURIComponent(txId)}`}
              passHref
            >
              <Link
                isExternal="true"
                _focus="none"
                display="flex"
                alignItems="center"
                textDecoration="none"
                _hover="none"
              >
                <ExternalLinkIcon
                  padding="6px"
                  w={6}
                  h={6}
                  color="#a0aec0"
                  bg="none"
                />
              </Link>
            </NextLink>
          </Box>
        </Box>
      </Box>
    ),
    // AssetOptIn(account, assetIndexOne);
  });
};

export const FailedToast = (toast, errorMessage) => {
  toast({
    duration: 5000,
    isClosable: true,
    containerStyle: {
      position: "relative",
    },
    render: () => (
      <Box
        maxWidth={{base: "260px", lg: '100%'}}
        borderRadius="8px"
        m={3}
        border="0.5px solid var(--chakra-colors-whiteAlpha-300)"
        color="white"
        p={3}
        bg="#253248"
        display="flex"
        flexDirection="column"
      >
        <Box display="flex" flexDirection="column">
          <Box display="flex" alignItems="center">
            <SmallCloseIcon
              padding="2px"
              w={6}
              h={6}
              borderRadius="8px"
              color="none"
              bg="#E53E3E"
            />

            <Text fontWeight="500" ml="5px">
              Failed
            </Text>
          </Box>

          <Text mt="5px" fontSize="0.85rem">
            {errorMessage}
          </Text>
        </Box>
      </Box>
    ),
  });
};
