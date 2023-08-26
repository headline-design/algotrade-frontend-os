import {
  IconButton,
  Box,
  MenuButton,
  Radio,
  FormLabel,
  FormControl,
  Switch,
  Menu,
  MenuList,
} from "@chakra-ui/react";
import { AlgoSvg, UsdIcon } from "../Icons/Icons";
import { SettingsIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Default_Currency } from "../../pages/_app";
import { useContext, useEffect, useState } from "react";

const Settings = () => {
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
  return (
    <Menu placement="bottom-end">
      {" "}
      <IconButton
        _focus="none"
        _active="none"
        maxH="39px"
        bg="#242e3c"
        mr={{ lg: "12px" }}
        as={MenuButton}
        width="44px"
        height="44px"
        aria-label="Search database"
        icon={<SettingsIcon />}
      />
      <MenuList
        bg="#242e3c"
        minW="0"
        w="220px"
        zIndex="100"
        pr="15px"
        pl="15px"
        pt="8.5px"
        pb="8.5px"
      >
        <FormControl
          _focus={{ bg: "none", boxShadow: "none", outline: "none" }}
          //   _hover={{
          //     bg: "#334156",
          //     color: "#e5e5e5",
          //     borderBottomRadius: "var(--chakra-radii-md)",
          //     textDecoration: "none",
          //   }}
          height="30px"
          borderRadius="0"
          bg="none"
          _active={{ bg: "none" }}
          width="100%"
          alignItems="center"
          display="flex"
          mb="7px"
          justifyContent="space-between"
          outline={0}
        >
          <FormLabel
            fontWeight="500"
            fontSize="0.94rem"
            htmlFor="currency"
            mb="0"
          >
            Theme
          </FormLabel>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <SunIcon color="white" mr="8px" />
            <Switch
              isDisabled
              _focus={{ boxShadow: "none" }}
              key="currency"
              size="sm"
              id="theme-settings"
              // onChange={(()=>console.log('diot'))}
            />
            <MoonIcon color="white" ml="9px" />
          </Box>
        </FormControl>
        <FormControl
          mt="7px"
          _focus={{ bg: "none", boxShadow: "none", outline: "none" }}
          //   _hover={{
          //     bg: "#334156",
          //     color: "#e5e5e5",
          //     borderBottomRadius: "var(--chakra-radii-md)",
          //     textDecoration: "none",
          //   }}
          height="30px"
          borderRadius="0"
          bg="none"
          _active={{ bg: "none" }}
          width="100%"
          alignItems="center"
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
              mr="13px"
            />
            <Switch
              isChecked={isChecked}
              _focus={{ boxShadow: "none" }}
              key="currency"
              size="sm"
              mr="4px"
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
  );
};

export default Settings;
