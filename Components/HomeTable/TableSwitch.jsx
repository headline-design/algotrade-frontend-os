import { AlgoSvg, UsdIcon } from "../Icons/Icons";
import { Button, FormControl, Input, FormLabel, Text } from "@chakra-ui/react";

const TableSwitch = (props) => {
  return (
    <FormControl
      display="flex"
      pr="3px"
      flexDirection="column"
      alignItems="end"
      justifyContent="space-between"
    >
      <FormLabel
        fontSize={{ base: "0.8rem", lg: "0.82rem" }}
        htmlFor="email-alerts"
        mb="0"
        mr="17px"
        mt="1px"
        fontWeight="600"
        userSelect="none"
        color="#a0aec0"
      >
        Currency
      </FormLabel>
      <Input
        _active="none"
        _focus="none"
        type="checkbox"
        height="0"
        width="0"
        visibility="hidden"
        id={"react-switch-new"}
      />
      <FormLabel
        mt="-2.47px"
        display="flex"
        alignItems="center"
        onClick={props.switchCurrency}
        justifyContent="space-between"
        cursor="pointer"
        width="65px"
        _active="none"
        _focus="none"
        height={{ base: "13px", lg: "17.5px" }}
        bg="#a0aec0"
        mb="5px"
        borderRadius="100px"
        position="relative"
        transition={{ background: "0.2s" }}
        htmlFor={"react-switch-new"}
      >
        {props.isOn == true && (
          <AlgoSvg
            ml="42px"
            fill="#1f2733"
            w={{ base: "9.5px", lg: "12px" }}
            height="auto"
          />
        )}
        <Text
          maxWidth="0.5px !important"
          minW="0.5px !important"
          bottom={{ base: "3.11px", lg: "4.11px" }}
          as={Button}
          position="absolute"
          left={props.isOn == true ? "34.5px" : "29px"}
          right={props.isOn == true ? "calc(100 % -2px)" : "2px"}
          height={{ base: "6.59px", lg: "8.59px" }}
          borderRadius="45px"
          _active="none"
          _hover={{ background: "#242e3c" }}
          _focus={{ boxShadow: "none" }}
          transition="0.2s"
          transform={props.isOn && "translateX(-90%)"}
          bg="#242e3c"
        />
        {props.isOn == false && (
          <UsdIcon
            position="absolute"
            left="11px"
            fill="#1f2733"
            w={{ base: "6px", lg: "7.5px" }}
            height="auto"
          />
        )}
      </FormLabel>
    </FormControl>
  );
};

export default TableSwitch;
