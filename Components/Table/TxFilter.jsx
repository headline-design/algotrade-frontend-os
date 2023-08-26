import {
  IconButton,
  Box,
  MenuButton,
  Radio,
  FormLabel,
  Menu,
  MenuList,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";

const TxFilter = ({ showDate, setShowDate }) => {
  return (
    <Menu
      placement="bottom-end"
    >
      {" "}
      <IconButton
        mr="-14px"
        color="#a0aec0"
        _focus={{ boxShadow: "none" }}
        _active="none"
        _hover={{ bg: "none", color: "rgb(6, 157, 189)" }}
        bg="none"
        as={MenuButton}
        width="auto"
        height="auto"
        aria-label="Table-settings"
        icon={<SettingsIcon height="auto" width="14px" />}
      />
      <MenuList
        bg="#242e3c"
        minW="0"
        w="160px"
        zIndex="100"
        pr="15px"
        pl="15px"
        pt="8.5px"
        pb="8.5px"
      >
        <Box
          display="flex"
          alignItems="center"
          pb="0.5px"
          width="100%"
          onClick={() => setShowDate(showDate == false ? true : false)}
          cursor="pointer"
        >
          <Radio
            borderColor="#5d6a7b"
            css={{
              width: "0.65rem",
              height: "0.65rem",
            }}
            onClick={() => setShowDate(showDate == false ? true : false)}
            _focus={{ boxShadow: "none" }}
            isChecked={showDate == false ? false : true}
            value="2"
          >
            <FormLabel
              ml="-3px !important"
              color="#a0aec0"
              fontSize="0.9rem"
              fontWeight="500"
              cursor="pointer"
              margin="0"
              onClick={() => setShowDate(showDate == false ? true : false)}
            >
              Show date
            </FormLabel>
          </Radio>
        </Box>
      </MenuList>
    </Menu>
  );
};

export default TxFilter;
