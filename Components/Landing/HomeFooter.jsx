import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Link,
} from "@chakra-ui/react";
import { FaTwitter, FaTelegram, FaDiscord } from "react-icons/fa";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={7}
      h={7}
      isExternal
      _focus={{ boxShadow: "none" }}
      cursor={"pointer"}
      as={Link}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const HomeFooter = () => {
  return (
    <>
      <Box
        as="footer"
        color="gray.200"
        margin="auto"
        w={{
          base: "100%",
          xl: "100%",
          "2xl": "1400px",
        }}
      >
        <Container
          mt="49px !important"
          padding={{ base: "0 2rem", lg: "18px 2rem" }}
          maxW="1400px"
          margin="auto"
          // pr="0"
          as={Stack}
          py={4}
          direction={{ base: "column", md: "row" }}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text fontWeight="500" fontSize="0.92rem">
            © 2022 AlgoTrade. All rights reserved
          </Text>
          <Stack direction={"row"} spacing={3}>
            <SocialButton
              label={"Discord"}
              href={"https://discord.gg/AdX3spjd"}
            >
              <FaDiscord className="faDiscord" />
            </SocialButton>
            <SocialButton
              label={"Telegram"}
              href={"https://t.me/officialalgotrade"}
            >
              <FaTelegram className="faTelegram" />
            </SocialButton>
            <SocialButton
              label={"Twitter"}
              href={"https://twitter.com/algotradeapp"}
            >
              <FaTwitter className="faTwitter" />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default HomeFooter;
