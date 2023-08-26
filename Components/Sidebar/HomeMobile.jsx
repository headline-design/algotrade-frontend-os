import { useBreakpointValue } from "@chakra-ui/media-query";
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  Button,
  IconButton,
  Text,
  Link,
} from "@chakra-ui/react";
import { HamburgerIcon, InfoIcon, QuestionIcon } from "@chakra-ui/icons";
import { FaTwitter, FaTelegram, FaDiscord } from "react-icons/fa";

const HomeMobile = () => {
  const mobile = useBreakpointValue({ lg: "960px" });

  return (
    <>
      {!mobile && (
        <Menu>
          <IconButton
            width="23px"
            minW="unset"
            margin="auto"
            height="auto"
            border="none"
            _focus={{ boxShadow: "none" }}
            as={MenuButton}
            aria-label="Options"
            icon={<HamburgerIcon margin="auto" height="23px" width="23px" />}
            variant="outline"
          />
          <MenuList
            border="none"
            minW="0"
            w={"180px"}
            zIndex="100"
            pt="0"
            pb="0"
            bg="#242e3c"
          >
            {/* <Button
              _focus={{ bg: "none", boxShadow: "none" }}
              _hover={{
                bg: "#334156",
                color: "#e5e5e5",
                borderTopRadius: "var(--chakra-radii-md)",
                textDecoration: "none",
              }}
              bg="none"
              borderRadius="0"
              _active={{ bg: "none" }}
              width="100%"
              pl="15px"
              pr="15px"
              as={Link}
              isExternal
              href={"/"}
              outline={0}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <Box>
                  <Text fontWeight="500" fontSize="0.94rem">
                    About
                  </Text>
                </Box>
                <Box display="flex" alignItems="center">
                  <InfoIcon height="auto" width="14px" className="InfoIcon" />
                </Box>
              </Box>
            </Button> */}
            {/* <Button
              _hover={{
                bg: "#334156",
                color: "#e5e5e5",
              }}
              borderRadius="0"
              bg="none"
              _active={{ bg: "none" }}
              _focus={{ bg: "none" }}
              width="100%"
              pl="15px"
              pr="15px"
              as={"a"}
              href={"/"}
              outline={0}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <Box>
                  <Text fontWeight="500" fontSize="0.94rem">
                    FAQ
                  </Text>
                </Box>
                <Box display="flex" alignItems="center">
                  <QuestionIcon
                    height="auto"
                    width="14px"
                    className="QuestionIcon"
                  />
                </Box>
              </Box>
            </Button> */}

            <Button
              _focus={{ bg: "none", boxShadow: "none" }}
              _hover={{
                bg: "#334156",
                color: "#e5e5e5",
                borderTopRadius: "var(--chakra-radii-md)",
                textDecoration: "none",
              }}
              borderRadius="0"
              bg="none"
              _active={{ bg: "none" }}
              width="100%"
              pl="15px"
              pr="15px"
              as={Link}
              isExternal
              href={"https://discord.gg/AdX3spjd"}
              outline={0}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <Box>
                  <Text fontWeight="500" fontSize="0.94rem">
                    Discord
                  </Text>
                </Box>
                <Box display="flex" alignItems="center">
                  <FaDiscord className="faDiscord" />
                </Box>
              </Box>
            </Button>
            <Button
              _focus={{ bg: "none", boxShadow: "none" }}
              _hover={{
                bg: "#334156",
                color: "#e5e5e5",
                borderTopRadius: "var(--chakra-radii-md)",
                textDecoration: "none",
              }}
              borderRadius="0"
              bg="none"
              _active={{ bg: "none" }}
              width="100%"
              pl="15px"
              pr="15px"
              as={Link}
              isExternal
              href={"https://t.me/officialalgotrade"}
              outline={0}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <Box>
                  <Text fontWeight="500" fontSize="0.94rem">
                    Telegram
                  </Text>
                </Box>
                <Box display="flex" alignItems="center">
                  <FaTelegram className="faTelegram" />
                </Box>
              </Box>
            </Button>
            <Button
              _focus={{ bg: "none", boxShadow: "none" }}
              _hover={{
                bg: "#334156",
                color: "#e5e5e5",
                borderBottomRadius: "var(--chakra-radii-md)",
                textDecoration: "none",
              }}
              borderRadius="0"
              bg="none"
              _active={{ bg: "none" }}
              width="100%"
              pl="15px"
              pr="15px"
              as={Link}
              isExternal
              href={"https://twitter.com/algotradeapp"}
              outline={0}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <Box>
                  <Text fontWeight="500" fontSize="0.94rem">
                    Twitter
                  </Text>
                </Box>
                <Box display="flex" alignItems="center">
                  <FaTwitter className="FaTwitter" />
                </Box>
              </Box>
            </Button>
          </MenuList>
        </Menu>
      )}
    </>
  );
};

export default HomeMobile;
