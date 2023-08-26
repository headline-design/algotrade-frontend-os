import { Box, Text, Stack } from "@chakra-ui/react";
import { ChartLine, ChartSimple, VolumeSimple } from "../Icons/Icons";
import nFormatter from "../../utils/numberFormatter";
const MainStatistics = ({ data }) => {
  return (
    <Box
      borderRadius="7px"
      border="1px solid"
      borderColor="#40444f"
      position={"relative"}
      height="auto"
      width={"full"}
      display={{ base: "none", lg: "block" }}
      maxW={{ lg: "300px", xl: "350px" }}
      overflow={"hidden"}
    >
      {" "}
      <Stack
        pt="20px"
        pb="20px"
        pl="25px"
        pr="25px"
        direction="column"
        height="100%"
        spacing={3.5}
        width="100%"
        display="flex"
        alignItems="start"
        justifyContent="space-evenly"
      >
        <Box display="flex" alignItems="flex-start">
          <Box width="auto" pr="13px" pt="3px">
            <VolumeSimple
              color="rgb(33 199 255 / 94%)"
              height="auto"
              width="35px"
            />
          </Box>
          <Box width="100%" height="auto">
            <Box>
              <Text
                fontSize={{ base: "1.5rem", lg: "2rem" }}
                fontWeight="600"
                lineHeight={{ lg: "1" }}
              >
                ${nFormatter(data[0].volume, 1)}
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
        </Box>{" "}
        <Box display="flex" alignItems="flex-start">
          <Box width="auto" pr="13px" pt="3px">
            <ChartSimple
              fill="rgb(21 206 200 / 94%)"
              height="auto"
              width="33px"
            />
          </Box>
          <Box width="100%" height="auto">
            <Box>
              <Text
                fontSize={{ base: "1.5rem", lg: "2rem" }}
                fontWeight="600"
                lineHeight={{ lg: "1" }}
              >
                {" "}
                {data[0].assets} +
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
          </Box>
        </Box>{" "}
        <Box display="flex" alignItems="flex-start">
          <Box width="auto" pr="13px" pt="3px">
            <ChartLine
              fill="rgb(80 118 255 / 94%)"
              height="auto"
              width="33px"
            />
          </Box>
          <Box width="100%" height="auto">
            <Box>
              <Text
                fontSize={{ base: "1.5rem", lg: "2rem" }}
                fontWeight="600"
                lineHeight={{ lg: "1" }}
              >
                {" "}
                {data[0].count} +
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
          </Box>
        </Box>{" "}
      </Stack>
    </Box>
  );
};

export default MainStatistics;
