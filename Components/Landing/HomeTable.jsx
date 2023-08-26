import React, { useState } from "react";
import {
  Button,
  Table,
  Thead,
  Tbody,
  Heading,
  Tr,
  Th,
  Td,
  Text,
  Skeleton,
  Link,
  SkeletonCircle,
  Tooltip,
  Box,
} from "@chakra-ui/react";
import { ChevronRightIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { GetTable } from "../../lib/CustomSWR";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { AlgoSvg, UsdIcon, VerifiedIcon } from "../Icons/Icons";
import ImageWithFallback from "../Image/nextImage";
import LandingPanel from "./LandingPanel";

const HomeTable = () => {
  const SLIDE_COUNT = 5;
  const slides = Array.from(Array(SLIDE_COUNT).keys());
  const responsiveImg = useBreakpointValue({ base: 32, lg: 36, llg: 42 });
  const responsiveImgw = useBreakpointValue({ base: "38px", lg: "42px" });
  const responsiveFont = useBreakpointValue({
    base: "0.9rem",
    lg: "0.97rem",
    llg: "1.05rem",
  });
  const responsiveNumeric = useBreakpointValue({
    base: "0.8rem",
    lg: "0.9rem",
    llg: "0.97rem",
  });
  const responsiveText = useBreakpointValue({
    base: "0.75rem",
    lg: "0.83rem",
    llg: "0.85rem",
  });
  const [page, setPage] = useState(0);
  const [sort_by, setSort] = useState("liquidity");
  const [liquidity, setLiquidity] = useState("true");
  const [verified, setVerified] = useState("true");
  const [order, setOrder] = useState("desc");
  const [algoUsd, setAlgoUsd] = useState("algo");
  const ASSET_LOGO_BASE_URL = "https://mainnet-asa.algotrade.net/assets";
  const { data, error } = GetTable(page, sort_by, order, verified, liquidity);

  return (
    <>
      <Box as="section" id="live-data">
        <LandingPanel>
          <Box
            pb={{ base: "94px", lg: "80px" }}
            pt={{
              base: "40px",
              custom: "40px",
              zz: "50px",
              lg: "80px",
              xl: "60px",
            }}
          >
            <Box width="100%">
              <Box
                mb={{ base: "5px", custom: "10px", zz: "", lg: "13px" }}
                width="100%"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Heading as="h2" fontSize={{ base: "1.4rem", lg: "1.8rem" }}>
                  Live trend
                </Heading>
              </Box>
            </Box>
            <Table
              display={{ base: "block", lg: "inline-table" }}
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
                    padding="0 1.2rem"
                    lineHeight="1"
                    _hover={{
                      borderTopLeftRadius: "0.5rem",
                      background: "#242e3c",
                    }}
                  >
                    <Box
                      width="max-content"
                      userSelect="none"
                      textTransform="capitalize"
                      display="flex"
                      justifyContent="flex-start"
                      alignItems="flex-end"
                    >
                      Asset
                    </Box>
                  </Th>
                  <Th
                    padding={{ base: "0" }}
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
                      textTransform="capitalize"
                      justifyContent="flex-end"
                      alignItems="flex-end"
                    >
                      Price
                    </Box>
                  </Th>
                  <Th
                    // paddingRight="1.2rem"
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
                      justifyContent="flex-end"
                      alignItems="flex-end"
                      textTransform="capitalize"
                    >
                      24h
                    </Box>
                  </Th>
                  <Th
                    // paddingRight="1.2rem"
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
                      justifyContent="flex-end"
                      alignItems="flex-end"
                      textTransform="capitalize"
                    >
                      Volume
                    </Box>
                  </Th>
                  <Th
                    // paddingRight="1.2rem"
                    lineHeight="1"
                    isNumeric
                    _hover={{ background: "#242e3c" }}
                  >
                    <Box
                      margin="auto"
                      // mr="0"
                      userSelect="none"
                      // width="max-content"
                      display="flex"
                      justifyContent="flex-end"
                      alignItems="flex-end"
                      textTransform="capitalize"
                    >
                      Market Cap
                    </Box>
                  </Th>
                  <Th
                    // paddingRight="1.2rem"
                    lineHeight="1"
                    isNumeric
                    _hover={{ background: "#242e3c" }}
                  >
                    <Box
                      margin="auto"
                      mr="0"
                      userSelect="none"
                      // width="max-content"
                      display="flex"
                      justifyContent="flex-end"
                      alignItems="flex-end"
                      textTransform="capitalize"
                    >
                      Liquidity
                    </Box>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {!data
                  ? slides.map((index) => (
                      <Tr key={index}>
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
                            <Box
                              display="flex"
                              flexDirection="column"
                              width="100%"
                            >
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
                  : data.results.slice(0, 5).map((item, i) => (
                      <Tr
                        key={item.asset_1_id}
                        _hover={{ background: "#242e3c" }}
                      >
                        <Td
                          mt={i == 0 && "7px"}
                          pt={{ base: "7px", lg: "15px" }}
                          pb={{ base: "7px", lg: "15px" }}
                          paddingLeft="1.2rem"
                          borderBottom="none"
                          className="lol"
                          pr="10px"
                        >
                          <Box
                            minW="max-content"
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
                                className="imgBorder"
                                key={`${item.asset_1_id}`}
                                src={`${ASSET_LOGO_BASE_URL}/${item.asset_1_id}/icon.png`}
                                width={responsiveImg}
                                height={responsiveImg}
                              />
                            </Box>
                            <Box paddingLeft="0.3rem">
                              <Box display="flex" alignItems="baseline">
                                <Heading
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
                                      width={{ base: "12px" }}
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
                          </Box>
                        </Td>
                        <Td borderBottom="none" padding="0">
                          <Box
                            paddingLeft="0.7rem"
                            display="flex"
                            alignItems="baseline"
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
                                w={{ base: "9px", lg: "10.5px", llg: "12px" }}
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
                            paddingLeft="0.3rem"
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-end"
                          >
                            <Text
                              letterSpacing="0.3px"
                              color={
                                item.percentage_diff
                                  .toFixed(2)
                                  .replace(/\d(?=(\d{3})+\.)/g, "$&,") < 0
                                  ? "#ff6c4c"
                                  : "#19bd78"
                              }
                              fontSize={responsiveNumeric}
                              fontWeight="500"
                            >
                              {item.percentage_diff
                                ? `${
                                    item.percentage_diff < 0
                                      ? "-" +
                                        item.percentage_diff
                                          .toFixed(2)
                                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                                          .split("-")[1]
                                      : "+" +
                                        item.percentage_diff
                                          .toFixed(2)
                                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                                  }%`
                                : "0.00%"}
                            </Text>
                          </Box>
                        </Td>
                        <Td borderBottom="none" pl="0">
                          <Box
                            // paddingLeft="0.3rem"
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-end"
                          >
                            <AlgoSvg
                              fill="white"
                              w={{ base: "9px", lg: "10.5px", llg: "12px" }}
                              height="auto"
                            />
                            <Text
                              paddingLeft="0.35rem"
                              letterSpacing="0.3px"
                              fontSize={responsiveNumeric}
                              fontWeight="500"
                            >
                              {item.volume
                                .toFixed(2)
                                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                            </Text>
                          </Box>
                        </Td>
                        <Td borderBottom="none" pl="0">
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-end"
                          >
                            <AlgoSvg
                              fill="white"
                              w={{ base: "9px", lg: "10.5px", llg: "12px" }}
                              height="auto"
                            />
                            <Text
                              paddingLeft="0.35rem"
                              letterSpacing="0.3px"
                              fontSize={responsiveNumeric}
                              fontWeight="500"
                            >
                              {item.market_cap
                                .toFixed(2)
                                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                            </Text>
                          </Box>
                        </Td>
                        <Td borderBottom="none" pl="0">
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-end"
                          >
                            <AlgoSvg
                              fill="white"
                              w={{ base: "9px", lg: "10.5px", llg: "12px" }}
                              height="auto"
                            />
                            <Text
                              paddingLeft="0.35rem"
                              letterSpacing="0.3px"
                              fontSize={responsiveNumeric}
                              fontWeight="500"
                            >
                              {item.liquidity
                                .toFixed(2)
                                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                            </Text>
                          </Box>
                        </Td>
                      </Tr>
                    ))}
              </Tbody>
            </Table>
            <Box pt={{ base: "10px", lg: "15px" }}>
              <Button
                as={Link}
                _focus={{ boxShadow: "none" }}
                _active="none"
                fontWeight="600"
                isExternal
                href="/"
                // width="100%"
                fontSize={{ base: "0.85rem", lg: "0.95rem" }}
                height={{ base: "32px", lg: "35px" }}
                lineHeight="1"
                margin="auto"
                pb={{ lg: "1px" }}
                textDecoration="none"
                _hover={{ textDecoration: "none" }}
                bg="#069dbd"
                // onClick={onOpen}
                // mt={trueWidth == true && "17px"}
                // mb={trueWidth == true && "7px"}
                // width={trueWidth == true && "100%"}
              >
                View more
                <ExternalLinkIcon ml="4px" h="auto" w="12.5px" />
              </Button>
            </Box>
          </Box>
        </LandingPanel>
      </Box>
    </>
  );
};

export default HomeTable;
