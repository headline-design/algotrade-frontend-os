import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Heading,
  Tr,
  Th,
  Td,
  Text,
  Link,
  Button,
  Skeleton,
  SkeletonCircle,
  Tooltip,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { GetTable, GetAlgo, GetFavoriteAsas } from "../../lib/CustomSWR";
import TableSwitch from "./TableSwitch";
import FavoriteIconFilter from "./FavoriteFilter";
import { TriangleDownIcon, TriangleUpIcon, StarIcon } from "@chakra-ui/icons";
import { useBreakpointValue } from "@chakra-ui/media-query";
import TableFilter from "./Filter";
import dynamic from "next/dynamic";
import {
  Algorand,
  Algorandd,
  AlgoSvg,
  UsdIcon,
  VerifiedIcon,
  Favorite,
} from "../Icons/Icons";
import NextLink from "next/link";
import ImageWithFallback from "../Image/nextImage";
// import AsaSparkline from "./SparklineChart";
import Pagination from "@choc-ui/paginator";
const AsaSparkline = dynamic(() => import("./SparklineChart"), {
  ssr: false,
});
const HomeTable = () => {
  const localStorageAssetsArray = [];
  const [isFavorite, setIsFavorite] = useState(false);

  const objectMap = (obj, fn) =>
    Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(k)]));

  const savedAssets =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("ALGOTRADE_SAVED_ASSETS"));
  isFavorite == true &&
    savedAssets != null &&
    Object.keys(savedAssets).length > 0 == true &&
    objectMap(savedAssets, (v) => localStorageAssetsArray.push(v));

  const saveAsset = (assetId, assetName) => {
    const currentLocalStorage =
      localStorage.getItem("ALGOTRADE_SAVED_ASSETS") == null
        ? {}
        : JSON.parse(localStorage.getItem("ALGOTRADE_SAVED_ASSETS"));
    const currentLocalStorage_1 =
      localStorage.getItem("ALGOTRADE_SAVED_ASSETS") == null
        ? {}
        : JSON.parse(localStorage.getItem("ALGOTRADE_SAVED_ASSETS"));

    if (currentLocalStorage[assetId] == undefined) {
      currentLocalStorage[assetId] = JSON.parse(
        JSON.stringify({
          asset_id: assetName,
        })
      );
      localStorage.setItem(
        "ALGOTRADE_SAVED_ASSETS",
        JSON.stringify(currentLocalStorage)
      );
    }
    if (currentLocalStorage_1[assetId] != undefined) {
      delete currentLocalStorage_1[assetId];

      localStorage.setItem(
        "ALGOTRADE_SAVED_ASSETS",
        JSON.stringify(currentLocalStorage_1)
      );
    }
  };

  const responsiveImg = useBreakpointValue({ base: 38, lg: 42 });
  const responsiveImgw = useBreakpointValue({ base: "38px", lg: "42px" });
  const responsiveFont = useBreakpointValue({ base: "0.9rem", lg: "1.05rem" });
  const responsiveNumeric = useBreakpointValue({
    base: "0.9rem",
    lg: "0.9rem",
  });
  const responsiveText = useBreakpointValue({
    base: "0.85rem",
    lg: "0.85rem",
  });
  const [page, setPage] = useState(0);

  const [sort_by, setSort] = useState("liquidity");
  const [liquidity, setLiquidity] = useState("false");
  const [verified, setVerified] = useState("true");
  const [order, setOrder] = useState("desc");
  const [algoUsd, setAlgoUsd] = useState("usd");

  const { data: price } = GetAlgo("latest");
  const algoPrice =
    price &&
    price[price.length - 1].close_price
      .toFixed(4)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  const ASSET_LOGO_BASE_URL = "https://mainnet-asa.algotrade.net/assets";
  const { data, error } =
    isFavorite == false
      ? GetTable(page, sort_by, order, verified, liquidity)
      : isFavorite == true &&
        savedAssets != null &&
        Object.keys(savedAssets).length > 0 == true
      ? GetFavoriteAsas(localStorageAssetsArray.join("-"))
      : isFavorite == true && savedAssets == null
      ? GetTable(page, sort_by, order, verified, liquidity)
      : isFavorite == true &&
        savedAssets != null &&
        Object.keys(savedAssets).length > 0 == false &&
        GetTable(page, sort_by, order, verified, liquidity);
  const [totalCount, setTotalCount] = useState();
  useMemo(() => {
    data && totalCount == undefined && setTotalCount(data.count);
    (data && data.count > totalCount && setTotalCount(data.count)) ||
      (data && data.count < totalCount && setTotalCount(data.count));
  }, [totalCount, data]);

  return (
    <>
      <Box pb={{ base: "94px", lg: "0" }}>
        <Box width="100%">
          <Box
            mb="8px"
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <TableSwitch
              isOn={algoUsd == "algo" ? false : true}
              onColor="#EF476F"
              switchCurrency={() =>
                setAlgoUsd(
                  algoUsd == "algo" ? "usd" : algoUsd == "usd" && "algo"
                )
              }
            />
            <FavoriteIconFilter
              setFavorite={() => {
                isFavorite == false
                  ? setIsFavorite(true)
                  : setIsFavorite(false);
              }}
            />
            {/* <Box bg="#242e3c" display="flex" alignItems="center">
              <StarIcon />
              <Box>hi</Box>
            </Box> */}
            <TableFilter
              setPage={setPage}
              liquidity={liquidity}
              verified={verified}
              setLiquidity={setLiquidity}
              setVerified={setVerified}
            />
          </Box>
        </Box>
        {(isFavorite == true && savedAssets == null) ||
        (isFavorite == true &&
          savedAssets != null &&
          Object.keys(savedAssets).length > 0 == false) ? (
          <EmptyFavoriteList setIsFavorite={() => setIsFavorite(false)} />
        ) : (
          <Table
            display={{ base: "block", xl: "block", ql: "inline-table" }}
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
            // {...getTableProps()}
            // pageSize={pageSize}
          >
            <Thead>
              <Tr>
                <Th
                  lineHeight="1"
                  isNumeric
                  _hover={{ background: "#242e3c" }}
                  pr="0.85rem"
                >
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    margin="auto"
                    fontSize="0.7rem"
                    userSelect="none"
                    pt="5px"
                    width="100%"
                    pb="5px"
                  >
                    #
                  </Box>
                </Th>
                <Th
                  lineHeight="1"
                  _hover={{
                    borderTopLeftRadius: "0.5rem",
                    background: "#242e3c",
                  }}
                >
                  <Box
                    width="max-content"
                    userSelect="none"
                    pt="5px"
                    pb="5px"
                    fontSize="0.7rem"
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="flex-end"
                  >
                    ASA
                    <Box
                      display="flex"
                      ml="4px"
                      cursor="pointer"
                      onClick={() => {
                        setSort("asa_name");
                        setOrder(order == "desc" ? "asc" : "desc");
                      }}
                    >
                      <TriangleDownIcon aria-label="sorted descending" />
                      <TriangleUpIcon aria-label="sorted ascending" />
                    </Box>
                  </Box>
                </Th>
                <Th lineHeight="1" isNumeric _hover={{ background: "#242e3c" }}>
                  <Box
                    margin="auto"
                    mr="0"
                    width="max-content"
                    userSelect="none"
                    pt="5px"
                    fontSize="0.7rem"
                    pb="5px"
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                  >
                    PRICE
                    <Box
                      display="flex"
                      ml="4px"
                      cursor="pointer"
                      onClick={() => {
                        setSort("current_price");
                        setOrder(order == "desc" ? "asc" : "desc");
                      }}
                    >
                      <TriangleDownIcon aria-label="sorted descending" />
                      <TriangleUpIcon aria-label="sorted ascending" />
                    </Box>
                  </Box>
                </Th>
                <Th lineHeight="1" isNumeric _hover={{ background: "#242e3c" }}>
                  <Box
                    margin="auto"
                    mr="0"
                    userSelect="none"
                    pt="5px"
                    pb="5px"
                    fontSize="0.7rem"
                    width="max-content"
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                  >
                    1H
                    <Box
                      display="flex"
                      ml="4px"
                      cursor="pointer"
                      onClick={() => {
                        setSort("1h_change");
                        setOrder(order == "desc" ? "asc" : "desc");
                      }}
                    >
                      <TriangleDownIcon aria-label="sorted descending" />
                      <TriangleUpIcon aria-label="sorted ascending" />
                    </Box>
                  </Box>
                </Th>
                <Th lineHeight="1" isNumeric _hover={{ background: "#242e3c" }}>
                  <Box
                    margin="auto"
                    mr="0"
                    userSelect="none"
                    pt="5px"
                    pb="5px"
                    width="max-content"
                    display="flex"
                    fontSize="0.7rem"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                  >
                    24H
                    <Box
                      display="flex"
                      ml="4px"
                      cursor="pointer"
                      onClick={() => {
                        setSort("1d_change");
                        setOrder(order == "desc" ? "asc" : "desc");
                      }}
                    >
                      <TriangleDownIcon aria-label="sorted descending" />
                      <TriangleUpIcon aria-label="sorted ascending" />
                    </Box>
                  </Box>
                </Th>
                <Th lineHeight="1" isNumeric _hover={{ background: "#242e3c" }}>
                  <Box
                    margin="auto"
                    mr="0"
                    userSelect="none"
                    pt="5px"
                    fontSize="0.7rem"
                    pb="5px"
                    display="flex"
                    width="max-content"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                  >
                    VOLUME
                    <Box
                      display="flex"
                      ml="4px"
                      cursor="pointer"
                      onClick={() => {
                        setSort("volume");
                        setOrder(order == "desc" ? "asc" : "desc");
                      }}
                    >
                      <TriangleDownIcon aria-label="sorted descending" />
                      <TriangleUpIcon aria-label="sorted ascending" />
                    </Box>
                  </Box>
                </Th>
                <Th lineHeight="1" isNumeric _hover={{ background: "#242e3c" }}>
                  <Box
                    margin="auto"
                    mr="0"
                    userSelect="none"
                    pt="5px"
                    pb="5px"
                    display="flex"
                    width="max-content"
                    fontSize="0.7rem"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                  >
                    MARKET CAP
                    <Box
                      display="flex"
                      ml="4px"
                      cursor="pointer"
                      onClick={() => {
                        setSort("market_cap");
                        setOrder(order == "desc" ? "asc" : "desc");
                      }}
                    >
                      <TriangleDownIcon aria-label="sorted descending" />
                      <TriangleUpIcon aria-label="sorted ascending" />
                    </Box>
                  </Box>
                </Th>
                <Th
                  lineHeight="1"
                  isNumeric
                  _hover={{
                    borderTopRightRadius: "0.5rem",
                    background: "#242e3c",
                  }}
                >
                  <Box
                    margin="auto"
                    mr="0"
                    userSelect="none"
                    pt="5px"
                    pb="5px"
                    fontSize="0.7rem"
                    display="flex"
                    justifyContent="flex-end"
                    width="max-content"
                    alignItems="flex-end"
                  >
                    LIQUIDITY
                    <Box
                      display="flex"
                      ml="4px"
                      cursor="pointer"
                      onClick={() => {
                        setSort("liquidity");
                        setOrder(order == "desc" ? "asc" : "desc");
                      }}
                    >
                      <TriangleDownIcon aria-label="sorted descending" />
                      <TriangleUpIcon aria-label="sorted ascending" />
                    </Box>
                  </Box>
                </Th>
                <Th
                  lineHeight="1"
                  isNumeric
                  _hover={{
                    borderTopRightRadius: "0.5rem",
                    background: "#242e3c",
                  }}
                >
                  <Box
                    margin="auto"
                    mr="0"
                    userSelect="none"
                    pt="5px"
                    pb="5px"
                    fontSize="0.7rem"
                    display="flex"
                    justifyContent="flex-end"
                    width="max-content"
                    alignItems="flex-end"
                  >
                    LAST 7 DAYS
                  </Box>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {!data ? (
                <SkeletonPlaceholder />
              ) : (
                (isFavorite == false ||
                  (isFavorite == true &&
                    savedAssets != null &&
                    Object.keys(savedAssets).length > 0 == true)) &&
                data.results.map((item, index) => (
                  <Tr key={item.asset_1_id} _hover={{ background: "#242e3c" }}>
                    <Td borderBottom="none" className="lol" pr="0.85rem">
                      <Box
                        maxWidth="46.39px"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box
                          display="flex"
                          minWidth="14px"
                          maxWidth="14px"
                          margin="auto"
                          alignItems="center"
                          overflow="hidden"
                          justifyContent="center"
                          height="100%"
                        >
                          <SaveIcon
                            item={item}
                            saveAsset={() =>
                              saveAsset(item.asset_1_id, item.asa_name)
                            }
                            getStorage={"getAsa"}
                            bg="none"
                            width="14px"
                            // aria-label="Search database"
                          />
                        </Box>
                        <Box width="30px">
                          <Box
                            display="flex"
                            alignItems="center"
                            width="100%"
                            justifyContent="end"
                          >
                            <Text
                              lineHeight="1"
                              mt="1px"
                              fontWeight="500"
                              color="#a0aec0"
                              fontSize="0.8rem"
                            >
                              {page != 0 &&
                                (index != 9
                                  ? String(page).slice(0, page < 100 ? 1 : 2)
                                  : Number(
                                      String(page).slice(0, page < 100 ? 1 : 2)
                                    ) + 1)}

                              {page == 0
                                ? `${String(index + 1)}`
                                : `${
                                    index != 9
                                      ? index + 1
                                      : String(index + 1)[1]
                                  }`}
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                    </Td>
                    <Td borderBottom="none" className="lol">
                      <Box
                        minW="max-content"
                        pr="10px"
                        display="flex"
                        alignItems="center"
                      >
                        <NextLink
                          prefetch={false}
                          href={`/asa/${item.asset_1_id}`}
                          passHref
                        >
                          <Link
                            _focus="none"
                            display="flex"
                            alignItems="center"
                            textDecoration="none"
                            _hover="none"
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
                                alt={item.asa_name}
                                className="imgBorder"
                                key={`${item.asset_1_id}`}
                                src={`${ASSET_LOGO_BASE_URL}/${item.asset_1_id}/icon.png`}
                                fallbackSrc="/placeholder.png"
                                width={responsiveImg}
                                height={responsiveImg}
                              />
                            </Box>
                            <Box paddingLeft="0.9rem">
                              <Box display="flex" alignItems="baseline">
                                <Heading
                                  overflow="hidden"
                                  textOverflow="ellipsis"
                                  whiteSpace="nowrap"
                                  maxW="92.24px"
                                  fontSize={responsiveFont}
                                  mb="3px"
                                  lineHeight="1"
                                  fontWeight="600"
                                >
                                  {item.asa_name}
                                </Heading>
                                {item.is_verified == "true" && (
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
                                  {item.asset_1_id}
                                </Text>
                              </Box>
                            </Box>
                          </Link>
                        </NextLink>
                      </Box>
                    </Td>
                    <Td borderBottom="none">
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-end"
                      >
                        {algoUsd == "usd" ? (
                          <UsdIcon
                            fill="white"
                            w={{ base: "6.4px", lg: "8px" }}
                            height="auto"
                          />
                        ) : (
                          <AlgoSvg
                            fill="white"
                            w={{ base: "10px", lg: "12px" }}
                            height="auto"
                          />
                        )}
                        <Box paddingLeft="0.35rem">
                          <Box display="flex" alignItems="center">
                            <Text
                              letterSpacing="0.3px"
                              fontSize={responsiveNumeric}
                              fontWeight="500"
                            >
                              {item.current_price && algoUsd != "usd"
                                ? item.current_price
                                    .toFixed(8)
                                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                                : (item.current_price * algoPrice)
                                    .toFixed(8)
                                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
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
                        <Text
                          letterSpacing="0.3px"
                          paddingRight="0.35rem"
                          color={
                            item["1h_change"]
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,") < 0
                              ? "#ff6c4c"
                              : "#19bd78"
                          }
                          fontSize={responsiveNumeric}
                          fontWeight="500"
                        >
                          {item["1h_change"]
                            ? `${
                                item["1h_change"] < 0
                                  ? item["1h_change"]
                                      .toFixed(2)
                                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                                      .split("-")[1]
                                  : item["1h_change"]
                                      .toFixed(2)
                                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                              }%`
                            : "0.00%"}
                        </Text>
                        <Box>
                          <Box display="flex" alignItems="center">
                            {item["1h_change"]
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,") < 0 ? (
                              <Algorand h="auto" w="12.5px" />
                            ) : (
                              <Algorandd h="auto" w="12.5px" />
                            )}
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
                        <Text
                          letterSpacing="0.3px"
                          paddingRight="0.35rem"
                          color={
                            item["1d_change"]
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,") < 0
                              ? "#ff6c4c"
                              : "#19bd78"
                          }
                          fontSize={responsiveNumeric}
                          fontWeight="500"
                        >
                          {item["1d_change"]
                            ? `${
                                item["1d_change"] < 0
                                  ? item["1d_change"]
                                      .toFixed(2)
                                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                                      .split("-")[1]
                                  : item["1d_change"]
                                      .toFixed(2)
                                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                              }%`
                            : "0.00%"}
                        </Text>
                        <Box>
                          <Box display="flex" alignItems="center">
                            {item["1d_change"]
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,") < 0 ? (
                              <Algorand h="auto" w="12.5px" />
                            ) : (
                              <Algorandd h="auto" w="12.5px" />
                            )}
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
                        {algoUsd == "usd" ? (
                          <UsdIcon
                            fill="white"
                            w={{ base: "6.4px", lg: "8px" }}
                            height="auto"
                          />
                        ) : (
                          <AlgoSvg
                            fill="white"
                            w={{ base: "10px", lg: "12px" }}
                            height="auto"
                          />
                        )}
                        <Box marginLeft="0.35rem">
                          <Box display="flex" alignItems="center">
                            <Text
                              letterSpacing="0.3px"
                              fontSize={responsiveNumeric}
                              fontWeight="500"
                            >
                              {item.volume && algoUsd != "usd"
                                ? item.volume
                                    .toFixed(2)
                                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                                : (item.volume * algoPrice)
                                    .toFixed(2)
                                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
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
                        {algoUsd == "usd" ? (
                          <UsdIcon
                            fill="white"
                            w={{ base: "6.4px", lg: "8px" }}
                            height="auto"
                          />
                        ) : (
                          <AlgoSvg
                            fill="white"
                            w={{ base: "10px", lg: "12px" }}
                            height="auto"
                          />
                        )}
                        <Box paddingLeft="0.35rem">
                          <Box display="flex" alignItems="center">
                            <Text
                              letterSpacing="0.3px"
                              fontSize={responsiveNumeric}
                              fontWeight="500"
                            >
                              {item.market_cap && algoUsd != "usd"
                                ? item.market_cap
                                    .toFixed(2)
                                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                                : (item.market_cap * algoPrice)
                                    .toFixed(2)
                                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                    </Td>
                    <Td borderBottom="none">
                      <Box
                        borderBottom="none"
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-end"
                      >
                        {algoUsd == "usd" ? (
                          <UsdIcon
                            fill="white"
                            w={{ base: "6.4px", lg: "8px" }}
                            height="auto"
                          />
                        ) : (
                          <AlgoSvg
                            fill="white"
                            w={{ base: "10px", lg: "12px" }}
                            height="auto"
                          />
                        )}{" "}
                        <Box paddingLeft="0.35rem">
                          <Box display="flex" alignItems="center">
                            <Text
                              letterSpacing="0.3px"
                              fontSize={responsiveNumeric}
                              fontWeight="500"
                            >
                              {item.liquidity && algoUsd != "usd"
                                ? item.liquidity
                                    .toFixed(2)
                                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                                : (item.liquidity * algoPrice)
                                    .toFixed(2)
                                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                    </Td>
                    <Td borderBottom="none" pt="0" pb="0">
                      <Box height="auto" width="100%">
                        <AsaSparkline
                          key={item.pool_id}
                          pool_id={item.pool_id}
                        />
                      </Box>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        )}
        {(isFavorite == false ||
          (isFavorite == true &&
            savedAssets != null &&
            Object.keys(savedAssets).length > 0 == true)) && (
          <Box mb="40px" mt="20px" pl="0" pr="0">
            <Pagination
              current={page / 10 + 1}
              disabled={!data ? true : false}
              onChange={(page) => {
                data && setPage(page * 10 - 10);
              }}
              total={
                (!data && totalCount && totalCount) || (data && data.count)
              }
              paginationProps={{
                display: "flex",
                pos: "relative",
                width: "100%",
                justifyContent: "flex-end",
                left: "50%",
                transform: "translateX(-50%)",
              }}
              activeStyles={{
                bg: "#6ac0f9",
                color: "black",
                fontWeight: "500",
              }}
              baseStyles={{ bg: "#1f2733", color: "#fff", fontWeight: "500" }}
              hoverStyles={{ bg: "#6ac0f9", color: "black", fontWeight: "500" }}
            />
          </Box>
        )}
      </Box>
    </>
  );
};
export const FavoriteAssets = (props) => {
  return (
    <>
      {props.item.assetid.map((item, i) => (
        <p>{item}</p>
      ))}
    </>
  );
};

export const SkeletonPlaceholder = () => {
  const SLIDE_COUNT = 10;
  const slides = Array.from(Array(SLIDE_COUNT).keys());
  return slides.map((index) => (
    <Tr key={index}>
      <Td
        pr="0"
        maxHeight={{ base: "70px", lg: "74px" }}
        minHeight={{ base: "70px", lg: "74px" }}
        // mt="15px"
        // mb="15px"
        // paddingTop="15px"
        // paddingBottom="15px"
      >
        <Box display="flex" alignItems="center">
          <Skeleton
            width="20px"
            mr="1rem"
            borderRadius="15px"
            height={{ base: "10.1px", lg: "11.5px" }}
            background="#515e6b"
          ></Skeleton>
          <Box display="flex" flexDirection="column" width="100%">
            <Skeleton
              // ml="1rem"
              width="20px"
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
        maxHeight={{ base: "70px", lg: "74px" }}
        minHeight={{ base: "70px", lg: "74px" }}
        // mt="15px"
        // mb="15px"
        // paddingTop="15px"
        // paddingBottom="15px"
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
        <Skeleton borderRadius="15px" height="11.5px" background="#515e6b">
          <Box width="100%" height="auto" />
        </Skeleton>
      </Td>
      <Td
        minHeight={{ base: "70px", lg: "74px" }}
        maxHeight={{ base: "70px", lg: "74px" }}
      >
        {" "}
        <Skeleton borderRadius="15px" height="11.5px" background="#515e6b">
          <Box width="100%" height="auto" />
        </Skeleton>
      </Td>
      <Td
        minHeight={{ base: "70px", lg: "74px" }}
        maxHeight={{ base: "70px", lg: "74px" }}
      >
        {" "}
        <Skeleton borderRadius="15px" height="11.5px" background="#515e6b">
          <Box width="100%" height="auto" />
        </Skeleton>
      </Td>
      <Td
        minHeight={{ base: "70px", lg: "74px" }}
        maxHeight={{ base: "70px", lg: "74px" }}
      >
        {" "}
        <Skeleton borderRadius="15px" height="11.5px" background="#515e6b">
          <Box width="100%" height="auto" />
        </Skeleton>
      </Td>
      <Td
        minHeight={{ base: "70px", lg: "74px" }}
        maxHeight={{ base: "70px", lg: "74px" }}
      >
        {" "}
        <Skeleton borderRadius="15px" height="11.5px" background="#515e6b">
          <Box width="100%" height="auto" />
        </Skeleton>
      </Td>
      <Td
        minHeight={{ base: "70px", lg: "74px" }}
        maxHeight={{ base: "70px", lg: "74px" }}
      >
        {" "}
        <Skeleton borderRadius="15px" height="11.5px" background="#515e6b">
          <Box width="100%" height="auto" />
        </Skeleton>
      </Td>
      {/* <Td
      minHeight={{ base: "70px", lg: "74px" }}
      maxHeight={{ base: "70px", lg: "74px" }}
    >
      {" "}
      <Skeleton
        borderRadius="15px"
        height="41px"
        width="130px"
        background="#515e6b"
      >
        <Box width="100%" height="auto" />
      </Skeleton>
    </Td> */}
    </Tr>
  ));
};
export const SaveIcon = ({ item, saveAsset }) => {
  const currentLocalStorage =
    localStorage.getItem("ALGOTRADE_SAVED_ASSETS") == null
      ? {}
      : JSON.parse(localStorage.getItem("ALGOTRADE_SAVED_ASSETS"));
  const [isSaved, SetAsset] = useState();
  const textColor =
    currentLocalStorage[item.asset_1_id] == undefined
      ? "#a0aec0"
      : currentLocalStorage[item.asset_1_id] != undefined && "yellow.400";

  const getAsa = () => {
    const setColor = () => {
      currentLocalStorage[item.asset_1_id] == undefined
        ? SetAsset("yellow.400")
        : SetAsset("#a0aec0");
    };
    setColor();
  };
  const clickAll = () => {
    saveAsset();
    getAsa();
  };
  return (
    <Tooltip
      pb="4.5px"
      pt="4.5px"
      // mb="-10px"
      borderRadius="7px"
      fontSize="0.83rem"
      width="auto"
      fontWeight="400"
      color="#fff"
      bg="black"
      label={"Add to Favorite list"}
      placement="top-start"
    >
      <IconButton
        key={item.asset_1_id}
        height="auto"
        onClick={clickAll}
        bg="none"
        width="14px"
        _hover={{
          bg: "none",
          // fill: textColor == "yellow.400" ? "yellow.400" : "#a0aec0",
        }}
        fill={isSaved == undefined ? textColor : isSaved}
        aria-label="Search database"
        icon={<Favorite height="auto" width="14px" />}
      />
    </Tooltip>
  );
};
export const EmptyFavoriteList = (props) => {
  return (
    <Box width="100%" height="100%" bg="#1f2733" borderRadius="8px">
      <Box
        // minHeight="83vh"
        mb="40px"
        height="400px"
        justifyContent="center"
        display="flex"
        pt="30px"
        pl="25px"
        pr="25px"
        pb="30px"
        flexDirection="column"
        alignItems="center"
      >
        <Box textAlign="center">
          <Heading fontSize={{ base: "1.6rem", lg: "2rem" }} fontWeight="600">
            Opps, no asset is found in your favorite list.
          </Heading>
          <Box
            pt="1rem"
            pb="1rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize={{ base: "0.9rem", lg: "1.1rem" }}>
              Click{" "}
              {
                <StarIcon
                  ml="3px"
                  mr="3px"
                  height="auto"
                  width={{ base: "12.5px", lg: "13.5px" }}
                  color="yellow.400"
                  mb="2px"
                />
              }{" "}
              next to assets to start viewing your favorite list.
            </Text>{" "}
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Button
            onClick={props.setIsFavorite}
            _focus="none"
            _hover="none"
            borderRadius="8px"
            mr="1rem"
            height="35px"
            bg="rgb(6, 157, 189)"
            width="100%"
            pr="15px"
            pl="15px"
            flexDirection="column"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {" "}
            <Text fontWeight="500">Take me back</Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default HomeTable;
