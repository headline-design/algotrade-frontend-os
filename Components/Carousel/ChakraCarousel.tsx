/*eslint-disable */
// @ts-nocheck
import React from "react";
import { Box, Heading, Text, Container, Tooltip, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import nFormatter from "../../utils/numberFormatter";
import ImageWithFallback from "../Image/nextImage";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { AlgoSvg } from "../Icons/Icons";
import axios from "axios";
import Slider from "react-slick";
import { useState } from "react";
import { PopularIcon, SwapIcon, VerifiedIcon } from "../Icons/Icons";
import useSWR from "swr";

const settings = {
  dots: true,
  arrows: false,
  infinite: true,
  autoplay: true,
  speed: 700,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const fetcher = async (url: string) => await axios.get(url).then((res) => res.data);

const CaptionCarousel = () => {
  const ASSET_LOGO_BASE_URL = "https://mainnet-asa.algotrade.net/assets";
  const responsiveImg = useBreakpointValue({ base: 37, lg: 40 });
  const responsiveTooltip = useBreakpointValue({
    base: "bottom-start",
    lg: "bottom-start",
  });

  const [slider, setSlider] = useState<Slider | null>(null);
  const { data, error } = useSWR(
    `https://api.algotrade.net/most-traded-asa`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );
  const { data: volume, error: volumeError } = useSWR(
    `https://api.algotrade.net/asa-volume`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  return (
    <Box
      borderRadius="7px"
      border="1px solid"
      borderColor="#40444f"
      position={"relative"}
      height="auto"
      width={"full"}
      maxW={{ lg: "300px", xl: "350px" }}
      overflow={"hidden"}
    >
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />

      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        <Box position="relative">
          <Container
            maxW="100%"
            size="container.lg"
            height="100%"
            position="relative"
            paddingRight="0"
            paddingLeft="0"
          >
            <Box padding="30px" pr="0" pl="0" pb={{ base: "30px", lg: "5px" }}>
              <Box></Box>
              <Box>
                <Box pl="25px" pr="25px">
                  <Box display="flex" alignItems="center">
                    <PopularIcon pb="4px" w="15.5px" height="auto" />
                    <Box
                      ml="8px"
                      pb="4px"
                      borderBottom="dashed 1px"
                      borderColor="#c2ccd9"
                    >
                      <Tooltip
                        placement={responsiveTooltip}
                        fontWeight="500"
                        borderRadius="7px"
                        bg="#2d3b50"
                        paddingLeft="10px"
                        paddingRight="10px"
                        pt="7px"
                        pb="7px"
                        color="white"
                        label="Amount of swaps of most traded ASAs in the last 24H."
                        aria-label="A tooltip"
                      >
                        <Heading fontSize="0.85rem" color="#c2ccd9">
                          MOST TRADED ASA (24H)
                        </Heading>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>
                <Box pt="13px">
                  {data &&
                    data.results.map((card, index) => (
                      <Box
                        mr={{ base: "25px", lg: "0" }}
                        ml={{ base: "25px", lg: "0" }}
                        pr={{ base: "0", lg: "25px" }}
                        pl={{ base: "0", lg: "25px" }}
                        _hover={{ background: "#242e3c" }}
                        borderBottom={index == 1 && "1px solid #40444f"}
                        borderTop={index == 1 && "1px solid #40444f"}
                        key={index}
                        pb="17px"
                        pt="17"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Box>
                          <NextLink
                            prefetch={false}
                            href={`/asa/${card.asset_1_id}`}
                            passHref
                          >
                            <Link
                              _focus="none"
                              display="flex"
                              alignItems="center"
                              textDecoration="none"
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
                              <Box paddingLeft="0.8rem">
                                <Box display="flex" alignItems="center">
                                  <Heading
                                    fontSize={{ base: "0.9rem", lg: "1rem" }}
                                    color="#c2ccd9"
                                  >
                                    {card.name}
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
                                      lg: "0.85rem",
                                    }}
                                    marginRight="5px"
                                  >
                                    {card.asset_1_id}
                                  </Text>
                                </Box>
                              </Box>
                            </Link>
                          </NextLink>
                        </Box>

                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Box w="100%" display="flex" alignItems="center">
                            <Text
                              fontWeight="500"
                              fontSize={{ base: "0.9rem", lg: "1rem" }}
                              lineHeight="1"
                              color="#c2ccd9"
                            >
                              {card.total_trade}
                            </Text>
                            <SwapIcon
                              ml="5px"
                              w={{ base: "13px", lg: "14px" }}
                              height="auto"
                            />
                          </Box>
                        </Box>
                      </Box>
                    ))}
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
        <Box position="relative">
          <Container
            maxW="100%"
            size="container.lg"
            height="100%"
            position="relative"
            paddingRight="0"
            paddingLeft="0"
          >
            <Box padding="30px" pr="0" pl="0" pb={{ base: "30px", lg: "5px" }}>
              <Box></Box>
              <Box>
                <Box pl="25px" pr="25px">
                  <Box display="flex" alignItems="center">
                    <PopularIcon pb="4px" w="15.5px" height="auto" />
                    <Box
                      ml="8px"
                      pb="4px"
                      borderBottom="dashed 1px"
                      borderColor="#c2ccd9"
                    >
                      <Tooltip
                        placement={responsiveTooltip}
                        fontWeight="500"
                        borderRadius="7px"
                        bg="#2d3b50"
                        paddingLeft="10px"
                        paddingRight="10px"
                        pt="7px"
                        pb="7px"
                        color="white"
                        label="Asa with the highest volume."
                        aria-label="A tooltip"
                      >
                        <Heading fontSize="0.85rem" color="#c2ccd9">
                          HIGHEST VOLUME (24H)
                        </Heading>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>
                <Box pt="13px">
                  {volume &&
                    volume.results.map((card, index) => (
                      <Box
                        mr={{ base: "25px", lg: "0" }}
                        ml={{ base: "25px", lg: "0" }}
                        pr={{ base: "0", lg: "25px" }}
                        pl={{ base: "0", lg: "25px" }}
                        _hover={{ background: "#242e3c" }}
                        borderBottom={index == 1 && "1px solid #40444f"}
                        borderTop={index == 1 && "1px solid #40444f"}
                        key={index}
                        pb="17px"
                        pt="17"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Box>
                          <NextLink
                            prefetch={false}
                            href={`/asa/${card.asset_1_id}`}
                            passHref
                          >
                            <Link
                              _focus="none"
                              display="flex"
                              alignItems="center"
                              textDecoration="none"
                              _hover="none"
                            >
                              <ImageWithFallback
                                className="imgBorder"
                                alt={card.name}
                                key={card.asset_1_id}
                                src={`${ASSET_LOGO_BASE_URL}/${card.asset_1_id}/icon.png`}
                                width={40}
                                height={40}
                              />
                              <Box paddingLeft="0.8rem">
                                <Box display="flex" alignItems="center">
                                  <Heading
                                    fontSize={{ base: "0.9rem", lg: "1rem" }}
                                    color="#c2ccd9"
                                  >
                                    {card.name}
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
                                    fontWeight="500"
                                    color="#a0aec0"
                                    fontSize={{
                                      base: "0.8rem",
                                      lg: "0.875rem",
                                    }}
                                    marginRight="5px"
                                  >
                                    {card.asset_1_id}
                                  </Text>{" "}
                                </Box>
                              </Box>
                            </Link>
                          </NextLink>
                        </Box>

                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Box w="100%" display="flex" alignItems="center">
                            <AlgoSvg
                              fill="#c2ccd9"
                              w={{ base: "11px", lg: "12px" }}
                              height="auto"
                              mr="5px"
                            />
                            <Text
                              fontWeight="500"
                              fontSize={{ base: "0.9rem", lg: "1rem" }}
                              lineHeight="1"
                              color="#c2ccd9"
                            >
                              {nFormatter(card.volume, 2)}
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </Slider>
    </Box>
  );
}

export default CaptionCarousel