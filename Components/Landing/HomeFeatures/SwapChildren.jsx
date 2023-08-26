import { Box, Button, Link, Text, useBreakpointValue } from "@chakra-ui/react";
import { QuestionIcon, CalendarIcon } from "@chakra-ui/icons";
import { DocAbstract } from "../../Icons/Icons";
import Social from "../Social";
const SwapChildren = () => {
  const lgg = useBreakpointValue({ lg: "960px" });

  return (
    <Box
      display="flex"
      flexDirection="column"
      mt={{ base: "40px", custom1: "-250px", lg: "0" }}
    >
      <Box mt={{ lg: "50px" }}>
        {" "}
        <Box>
          <Button
            borderTop="1px solid rgba(255, 255, 255, 0.16)"
            borderBottom="1px solid rgba(255, 255, 255, 0.16)"
            as={Link}
            _focus={{ boxShadow: "none" }}
            _active="none"
            fontWeight="500"
            // href="/"
            width={{ base: "100%" }}
            fontSize="1.15rem"
            height="65px"
            justifyContent="flex-start"
            isDisabled
            color="whiteAlpha.800"
            borderRadius="0"
            lineHeight="1"
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
            bg="#242e3c"
          >
            <CalendarIcon mr="7px" height="auto" width="14px" />
            Roadmap
          </Button>
        </Box>
        <Box>
          {" "}
          <Button
            borderBottom="1px solid rgba(255, 255, 255, 0.16)"
            borderRadius="0"
            as={Link}
            isDisabled
            _focus={{ boxShadow: "none" }}
            _active="none"
            fontWeight="500"
            color="whiteAlpha.800"
            // href="/"
            width={{ base: "100%" }}
            fontSize="1.15rem"
            justifyContent="flex-start"
            height="65px"
            lineHeight="1"
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
            bg="#242e3c"
          >
            <QuestionIcon mr="7px" height="auto" width="14px" />
            FAQ
          </Button>
        </Box>
        <Box>
          {" "}
          <Button
            isDisabled
            borderRadius="0"
            as={Link}
            _focus={{ boxShadow: "none" }}
            _active="none"
            fontWeight="500"
            // href="/"
            width={{ base: "100%" }}
            fontSize="1.15rem"
            height="65px"
            lineHeight="1"
            color="whiteAlpha.800"
            textDecoration="none"
            justifyContent="flex-start"
            borderBottom="1px solid rgba(255, 255, 255, 0.16)"
            _hover={{ textDecoration: "none" }}
            bg="#242e3c"
          >
            <DocAbstract
              mr="7px"
              height="auto"
              width="14px"
              fill="whiteAlpha.800"
            />
            Tutorials
          </Button>
        </Box>
        <Text
          mt="10px"
          fontStyle="italic"
          color="#a0aec0"
          fontSize={{ base: "0.86rem", lg: "0.8rem" }}
          fontWeight="400"
          mb={{ base: "35px", lg: "4px" }}
        >
          Pages for the above are being worked on. Follow us on social for more.
        </Text>
        {lgg && <Social />}
      </Box>
    </Box>
  );
};

export default SwapChildren;
