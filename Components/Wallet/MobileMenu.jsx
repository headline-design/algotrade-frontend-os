import { useEffect, useState, useContext } from "react";
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
  useDisclosure,
  FormLabel,
  FormControl,
  Switch,
} from "@chakra-ui/react";
import { Default_Currency } from "../../pages/_app";
import { HamburgerIcon, InfoIcon } from "@chakra-ui/icons";
import { FaTwitter, FaTelegram, FaDiscord } from "react-icons/fa";
import { ApiIcon, UsdIcon, AlgoSvg } from "../Icons/Icons";

const MobileMenu = () => {
  const [isChecked, setIsChecked] = useState();
  const { defaultCurrency, setCurrency } = useContext(Default_Currency);
  const changeCurrency = (type) => {
    localStorage.setItem("default_currency", type);
    setCurrency(type);
  };
  useEffect(() => {
    if (isChecked == undefined) {
      setIsChecked(defaultCurrency == "usd" ? false : true);
    }
    (defaultCurrency == "usd" && isChecked == true && setIsChecked(false)) ||
      (defaultCurrency == "algo" && isChecked == false && setIsChecked(true));
  }, [defaultCurrency]);
  const mobile = useBreakpointValue({ lg: "960px" });
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {!mobile && (
        <Menu isOpen={isOpen} onClose={onClose}>
          <IconButton
            width="23px"
            onClick={onOpen}
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
          {isOpen && (
            <Box
              position="fixed"
              zIndex="100"
              left="0"
              top="0"
              w="100vw"
              bg="var(--chakra-colors-blackAlpha-600)"
              h="100vh"
            />
          )}

          <MenuList
            border="none"
            minW="0"
            w={"180px"}
            zIndex="100"
            pt="0"
            pb="0"
            bg="#242e3c"
          >
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
              href={"/home"}
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
              href={"/api-docs"}
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
                    Free API
                  </Text>
                </Box>
                <Box display="flex" alignItems="center" borderRadius="100%">
                  <ApiIcon
                    height="auto"
                    width="16.5px"
                    fill="white"
                    borderRadius="100%"
                  />
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

            <FormControl
              _focus={{ bg: "none", boxShadow: "none" }}
              _hover={{
                bg: "#334156",
                color: "#e5e5e5",
                borderBottomRadius: "var(--chakra-radii-md)",
                textDecoration: "none",
              }}
              height="40px"
              borderRadius="0"
              bg="none"
              _active={{ bg: "none" }}
              width="100%"
              pl="15px"
              alignItems="center"
              pr="15px"
              display="flex"
              justifyContent="space-between"
              outline={0}
            >
              <FormLabel
                fontWeight="500"
                fontSize="0.94rem"
                htmlFor="currency"
                mb="0"
              >
                Currency
              </FormLabel>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <UsdIcon
                  fill="white"
                  w={{ base: "8px", lg: "8px" }}
                  height="auto"
                  mr="6px"
                />
                <Switch
                  isChecked={isChecked}
                  _focus={{ boxShadow: "none" }}
                  key="currency"
                  size="sm"
                  id="currency"
                  // onChange={(()=>console.log('diot'))}
                  onChange={() =>
                    defaultCurrency == "usd"
                      ? changeCurrency("algo")
                      : defaultCurrency == "algo" && changeCurrency("usd")
                  }
                />
                <AlgoSvg
                  ml="6px"
                  fill="white"
                  w={{ base: "12.5px", lg: "12.5px" }}
                  height="auto"
                />
              </Box>
            </FormControl>
          </MenuList>
        </Menu>
      )}
    </>
  );
};

export default MobileMenu;
