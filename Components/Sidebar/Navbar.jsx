import {
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import Wallet from "../Wallet/Wallet";


function Navbar() {
  return (
    <>
      <Box
        as="header"
        bg="#1f2733"
        display={{ base: "block", lg: "none" }}
        width="100%"
        height="70px"
      >
        <Box
          padding="0 1.2rem"
          height="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Wallet />
        </Box>
      </Box>
    </>
  );
}

export default Navbar;
