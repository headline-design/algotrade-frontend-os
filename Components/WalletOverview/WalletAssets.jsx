import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Link,
  Radio,
  FormLabel,
  Tooltip,
} from "@chakra-ui/react";
import WalletTable from "./WalletTable";
import WalletTx from "./WalletTx";
import NextLink from "next/link";
import WalletRecent from "./WalletRecent";

const WalletAssets = ({ price, asa, accountTx, asaList }) => {
  const [excess, setExcess] = useState(false);
  const [hideZero, setHideZero] = useState(false);
  return (
    <Box display="flex" flexDirection="column">
      <Box
        flexDirection={{ base: "column", llg: "unset" }}
        justifyContent="space-between"
        display="flex"
        pt="35px"
      >
        {window.location.href.split("/wallet")[1].includes("transactions") !=
        true ? (
          <>
            <Box
              mr="30px"
              width={{
                base: "100%",
                llg: "calc(100% - 280px - 10px - 10px - 28px)",
              }}
            >
              <Box mb="10px" display="flex" alignItems="center">
                <Box
                  mr="8px"
                  _focus="none"
                  _active="none"
                  textDecoration="none"
                  userSelect="none"
                  _hover="none"
                  width="max-content"
                  cursor="pointer"
                  //   bg="#242e3c"
                  pr="10px"
                  pl="10px"
                  onClick={() => {
                    setExcess(false);
                  }}
                  //   borderRadius="5px"
                  pb="3px"
                  pt="3.3px"
                >
                  <Text
                    color={excess == false ? "whiteAlpha.800" : "#a0aec0"}
                    fontWeight="600"
                    fontSize="1.05rem"
                  >
                    Assets
                  </Text>
                  <Box
                    margin="auto"
                    width="40%"
                    borderBottom={
                      excess == false
                        ? "2px solid rgb(6, 157, 189)"
                        : "2px solid rgb(255 255 255 / 0%)"
                    }
                  ></Box>
                </Box>
                <Box
                  mr="8px"
                  _focus="none"
                  _active="none"
                  textDecoration="none"
                  userSelect="none"
                  _hover="none"
                  width="max-content"
                  cursor="pointer"
                  //   bg="#242e3c"
                  pr="10px"
                  pl="10px"
                  onClick={() => {
                    setExcess(true);
                  }}
                  //   borderRadius="5px"
                  pb="3px"
                  pt="3.3px"
                >
                  <Text
                    color={excess == true ? "whiteAlpha.800" : "#a0aec0"}
                    fontWeight="600"
                    fontSize="1.05rem"
                  >
                    Excess
                  </Text>
                  <Box
                    margin="auto"
                    width="40%"
                    borderBottom={
                      excess == true
                        ? "2px solid rgb(6, 157, 189)"
                        : "2px solid rgb(255 255 255 / 0%)"
                    }
                  ></Box>
                </Box>
                <Tooltip
                  placement="bottom-start"
                  fontWeight="500"
                  borderRadius="7px"
                  bg="gray.800"
                  paddingLeft="10px"
                  paddingRight="10px"
                  pt="7px"
                  pb="7px"
                  color="white"
                  label="Not yet available."
                  aria-label="Portfolio"
                >
                  <Box
                    cursor="not-allowed"
                    mr="8px"
                    _focus="none"
                    _active="none"
                    textDecoration="none"
                    userSelect="none"
                    _hover="none"
                    width="max-content"
                    // cursor="pointer"
                    pr="10px"
                    pl="10px"
                    pb="3px"
                    pt="3.3px"
                  >
                    <Text color="#737c87" fontWeight="500" fontSize="1.05rem">
                      Portfolio
                    </Text>
                    <Box
                      margin="auto"
                      width="40%"
                      borderBottom="2px solid rgb(255 255 255 / 0%)"
                    ></Box>
                  </Box>
                </Tooltip>
                {excess == false && (
                  <Box
                    ml="10px"
                    display="flex"
                    alignItems="baseline"
                    pb="0.5px"
                    // cursor="pointer"
                    width="100%"
                    // onClick={() => setShowDate(showDate == false ? true : false)}
                  >
                    <Radio
                      size="sm"
                      onClick={() =>
                        setHideZero(hideZero == false ? true : false)
                      }
                      _focus={{ boxShadow: "none" }}
                      isChecked={hideZero == false ? false : true}
                    >
                      <FormLabel
                        width="max-content"
                        color="#a0aec0"
                        fontSize="0.85rem"
                        fontWeight="400"
                        cursor="pointer"
                        mb="0.5px"
                        onClick={() =>
                          setHideZero(hideZero == false ? true : false)
                        }
                      >
                        Hide 0 balance
                      </FormLabel>
                    </Radio>
                  </Box>
                )}
              </Box>
              
              <WalletTable
                hideZero={hideZero}
                excess={excess}
                asaList={asaList}
                asa={asa}
              />
            </Box>
            <Box
              pb={{ base: "94px", lg: "unset" }}
              width="auto"
              maxW={{ base: "100%", llg: "450px" }}
            >
              <Box
                pl={{ base: "10px", lg: "unset" }}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb="16px"
              >
                <Heading fontSize="0.95rem" as="h2" fontWeight="500">
                  Recent Transactions
                </Heading>
                <NextLink href="/wallet" as="?transactions=all" passHref>
                  <Link
                    _focus="none"
                    _active="none"
                    textDecoration="none"
                    userSelect="none"
                    _hover="none"
                    cursor="pointer"
                    bg="#242e3c"
                    pr="10px"
                    pl="10px"
                    borderRadius="5px"
                    pb="3px"
                    pt="3.3px"
                  >
                    <Text color="#a0aec0" fontWeight="600" fontSize="0.85rem">
                      View All
                    </Text>
                  </Link>
                </NextLink>
              </Box>
              <WalletTx accountTx={accountTx} price={price} asa={asa} />
            </Box>
          </>
        ) : (
          <Box display="flex" flexDirection="column" width="100%">
            <NextLink href="/wallet" as="/wallet" passHref>
              <Link
                mb="25px"
                borderBottom="1px solid #a0aec0"
                height="auto"
                _focus="none"
                width="max-content"
                boxShadow="0"
                outline="0"
                _active="none"
                userSelect="none"
                _hover={{ borderBottomColor: "#b4c6de" }}
                cursor="pointer"
                textDecoration="none"
                padding="none"
              >
                <Text
                  _hover={{ color: "#b4c6de" }}
                  color="#a0aec0"
                  fontWeight="600"
                  fontSize="1.05rem"
                >
                  Back to wallet overview
                </Text>
              </Link>
            </NextLink>
            <WalletRecent />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default WalletAssets;
