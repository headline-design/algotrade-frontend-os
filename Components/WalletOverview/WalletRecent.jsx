import { useState, useMemo, useContext } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Link,
  Skeleton,
  Box,
} from "@chakra-ui/react";
import { GetAccountAllTx, GetAccountPool } from "../../lib/CustomSWR";
import { useBreakpointValue } from "@chakra-ui/media-query";
import TruncateString from "../../utils/truncateString";
import TxFilter from "./Recent/Filter";
import NextLink from "next/link";
import { AddressContext } from "../../pages/_app";
import Pagination from "@choc-ui/paginator";
import moment from "moment";
import dayjs from "dayjs";
const toDateStamp = (datetime) => dayjs(datetime).format("YYYY-MM-DD HH:mm:ss");

const WalletRecent = () => {
  const [showDate, setShowDate] = useState(false);
  const userAddress = useContext(AddressContext);
  const responsiveNumeric = useBreakpointValue({
    base: "0.85rem",
    lg: "0.87rem",
  });
  const [page, setPage] = useState(0);
  const [sort_by, setSort] = useState("date");
  const [order, setOrder] = useState("desc");
  const [asset, setAsset] = useState(0);
  const { data: qqq } = GetAccountAllTx(
    userAddress,
    asset,
    page,
    sort_by,
    order
  );
  const { data: accountPool } = GetAccountPool(userAddress);
  const [totalCount, setTotalCount] = useState();
  useMemo(() => {
    qqq && totalCount == undefined && setTotalCount(qqq.count);
    qqq && qqq.count && setTotalCount(qqq.count);
  }, [totalCount, qqq]);
  const SLIDE_COUNT =
    (qqq && qqq.count > 10 && 10) ||
    (totalCount && totalCount > 10 && 10) ||
    10;
  const slides = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <>
      <Box pb={{ base: "94px", lg: "0" }} width="100%">
        <TxFilter
          showDate={showDate}
          setShowDate={setShowDate}
          pool={accountPool}
          setAsset={setAsset}
          asset={asset}
          setPage={setPage}
        />
        <Table
          display={{
            base: "block",
            zz: !qqq && "inline-table",
            llg: "inline-table",
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
                  fontSize={{ base: "0.65rem", lg: "0.7rem" }}
                  justifyContent="flex-start"
                  alignItems="flex-end"
                >
                  Date
                </Box>
              </Th>
              <Th lineHeight="1" _hover={{ background: "#242e3c" }}>
                <Box
                  margin="auto"
                  ml="0"
                  width="max-content"
                  userSelect="none"
                  display="flex"
                  fontSize={{ base: "0.65rem", lg: "0.7rem" }}
                >
                  type
                </Box>
              </Th>
              <Th lineHeight="1" isNumeric _hover={{ background: "#242e3c" }}>
                <Box
                  margin="auto"
                  mr="0"
                  userSelect="none"
                  width="max-content"
                  display="flex"
                  justifyContent="flex-end"
                  fontSize={{ base: "0.65rem", lg: "0.7rem" }}
                  alignItems="flex-end"
                >
                  Amount
                </Box>
              </Th>
              <Th lineHeight="1" isNumeric _hover={{ background: "#242e3c" }}>
                <Box
                  margin="auto"
                  mr="0"
                  userSelect="none"
                  width="max-content"
                  display="flex"
                  justifyContent="flex-end"
                  fontSize={{ base: "0.65rem", lg: "0.7rem" }}
                  alignItems="flex-end"
                >
                  Amount
                </Box>
              </Th>
              <Th lineHeight="1" isNumeric _hover={{ background: "#242e3c" }}>
                <Box
                  margin="auto"
                  mr="0"
                  userSelect="none"
                  width="max-content"
                  display="flex"
                  justifyContent="flex-end"
                  fontSize={{ base: "0.65rem", lg: "0.7rem" }}
                  alignItems="flex-end"
                >
                  Value
                </Box>
              </Th>
              <Th lineHeight="1" isNumeric _hover={{ background: "#242e3c" }}>
                <Box
                  margin="auto"
                  mr="0"
                  userSelect="none"
                  width="max-content"
                  display="flex"
                  justifyContent="flex-end"
                  fontSize={{ base: "0.65rem", lg: "0.7rem" }}
                  alignItems="flex-end"
                >
                  TxID
                </Box>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {!qqq
              ? slides.map((index) => (
                  <Tr key={index}>
                    <Td maxH="52px" width="165px" margin="auto">
                      <Box display="flex" alignItems="center">
                        <Box
                          display="flex"
                          flexDirection="column"
                          justifyContent="flex-start"
                        >
                          <Skeleton
                            width="83px"
                            margin="auto"
                            maxWidth={showDate == false ? "82px" : "203px"}
                            borderRadius="15"
                            mt="4px"
                            mb="4px"
                            height={{
                              base: "11px",
                              sm: "11.9px",
                              custom1: "11px",
                              lg: "11px",
                            }}
                            background="#515e6b"
                          >
                            <Box width="auto" height="auto" />
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
                  </Tr>
                ))
              : qqq &&
                qqq.results.map(
                  (item, i) =>
                    item.amount != 0 && (
                      <Tr key={i} _hover={{ background: "#242e3c" }}>
                        <Td borderBottom="none" className="lol">
                          <Box
                            display="flex"
                            alignItems="center"
                            width="max-content"
                            justifyContent="flex-end"
                          >
                            <Text
                              letterSpacing="0.3px"
                              fontSize={responsiveNumeric}
                              fontWeight="500"
                            >
                              {showDate == false
                                ? moment(toDateStamp(item.date)).fromNow()
                                : moment(toDateStamp(item.date)).format(
                                    "MMMM Do YYYY, h:mm:ss a"
                                  )}
                            </Text>
                          </Box>
                        </Td>
                        <Td borderBottom="none">
                          <Box display="flex" alignItems="center">
                            <Box>
                              <Box display="flex" alignItems="center">
                                <Text
                                  letterSpacing="0.3px"
                                  fontSize={responsiveNumeric}
                                  fontWeight="500"
                                  color={
                                    item.type == "buy" ? "#38c9b7" : "#ed6861"
                                  }
                                >
                                  {item.type}
                                </Text>
                              </Box>
                            </Box>
                          </Box>
                        </Td>
                        <Td borderBottom="none">
                          <Box
                            display="flex"
                            alignItems="center"
                            margin="auto"
                            mr="0"
                            justifyContent="flex-end"
                            width="max-content"
                          >
                            <Text
                              letterSpacing="0.3px"
                              fontSize={responsiveNumeric}
                              fontWeight="500"
                            >
                              {`${item.amount_1
                                .toFixed(item.asset_1_decimals)
                                .replace(/\d(?=(\d{3})+\.)/g, "$&,")} ${
                                item.asset_1_name
                              }`}
                            </Text>
                          </Box>
                        </Td>
                        <Td borderBottom="none">
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-end"
                            width="max-content"
                            margin="auto"
                            mr="0"
                          >
                            <Text
                              letterSpacing="0.3px"
                              fontSize={responsiveNumeric}
                              fontWeight="500"
                            >
                              {`${item.amount_2
                                .toFixed(item.asset_2_decimals)
                                .replace(/\d(?=(\d{3})+\.)/g, "$&,")} ${
                                item.asset_2_name
                              }`}
                            </Text>
                          </Box>
                        </Td>
                        <Td borderBottom="none">
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-end"
                            margin="auto"
                            mr="0"
                            width="max-content"
                          >
                            <Text
                              letterSpacing="0.3px"
                              fontSize={responsiveNumeric}
                              fontWeight="500"
                            >
                              {`${item.total_price
                                .toFixed(item.asset_2_decimals)
                                .replace(/\d(?=(\d{3})+\.)/g, "$&,")} ALGO`}
                            </Text>
                          </Box>
                        </Td>
                        <Td borderBottom="none">
                          <NextLink
                            href={`https://algoexplorer.io/tx/group/${encodeURIComponent(
                              item.group_id
                            )}`}
                            passHref
                          >
                            <Link
                              isExternal="true"
                              _focus="none"
                              textDecoration="none"
                              _hover="none"
                              margin="auto"
                              mr="0"
                              display="flex"
                              alignItems="center"
                              justifyContent="flex-end"
                              width="max-content"
                            >
                              <Text
                                letterSpacing="0.3px"
                                color="#00d3ff"
                                fontSize={responsiveNumeric}
                                fontWeight="500"
                              >
                                {TruncateString(item.group_id, 17)}
                              </Text>
                            </Link>
                          </NextLink>
                        </Td>
                      </Tr>
                    )
                )}
          </Tbody>
        </Table>
        <Box mb="40px" mt="20px" pl="0" pr="0">
          <Pagination
            current={page / 10 + 1}
            disabled={!qqq ? true : false}
            onChange={(page) => {
              qqq && setPage(page * 10 - 10);
            }}
            total={(!qqq && totalCount && totalCount) || (qqq && qqq.count)}
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
      </Box>
    </>
  );
};

export default WalletRecent;
