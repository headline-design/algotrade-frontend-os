import { Box, Heading, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";
const Custom404 = () => {
  return (
    <>
      <Box>
        <Box
          minHeight="83vh"
          justifyContent="center"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box textAlign="center">
            <Heading>Opps, something went wrong</Heading>
            <Text mt="1rem" mb="1rem">
              The page you&apos;re looking for could not be found.
            </Text>
          </Box>
          <Box display="flex" alignItems="center">
            <NextLink prefetch={false} href={`/`} passHref>
              <Link
                _focus="none"
                isExternal
                mb="12px"
                justifyContent="center"
                display="flex"
                alignItems="center"
                textDecoration="none"
                _hover="none"
              >
                <Box
                  borderRadius="8px"
                  mr="1rem"
                  bg="rgb(6, 157, 189)"
                  minHeight="35px"
                  width="100%"
                  pr="20px"
                  pl="20px"
                  flexDirection="column"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  {" "}
                  <Text fontWeight="500">Take me home</Text>
                </Box>
              </Link>
            </NextLink>
            <NextLink prefetch={false} href={`/home`} passHref>
              <Link
                _focus="none"
                isExternal
                mb="12px"
                justifyContent="center"
                display="flex"
                alignItems="center"
                textDecoration="none"
                _hover="none"
              >
                <Box
                  borderRadius="8px"
                  bg="#242e3c"
                  minHeight="35px"
                  width="100%"
                  pr="20px"
                  pl="20px"
                  flexDirection="column"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text fontWeight="500">About</Text>
                </Box>
              </Link>
            </NextLink>
          </Box>
          <Box></Box>
        </Box>
      </Box>
    </>
  );
};
export default Custom404;
