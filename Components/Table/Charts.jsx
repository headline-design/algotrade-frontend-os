import React, { useEffect, useState, useMemo, useContext } from "react";
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
  Skeleton,
  Box,
  Tooltip,
} from "@chakra-ui/react";
import { UpDownIcon } from "@chakra-ui/icons";
import useSWR from "swr";
import { AlgoSvg, UsdIcon } from "../Icons/Icons";
import ImageWithFallback from "../Image/nextImage";
import { GetTxTable, GetTxTableAcc, GetAlgo } from "../../lib/CustomSWR";
import dayjs from "dayjs";
import TruncateString from "../../utils/truncateString";
import { AddressContext, Default_Currency } from "../../pages/_app";
import { useRouter } from "next/router";
import { useSWRFetcher } from "../../utils/fetcher";
import NextLink from "next/link";
import moment from "moment";
import TxFilter from "./TxFilter";
import Pagination from "@choc-ui/paginator";

const toDateStamp = (datetime) => dayjs(datetime).format("YYYY-MM-DD HH:mm:ss");
const Tx = ({ pid, PingPong, pairs }) => {
  function getKeyByValuee(object, value) {
    return Object.keys(object).find((key) => object[key]["pool_id"] === value);
  }
  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key]["asset-id"] === value);
  }
  const router = useRouter();

  const account = useContext(AddressContext);
  const defaultCurrency = useContext(Default_Currency);

  const [showDate, setShowDate] = useState(false);
  const [myOrder, setMyorder] = useState(false);

  const SLIDE_COUNT = 10;
  const slides = Array.from(Array(SLIDE_COUNT).keys());
  const [page, setPage] = useState(0);
  const [sort_by, setSort] = useState("date");
  const [order, setOrder] = useState("desc");
  const { data, error } =
    myOrder == false
      ? GetTxTable(
          pid[0],
          router.asPath.includes("pool") != true
            ? pid[0].pool_id
            : router.asPath.split("pool=")[1],
          page,
          sort_by,
          order
        )
      : GetTxTableAcc(pid[0], pid[0].pool_id, page, sort_by, order, account);
  const [totalCount, setTotalCount] = useState();
  useMemo(() => {
    data && totalCount == undefined && setTotalCount(data.count);
    (data && data.count > totalCount && setTotalCount(data.count)) ||
      (data && data.count < totalCount && setTotalCount(data.count));
  }, [totalCount, data]);

  // useEffect(() => {
  //   console.log(defaultCurrencyRef.current);
  //   window.addEventListener('storage', handleChangeStorage);
  //   return () => window.removeEventListener('storage', handleChangeStorage);
  // }, [
  //   typeof window != "undefined" && localStorage.getItem("default_currency"),
  // ]);
  // console.log(defaultCurrencyRef.current);
  const { data: newTx, error: rror } = useSWR(
    () =>
      page != 0 ||
      myOrder == true ||
      (page == 0 && sort_by != "date") ||
      (page == 0 && order != "desc")
        ? [
            `https://api.algotrade.net/live-trades/${
              router.asPath.includes("pool") != true
                ? pid[0] && pid[0].pool_id
                : router.asPath.split("pool=")[1]
            }?limit=10&offset=0&sort_by=date&order=desc`,
            process.env.live,
          ]
        : null,
    useSWRFetcher,
    {
      refreshInterval: 8800,
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );
  const { data: price } = GetAlgo("latest");
  const algoPrice =
    price &&
    price[price.length - 1].close_price
      .toFixed(4)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");

  useEffect(() => {
    if (myOrder == false && sort_by == "date" && order == "desc") {
      PingPong(page == 0 ? data : newTx);
    }
    if (newTx && myOrder == true) {
      PingPong(newTx);
    }
  }, [data, newTx]);

  const setPool = (t) => {
    const poolTable = () => {
      setMyorder(false);
      setSort("date");
      setOrder("desc");
      setPage(0);
    };
    const accTable = () => {
      setMyorder(true);
      setSort("date");
      setOrder("desc");
      setPage(0);
    };
    if (myOrder == true && t == "pool") {
      return poolTable();
    }
    if (myOrder == false && t == "acc") {
      return accTable();
    }
    return;
  };
  return (
    <>
      <Box pb={{ base: "120px", lg: "unset" }}>
        <Box width="100%" mt="40px" display="flex" alignItems="center">
          <Box
            pr="24px"
            pl="24px"
            pt="17px"
            bg="#1f2733"
            width="100%"
            display="flex"
            pb="10px"
            justifyContent="space-between"
            alignItems="center"
            mb="-6px"
          >
            <Box display="flex" alignItems="center">
              <Box
                cursor="pointer"
                userSelect="none"
                onClick={() => setPool("pool")}
              >
                <Heading
                  fontWeight={myOrder == false ? "600" : "500"}
                  as="h2"
                  fontSize="0.93rem"
                  mb="3px"
                  color={myOrder == false ? "whiteAlpha.800" : "#a0aec0"}
                >
                  Trade History
                </Heading>
                <Box
                  margin="auto"
                  width="40%"
                  borderBottom={
                    myOrder == false
                      ? "2px solid rgb(6, 157, 189)"
                      : "2px solid rgb(255 255 255 / 0%)"
                  }
                ></Box>
              </Box>
              {account == false && (
                <Tooltip
                  placement="bottom-start"
                  fontWeight="500"
                  borderRadius="7px"
                  bg="#2d3b50"
                  paddingLeft="10px"
                  paddingRight="10px"
                  pt="7px"
                  pb="7px"
                  color="white"
                  label="Connect your wallet to view."
                  aria-label="my-orders"
                >
                  <Box ml="20px" cursor="not-allowed" userSelect="none">
                    <Heading
                      fontWeight={myOrder == true ? "600" : "500"}
                      as="h2"
                      fontSize="0.93rem"
                      mb="3px"
                      color={myOrder == true ? "whiteAlpha.800" : "#a0aec0"}
                    >
                      My Swaps
                    </Heading>
                    <Box
                      ml="20px"
                      margin="auto"
                      width="40%"
                      borderBottom={
                        myOrder == true
                          ? "2px solid rgb(6, 157, 189)"
                          : "2px solid rgb(255 255 255 / 0%)"
                      }
                    ></Box>
                  </Box>
                </Tooltip>
              )}{" "}
              {account != false && (
                <Box
                  ml="20px"
                  cursor="pointer"
                  userSelect="none"
                  onClick={() => setPool("acc")}
                >
                  <Heading
                    fontWeight={myOrder == true ? "600" : "500"}
                    as="h2"
                    fontSize="0.93rem"
                    mb="3px"
                    color={myOrder == true ? "whiteAlpha.800" : "#a0aec0"}
                  >
                    My Swaps
                  </Heading>
                  <Box
                    ml="20px"
                    margin="auto"
                    width="40%"
                    borderBottom={
                      myOrder == true
                        ? "2px solid rgb(6, 157, 189)"
                        : "2px solid rgb(255 255 255 / 0%)"
                    }
                  ></Box>
                </Box>
              )}
            </Box>
            <TxFilter showDate={showDate} setShowDate={setShowDate} />
            {/* <Box
              display="flex"
              alignItems="center"
              pb="0.5px"
              width="max-content"
            >
              <Radio
                borderColor="#5d6a7b"
                css={{
                  width: "0.65rem",
                  height: "0.65rem",
                }}
                // width="0.75rem"
                // height="0.7rem"
                onClick={() => setShowDate(showDate == false ? true : false)}
                _focus={{ boxShadow: "none" }}
                isChecked={showDate == false ? false : true}
                value="2"
              >
                <FormLabel
                  ml="-3px !important"
                  color="#a0aec0"
                  fontSize="0.88rem"
                  fontWeight="400"
                  cursor="pointer"
                  margin="0"
                  onClick={() => setShowDate(showDate == false ? true : false)}
                >
                  Show date
                </FormLabel>
              </Radio>
            </Box> */}
          </Box>
        </Box>
        <Table
          borderTopLeftRadius="0 !important"
          borderTopRightRadius="0 !important"
          display={{ base: "block", xl: "inline-table" }}
          overflow="auto"
          maxW="100%"
          shadow="base"
          rounded="lg"
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
              height: "10px",
              background: "#242e3c",
            },

            "&::-webkit-scrollbar-thumb": {
              width: "4px",
              // height: "30px",
              background: "#1A202C",
              borderRadius: "8px",
            },
          }}
          bg="#1f2733"
          borderColor="#1f2733"
        >
          <Thead>
            <Tr>
              <Th lineHeight="1">
                <Box
                  width="max-content"
                  fontSize="0.7rem"
                  userSelect="none"
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="flex-end"
                >
                  DATE
                  <Box
                    ml="4px"
                    cursor="pointer"
                    onClick={() => {
                      setSort("date");
                      setOrder(order == "desc" ? "asc" : "desc");
                    }}
                  >
                    <UpDownIcon />
                  </Box>
                </Box>
              </Th>
              <Th lineHeight="1">
                <Box
                  width="max-content"
                  fontSize="0.7rem"
                  userSelect="none"
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="flex-end"
                >
                  TYPE
                  <Box
                    ml="4px"
                    cursor="pointer"
                    onClick={() => {
                      setSort("type");
                      setOrder(order == "desc" ? "asc" : "desc");
                    }}
                  >
                    <UpDownIcon />
                  </Box>
                </Box>
              </Th>

              <Th lineHeight="1" isNumeric>
                <Box
                  width="max-content"
                  fontSize="0.7rem"
                  userSelect="none"
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="flex-end"
                >
                  {pid[0] && pid[0].asset_1_name} AMOUNT
                  <Box
                    ml="4px"
                    cursor="pointer"
                    onClick={() => {
                      setSort("amount_1");
                      setOrder(order == "desc" ? "asc" : "desc");
                    }}
                  >
                    <UpDownIcon />
                  </Box>
                </Box>
              </Th>
              <Th lineHeight="1" isNumeric>
                <Box
                  width="max-content"
                  fontSize="0.7rem"
                  userSelect="none"
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="flex-end"
                >
                  {router.asPath.includes("pool") != true
                    ? pid[0] && pid[0].asset_2_name
                    : router.asPath.includes("pool") == true &&
                      router.asPath.split("pool=")[1] == pid[0].pool_id
                    ? pid[0] && pid[0].asset_2_name
                    : router.asPath.includes("pool") == true &&
                      router.asPath.split("pool=")[1] != pid[0].pool_id &&
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
                  AMOUNT
                  <Box
                    ml="4px"
                    cursor="pointer"
                    onClick={() => {
                      setSort("amount_2");
                      setOrder(order == "desc" ? "asc" : "desc");
                    }}
                  >
                    <UpDownIcon />
                  </Box>
                </Box>
              </Th>

              <Th lineHeight="1" isNumeric>
                <Box
                  width="max-content"
                  fontSize="0.7rem"
                  userSelect="none"
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="flex-end"
                >
                  TOTAL PRICE
                  <Box
                    ml="4px"
                    cursor="pointer"
                    onClick={() => {
                      setSort("total_price");
                      setOrder(order == "desc" ? "asc" : "desc");
                    }}
                  >
                    <UpDownIcon />
                  </Box>
                </Box>
              </Th>
              <Th lineHeight="1" isNumeric>
                <Box
                  width="max-content"
                  fontSize="0.7rem"
                  userSelect="none"
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="flex-end"
                >
                  Address
                  <Box
                    ml="4px"
                    cursor="pointer"
                    onClick={() => {
                      setSort("address");
                      setOrder(order == "desc" ? "asc" : "desc");
                    }}
                  >
                    <UpDownIcon />
                  </Box>
                </Box>
              </Th>
              <Th lineHeight="1" isNumeric>
                <Box
                  width="max-content"
                  fontSize="0.7rem"
                  userSelect="none"
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="flex-end"
                >
                  Others
                </Box>
              </Th>
            </Tr>
          </Thead>
          {!data && (
            <Tbody>
              {slides.map((index) => (
                <Tr key={index}>
                  <Td maxH="52px">
                    <Box display="flex" alignItems="center">
                      <Box display="flex" flexDirection="column" width="100%">
                        <Skeleton
                          width="170px"
                          borderRadius="15"
                          mt="4px"
                          mb="4px"
                          height={{ base: "11px" }}
                          background="#515e6b"
                        >
                          <Box width="100%" height="auto" />
                        </Skeleton>
                      </Box>
                    </Box>
                  </Td>
                  <Td maxH="52px">
                    <Skeleton
                      mt="4px"
                      mb="4px"
                      borderRadius="15px"
                      height={{ base: "11px" }}
                      background="#515e6b"
                    >
                      <Box width="100%" height="auto" />
                    </Skeleton>
                  </Td>
                  <Td maxH="52px">
                    <Skeleton
                      mt="4px"
                      mb="4px"
                      borderRadius="15px"
                      height={{ base: "11px" }}
                      background="#515e6b"
                    >
                      <Box width="100%" height="auto" />
                    </Skeleton>
                  </Td>
                  <Td maxH="52px">
                    <Skeleton
                      mt="4px"
                      mb="4px"
                      borderRadius="15px"
                      height={{ base: "11px" }}
                      background="#515e6b"
                    >
                      <Box width="100%" height="auto" />
                    </Skeleton>
                  </Td>
                  <Td maxH="52px">
                    <Skeleton
                      mt="4px"
                      mb="4px"
                      borderRadius="15px"
                      height={{ base: "11px" }}
                      background="#515e6b"
                    >
                      <Box width="100%" height="auto" />
                    </Skeleton>
                  </Td>
                  <Td maxH="52px">
                    <Skeleton
                      borderRadius="15px"
                      height={{ base: "11px" }}
                      background="#515e6b"
                    >
                      <Box width="100%" height="auto" />
                    </Skeleton>
                  </Td>
                  <Td maxH="52px">
                    <Skeleton
                      borderRadius="15px"
                      height={{ base: "11px" }}
                      background="#515e6b"
                    >
                      <Box width="100%" height="auto" />
                    </Skeleton>
                  </Td>
                  <Td maxH="52px">
                    <Skeleton
                      mt="4px"
                      mb="4px"
                      borderRadius="15px"
                      height={{ base: "11px" }}
                      background="#515e6b"
                    >
                      <Box width="100%" height="auto" />
                    </Skeleton>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          )}
          <Tbody>
            {data &&
              data.results != undefined &&
              data.results.map((item, index) => (
                <Tr key={index} _hover={{ background: "#242e3c" }}>
                  <Td borderBottom="none" className="lol">
                    <Box display="flex" alignItems="center" minW="160px">
                      <Text fontSize="0.85rem" fontWeight="500">
                        {showDate == false
                          ? moment(toDateStamp(item.date)).fromNow()
                          : moment(toDateStamp(item.date))}
                      </Text>
                    </Box>
                  </Td>
                  <Td borderBottom="none">
                    <Box
                      minW="max-content"
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <Text
                        fontSize="0.85rem"
                        fontWeight="600"
                        color={item.type == "buy" ? "#38c9b7" : "#ed6861"}
                      >
                        {item.type}
                      </Text>
                      <Box paddingLeft="0.35rem">
                        <Box display="flex" alignItems="center">
                          {/* <Text letterSpacing="0.3px" fontSize="1rem" fontWeight="600">
                          {
                            item.current_price && algoUsd != 'usd' ? item.current_price.toFixed(8).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                              :
                              (item.current_price * usd).toFixed(8).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                          }
                        </Text> */}
                        </Box>
                      </Box>
                    </Box>
                  </Td>

                  <Td borderBottom="none">
                    <Box
                      minW="max-content"
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <Text
                        letterSpacing="0.3px"
                        paddingRight="0.35rem"
                        fontSize="0.85rem"
                        fontWeight="500"
                      >
                        {item.amount_1}
                      </Text>
                      <Box>
                        {/* <Box display="flex" alignItems="center">
                        {getPercentageChange(item.current_price, item.current_price - item.last_24h) < 0 ? <Algorand h="auto" w="14.5px" /> : <Algorandd h="auto" w="14.5px" />}
                      </Box> */}
                      </Box>
                    </Box>
                  </Td>
                  <Td borderBottom="none">
                    <Box
                      minW="max-content"
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      {/* 
                    {algoUsd == 'usd' ?
                      <UsdIcon fill="white" w="8px" height="auto" />
                      :
                      <AlgoSvg fill="white" w="12px" height="auto" />
                    } */}

                      <Box display="flex" alignItems="center">
                        {router.asPath.includes("pool") != true ? (
                          <AlgoSvg fill="white" height="auto" width="10px" />
                        ) : (
                          router.asPath.includes("pool") == true &&
                          router.asPath.split("pool=")[1] == pid[0].pool_id && (
                            <AlgoSvg fill="white" height="auto" width="10px" />
                          )
                        )}

                        <Text
                          ml="3px"
                          letterSpacing="0.3px"
                          paddingRight="0.35rem"
                          fontSize="0.85rem"
                          fontWeight="500"
                        >
                          {item.amount_2}
                        </Text>
                      </Box>
                    </Box>
                  </Td>

                  <Td borderBottom="none">
                    <Box
                      minW="max-content"
                      borderBottom="none"
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      {/* {algoUsd == 'usd' ?
                      <UsdIcon fill="white" w="8px" height="auto" />
                      :
                      <AlgoSvg fill="white" w="12px" height="auto" />
                    }  */}

                      <Box display="flex" alignItems="center">
                        {router.asPath.includes("pool") != true ? (
                          defaultCurrency.defaultCurrency == "usd" ? (
                            <UsdIcon
                              fill="white"
                              w={{ base: "6.4px", lg: "8px" }}
                              height="auto"
                            />
                          ) : (
                            <AlgoSvg fill="white" height="auto" width="10px" />
                          )
                        ) : (
                          router.asPath.includes("pool") == true &&
                          router.asPath.split("pool=")[1] == pid[0].pool_id &&
                          (defaultCurrency.defaultCurrency == "usd" ? (
                            <UsdIcon
                              fill="white"
                              w={{ base: "6.4px", lg: "8px" }}
                              height="auto"
                            />
                          ) : (
                            defaultCurrency.defaultCurrency == "algo" && (
                              <AlgoSvg
                                fill="white"
                                height="auto"
                                width="10px"
                              />
                            )
                          ))
                        )}
                        <Text
                          ml="3px"
                          letterSpacing="0.3px"
                          fontSize="0.85rem"
                          fontWeight="500"
                        >
                          {router.asPath.includes("pool") != true
                            ? defaultCurrency.defaultCurrency == "usd"
                              ? (item.total_price * algoPrice)
                                  .toFixed(8)
                                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                              : item.total_price
                                  .toFixed(8)
                                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                            : router.asPath.includes("pool") == true &&
                              router.asPath.split("pool=")[1] == pid[0].pool_id
                            ? defaultCurrency.defaultCurrency == "usd"
                              ? (item.total_price * algoPrice)
                                  .toFixed(8)
                                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                              : item.total_price
                                  .toFixed(8)
                                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                            : router.asPath.includes("pool") == true &&
                              router.asPath.split("pool=")[1] !=
                                pid[0].pool_id &&
                              item.total_price
                                .toFixed(8)
                                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                        </Text>
                      </Box>
                    </Box>
                  </Td>
                  <Td borderBottom="none">
                    <Box
                      minW="max-content"
                      borderBottom="none"
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      {/* {algoUsd == 'usd' ?
                      <UsdIcon fill="white" w="8px" height="auto" />
                      :
                      <AlgoSvg fill="white" w="12px" height="auto" />
                    }  */}

                      <Box display="flex" alignItems="center">
                        <NextLink
                          href={`https://algoexplorer.io/address/${encodeURIComponent(
                            item.address
                          )}`}
                          passHref
                        >
                          <Link
                            mr="7px"
                            isExternal="true"
                            _focus="none"
                            display="flex"
                            alignItems="center"
                            textDecoration="none"
                            _hover="none"
                          >
                            <Tooltip
                              textTransform="capitalize"
                              pt="5px"
                              pb="5px"
                              fontWeight="500"
                              color="#fff"
                              bg="var(--chakra-colors-gray-800)"
                              label={`${item.address}`}
                              placement="top"
                            >
                              <Text
                                textTransform="capitalize"
                                color="#00d3ff"
                                cursor="pointer"
                                ml="3px"
                                letterSpacing="0.3px"
                                fontSize="0.8rem"
                                fontWeight="500"
                              >
                                {TruncateString(item.address, 12)}
                              </Text>
                            </Tooltip>
                          </Link>
                        </NextLink>
                      </Box>
                    </Box>
                  </Td>
                  <Td borderBottom="none">
                    <Box
                      minW="max-content"
                      borderBottom="none"
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      {/* {algoUsd == 'usd' ?
                      <UsdIcon fill="white" w="8px" height="auto" />
                      :
                      <AlgoSvg fill="white" w="12px" height="auto" />
                    }  */}

                      <Box display="flex" alignItems="center">
                        <NextLink
                          href={`https://algoexplorer.io/tx/group/${encodeURIComponent(
                            item.group_id
                          )}`}
                          passHref
                        >
                          <Link
                            mr="7px"
                            isExternal="true"
                            _focus="none"
                            display="flex"
                            alignItems="center"
                            textDecoration="none"
                            _hover="none"
                          >
                            <ImageWithFallback
                              src="/algoexplorer.png"
                              fallbackSrc="/placeholder.png"
                              width={15}
                              height={15}
                            />
                          </Link>
                        </NextLink>
                      </Box>
                    </Box>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
        <Box mb="40px" mt="20px" pl="0" pr="0">
          <Pagination
            disabled={!data ? true : false}
            current={page / 10 + 1}
            onChange={(page) => {
              data && setPage(page * 10 - 10);
            }}
            total={(!data && totalCount && totalCount) || (data && data.count)}
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
            // focusRing="#6ac0f9"
          />
        </Box>
      </Box>
    </>
  );
};

export default Tx;
