import { Box, Stack, useBreakpointValue } from "@chakra-ui/react";
import FeaturedContainer from "./Container";
import FeaturedCarousel from "../Carousel/FeaturedChakra";
const Trending = () => {
  const lgg = useBreakpointValue({ lg: "960px" });

  return (
    <Box width="100%">
      {lgg ? (
        <Stack direction="row" spacing={3.5}>
          <FeaturedContainer title="Trending" api_endpoint="most-traded-asa" />
          <FeaturedContainer
            title="Biggest Gainers"
            api_endpoint="biggest-gainers"
          />
          <FeaturedContainer
            title="Recently Added"
            api_endpoint="recently-added"
          />
        </Stack>
      ) : (
        <FeaturedCarousel>
          <FeaturedContainer title="Trending" api_endpoint="most-traded-asa" />
          <FeaturedContainer
            title="Biggest Gainers"
            api_endpoint="biggest-gainers"
          />
          <FeaturedContainer
            title="Recently Added"
            api_endpoint="recently-added"
          />
        </FeaturedCarousel>
      )}
    </Box>
  );
};

export default Trending;
