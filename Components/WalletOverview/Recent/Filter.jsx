import { useRef } from "react";
import ImageWithFallback from "../../Image/nextImage";
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  Button,
  Radio,
  FormLabel,
  IconButton,
  useDisclosure,
  useOutsideClick,
  Text,
} from "@chakra-ui/react";
import { FilterIcon } from "../../Icons/Icons";

const TxFilter = ({
  pool,
  showDate,
  setShowDate,
  setAsset,
  asset,
  setPage,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ref = useRef();

  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  });
  const ASSET_LOGO_BASE_URL = "https://mainnet-asa.algotrade.net/assets";
  return (
    <Box display="flex" alignItems="center" mb="10px">
      <Menu
        ref={ref}
        isOpen={isOpen}
        placement="bottom-start"
        closeOnBlur={true}
      >
        <IconButton
          bg="#242e3c"
          border="none"
          width="auto"
          pt="6px"
          pb="6px"
          height="auto"
          pl="15px"
          onClick={onOpen}
          pr="15px"
          _focus={{ boxShadow: "none" }}
          as={MenuButton}
          aria-label="Options"
          icon={
            <Box
              display="flex"
              alignItems="end"
              width="auto"
              justifyContent="center"
            >
              <FilterIcon
                height="auto"
                width={{ base: "16px", lg: "17.5px" }}
                fill="#a0aec0"
              />
              <Text
                color="#a0aec0"
                ml="7px"
                fontSize={{ base: "0.9rem", lg: "0.95rem" }}
              >
                Filters
              </Text>
            </Box>
          }
          variant="outline"
        />
        <MenuList
          minW="0"
          w={"min-content"}
          zIndex="100"
          pt="0"
          pb="0"
          closeOnBlur={true}
        >
          {pool != undefined &&
            pool.pool.map((item) => (
              <Button
                onClick={() => {
                  setAsset(item.pool_id);
                  setPage(0);
                  onClose();
                }}
                key={item.pool_id}
                bg="none"
                _active={{ bg: "none" }}
                _focus={{ bg: "none" }}
                width="100%"
                pl="15px"
                pr="15px"
                _hover={{ borderRadius: "unset", bg: "#1f2733" }}
                outline={0}
              >
                <Box display="flex" alignItems="center" width="100%">
                  <Box
                    display="flex"
                    alignItems="center"
                    minWidth="22px"
                    minHeight="22px"
                    mr="2px"
                  >
                    <ImageWithFallback
                      className="imgBorder"
                      src={`${ASSET_LOGO_BASE_URL}/${item.asset_1_id}/icon.png`}                      
                      width={20}
                      height={20}
                    />
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    minWidth="22px"
                    minHeight="22px"
                  >
                    {" "}
                    <ImageWithFallback
                      className="imgBorder"
                      src={`${ASSET_LOGO_BASE_URL}/${item.asset_2_id}/icon.png`}                      
                      width={20}
                      height={20}
                    />
                  </Box>
                  <Box ml="7px">
                    <Text fontSize="0.9rem" fontWeight="400" lineHeight="1">
                      {item.asset_1_name} / {item.asset_2_name}
                    </Text>
                  </Box>
                </Box>
              </Button>
            ))}
        </MenuList>
      </Menu>
      <Box display="flex" alignItems="center" width="100%">
        <Box
          ml="15px"
          display="flex"
          alignItems="baseline"
          pb="0.5px"
          width="max-content"
        >
          <Radio
            size="sm"
            onClick={() => setShowDate(showDate == false ? true : false)}
            _focus={{ boxShadow: "none" }}
            isChecked={showDate == false ? false : true}
            value="2"
          >
            <FormLabel
              color="#a0aec0"
              fontSize="0.85rem"
              fontWeight="400"
              cursor="pointer"
              mb="0.5px"
              onClick={() => setShowDate(showDate == false ? true : false)}
            >
              Show date
            </FormLabel>
          </Radio>
        </Box>
        <Box
          ml="6.5px"
          display="flex"
          alignItems="baseline"
          pb="0.5px"
          width="max-content"
        >
          <Radio
            isDisabled={asset == 0 ? true : false}
            cursor={asset == 0 && "not-allowed"}
            size="sm"
            onClick={() => asset != 0 && setAsset(0)}
            _focus={{ boxShadow: "none" }}
            // isChecked={showDate == false ? false : true}
            value="2"
          >
            <FormLabel
              color="#a0aec0"
              fontSize="0.85rem"
              fontWeight="400"
              cursor={asset == 0 ? "not-allowed" : "pointer"}
              mb="0.5px"
              onClick={() => {
                asset != 0 && setAsset(0);
                setPage(0);
              }}
            >
              Reset filters
            </FormLabel>
          </Radio>
        </Box>
      </Box>
    </Box>
  );
};

export default TxFilter;
