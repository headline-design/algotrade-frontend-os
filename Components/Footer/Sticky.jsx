import { Box, Text, HStack, Link } from "@chakra-ui/react";
import { HomeIcon } from "../Icons/Icons";
import NextLink from "next/link";
import SearchModal from "../Wallet/SearchModal";
import dynamic from "next/dynamic";
import { AddressContext } from "../../pages/_app";
import { useContext } from "react";
import MobileWallet from "../Wallet/MobileWallet";
const ConnectModal = dynamic(() => import("../Wallet/ConnectModal"), {
  ssr: false,
});
const StickyFooter = () => {
  const address = useContext(AddressContext);
  return (
    <Box
      zIndex="2"
      as="footer"
      width="100%"
      position="fixed"
      bottom="0"
      height="67px"
      bg="#1f2733"
    >
      <HStack
        spacing={8}
        height="100%"
        pt="14px"
        pb="14px"
        display="flex"
        justifyContent="space-evenly"
        alignItems="center !important"
      >
        <Box>
          <NextLink href={"/"} passHref>
            <Link
              _focus="none"
              textDecoration="none"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              _hover="none"
              alignItems="center"
            >
              <HomeIcon h="25px" w="25px" fill="white" />
              <Text lineHeight="1.3" fontWeight="500" fontSize="0.8rem">
                Home
              </Text>
            </Link>
          </NextLink>
        </Box>

        {address ? <MobileWallet /> : <ConnectModal useWallet={true} />}
        <SearchModal />
      </HStack>
    </Box>
  );
};

export default StickyFooter;
