import React, { useState } from "react";
import {
  Table,
  Thead,
  Button,
  Tbody,
  Heading,
  Tr,
  Th,
  Td,
  Text,
  Link,
  Skeleton,
  SkeletonCircle,
  Tooltip,
  useToast,
  CircularProgress,
  Box,
} from "@chakra-ui/react";
import { SuccessToastt, FailedToast } from "./RedeemToast";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { VerifiedIcon } from "../Icons/Icons";
import { getWalletExcess, getWalletExcesss } from "../../utils/utils";
import ImageWithFallback from "../Image/nextImage";
import NextLink from "next/link";
import { getExcessIndex, getExcessAcc } from "../../utils/utils";
import { RedeemTransaction } from "../../lib/goal/Redeem";
import { RedeemTransactions } from "../../lib/WalletConnect/Redeem";
import ReturnDecimals from "../../utils/returnDecimals";
import { encodeAddress } from "algosdk";
import { isIOS, isAndroid } from "@walletconnect/utils";

const WalletTable = ({ asa, asaList, excess, hideZero }) => {
  function getKeyByValuee(object, value) {
    return Object.keys(object).find((key) => object[key]["id"] === value);
  }
  function getKeyByValue(object, value) {
    return Object.keys(object).find(
      (key) => object[key]["asset_1_id"] === value
    );
  }
  function getKeyByAddress(object, value) {
    return Object.keys(object).find(
      (key) => object[key]["pool_creator"] === value
    );
  }
  const SLIDE_COUNT = 10;
  const slides = Array.from(Array(SLIDE_COUNT).keys());
  const responsiveImg = useBreakpointValue({ base: 35, lg: 35 });
  const responsiveImgw = useBreakpointValue({ base: "35px", lg: "35px" });
  const responsiveFont = useBreakpointValue({ base: "0.9rem", lg: "0.95rem" });
  const responsiveNumeric = useBreakpointValue({
    base: "0.9rem",
    lg: "0.95rem",
  });
  const responsiveText = useBreakpointValue({
    base: "0.8rem",
    lg: "0.8rem",
  });
  const ASSET_LOGO_BASE_URL = "https://mainnet-asa.algotrade.net/assets";
  const toast = useToast();
  const [onProgress, setOnProgress] = useState(false);
  const [redeemsId, setRedeemsId] = useState();
  const performRedeem = async (
    poolAddress,
    account,
    assetIndexOne,
    assetIndexTwo,
    redeemI,
    redeemAmou,
    poolId,
    redeemName,
    deci
  ) => {
    try {
      setOnProgress(true);
      setRedeemsId(`${poolId}${redeemI}`);
      if (localStorage.getItem("walletType") == "pera-wallet") {
        if (isIOS() === true) {
          window.location.href = `algorand-wc://`;
        }
        if (isAndroid() === true) {
          window.location.href = `algorand://`;
        }
      }
      setOnProgress(true);
      const optingIn =
        localStorage.getItem("walletType") == "pera-wallet"
          ? await RedeemTransactions(
              poolAddress,
              account,
              assetIndexOne,
              assetIndexTwo,
              redeemI,
              redeemAmou,
              poolId
            )
          : await RedeemTransaction(
              poolAddress,
              account,
              assetIndexOne,
              assetIndexTwo,
              redeemI,
              redeemAmou,
              poolId
            );

      if (typeof optingIn.confirmed == "number") {
        SuccessToastt(toast, redeemAmou, deci, redeemName, optingIn.txId);
        setOnProgress(false);
        setRedeemsId("");
      }
    } catch (err) {
      console.error(err);
      err.toString().includes("cancelled") == true
        ? FailedToast(toast, "Transaction cancelled.")
        : FailedToast(toast, err.toString());
      setOnProgress(false);
      setRedeemsId("");
    }
  };

  return (
    <>
      <Box pb={{ base: "55px", llg: "0" }} width="auto">
        <Table
          width="100%"
          display={{
            base: "block",
            custom: "inline-table",
          }}
          overflow="auto"
          maxW="100%"
          shadow="base"
          rounded="lg"
          bg="#1f2733"
          borderColor="#1f2733"
          css={{
            "&::-webkit-scrollbar": {
              width: "9px",
              height: "9px",
              background: "#1f2733",
            },

            "&::-webkit-scrollbar-thumb": {
              width: "9px",
              height: "9px",
              borderRadius: "15px",
              background: "#1A202C",
            },
          }}
        >
          <Thead>
            <Tr>
              <Th lineHeight="1" _hover={{ background: "#242e3c" }}>
                <Box
                  width="max-content"
                  userSelect="none"
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="flex-end"
                  fontSize={{ base: "0.65rem", lg: "0.7rem" }}
                >
                  assets
                </Box>
              </Th>
              <Th
                width={{ base: "100%", lg: "unset" }}
                lineHeight="1"
                isNumeric
                _hover={{ background: "#242e3c" }}
              >
                <Box
                  margin="auto"
                  mr="0"
                  width="max-content"
                  userSelect="none"
                  display="flex"
                  fontSize={{ base: "0.65rem", lg: "0.7rem" }}
                  justifyContent="flex-end"
                  alignItems="flex-end"
                >
                  BALANCE
                </Box>
              </Th>
              <Th
                width={{ base: "100%", lg: "unset" }}
                lineHeight="1"
                isNumeric
                _hover={{ background: "#242e3c" }}
              >
                <Box
                  margin="auto"
                  mr="0"
                  userSelect="none"
                  width="max-content"
                  display="flex"
                  fontSize={{ base: "0.65rem", lg: "0.7rem" }}
                  justifyContent="flex-end"
                  alignItems="flex-end"
                >
                  action
                </Box>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {!asa
              ? slides.map((index) => (
                  <Tr key={index}>
                    <Td
                      maxHeight={{ base: "70px", lg: "74px" }}
                      minHeight={{ base: "70px", lg: "74px" }}
                    >
                      <Box display="flex" alignItems="center">
                        <SkeletonCircle
                          width={{ base: "41px", lg: "45px" }}
                          height={{ base: "37px", lg: "41px" }}
                          mr="10px"
                        >
                          <Box width="100%" height="auto"></Box>
                        </SkeletonCircle>
                        <Box display="flex" flexDirection="column" width="100%">
                          <Skeleton
                            mb="10px"
                            width="170px"
                            borderRadius="15"
                            height={{ base: "10.1px", lg: "11.5px" }}
                            background="#515e6b"
                          >
                            <Box width="100%" height="auto" />
                          </Skeleton>
                          <Skeleton
                            width="100px"
                            borderRadius="15px"
                            height={{ base: "10.1px", lg: "11.5px" }}
                            background="#515e6b"
                          >
                            <Box width="100%" height="auto" />
                          </Skeleton>
                        </Box>
                      </Box>
                    </Td>
                    <Td
                      minHeight={{ base: "70px", lg: "74px" }}
                      maxHeight={{ base: "70px", lg: "74px" }}
                    >
                      <Skeleton
                        borderRadius="15px"
                        height="11.5px"
                        background="#515e6b"
                      >
                        <Box width="100%" height="auto" />
                      </Skeleton>
                    </Td>
                    <Td
                      minHeight={{ base: "70px", lg: "74px" }}
                      maxHeight={{ base: "70px", lg: "74px" }}
                    >
                      {" "}
                      <Skeleton
                        borderRadius="15px"
                        height="11.5px"
                        background="#515e6b"
                      >
                        <Box width="100%" height="auto" />
                      </Skeleton>
                    </Td>
                    <Td
                      minHeight={{ base: "70px", lg: "74px" }}
                      maxHeight={{ base: "70px", lg: "74px" }}
                    >
                      {" "}
                      <Skeleton
                        borderRadius="15px"
                        height="11.5px"
                        background="#515e6b"
                      >
                        <Box width="100%" height="auto" />
                      </Skeleton>
                    </Td>
                    <Td
                      minHeight={{ base: "70px", lg: "74px" }}
                      maxHeight={{ base: "70px", lg: "74px" }}
                    >
                      {" "}
                      <Skeleton
                        borderRadius="15px"
                        height="11.5px"
                        background="#515e6b"
                      >
                        <Box width="100%" height="auto" />
                      </Skeleton>
                    </Td>
                    <Td
                      minHeight={{ base: "70px", lg: "74px" }}
                      maxHeight={{ base: "70px", lg: "74px" }}
                    >
                      {" "}
                      <Skeleton
                        borderRadius="15px"
                        height="11.5px"
                        background="#515e6b"
                      >
                        <Box width="100%" height="auto" />
                      </Skeleton>
                    </Td>
                  </Tr>
                ))
              : excess == false
              ? asa &&
                asa.account.assets.map((item) =>
                  hideZero == false ? (
                    <Tr
                      key={item["asset-id"]}
                      _hover={{ background: "#242e3c" }}
                    >
                      <Td borderBottom="none" className="lol">
                        <Box
                          minW="max-content"
                          pr="10px"
                          display="flex"
                          alignItems="center"
                        >
                          <Box
                            width="auto"
                            height="auto"
                            display="flex"
                            alignItems="center"
                            minW={responsiveImgw}
                            minH={responsiveImgw}
                          >
                            <ImageWithFallback
                              alt={item.name}
                              className="imgBorder"
                              key={`${item["asset-id"]}`}
                              src={`${ASSET_LOGO_BASE_URL}/${item["asset-id"]}/icon.png`}                      
                              width={responsiveImg}
                              height={responsiveImg}
                            />
                          </Box>
                          <Box paddingLeft="0.9rem">
                            <Box display="flex" alignItems="baseline">
                              <Heading
                                fontSize={responsiveFont}
                                mb="3px"
                                lineHeight="1"
                                fontWeight="500"
                              >
                                {item.name}
                              </Heading>
                              {item.verification != undefined &&
                                item.verification.reputation.toLowerCase() ==
                                  "verified" && (
                                  <Tooltip
                                    pb="25px"
                                    pt="25px"
                                    borderRadius="7px"
                                    padding="10px"
                                    width="auto"
                                    fontWeight="500"
                                    color="#fff"
                                    bg="black"
                                    label={"Verified asset."}
                                    placement="bottom"
                                  >
                                    <VerifiedIcon
                                      ml="5px"
                                      height="auto"
                                      width={{ base: "13.5px" }}
                                      fill="#00aed3"
                                    />
                                  </Tooltip>
                                )}
                            </Box>
                            <Box display="flex" alignItems="center">
                              <Text
                                lineHeight="1"
                                fontWeight="400"
                                color="#a0aec0"
                                fontSize={responsiveText}
                                marginRight="5px"
                              >
                                {item["asset-id"]}
                              </Text>
                            </Box>
                          </Box>
                        </Box>
                      </Td>
                      <Td borderBottom="none">
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="flex-end"
                        >
                          <Box paddingLeft="0.35rem">
                            <Box display="flex" alignItems="center">
                              <Text
                                letterSpacing="0.3px"
                                fontSize={responsiveNumeric}
                                fontWeight="500"
                              >
                                {item.decimals == 0
                                  ? item.amount
                                  : item.amount / ReturnDecimals(item.decimals)}
                              </Text>
                            </Box>
                          </Box>
                        </Box>
                      </Td>
                      <Td borderBottom="none">
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="flex-end"
                        >
                          {asaList &&
                          asaList != undefined &&
                          asaList[getKeyByValue(asaList, item["asset-id"])] !=
                            undefined &&
                          asaList[getKeyByValue(asaList, item["asset-id"])]
                            .pool_creator != undefined ? (
                            <NextLink
                              prefetch={false}
                              href={`/asa/${item["asset-id"]}`}
                              passHref
                            >
                              <Link
                                _focus="none"
                                _active="none"
                                textDecoration="none"
                                userSelect="none"
                                _hover="none"
                                cursor="pointer"
                                bg="rgb(6, 157, 189)"
                                pr="10px"
                                height="24.3px"
                                pl="10px"
                                borderRadius="5px"
                                pb="3.3px"
                                pt="3.3px"
                                isExternal
                              >
                                <Text
                                  color="whiteAlpha.900"
                                  fontWeight="600"
                                  fontSize="0.8rem"
                                >
                                  Swap
                                </Text>
                              </Link>
                            </NextLink>
                          ) : (
                            <Button
                              isDisabled
                              _focus="none"
                              _active="none"
                              textDecoration="none"
                              userSelect="none"
                              _hover="none"
                              cursor="pointer"
                              height="26.3px"
                              bg="rgb(6, 157, 189)"
                              pr="10px"
                              pl="10px"
                              borderRadius="5px"
                              pb="3px"
                              pt="3.3px"
                            >
                              <Text
                                color="whiteAlpha.900"
                                fontWeight="600"
                                fontSize="0.85rem"
                              >
                                Swap
                              </Text>
                            </Button>
                          )}
                        </Box>
                      </Td>
                    </Tr>
                  ) : (
                    item.amount != 0 && (
                      <Tr
                        key={item["asset-id"]}
                        _hover={{ background: "#242e3c" }}
                      >
                        <Td borderBottom="none" className="lol">
                          <Box
                            minW="max-content"
                            pr="10px"
                            display="flex"
                            alignItems="center"
                          >
                            <Box
                              width="auto"
                              height="auto"
                              display="flex"
                              alignItems="center"
                              minW={responsiveImgw}
                              minH={responsiveImgw}
                            >
                              <ImageWithFallback
                                alt={item.name}
                                className="imgBorder"
                                key={`${item["asset-id"]}`}
                                src={`${ASSET_LOGO_BASE_URL}/${item["asset-id"]}/icon.png`}                      
                                width={responsiveImg}
                                height={responsiveImg}
                              />
                            </Box>
                            <Box paddingLeft="0.9rem">
                              <Box display="flex" alignItems="baseline">
                                <Heading
                                  fontSize={responsiveFont}
                                  mb="3px"
                                  lineHeight="1"
                                  fontWeight="500"
                                >
                                  {item.name}
                                </Heading>
                                {item.verification != undefined &&
                                  item.verification.reputation.toLowerCase() ==
                                    "verified" && (
                                    <Tooltip
                                      pb="25px"
                                      pt="25px"
                                      borderRadius="7px"
                                      padding="10px"
                                      width="auto"
                                      fontWeight="500"
                                      color="#fff"
                                      bg="black"
                                      label={"Verified asset."}
                                      placement="bottom"
                                    >
                                      <VerifiedIcon
                                        ml="5px"
                                        height="auto"
                                        width={{ base: "13.5px" }}
                                        fill="#00aed3"
                                      />
                                    </Tooltip>
                                  )}
                              </Box>
                              <Box display="flex" alignItems="center">
                                <Text
                                  lineHeight="1"
                                  fontWeight="400"
                                  color="#a0aec0"
                                  fontSize={responsiveText}
                                  marginRight="5px"
                                >
                                  {item["asset-id"]}
                                </Text>
                              </Box>
                            </Box>
                          </Box>
                        </Td>
                        <Td borderBottom="none">
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-end"
                          >
                            <Box paddingLeft="0.35rem">
                              <Box display="flex" alignItems="center">
                                <Text
                                  letterSpacing="0.3px"
                                  fontSize={responsiveNumeric}
                                  fontWeight="500"
                                >
                                  {item.decimals == 0
                                    ? item.amount
                                    : item.amount /
                                      ReturnDecimals(item.decimals)}
                                </Text>
                              </Box>
                            </Box>
                          </Box>
                        </Td>
                        <Td borderBottom="none">
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-end"
                          >
                            {asaList &&
                            asaList != undefined &&
                            asaList[getKeyByValue(asaList, item["asset-id"])] !=
                              undefined &&
                            asaList[getKeyByValue(asaList, item["asset-id"])]
                              .pool_creator != undefined ? (
                              <NextLink
                                prefetch={false}
                                href={`/asa/${item["asset-id"]}`}
                                passHref
                              >
                                <Link
                                  _focus="none"
                                  _active="none"
                                  textDecoration="none"
                                  userSelect="none"
                                  _hover="none"
                                  cursor="pointer"
                                  bg="rgb(6, 157, 189)"
                                  pr="10px"
                                  height="26.3px"
                                  pl="10px"
                                  borderRadius="5px"
                                  pb="3px"
                                  pt="3.3px"
                                  isExternal
                                >
                                  <Text
                                    color="whiteAlpha.900"
                                    fontWeight="600"
                                    fontSize="0.85rem"
                                  >
                                    Swap
                                  </Text>
                                </Link>
                              </NextLink>
                            ) : (
                              <Button
                                isDisabled
                                _focus="none"
                                _active="none"
                                textDecoration="none"
                                userSelect="none"
                                _hover="none"
                                cursor="pointer"
                                height="26.3px"
                                bg="rgb(6, 157, 189)"
                                pr="10px"
                                pl="10px"
                                borderRadius="5px"
                                pb="3px"
                                pt="3.3px"
                              >
                                <Text
                                  color="whiteAlpha.900"
                                  fontWeight="600"
                                  fontSize="0.85rem"
                                >
                                  Swap
                                </Text>
                              </Button>
                            )}
                          </Box>
                        </Td>
                      </Tr>
                    )
                  )
                )
              : asa &&
                asa.account["apps-local-state"][
                  getKeyByValuee(asa.account["apps-local-state"], 552635992)
                ]["key-value"].map(
                  (itemm, i) =>
                    getWalletExcesss(
                      asaList,
                      getExcessAcc(itemm.key),
                      "pool_creator"
                    ) != undefined &&
                    getExcessIndex(itemm.key) !=
                      getWalletExcesss(
                        asaList,
                        getExcessAcc(itemm.key),
                        "pool_creator"
                      ).asset_1_id &&
                    getExcessIndex(itemm.key) == 0 && (
                      <Tr key={i} _hover={{ background: "#242e3c" }}>
                        <Td borderBottom="none" className="lol">
                          <Box
                            minW="max-content"
                            pr="10px"
                            display="flex"
                            alignItems="center"
                          >
                            <Box
                              width="auto"
                              height="auto"
                              display="flex"
                              alignItems="center"
                              minW={responsiveImgw}
                              minH={responsiveImgw}
                            >
                              <ImageWithFallback
                                alt={
                                  getWalletExcess(
                                    asaList,
                                    getExcessIndex(itemm.key)
                                  ) != undefined &&
                                  getExcessIndex(itemm.key) != 0
                                    ? getWalletExcess(
                                        asaList,
                                        getExcessIndex(itemm.key)
                                      ).asset_1_name
                                    : "ALGO"
                                }
                                className="imgBorder"
                                key={`${getExcessIndex(itemm.key)}`}
                                src={`${ASSET_LOGO_BASE_URL}/${getExcessIndex(itemm.key)}/icon.png`}
                                width={responsiveImg}
                                height={responsiveImg}
                              />
                            </Box>
                            <Box paddingLeft="0.9rem">
                              <Box display="flex" alignItems="baseline">
                                <Heading
                                  fontSize={responsiveFont}
                                  mb="3px"
                                  lineHeight="1"
                                  fontWeight="600"
                                >
                                  {getWalletExcess(
                                    asaList,
                                    getExcessIndex(itemm.key)
                                  ) != undefined &&
                                  getExcessIndex(itemm.key) != 0
                                    ? getWalletExcess(
                                        asaList,
                                        getExcessIndex(itemm.key)
                                      ).asset_1_name
                                    : "ALGO"}
                                </Heading>
                                {((getWalletExcess(
                                  asaList,
                                  getExcessIndex(itemm.key)
                                ) != undefined &&
                                  (getWalletExcess(
                                    asaList,
                                    getExcessIndex(itemm.key)
                                  ) != undefined &&
                                    getWalletExcess(
                                      asaList,
                                      getExcessIndex(itemm.key)
                                    ).is_verified) == "true" &&
                                  "verified") ||
                                  getExcessIndex(itemm.key) == 0) && (
                                  <Tooltip
                                    pb="25px"
                                    pt="25px"
                                    borderRadius="7px"
                                    padding="10px"
                                    width="auto"
                                    fontWeight="500"
                                    color="#fff"
                                    bg="black"
                                    label={"Verified asset."}
                                    placement="bottom"
                                  >
                                    <VerifiedIcon
                                      ml="5px"
                                      height="auto"
                                      width={{ base: "13.5px" }}
                                      fill="#00aed3"
                                    />
                                  </Tooltip>
                                )}
                              </Box>
                              <Box display="flex" alignItems="center">
                                <Text
                                  lineHeight="1"
                                  fontWeight="500"
                                  color="#a0aec0"
                                  fontSize={responsiveText}
                                  marginRight="5px"
                                >
                                  {`${
                                    getWalletExcesss(
                                      asaList,
                                      getExcessAcc(itemm.key),
                                      "pool_creator"
                                    ) != undefined &&
                                    getWalletExcesss(
                                      asaList,
                                      getExcessAcc(itemm.key),
                                      "pool_creator"
                                    ) != undefined &&
                                    getWalletExcesss(
                                      asaList,
                                      getExcessAcc(itemm.key),
                                      "pool_creator"
                                    ).asset_1_name
                                  } `}
                                  /{"ALGO"}
                                </Text>
                              </Box>
                            </Box>
                          </Box>
                        </Td>
                        <Td borderBottom="none">
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-end"
                          >
                            <Box paddingLeft="0.35rem">
                              <Box display="flex" alignItems="center">
                                <Text
                                  letterSpacing="0.3px"
                                  fontSize={responsiveNumeric}
                                  fontWeight="500"
                                >
                                  {getExcessIndex(itemm.key) == 0
                                    ? itemm.value.uint / ReturnDecimals(6)
                                    : getWalletExcess(
                                        asaList,
                                        getExcessIndex(itemm.key)
                                      ) != undefined &&
                                      getWalletExcess(
                                        asaList,
                                        getExcessIndex(itemm.key)
                                      ).asset_1_decimals == 0
                                    ? itemm.value.uint
                                    : itemm.value.uint /
                                      ReturnDecimals(
                                        getWalletExcess(
                                          asaList,
                                          getExcessIndex(itemm.key)
                                        ) != undefined &&
                                          getWalletExcess(
                                            asaList,
                                            getExcessIndex(itemm.key)
                                          ).asset_1_decimals
                                      )}
                                </Text>
                              </Box>
                            </Box>
                          </Box>
                        </Td>
                        <Td borderBottom="none">
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-end"
                          >
                            <Button
                              isDisabled={onProgress == true ? true : false}
                              _focus="none"
                              _active="none"
                              textDecoration="none"
                              userSelect="none"
                              _hover="none"
                              id={getExcessIndex(itemm.key)}
                              cursor="pointer"
                              height="26.3px"
                              bg="rgb(6, 157, 189)"
                              pr="10px"
                              pl="10px"
                              borderRadius="5px"
                              pb="3px"
                              pt="3.3px"
                              onClick={() => {
                                performRedeem(
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
                                  ].pool_creator,
                                  asa.account.address,
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
                                  ].asset_1_id,
                                  0,
                                  getExcessIndex(itemm.key),
                                  itemm.value.uint,
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
                                  ].pool_id,
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
                                              Buffer.from(
                                                itemm["key"],
                                                "base64"
                                              ).length - 9
                                            )
                                          )
                                        )
                                      ].asset_1_name,
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
                                  ].asset_1_decimals
                                );
                                // window.location.href = isIOS ? `algorand-wc://` : `algorand://`;
                              }}
                            >
                              {onProgress == true &&
                              `${
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
                                ].pool_id
                              }${getExcessIndex(itemm.key)}` == redeemsId ? (
                                <CircularProgress
                                  size="17px"
                                  isIndeterminate
                                  color="#1f2733"
                                />
                              ) : (
                                <Text
                                  color="whiteAlpha.900"
                                  fontWeight="600"
                                  fontSize="0.8rem"
                                >
                                  Redeem
                                </Text>
                              )}
                            </Button>
                          </Box>
                        </Td>
                      </Tr>
                    )
                )}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default WalletTable;
