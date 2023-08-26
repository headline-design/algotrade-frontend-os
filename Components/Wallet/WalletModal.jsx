import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  Heading,
  Spinner,
  Link,
  Text,
} from "@chakra-ui/react";
import { AlgoSvg, VerifiedIcon } from "../Icons/Icons";
import ImageWithFallback from "../Image/nextImage";
import TruncateString from "../../utils/truncateString";
import { useState } from "react";
import ReturnDecimals from "../../utils/returnDecimals";
import { useRouter } from "next/router";
import { encodeAddress } from "algosdk";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { useContext } from "react";
import { GetAddress } from "../../lib/CustomSWR";
import { getExcessIndex } from "../../utils/utils";
import { AssetsList, AddressContext } from "../../pages/_app";
import IconBox from "../Icons/IconBox";
import { connector } from "../../lib/WalletConnect/walletConnect";
import { ConnectWallet, Disconnect } from "../Icons/Icons";
import NextLink from "next/link";

const WalletModal = () => {
  const ASSET_LOGO_BASE_URL = "https://mainnet-asa.algotrade.net/assets";
  const address = useContext(AddressContext);
  const { data: asa } = GetAddress(address);
  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key]["id"] === value);
  }
  function getKeyByAddress(object, value) {
    return Object.keys(object).find(
      (key) => object[key]["pool_creator"] === value
    );
  }
  const asaList = useContext(AssetsList);
  const mobile = useBreakpointValue({ lg: "960px" });
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
      {mobile && (
        <Menu placement="bottom-end" bg="#1f2733" pb="0 !important">
          <Box as={MenuButton}>
            <Box
              maxH="39px"
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              borderRadius="8px"
              bg="#242e3c"
              cursor="pointer"
              fontWeight="500"
            >
              <Box
                justifyContent="center"
                display="flex"
                alignItems="center"
                pl="17px"
                pr="17px"
                pt="10px"
                pb="10px"
                minW="149px"
                textAlign="center"
                borderRight="1px solid var(--chakra-colors-gray-400)"
              >
                {!asa ? (
                  <Spinner />
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <AlgoSvg
                      height="auto"
                      width="12px"
                      fill="white"
                      mr="3.5px"
                    />
                    <Text>{asa.account.amount / 1000000}</Text>
                  </Box>
                )}
              </Box>
              <Box
                pl="17px"
                pr="17px"
                pt="10px"
                pb="10px"
                minW="149px"
                textAlign="center"
                borderLeft="1px solid var(--chakra-colors-gray-400)"
              >
                {TruncateString(address, 13)}
              </Box>
            </Box>
          </Box>
          <MenuList pb="0" zIndex="100" minW="430px" bg="#242e3c">
            <Box pt="10px" pl="25px" pr="25px" pb="15px">
              <Heading as="h2" fontSize="1rem" mb="2.5px">
                {address && TruncateString(address, 17)} <br />
              </Heading>
              <Text fontSize="0.95rem" color="#a0aec0" fontWeight="500">
                Total{" "}
                {asa != undefined &&
                  asa.account.assets.length > 0 &&
                  asa.account.assets.length}{" "}
                assets
              </Text>
            </Box>
            <Box
              borderRadius="none"
              borderLeftColor="transparent !important"
              borderRightColor="transparent !important"
              border="1px solid"
              borderColor="#40444f"
            >
              <Box
                css={{
                  "&::-webkit-scrollbar": {
                    width: "7px",
                    background: "#242e3c",
                  },

                  "&::-webkit-scrollbar-thumb": {
                    width: "7px",
                    background: "#1A202C",
                    borderRadius: "8px",
                  },
                }}
                maxH="250px"
                overflow="auto"
                pt="5px"
                pb="5px"
                pl="25px"
                pr="25px"
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
                                  src={`${ASSET_LOGO_BASE_URL}/${item["asset-id"]}/icon.png`}
                                  key={`${item["asset-id"]}`}
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
                                    fontSize="1rem"
                                    fontWeight="600"
                                  >
                                    {item.name}
                                  </Heading>
                                  {item.verification != undefined &&
                                    item.verification.reputation.toLowerCase() ==
                                      "verified" && (
                                      <VerifiedIcon
                                        ml="5px"
                                        height="auto"
                                        width={{ base: "14.5px", zz: "14.5px" }}
                                        fill="#00aed3"
                                      />
                                    )}
                                </Box>
                                <Box>
                                  <Text
                                    fontSize="0.9rem"
                                    fontWeight="400"
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
                              <Text fontWeight="500" lineHeight="1.2">
                                {item.decimals == 0
                                  ? item.amount
                                  : item.amount / ReturnDecimals(item.decimals)}
                              </Text>
                              <Text fontSize="0.9rem" color="#a0aec0">
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
                              src={`${ASSET_LOGO_BASE_URL}/${getExcessIndex(itemm.key)}/icon.png`}
                              key={`${getExcessIndex(itemm.key)}`}
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
                              <Heading as="h3" fontSize="1rem" fontWeight="600">
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
                                  width={{ base: "14.5px", zz: "14.5px" }}
                                  fill="#00aed3"
                                />
                              )}
                            </Box>
                            <Box>
                              <Text
                                fontSize="0.9rem"
                                fontWeight="400"
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
                                / ALGO
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
                          <Text fontWeight="500" lineHeight="1.2">
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
                          <Text fontSize="0.9rem" color="#a0aec0">
                            Balance
                          </Text>
                        </Box>
                      </Box>
                    ))}
              </Box>
            </Box>
            <NextLink prefetch={false} href="/wallet" passHref>
              <Link
                textDecoration="none"
                _focus="none"
                minHeight="58px"
                pl="25px"
                pr="25px"
                cursor="pointer"
                pt="10px"
                pb="10px"
                _hover={{ background: "#28364a" }}
                width="100%"
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
              >
                <IconBox color="#a0aec0" h="auto" w="30px">
                  <ConnectWallet h="auto" w="20px" />
                </IconBox>
                <Text ml="13.5px" lineHeight="1">
                  Overview
                </Text>
              </Link>
            </NextLink>
            <Box
              borderTop="1px solid #40444f"
              textDecoration="none"
              _focus="none"
              minHeight="58px"
              pl="25px"
              pr="25px"
              cursor="pointer"
              pt="10px"
              pb="10px"
              onClick={disconnectWallet}
              _hover={{ background: "#28364a" }}
              width="100%"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
            >
              <IconBox color="#a0aec0" h="auto" w="30px">
                <Disconnect fill="#a0aec0" h="auto" w="20px" />
              </IconBox>
              <Text ml="13.5px" lineHeight="1">
                Disconnect
              </Text>
            </Box>
          </MenuList>
        </Menu>
      )}
    </>
  );
};

export default WalletModal;
