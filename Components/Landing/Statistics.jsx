import { Box, GridItem, Grid, Text } from "@chakra-ui/react";
import nFormatter from "../../utils/numberFormatter";
import LandingPanel from "./LandingPanel";
const LandingStatistics = ({ stats }) => {
  return (
    <Box
      as="section"
      mt={{ lg: "10px" }}
      pt={{ base: "30px", lg: "50px" }}
      pb={{ base: "30px", lg: "50px" }}
      id="statistics"
      bg="gray.900"
    >
      <LandingPanel>
        <Grid
          templateColumns={{ base: "repeat(2, 2fr)", lg: "repeat(4, 1fr)" }}
          gap={{ base: 6, lg: 20, xl: 8 }}
        >
          <GridItem w="100%" h="auto">
            <Box>
              <Box>
                <Text
                  fontSize={{ base: "1.5rem", lg: "2.3rem", xl: "2.6rem" }}
                  fontWeight="600"
                  lineHeight={{ lg: "1" }}
                >
                  ${nFormatter(stats.response[0].volume, 1)}
                </Text>
              </Box>
              <Box>
                <Text
                  color="#a0aec0"
                  fontWeight="500"
                  fontSize={{ base: "0.92rem", lg: "0.9rem", xl: "0.92rem" }}
                >
                  24h trading volume tracked
                </Text>
              </Box>
            </Box>
          </GridItem>
          <GridItem w="100%" h="auto">
            <Box>
              <Box>
                <Text
                  fontSize={{ base: "1.5rem", lg: "2.3rem", xl: "2.6rem" }}
                  fontWeight="600"
                  lineHeight={{ lg: "1" }}
                >
                  {" "}
                  {stats.response[0].assets} +
                </Text>
              </Box>
              <Box>
                <Text
                  color="#a0aec0"
                  fontWeight="500"
                  fontSize={{ base: "0.92rem", lg: "0.9rem", xl: "0.92rem" }}
                >
                  Tracked assets
                </Text>
              </Box>
            </Box>{" "}
          </GridItem>
          <GridItem w="100%" h="auto">
            <Box>
              <Box>
                <Text
                  fontSize={{ base: "1.5rem", lg: "2.3rem", xl: "2.6rem" }}
                  fontWeight="600"
                  lineHeight={{ lg: "1" }}
                >
                  {" "}
                  {stats.response[0].pool} +
                </Text>
              </Box>
              <Box>
                <Text
                  color="#a0aec0"
                  fontWeight="500"
                  fontSize={{ base: "0.92rem", lg: "0.9rem", xl: "0.92rem" }}
                >
                  Total of pools being tracked
                </Text>
              </Box>
            </Box>{" "}
          </GridItem>
          <GridItem w="100%" h="auto">
            <Box>
              <Box>
                <Text
                  fontSize={{ base: "1.5rem", lg: "2.3rem", xl: "2.6rem" }}
                  fontWeight="600"
                  lineHeight={{ lg: "1" }}
                >
                  {" "}
                  {stats.response[0].count} +
                </Text>
              </Box>
              <Box>
                <Text
                  color="#a0aec0"
                  fontWeight="500"
                  fontSize={{ base: "0.92rem", lg: "0.9rem", xl: "0.92rem" }}
                >
                  24h total swaps tracked
                </Text>
              </Box>
            </Box>{" "}
          </GridItem>
        </Grid>
      </LandingPanel>
    </Box>
  );
};

export default LandingStatistics;
