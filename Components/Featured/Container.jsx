/*eslint-disable */
// @ts-nocheck
import { useContext } from "react";
import {
  Box,
  Heading,
  Text,
  Container,
  Tooltip,
  Link,
  Stack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import ImageWithFallback from "../Image/nextImage";
import { TimeIcon } from "@chakra-ui/icons";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { AlgoSvg, UsdIcon } from "../Icons/Icons";
import { Default_Currency } from "../../pages/_app";
import axios from "axios";
import { GetAlgo } from "../../lib/CustomSWR";
import {
  UpTrend,
  Algorand,
  Algorandd,
  PopularIcon,
  SwapIcon,
  VerifiedIcon,
} from "../Icons/Icons";
import useSWR from "swr";
import Image from "next/image";

const fetcher = async (url) => await axios.get(url).then((res) => res.data);

const FeaturedContainer = (props) => {
  const ASSET_LOGO_BASE_URL = "https://mainnet-asa.algotrade.net/assets";
  const responsiveImg = useBreakpointValue({ base: 29, lg: 25 });
  const responsiveTooltip = useBreakpointValue({
    base: "top-start",
    lg: "top-start",
  });
  const { data } = useSWR(
    `https://api-test.algotrade.net/${props.api_endpoint}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  return (
    <Box width="100%">
      <Container
        maxW="100%"
        width="100%"
        height="100%"
        position="relative"
        borderRadius="8px"
        bg="#232e3e"
        paddingRight="0"
        paddingLeft="0"
      >
        <Box pr="0" pl="0">
          <Box>
            <Box padding="20px" pt="15px" pb="0">
              <Tooltip
                placement={responsiveTooltip}
                fontWeight="500"
                borderRadius="7px"
                bg="#2d3b50"
                paddingLeft="10px"
                fontSize="0.82rem"
                paddingRight="10px"
                pt="7px"
                pb="7px"
                color="white"
                label={
                  (props.title == "Biggest Gainers" &&
                    "Assets with biggest price percentage change in the last 24H.") ||
                  (props.title == "Trending" &&
                    "Amount of swaps of most traded ASAs in the last 24H.") ||
                  (props.title == "Recently Added" &&
                    "Most recent added assets in the last 24H. Always DYOR.")
                }
                aria-label="A tooltip"
              >
                <Box display="flex" alignItems="center" mb="7px">
                  <FeaturedImage title={props.title} />
                  <Box
                    ml="10px"
                    pb="3.5px"
                    borderBottom="dashed 1px"
                    borderColor="#c2ccd9"
                  >
                    {/* <Tooltip
                    placement={responsiveTooltip}
                    fontWeight="500"
                    borderRadius="7px"
                    bg="#2d3b50"
                    paddingLeft="10px"
                    paddingRight="10px"
                    pt="7px"
                    pb="7px"
                    color="white"
                    label={
                      (props.title == "Biggest Gainers" &&
                        "Assets with biggest price percentage change in the last 24H.") ||
                      (props.title == "Trending" &&
                        "Amount of swaps of most traded ASAs in the last 24H.") ||
                      (props.title == "Recently Added" &&
                      "Most recent added assets in the last 24H. Always DYOR.")
                    }
                    aria-label="A tooltip"
                  > */}
                    <Heading
                      fontSize={{ base: "0.9rem", lg: "0.83rem" }}
                      color="#c2ccd9"
                    >
                      {props.title}
                    </Heading>
                  </Box>
                </Box>
              </Tooltip>
            </Box>
            <Box>
              <Box pb="10px" pt="0">
                {data &&
                  data.results.map((card, index) => (
                    <Box
                      //   padding="20px" pb="10px" pt="0"
                      pl="20px"
                      pr="20px"
                      _hover={{ background: "#1f2733" }}
                      key={index}
                      pb="5.5px"
                      pt="5.5px"
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <Box pl="10px" pr="5px">
                        <Text fontSize="0.75rem">{index + 1}</Text>
                      </Box>
                      <Box
                        width="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <NextLink
                          prefetch={false}
                          href={`/asa/${card.asset_1_id}`}
                          passHref
                        >
                          <Link
                            _focus="none"
                            ml="10px"
                            display="flex"
                            alignItems="center"
                            textDecoration="none"
                            justifyContent="flex-start"
                            _hover="none"
                          >
                            <ImageWithFallback
                              className="imgBorder"
                              key={card.asset_1_id}
                              alt={card.name}
                              src={`${ASSET_LOGO_BASE_URL}/${card.asset_1_id}/icon.png`}
                              width={responsiveImg}
                              height={responsiveImg}
                            />
                            <Box paddingLeft="0.65rem">
                              <Box display="flex" alignItems="center">
                                <Heading
                                  fontSize={{ base: "0.95rem", lg: "0.85rem" }}
                                  color="#c2ccd9"
                                >
                                  {props.title == "Biggest Gainers"
                                    ? card.asa_name
                                    : card.name}
                                </Heading>
                                {card.is_verified == "true" && (
                                  <VerifiedIcon
                                    ml="4px"
                                    height="auto"
                                    width={{ base: "13.5px", zz: "13.5px" }}
                                    fill="#00aed3"
                                  />
                                )}
                              </Box>
                              <Box display="flex" alignItems="center">
                                <Text
                                  fontWeight="400"
                                  color="#a0aec0"
                                  fontSize={{
                                    base: "0.8rem",
                                    lg: "0.7rem",
                                  }}
                                  marginRight="5px"
                                >
                                  {card.asset_1_id}
                                </Text>
                              </Box>
                            </Box>
                          </Link>
                        </NextLink>

                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Box w="100%" display="flex" alignItems="center">
                            <TextBox item={card} title={props.title} />
                            {/* <Text
                            fontWeight="400"
                            fontSize={{ base: "0.9rem", lg: "0.8rem" }}
                            lineHeight="1"
                            color="#c2ccd9"
                          >
                            {(props.title == "Biggest Gainers" &&
                              card.percentage_diff) ||
                              (props.title == "Trending" &&
                                nFormatter(card.volume, 2)) ||
                              (props.title == "Recently Added" &&
                                card.total_trade)}
                          </Text> */}
                            {/* <SwapIcon
                            ml="5px"
                            w={{ base: "13px", lg: "14px" }}
                            height="auto"
                          /> */}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export const TextBox = (props) => {
  const { defaultCurrency: curren } = useContext(Default_Currency);

  const { data: price } = GetAlgo("latest");

  const algoPrice =
    price &&
    (
      price[price.length - 1].close_price -
      price[price.length - 1].close_price * 0.003
    )
      .toFixed(4)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  return props.title == "Biggest Gainers" ? (
    <>
      <Text
        fontWeight="400"
        fontSize={{ base: "0.9rem", lg: "0.85rem" }}
        lineHeight="1"
        color={
          props.item.percentage_diff
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,") < 0
            ? "#ff6c4c"
            : "#19bd78"
        }
      >
        {props.item.percentage_diff
          ? `${
              props.item.percentage_diff < 0
                ? props.item.percentage_diff
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                    .split("-")[1]
                : props.item.percentage_diff
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")
            }%`
          : "0.00%"}{" "}
      </Text>
      <Box>
        <Box display="flex" alignItems="center" pl="4px">
          {props.item.percentage_diff
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,") < 0 ? (
            <Algorand h="auto" w="10px" />
          ) : (
            <Algorandd h="auto" w="10px" />
          )}
        </Box>
      </Box>
    </>
  ) : (
    <>
      {props.title == "Recently Added" &&
        (curren == "algo" ? (
          <AlgoSvg mr="2px" fill="white" height="auto" width="8.75px" />
        ) : (
          <UsdIcon mr="2px" fill="white" height="auto" width="6px" />
        ))}
      <Text
        fontWeight="400"
        fontSize={{ base: "0.9rem", lg: "0.85rem" }}
        lineHeight="1"
        color="#c2ccd9"
      >
        {(props.title == "Biggest Gainers" && props.item.percentage_diff) ||
          (props.title == "Trending" && props.item.total_trade) ||
          (props.title == "Recently Added" &&
            (curren == "algo"
              ? props.item.current_price
                  .toFixed(8)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")
              : (props.item.current_price * algoPrice)
                  .toFixed(8)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")))}
      </Text>
      {props.title == "Trending" && (
        <SwapIcon ml="5px" w={{ base: "13px", lg: "11px" }} height="auto" />
      )}
    </>
  );
};
export const FeaturedImage = (props) => {
  return (
    (props.title == "Biggest Gainers" && (
      <Box
        bg="#00aed3"
        justifyContent="center"
        borderRadius="100%"
        display="flex"
        height="19px"
        width="19px"
        pr="2px"
        pl="2px"
        alignItems="center"
      >
        <UpTrend fill="whiteAlpha.900" margin="auto" w="11px" height="11px" />
      </Box>
    )) ||
    (props.title == "Trending" && (
      <Image
        className="imgBorder"
        key={props.title}
        alt={"Trending"}
        src={`/trending.png`}
        width={23}
        height={23}
      />
    )) ||
    (props.title == "Recently Added" && <TimeIcon color="#a0aec0" />)
  );
};

export default FeaturedContainer;
