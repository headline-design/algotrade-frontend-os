import { useRef } from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Link,
  Heading,
  Text,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import TruncateString from "../../utils/truncateString";
import {
  ConnectWallet,
  AlgoSvg,
  VerifiedIcon,
  Disconnect,
} from "../Icons/Icons";
import ImageWithFallback from "../Image/nextImage";
import { useContext, useState } from "react";
import IconBox from "../Icons/IconBox";
import { connector } from "../../lib/WalletConnect/walletConnect";
import { encodeAddress } from "algosdk";
import { getExcessIndex } from "../../utils/utils";
import ReturnDecimals from "../../utils/returnDecimals";
import { GetAddress } from "../../lib/CustomSWR";
import NextLink from "next/link";
import { AssetsList, AddressContext } from "../../pages/_app";
const MobileWallet = () => {
  const address = useContext(AddressContext);
  const { data: asa } = GetAddress(address);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key]["id"] === value);
  }
  function getKeyByAddress(object, value) {
    return Object.keys(object).find(
      (key) => object[key]["pool_creator"] === value
    );
  }
  const ASSET_LOGO_BASE_URL = "https://mainnet-asa.algotrade.net/assets";

  const asaList = useContext(AssetsList);
  const [excess, setExcess] = useState(false);

  const router = useRouter();

  const disconnectWallet = async () => {
    if (localStorage.getItem("walletType") == "pera-wallet") {
      connector.connected && (await connector.killSession());
      if (!connector.connected) {
        localStorage.removeItem("wallet");
        localStorage.removeItem("walletType");
        router.reload(window.location.pathname);
        return;
      }
    }
    if (localStorage.getItem("walletType") == "myalgo-wallet") {
      localStorage.removeItem("wallet");
      localStorage.removeItem("walletType");
      router.reload(window.location.pathname);
      return;
    }
  };
  return (
    <>
      <Box
        onClick={onOpen}
        cursor="pointer"
        ref={btnRef}
        bg="#1c9eef"
        position="relative"
        bottom="50%"
        borderRadius="35%"
        width="64px"
        height="64px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <ConnectWallet height="auto" w="30px" />
        <Text lineHeight="1.3" fontSize="0.8rem" fontWeight="500">
          Wallet
        </Text>
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg="#1f2733">
          <DrawerHeader
            pt="21px"
            pb="21px"
            // pb="3px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Heading as="h2" fontSize="1.2rem" mb="3px" fontWeight="500">
                {address && TruncateString(address, 17)} <br />
              </Heading>
              {!asa ? (
                <Spinner />
              ) : (
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <AlgoSvg
                    height="auto"
                    width="12.9px"
                    fill="white"
                    mr="3.5px"
                  />
                  <Text fontWeight="500" lineHeight="1" fontSize="0.96rem">
                    {asa.account.amount / 1000000}
                  </Text>
                </Box>
              )}
              {/* <Text>
                Total{" "}
                {assetss != undefined &&
                  Object.keys(assetss).length > 0 &&
                  Object.keys(assetss).length}{" "}
                assets
              </Text> */}
            </Box>
            <Box
              justifyContent="center"
              display="flex"
              flexDirection="column"
              alignItems="flex-end"
              textAlign="center"
            >
              <DrawerCloseButton
                bg="#242e3c"
                _hover="none"
                position="unset"
                _focus="none"
                _active="none"
              />

              {/* {!account ? (
                <Spinner />
              ) : (
                <Box display="flex" justifyContent="center" alignItems="center">
                  <AlgoSvg height="auto" width="12px" fill="white" mr="3.5px" />
                  <Text>{account.amount / 1000000}</Text>
                </Box>
              )} */}
            </Box>
          </DrawerHeader>

          <DrawerBody
            borderTop="1px solid #40444f"
            pr="0"
            pb="unset"
            borderBottom="1px solid #40444f"
          >
            <Box
              borderRadius="none"
              borderLeftColor="transparent !important"
              borderRightColor="transparent !important"
              // border="1px solid"
              borderColor="#40444f"
            >
              <Box
                css={{
                  "&::-webkit-scrollbar": {
                    width: "9px",
                    background: "#1A202C",
                  },

                  "&::-webkit-scrollbar-thumb": {
                    borderRadius: "5px",
                    width: "7px",
                    background: "#46556b",
                  },
                }}
                maxH="250px"
                overflow="auto"
                pb="5px"
                pr="16px"
              >
                {excess == false
                  ? asa &&
                    asa.account.assets.map(
                      (item) =>
                        item.amount != 0 && (
                          <Box
                            pt="7px"
                            pb="7px"
                            key={item["asset-id"]}
                            display="flex"
                            width="100%"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Box
                              key={item["asset-id"]}
                              display="flex"
                              alignItems="center"
                            >
                              <Box display="flex" mr="12px">
                                <ImageWithFallback
                                  alt={item.name}
                                  className="imgBorder"
                                  key={`${item["asset-id"]}`}
                                  src={`${ASSET_LOGO_BASE_URL}/${item["asset-id"]}/icon.png`}
                                  width={30}
                                  height={30}
                                />
                              </Box>
                              <Box
                                display="flex"
                                alignItems="flex-start"
                                justifyContent="flex-start"
                                flexDirection="column"
                              >
                                <Box display="flex" alignItems="baseline">
                                  <Heading
                                    as="h3"
                                    fontSize="0.9rem"
                                    fontWeight="500"
                                    maxW={{
                                      base: "114px",
                                      sm: "155px",
                                      md: "100%",
                                    }}
                                    overflow="hidden"
                                    textOverflow="ellipsis"
                                    whiteSpace="nowrap"
                                  >
                                    {item.name}
                                  </Heading>
                                  {item.verification != undefined &&
                                    item.verification.reputation.toLowerCase() ==
                                      "verified" && (
                                      <VerifiedIcon
                                        ml="5px"
                                        height="auto"
                                        width={{ base: "12px", zz: "14.5px" }}
                                        fill="#00aed3"
                                      />
                                    )}
                                </Box>
                                <Box>
                                  <Text
                                    fontSize="0.78rem"
                                    fontWeight="500"
                                    lineHeight="1.1"
                                    color="#a0aec0"
                                  >
                                    {item["asset-id"]}
                                  </Text>
                                </Box>
                              </Box>
                            </Box>
                            <Box></Box>
                            <Box
                              display="flex"
                              flexDirection="column"
                              alignItems="flex-end"
                              justifyContent="center"
                            >
                              <Text
                                fontSize="0.9rem"
                                fontWeight="500"
                                lineHeight="1.2"
                              >
                                {item.decimals == 0
                                  ? item.amount
                                  : item.amount / ReturnDecimals(item.decimals)}
                              </Text>
                              <Text
                                fontSize="0.78rem"
                                color="#a0aec0"
                                lineHeight="1.1"
                              >
                                Balance
                              </Text>
                            </Box>
                          </Box>
                        )
                    )
                  : asa &&
                    asa.account["apps-local-state"][
                      getKeyByValue(asa.account["apps-local-state"], 552635992)
                    ]["key-value"].map((itemm, i) => (
                      <Box
                        pt="7px"
                        pb="7px"
                        key={i}
                        display="flex"
                        width="100%"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box key={i} display="flex" alignItems="center">
                          <Box display="flex" mr="12px">
                            <ImageWithFallback
                              alt={
                                getExcessIndex(itemm.key) !=
                                asaList[
                                  getKeyByAddress(
                                    asaList,
                                    encodeAddress(
                                      Buffer.from(itemm["key"], "base64").slice(
                                        0,
                                        Buffer.from(itemm["key"], "base64")
                                          .length - 9
                                      )
                                    )
                                  )
                                ].asset_1_id
                                  ? "ALGO"
                                  : asaList[
                                      getKeyByAddress(
                                        asaList,
                                        encodeAddress(
                                          Buffer.from(
                                            itemm["key"],
                                            "base64"
                                          ).slice(
                                            0,
                                            Buffer.from(itemm["key"], "base64")
                                              .length - 9
                                          )
                                        )
                                      )
                                    ].asset_1_name
                              }
                              className="imgBorder"
                              key={`${getExcessIndex(itemm.key)}`}
                              src={`${ASSET_LOGO_BASE_URL}/${getExcessIndex(
                                    itemm.key)}/icon.png`}
                              width={30}
                              height={30}
                            />
                          </Box>
                          <Box
                            display="flex"
                            alignItems="flex-start"
                            justifyContent="flex-start"
                            flexDirection="column"
                          >
                            <Box display="flex" alignItems="baseline">
                              <Heading
                                as="h3"
                                fontSize="0.9rem"
                                fontWeight="500"
                                maxW={{
                                  base: "114px",
                                  sm: "155px",
                                  md: "100%",
                                }}
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                              >
                                {getExcessIndex(itemm.key) !=
                                asaList[
                                  getKeyByAddress(
                                    asaList,
                                    encodeAddress(
                                      Buffer.from(itemm["key"], "base64").slice(
                                        0,
                                        Buffer.from(itemm["key"], "base64")
                                          .length - 9
                                      )
                                    )
                                  )
                                ].asset_1_id
                                  ? "ALGO"
                                  : asaList[
                                      getKeyByAddress(
                                        asaList,
                                        encodeAddress(
                                          Buffer.from(
                                            itemm["key"],
                                            "base64"
                                          ).slice(
                                            0,
                                            Buffer.from(itemm["key"], "base64")
                                              .length - 9
                                          )
                                        )
                                      )
                                    ].asset_1_name}
                                {/* {encodeAddress(
                                  Buffer.from(itemm["key"], "base64").slice(
                                    0,
                                    Buffer.from(itemm["key"], "base64").length -
                                      9
                                  )
                                )} */}{" "}
                              </Heading>
                              {asaList[
                                getKeyByAddress(
                                  asaList,
                                  encodeAddress(
                                    Buffer.from(itemm["key"], "base64").slice(
                                      0,
                                      Buffer.from(itemm["key"], "base64")
                                        .length - 9
                                    )
                                  )
                                )
                              ].is_verified == "true" && (
                                <VerifiedIcon
                                  ml="5px"
                                  height="auto"
                                  width={{ base: "13px", zz: "14.5px" }}
                                  fill="#00aed3"
                                />
                              )}
                            </Box>
                            <Box>
                              <Text
                                fontSize="0.8rem"
                                fontWeight="500"
                                color="#a0aec0"
                              >
                                {`${
                                  asaList[
                                    getKeyByAddress(
                                      asaList,
                                      encodeAddress(
                                        Buffer.from(
                                          itemm["key"],
                                          "base64"
                                        ).slice(
                                          0,
                                          Buffer.from(itemm["key"], "base64")
                                            .length - 9
                                        )
                                      )
                                    )
                                  ].asset_1_name
                                } `}
                                / ALGO{" "}
                              </Text>
                            </Box>
                          </Box>
                        </Box>
                        <Box></Box>
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="flex-end"
                          justifyContent="center"
                        >
                          <Text fontSize="0.9rem" fontWeight="500">
                            {asaList[
                              getKeyByAddress(
                                asaList,
                                encodeAddress(
                                  Buffer.from(itemm["key"], "base64").slice(
                                    0,
                                    Buffer.from(itemm["key"], "base64").length -
                                      9
                                  )
                                )
                              )
                            ].asset_1_decimals == 0
                              ? itemm.value.uint
                              : itemm.value.uint /
                                ReturnDecimals(
                                  getExcessIndex(itemm.key) !=
                                    asaList[
                                      getKeyByAddress(
                                        asaList,
                                        encodeAddress(
                                          Buffer.from(
                                            itemm["key"],
                                            "base64"
                                          ).slice(
                                            0,
                                            Buffer.from(itemm["key"], "base64")
                                              .length - 9
                                          )
                                        )
                                      )
                                    ].asset_1_id
                                    ? 6
                                    : asaList[
                                        getKeyByAddress(
                                          asaList,
                                          encodeAddress(
                                            Buffer.from(
                                              itemm["key"],
                                              "base64"
                                            ).slice(
                                              0,
                                              Buffer.from(
                                                itemm["key"],
                                                "base64"
                                              ).length - 9
                                            )
                                          )
                                        )
                                      ].asset_1_decimals
                                )}
                          </Text>
                          <Text fontSize="0.8rem" color="#a0aec0">
                            Balance
                          </Text>
                        </Box>
                      </Box>
                    ))}
              </Box>
            </Box>
          </DrawerBody>

          <DrawerFooter
            display="flex"
            padding="unset"
            flexDirection="column"
            justifyContent="center"
          >
            <NextLink prefetch={false} href="/wallet" passHref>
              <Link
                borderBottom="1px solid #40444f"
                textDecoration="none"
                _focus="none"
                minHeight="58px"
                pl="25px"
                pr="25px"
                cursor="pointer"
                pt="22px"
                pb="22px"
                // onClick={() => {
                //   setExcess(excess == false ? true : false);
                // }}
                _hover={{ background: "#28364a" }}
                // bg="#069dbd"
                width="100%"
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
              >
                <IconBox
                  color="#a0aec0"
                  h="auto"
                  w="30px"
                  // mr={isHovered ? "12px" : "0"}
                >
                  <ConnectWallet h="auto" w="20px" />
                </IconBox>
                <Text ml="11px" lineHeight="1">
                  Overview
                </Text>
              </Link>
            </NextLink>
            {/* <Box
              cursor="pointer"
              pt="10px"
              pb="10px"
              onClick={() => {
                setExcess(excess == false ? true : false);
              }}
              _hover={{ background: "#242e3c" }}
              bg="#069dbd"
              width="100%"
              display="flex"
              justifyContent="center"
            >
              <Text>EXCESS TOKENS</Text> */}
            {/* <Button onClick={disconnectWallet}>DISCONNECT</Button> */}
            {/* </Box> */}
            <Box
              textDecoration="none"
              _focus="none"
              minHeight="58px"
              pl="25px"
              pr="25px"
              cursor="pointer"
              pt="22px"
              pb="22px"
              onClick={disconnectWallet}
              // onClick={() => {
              //   setExcess(excess == false ? true : false);
              // }}
              _hover={{ background: "#28364a" }}
              // bg="#069dbd"
              width="100%"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
            >
              <IconBox
                color="#a0aec0"
                h="auto"
                w="30px"
                // mr={isHovered ? "12px" : "0"}
              >
                <Disconnect fill="#a0aec0" h="auto" w="20px" />
              </IconBox>
              <Text ml="11px" lineHeight="1">
                Disconnect
              </Text>
            </Box>
            {/* <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileWallet;
