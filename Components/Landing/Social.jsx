import {
  chakra,
  Stack,
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
      w={{ base: 6, lg: 7 }}
      h={{ base: 6, lg: 7 }}
      padding={{ base: "5px", lg: "7px" }}
      cursor={"pointer"}
      _focus={{ boxShadow: "none" }}
      isExternal
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

const Social = () => {
  return (
    <Stack
      direction={"row"}
      spacing={3}
      justifyContent={{ base: "center", lg: "unset" }}
      mb={{ base: "35px", lg: "0" }}
    >
      <SocialButton label={"Discord"} href={"https://discord.gg/AdX3spjd"}>
        <FaDiscord className="faDiscord" />
      </SocialButton>
      <SocialButton label={"Telegram"} href={"https://t.me/officialalgotrade"}>
        <FaTelegram className="faTelegram" />
      </SocialButton>
      <SocialButton label={"Twitter"} href={"https://twitter.com/algotradeapp"}>
        <FaTwitter className="faTwitter" />
      </SocialButton>
    </Stack>
  );
};
export default Social;
