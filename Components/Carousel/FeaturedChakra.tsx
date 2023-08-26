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
const fetcher = async (url: string) =>
  await axios.get(url).then((res) => res.data);

const FeaturedCarousel = ({ children }) => {
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
      borderRadius="8px"
      position={"relative"}
      height="auto"
      bg="#232e3e"
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
        {children}
      </Slider>
    </Box>
  );
};

export default FeaturedCarousel;
