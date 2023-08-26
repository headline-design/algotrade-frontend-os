import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { FaTwitter, FaTelegram, FaDiscord } from "react-icons/fa";
import dynamic from "next/dynamic";
const StickyFooter = dynamic(() => import("./Sticky"), {
  ssr: false,
});
const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={7}
      h={7}
      cursor={"pointer"}
      as={"a"}
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

const Footer = () => {
  const mobile = useBreakpointValue({ base: "0px", lg: "960px" });

  return (
    <>
      {mobile == "0px" ? (
        <StickyFooter />
      ) : (
        <Box
          padding={{ base: "0 1.2rem", lg: "0 2rem", "3xl": "0" }}
          as="footer"
          color="gray.200"
          margin="auto"
          w={{
            base: "100%",
            xl: "100%",
            "3xl": "1400px",
          }}
        >
          <Container
            maxW="100%"
            pl={{ base: "0", lg: "80px" }}
            margin="auto"
            pr="0"
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
      )}
    </>
  );
};

export default Footer;
