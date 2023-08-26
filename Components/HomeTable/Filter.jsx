import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  Radio,
  FormLabel,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import { FilterIcon } from "../Icons/Icons";

const TableFilter = ({
  setLiquidity,
  setVerified,
  liquidity,
  verified,
  setPage,
}) => {
  return (
    <Menu placement="bottom-end">
      <IconButton
        bg="#242e3c"
        border="none"
        width="auto"
        pt={{ base: "6.5px", lg: "8px" }}
        pb={{ base: "6.5px", lg: "8px" }}
        height="auto"
        pl={{ base: "17px", lg: "15px" }}
        pr={{ base: "16px", lg: "15px" }}
        _focus={{ boxShadow: "none" }}
        as={MenuButton}
        aria-label="Options"
        icon={
          <Box
            display="flex"
            alignItems={{base:"center", lg:"end"}}
            width="auto"
            pl={{ base: "10px", lg: "0" }}
            pr={{ base: "10px", lg: "0" }}
            justifyContent="center"
          >
            <FilterIcon
              height="auto"
              width={{ base: "13.5px", lg: "19.5px" }}
              fill="#a0aec0"
            />
            <Text
              color="#a0aec0"
              ml={{ base: "5.5px", lg: "7px" }}
              fontSize={{ base: "0.85rem", lg: "0.97rem" }}
            >
              Filters
            </Text>
          </Box>
        }
        variant="outline"
      />
      <MenuList minW="0" w={"220px"} zIndex="100" pl="20px" pr="20px" mt="4px">
        <RadioGroup
          pt="10px"
          cursor="pointer"
          pb="10px"
          display="flex"
          value={verified}
          onClick={() => {
            setVerified(verified == "false" ? "true" : "false");
            setPage(0);
          }}
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <FormLabel
            userSelect="none"
            fontWeight="500"
            onClick={() => {
              setVerified(verified == "false" ? "true" : "false");
              setPage(0);
            }}
            cursor="pointer"
            lineHeight="1"
            margin="0"
            fontSize="0.915rem"
          >
            Hide unverified assets
          </FormLabel>
          <Radio
            key={verified}
            position="relative"
            isChecked={verified == "true" ? true : false}
            _focus={{ boxShadow: "none" }}
            size="sm"
            borderRadius="30%"
          />
        </RadioGroup>
        <RadioGroup
          pt="10px"
          cursor="pointer"
          pb="10px"
          display="flex"
          value={verified}
          onClick={() => {
            setLiquidity(liquidity == "false" ? "true" : "false");
            setPage(0);
          }}
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <FormLabel
            userSelect="none"
            fontWeight="500"
            onClick={() => {
              setLiquidity(liquidity == "false" ? "true" : "false");
              setPage(0);
            }}
            cursor="pointer"
            lineHeight="1"
            margin="0"
            fontSize="0.915rem"
          >
            Hide low liquidity
          </FormLabel>
          <Radio
            key={liquidity}
            position="relative"
            isChecked={liquidity == "true" ? true : false}
            _focus={{ boxShadow: "none" }}
            size="sm"
            borderRadius="30%"
          />
        </RadioGroup>
      </MenuList>
    </Menu>
  );
};

export default TableFilter;
