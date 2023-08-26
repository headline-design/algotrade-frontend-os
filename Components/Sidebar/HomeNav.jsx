import { Box, Button, Heading, Link } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import HomeMobile from "./HomeMobile";
import { useBreakpointValue } from "@chakra-ui/react";
const HomeNavbar = () => {
  const lgg = useBreakpointValue({ lg: "960px" });

  return lgg ? (
    <Box
      as="header"
      margin="auto"
      w={{
        base: "100%",
        xl: "100%",
        "2xl": "1400px",
      }}
    >
      <Box
        padding={{ base: "0", lg: "18px 2rem" }}
        margin="auto"
        maxW="1400px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        // pt="125px"
        // pb="15px"
      >
        <NextLink href={`/home`} passHref>
          <Link
            _focus="none"
            justifyContent="center"
            display="flex"
            alignItems="center"
            textDecoration="none"
            _hover="none"
          >
            {" "}
            <Image
              className="asideLogo"
              src="/AlgotradeSidebar.png"
              alt="Algo Trade"
              width={35.1715}
              height={24}
            />
            <Heading
              ml="6.5px"
              fontSize="1.03rem"
              as="h2"
              fontWeight="700"
              lineHeight="1"
            >
              Algotrade
            </Heading>
          </Link>
        </NextLink>

        <Box display="flex" alignItems="center">
          <Button
            isExternal
            href="/"
            as={Link}
            _focus="none"
            _active="none"
            fontWeight="600"
            fontSize="1rem"
            height="32px"
            lineHeight="1"
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
            bg="#069dbd"
          >
            App
          </Button>
        </Box>
      </Box>
    </Box>
  ) : (
    <>
      <Box
        bg="#1f2733"
        margin="auto"
        w={{
          base: "100%",
          xl: "100%",
          "2xl": "1400px",
        }}
      >
        <Box
          padding="0 2rem"
          margin="auto"
          maxW="1400px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pt="15px"
          pb="15px"
        >
          <Box display="flex" alignItems="center">
            <NextLink href={`/home`} passHref>
              <Link
                _focus="none"
                justifyContent="center"
                display="flex"
                alignItems="center"
                textDecoration="none"
                _hover="none"
              >
                <Box display="flex" alignItems="center" borderRadius="5px">
                  <Box
                    display="flex"
                    alignItems="center"
                    minW="25px"
                    height="auto"
                  >
                    <Image
                      className="asideLogo"
                      src="/eh.png"
                      alt="Algo Trade"
                      width={35.1715}
                      height={24}
                    />
                    <Heading
                      ml="6.5px"
                      fontSize="1rem"
                      as="h2"
                      fontWeight="700"
                      lineHeight="1"
                    >
                      Algotrade
                    </Heading>
                  </Box>
                </Box>
              </Link>
            </NextLink>
          </Box>
          <Box display="flex" alignItems="center">
            <HomeMobile />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HomeNavbar;
