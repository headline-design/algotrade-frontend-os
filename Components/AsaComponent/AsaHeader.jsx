import {
  Box,
  Heading,
  Text,
  IconButton,
  useClipboard,
  Link,
  Tooltip,
  Spinner,
  useBreakpointValue,
} from "@chakra-ui/react";
import ImageWithFallback from "../Image/nextImage";
import { CopyIcon } from "@chakra-ui/icons";
import { Default_Currency } from "../../pages/_app";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { VerifiedIcon } from "../Icons/Icons";
import TruncateString from "../../utils/truncateString";
import { AlgoSvg, UsdIcon } from "../Icons/Icons";
import NextLink from "next/link";

const AsaHeader = ({
  poolName,
  currentPrice,
  latestPrice,
  pairs,
  algoPrice,
}) => {
  function getKeyByValuee(object, value) {
    return Object.keys(object).find((key) => object[key]["pool_id"] === value);
  }

  const { defaultCurrency } = useContext(Default_Currency);
  const router = useRouter();
  // const nowPrice = currentPrice[currentPrice.length - 1];

  const lgg = useBreakpointValue({ base: "bottom", lg: "right" });
  const ASSET_LOGO_BASE_URL = "https://mainnet-asa.algotrade.net/assets";
  const [value, setValue] = useState(poolName[0] && poolName[0].creator);
  const { hasCopied, onCopy } = useClipboard(value);
  const numbStrr = (plpl) => {
    const numstr = plpl;
    while (numstr[numstr.length - 1] === "0") {
      numstr = numstr.slice(0, -1);
      if (numstr[numstr.length - 1] !== "0") {
        return numstr;
      }
      if (numstr[numstr.length - 3] === ".") {
        return numstr;
      }
    }
    return numstr;
  };
  return (
    <Box bg="#1f2733" width="100%" padding="15px" borderRadius="5px">
      <Box
        display="flex"
        flexDirection={{ base: "column", zz: "row" }}
        justifyContent="space-between"
        alignItems={{ base: "flex-start", zz: "center" }}
      >
        <Box>
          <Box display="flex" alignItems="center">
            <Box minW={{ base: "35px", zz: "unset" }} display="flex">
              <ImageWithFallback
                alt={poolName[0] && poolName[0].asset_1_name}
                className="imgBorder"
                key={`${poolName[0] && poolName[0].asset_1_id}`}
                src={`${ASSET_LOGO_BASE_URL}/${
                  poolName[0] && poolName[0].asset_1_id
                }/icon.png`}
                width={40}
                height={40}
              />
            </Box>
            <Box pl="7px" display="flex" alignItems="center">
              <Text
                fontWeight="500"
                fontSize={{ base: "0.9rem", zz: "1.3rem" }}
                lineHeight="1"
                color="#a0aec0"
              >
                {router.asPath.includes("pool") != true
                  ? poolName[0] && poolName[0].asset_2_name
                  : router.asPath.includes("pool") == true &&
                    pairs[
                      getKeyByValuee(
                        pairs,
                        Number(router.asPath.split("pool=")[1])
                      )
                    ] != undefined &&
                    pairs[
                      getKeyByValuee(
                        pairs,
                        Number(router.asPath.split("pool=")[1])
                      )
                    ].asset_2_name}{" "}
                /&nbsp;
              </Text>
              <Heading
                as="h1"
                fontSize={{ base: "1.5rem", zz: "1.9rem" }}
                lineHeight="1"
              >
                {poolName[0] && poolName[0].asset_1_name}
              </Heading>
              {poolName[0] && poolName[0].is_verified == "true" && (
                <Tooltip
                  pt="5px"
                  pb="5px"
                  width="auto"
                  fontWeight="500"
                  color="#fff"
                  bg="var(--chakra-colors-gray-800)"
                  label={
                    "This is a verified asset. It is not an endorsement of any type."
                  }
                  placement={lgg}
                >
                  <VerifiedIcon
                    ml="5px"
                    height="auto"
                    width={{ base: "21.5px", zz: "24.5px" }}
                    fill="#00aed3"
                  />
                </Tooltip>
              )}
            </Box>
          </Box>
          <Box
            mt={{ base: "8px", zz: "unset" }}
            display="flex"
            alignItems={{ base: "flex-start", zz: "center" }}
            flexDirection={{ base: "column", zz: "row" }}
          >
            <Box display="flex" alignItems="center">
              {poolName && poolName.length == 3 && (
                <Box
                  mr="10px"
                  width="auto"
                  bg="#00aed3"
                  pl={{ base: "8px", lg: "10px" }}
                  pt={{ base: "0px", lg: "1px" }}
                  pb={{ base: "0px", lg: "1px" }}
                  pr={{ base: "8px", lg: "10px" }}
                  borderRadius="5px"
                  textAlign="center"
                >
                  <Text
                    fontSize={{ base: "0.8rem", lg: "0.85rem" }}
                    fontWeight="500"
                  >
                    Rank #{poolName[1] && poolName[1].rank}
                  </Text>
                </Box>
              )}

              <Box
                width="auto"
                bg="black"
                pr="10px"
                pl="10px"
                borderRadius="5px"
                pt="2px"
                pb="2px"
                display={{ base: "flex", zz: "none" }}
                alignItems="center"
              >
                <Text fontSize="0.8rem" fontWeight="500" color="#a0aec0">
                  24h
                </Text>
                {!latestPrice ? (
                  <Spinner />
                ) : (
                  latestPrice && (
                    <Text
                      ml="5px"
                      color={
                        latestPrice != undefined &&
                        latestPrice.price_change != undefined &&
                        latestPrice.price_change.daily != null &&
                        latestPrice.price_change.daily < 0
                          ? "#ff6c4c"
                          : "#19bd78"
                      }
                      fontSize="0.8rem"
                      fontWeight="600"
                    >
                      {latestPrice != undefined &&
                      latestPrice.price_change != undefined &&
                      latestPrice.price_change.daily == null
                        ? "0.00%"
                        : latestPrice != undefined &&
                          latestPrice.price_change != undefined &&
                          latestPrice.price_change.daily
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,") < 0
                        ? latestPrice.price_change.daily != undefined &&
                          latestPrice.price_change.daily
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,") + "%"
                        : "+" + latestPrice != undefined &&
                          latestPrice.price_change != undefined &&
                          latestPrice.price_change.daily
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,") + "%"}
                    </Text>
                  )
                )}
              </Box>
            </Box>
            <Box
              flexDirection={{ base: "row", lg: "unset" }}
              display="flex"
              alignItems={{ base: "center", lg: "center" }}
            >
              <Box display="flex">
                <NextLink
                  href={`https://app.tinyman.org/#/swap?asset_in=${
                    poolName[0] && poolName[0].asset_1_id
                  }&asset_out=0`}
                  passHref
                >
                  <Link
                    isExternal="true"
                    mr="7px"
                    _focus="none"
                    display="flex"
                    alignItems="center"
                    textDecoration="none"
                    _hover="none"
                  >
                    <ImageWithFallback
                      alt="Tinyman"
                      src="/App_Icon_32px.png"
                      fallbackSrc="/placeholder.png"
                      width={20}
                      height={20}
                    />
                  </Link>
                </NextLink>
                <NextLink
                  href={`https://algoexplorer.io/asset/${
                    poolName[0] && poolName[0].asset_1_id
                  }`}
                  passHref
                >
                  <Link
                    isExternal="true"
                    mr="7px"
                    _focus="none"
                    display="flex"
                    alignItems="center"
                    textDecoration="none"
                    _hover="none"
                  >
                    <ImageWithFallback
                      alt="Algoexplorer"
                      src="/algoexplorer.png"
                      fallbackSrc="/placeholder.png"
                      width={22}
                      height={22}
                    />
                  </Link>
                </NextLink>
              </Box>
              <Box display="flex" alignItems="center">
                <Tooltip
                  fontWeight="500"
                  color="#fff"
                  bg="var(--chakra-colors-gray-800)"
                  label={hasCopied ? "Copied" : "Copy"}
                  placement="right"
                >
                  <Text
                    onClick={onCopy}
                    cursor="pointer"
                    mr="-5px"
                    mb="-1px"
                    fontWeight="600"
                    color="#a0aec0"
                    fontSize="0.8rem"
                  >
                    Address:{" "}
                    {TruncateString(
                      `${poolName[0] && poolName[0].creator}`,
                      12
                    )}
                  </Text>
                </Tooltip>
                <Tooltip
                  fontWeight="500"
                  color="#fff"
                  bg="var(--chakra-colors-gray-800)"
                  label={hasCopied ? "Copied" : "Copy"}
                  placement="right"
                >
                  <IconButton
                    width="auto"
                    _active="none"
                    _focus="none"
                    _hover="none"
                    bg="none"
                    onClick={onCopy}
                    aria-label="Search database"
                    icon={<CopyIcon width="auto" height="12px" />}
                  />
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box>
          {!latestPrice ? (
            <Spinner />
          ) : (
            <Box
              display={{ base: "none", zz: "flex" }}
              alignItems="flex-end"
              flexDirection={{ base: "row", zz: "column" }}
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="baseline" lineHeight="1" mb="5px">
                {latestPrice &&
                  latestPrice.results != undefined &&
                  (router.asPath.includes("pool") != true ? (
                    defaultCurrency == "usd" ? (
                      <Box display="flex" alignItems="center">
                        <UsdIcon
                          position="relative"
                          bottom="-2.5px"
                          w="16.5px"
                          height="auto"
                          fill="white"
                        />
                      </Box>
                    ) : (
                      <AlgoSvg w="23px" height="auto" fill="white" />
                    )
                  ) : router.asPath.includes("pool") == true &&
                    router.asPath.split("pool=")[1] != poolName[0].pool_id ? (
                    defaultCurrency == "algo" ? (
                      <Text>
                        {
                          pairs[
                            getKeyByValuee(
                              pairs,
                              Number(router.asPath.split("pool=")[1])
                            )
                          ].asset_2_name
                        }
                      </Text>
                    ) : (
                      <Box display="flex" alignItems="center">
                        <UsdIcon
                          position="relative"
                          bottom="-2.5px"
                          w="16.5px"
                          height="auto"
                          fill="white"
                        />
                      </Box>
                    )
                  ) : (
                    router.asPath.includes("pool") == true &&
                    router.asPath.split("pool=")[1] == poolName[0].pool_id &&
                    (defaultCurrency == "algo" ? (
                      <AlgoSvg w="23px" height="auto" fill="white" />
                    ) : (
                      <Box display="flex" alignItems="center">
                        <UsdIcon
                          position="relative"
                          bottom="-2.5px"
                          w="16.5px"
                          height="auto"
                          fill="white"
                        />
                      </Box>
                    ))
                  ))}
                <Text
                  ml="6.5px"
                  fontSize={{ base: "1.9rem", zz: "2.1rem" }}
                  fontWeight="600"
                >
                  {router.asPath.includes("pool") != true
                    ? latestPrice &&
                      latestPrice.results != undefined &&
                      numbStrr(
                        defaultCurrency == "usd"
                          ? (latestPrice.results[0].total_price * algoPrice)
                              .toFixed(8)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                          : latestPrice.results[0].total_price
                              .toFixed(8)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                      )
                    : router.asPath.includes("pool") == true &&
                      router.asPath.split("pool=")[1] == poolName[0].pool_id
                    ? latestPrice &&
                      latestPrice.results != undefined &&
                      numbStrr(
                        defaultCurrency == "usd"
                          ? (latestPrice.results[0].total_price * algoPrice)
                              .toFixed(8)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                          : latestPrice.results[0].total_price
                              .toFixed(8)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                      )
                    : router.asPath.includes("pool") == true &&
                      router.asPath.split("pool=")[1] != poolName[0].pool_id &&
                      latestPrice &&
                      latestPrice.results != undefined &&
                      numbStrr(
                        defaultCurrency == "usd"
                          ? (latestPrice.results[0].total_price * algoPrice)
                              .toFixed(8)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                          : latestPrice.results[0].total_price
                              .toFixed(8)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                      )}
                  {/* {nowPrice && nowPrice.close.toFixed(8).replace(/\d(?=(\d{3})+\.)/g, '$&,')} */}
                </Text>
              </Box>
              {latestPrice && latestPrice.results != undefined && (
                <Box display="flex" alignItems="center" mt="3px">
                  <Box
                    mr="5px"
                    width="auto"
                    bg="black"
                    pr="10px"
                    pl="10px"
                    borderRadius="5px"
                    pt="2px"
                    pb="2px"
                    display="flex"
                    alignItems="center"
                  >
                    <Text fontSize="0.8rem" fontWeight="500" color="#a0aec0">
                      1 hour
                    </Text>
                    <Text
                      ml="5px"
                      color={
                        latestPrice != undefined &&
                        latestPrice.price_change != undefined &&
                        latestPrice.price_change.hourly != null &&
                        latestPrice.price_change.hourly < 0
                          ? "#ff6c4c"
                          : "#19bd78"
                      }
                      fontSize="0.8rem"
                      fontWeight="600"
                    >
                      {latestPrice != undefined &&
                      latestPrice.price_change != undefined &&
                      latestPrice.price_change.hourly == null
                        ? "0.00%"
                        : latestPrice != undefined &&
                          latestPrice.price_change != undefined &&
                          latestPrice.price_change.hourly
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,") < 0
                        ? latestPrice.price_change.hourly != undefined &&
                          latestPrice.price_change.hourly
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,") + "%"
                        : "+" + latestPrice != undefined &&
                          latestPrice &&
                          latestPrice.price_change != undefined &&
                          latestPrice.price_change.hourly != undefined &&
                          latestPrice.price_change.hourly
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,") + "%"}
                    </Text>
                  </Box>
                  <Box
                    width="auto"
                    bg="black"
                    pr="10px"
                    pl="10px"
                    borderRadius="5px"
                    pt="2px"
                    pb="2px"
                    display="flex"
                    alignItems="center"
                  >
                    <Text fontSize="0.8rem" fontWeight="500" color="#a0aec0">
                      24 hours
                    </Text>
                    <Text
                      ml="5px"
                      color={
                        latestPrice != undefined &&
                        latestPrice.price_change != undefined &&
                        latestPrice.price_change.daily != null &&
                        latestPrice.price_change.daily < 0
                          ? "#ff6c4c"
                          : "#19bd78"
                      }
                      fontSize="0.8rem"
                      fontWeight="600"
                    >
                      {latestPrice != undefined &&
                      latestPrice.price_change != undefined &&
                      latestPrice.price_change.daily == null
                        ? "0.00%"
                        : latestPrice != undefined &&
                          latestPrice.price_change != undefined &&
                          latestPrice.price_change.daily
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,") < 0
                        ? latestPrice.price_change.daily != undefined &&
                          latestPrice.price_change.daily
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,") + "%"
                        : "+" + latestPrice != undefined &&
                          latestPrice.price_change != undefined &&
                          latestPrice.price_change.daily
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,") + "%"}
                    </Text>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AsaHeader;
