import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Skeleton,
  Box,
} from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/media-query";
import moment from "moment";
import dayjs from "dayjs";
const toDateStamp = (datetime) => dayjs(datetime).format("YYYY-MM-DD HH:mm:ss");

const WalletTx = ({ accountTx }) => {
  const SLIDE_COUNT = 5;
  const slides = Array.from(Array(SLIDE_COUNT).keys());
  const responsiveNumeric = useBreakpointValue({
    base: "0.9rem",
    lg: "0.87rem",
  });

  return (
    <>
      <Box pb={{ base: "94px", lg: "0" }}>
        <Table
          display={{
            base: "block",
            custom1: "inline-table",
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
                  fontSize="0.72rem"
                  justifyContent="flex-start"
                  alignItems="flex-end"
                >
                  time
                </Box>
              </Th>
              <Th lineHeight="1" _hover={{ background: "#242e3c" }}>
                <Box
                  margin="auto"
                  mr="0"
                  ml={{ base: "0", lg: "unset" }}
                  width="max-content"
                  userSelect="none"
                  display="flex"
                  fontSize="0.72rem"
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
                  fontSize="0.72rem"
                  alignItems="flex-end"
                >
                  value
                </Box>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {!accountTx
              ? slides.map((index) => (
                  <Tr key={index}>
                    <Td
                      width="215px"
                      maxHeight={{ base: "70px", lg: "80px" }}
                      minHeight={{ base: "70px", lg: "80px" }}
                    >
                      <Skeleton
                        width="85px"
                        borderRadius="15px"
                        height="11.5px"
                        background="#515e6b"
                      >
                        <Box width="100%" height="auto" />
                      </Skeleton>
                    </Td>
                    <Td
                      minHeight={{ base: "70px", lg: "80px" }}
                      maxHeight={{ base: "70px", lg: "80px" }}
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
                      pt="19px"
                      pb="19px"
                      minHeight={{ base: "70px", lg: "80px" }}
                      maxHeight={{ base: "70px", lg: "80px" }}
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
              : accountTx &&
                accountTx.results.map(
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
                              {moment(toDateStamp(item.date)).fromNow()}
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
                            justifyContent="flex-end"
                            width="max-content"
                            mr="0 !important"
                            margin="auto"
                          >
                            <Text
                              letterSpacing="0.3px"
                              fontSize={responsiveNumeric}
                              fontWeight="500"
                            >
                              {item.type == "sell"
                                ? `${item.total_price
                                    .toFixed(item.asset_2_decimals)
                                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")} ${
                                    item.asset_2_name
                                  }`
                                : `${item.total_price
                                    .toFixed(item.asset_1_decimals)
                                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")} ${
                                    item.asset_1_name
                                  }`}
                            </Text>
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

export default WalletTx;
