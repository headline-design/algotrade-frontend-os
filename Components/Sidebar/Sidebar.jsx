import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import IconBox from "../Icons/IconBox";
import { HomeIcon, ApiIcon } from "../Icons/Icons";
import React from "react";
import { InfoIcon, QuestionIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { motion } from "framer-motion";
import ImageWithFallback from "../Image/nextImage";

const Sidebar = () => {
  const textMotion = {
    rest: {
      width: 85,
      scaleX: "70px",
      transition: {
        duration: 0.15,
      },
    },
    hover: {
      width: 270,
      scaleX: "300px",
      transition: {
        duration: 0.15,
      },
    },
  };
  const dispMotion = {
    rest: {
      alignItems: "flex-start",
    },
    hover: {
      alignItems: "flex-start",

      // justifyContent: "row",
    },
  };
  const dispSeperator = {
    rest: {
      width: "60px",
    },
    hover: {
      width: "100%",
    },
  };
  const buttonMotion = {
    rest: {
      background: "#1f2733",
      justifyContent: "flex-start",
      paddingLeft: 15,
    },
    hover: {
      background: "#242e3c",
      justifyContent: "flex-start",
      paddingLeft: 15,
      transition: {
        duration: 0,
      },
    },
  };
  const fontMotion = {
    rest: {
      display: "block",
      opacity: 0,
      animate: {
        opacity: 0,
      },
      // display: "none",
    },
    hover: {
      display: "block",
      marginLeft: 12,

      animate: {
        opacity: 1,
      },
    },
  };
  const fontMotion2 = {
    rest: {
      display: "none",
      opacity: 0,
      transition: {
        duration: 0.2,
      },

      // display: "none",
    },
    hover: {
      display: "block",
      opacity: 1,

      transition: {
        duration: 0.3,
      },
    },
  };
  const iconMotion = {
    rest: {
      marginRight: "0",
    },
    hover: {
      marginRight: "12px",
    },
  };
  const slashMotion = {
    rest: {
      display: "none",
      opacity: 0,
      ease: "easeOut",
      duration: 0.2,
      type: "tween",
    },
    hover: {
      display: "unset",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "tween",
        ease: "easeIn",
      },
    },
  };
  const MotionBox = motion(Box);
  const MotionText = motion(Text);
  const MotionIcon = motion(IconBox);
  const MotionButton = motion(Button);

  return (
    <>
      <MotionBox
        as="aside"
        key="motion"
        initial="rest"
        animate="rest"
        display={{ base: "none", lg: "block" }}
        zIndex="999"
        bg="#1f2733"
        position="fixed"
        variants={textMotion}
        whileHover="hover"
        left="0"
        height="100vh"
        p="13px"
        color="white"
        rounded="md"
        shadow="md"
      >
        <Box
          zIndex="2"
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
        >
          <MotionBox
            variants={dispMotion}
            zIndex="2"
            pt={"14px"}
            mb="12px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Box
              zIndex="2"
              pt={"14px"}
              mb="15px"
              display="flex"
              flexDirection="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <MotionBox
                minW="60px"
                rest="rest"
                justifyContent="center"
                display="flex"
                alignItems="center"
              >
                <ImageWithFallback
                  className="asideLogo"
                  src="/AlgotradeSidebar.png"
                  fallbackSrc="/placeholder.png"
                  width={38.1715}
                  height={27}
                />
              </MotionBox>
              <MotionBox display="flex" alignItems="center">
                <MotionText
                  lineHeight="1"
                  my="auto"
                  fontSize="1.1rem"
                  variants={fontMotion2}
                >
                  AlgoTrade
                </MotionText>
              </MotionBox>
            </Box>
            <MotionBox
              h="1px"
              variants={dispSeperator}
              bg="linear-gradient(90deg, rgba(224, 225, 226, 0) 0%, #E0E1E2 49.52%, rgba(224, 225, 226, 0) 100%)"
            />
          </MotionBox>
          <Box
            position="relative"
            zIndex="2"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <NextLink href={`/`} passHref>
              <Link
                _focus="none"
                justifyContent="center"
                display="flex"
                alignItems="center"
                textDecoration="none"
                _hover="none"
                mb="12px"
              >
                <MotionButton
                  variants={buttonMotion}
                  // justifyContent="flex-start"
                  // boxSize="initial"
                  // paddingLeft="20px"
                  bg="#1f2733"
                  // py="8px"
                  minHeight="45px"
                  alignItems="center"
                  height="auto"
                  paddingBottom="1.5px"
                  // mx={{
                  //   xl: "auto",
                  // }}
                  borderRadius="15px"
                  _hover={{ bg: "#28364a !important" }}
                  w="100%"
                  _active={{
                    bg: "inherit",
                    transform: "none",
                    borderColor: "transparent",
                  }}
                  _focus={{
                    boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <Flex alignItems="center">
                    <MotionIcon
                      variants={iconMotion}
                      bg="#00bee6"
                      color="white"
                      h="30px"
                      w="30px"
                      // mr={isHovered ? "12px" : "0"}
                    >
                      <HomeIcon />
                    </MotionIcon>
                    <MotionBox w="auto">
                      <MotionText
                        w="auto"
                        ml="7.5px"
                        variants={fontMotion2}
                        my="auto"
                        _hover={{ color: "#63D1FA" }}
                        className="iconText"
                        fontSize="0.95rem"
                      >
                        Home
                      </MotionText>
                    </MotionBox>
                  </Flex>
                </MotionButton>
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
                <MotionButton
                  variants={buttonMotion}
                  // justifyContent="flex-start"
                  // boxSize="initial"
                  // paddingLeft="20px"
                  // py="8px"
                  minHeight="45px"
                  bg="#1f2733"
                  alignItems="center"
                  height="auto"
                  paddingBottom="1.5px"
                  // mx={{
                  //   xl: "auto",
                  // }}
                  borderRadius="15px"
                  _hover={{ bg: "#28364a !important" }}
                  w="100%"
                  _active={{
                    bg: "inherit",
                    transform: "none",
                    borderColor: "transparent",
                  }}
                  _focus={{
                    boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <Flex alignItems="center">
                    <MotionIcon
                      variants={iconMotion}
                      bg="#00bee6"
                      color="white"
                      h="30px"
                      w="30px"
                      // mr={isHovered ? "12px" : "0"}
                    >
                      <InfoIcon />
                    </MotionIcon>
                    <MotionBox w="auto">
                      <MotionText
                        w="auto"
                        ml="7.5px"
                        variants={fontMotion2}
                        _hover={{ color: "#63D1FA" }}
                        className="iconText"
                        fontSize="0.95rem"
                      >
                        About
                      </MotionText>
                    </MotionBox>
                  </Flex>
                </MotionButton>
              </Link>
            </NextLink>
            <NextLink prefetch={false} href={`/api-docs`} passHref>
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
                <MotionButton
                  variants={buttonMotion}
                  // justifyContent="flex-start"
                  // boxSize="initial"
                  // paddingLeft="20px"
                  // py="8px"
                  minHeight="45px"
                  bg="#1f2733"
                  alignItems="center"
                  height="auto"
                  paddingBottom="1.5px"
                  // mx={{
                  //   xl: "auto",
                  // }}
                  borderRadius="15px"
                  _hover={{ bg: "#28364a !important" }}
                  w="100%"
                  _active={{
                    bg: "inherit",
                    transform: "none",
                    borderColor: "transparent",
                  }}
                  _focus={{
                    boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <Flex alignItems="center">
                    <MotionIcon
                      variants={iconMotion}
                      bg="#00bee6"
                      color="white"
                      h="30px"
                      w="30px"
                      // mr={isHovered ? "12px" : "0"}
                    >
                      <ApiIcon height="auto" width="18.5px" borderRadius="100%" fill="white" />
                    </MotionIcon>
                    <MotionBox w="auto">
                      <MotionText
                        w="auto"
                        ml="7.5px"
                        variants={fontMotion2}
                        _hover={{ color: "#63D1FA" }}
                        className="iconText"
                        fontSize="0.95rem"
                      >
                        Free API
                      </MotionText>
                    </MotionBox>
                  </Flex>
                </MotionButton>
              </Link>
            </NextLink>            
            {/* <NextLink href={`/`} passHref> */}
            <Link
              mb="12px"
              _focus="none"
              justifyContent="center"
              display="flex"
              alignItems="center"
              textDecoration="none"
              _hover="none"
            >
              <MotionButton
                isDisabled
                variants={buttonMotion}
                // justifyContent="flex-start"
                // boxSize="initial"
                // paddingLeft="20px"
                // py="8px"
                minHeight="45px"
                bg="#1f2733"
                alignItems="center"
                height="auto"
                paddingBottom="1.5px"
                // mx={{
                //   xl: "auto",
                // }}
                borderRadius="15px"
                w="100%"
                _active={{
                  bg: "inherit",
                  transform: "none",
                  borderColor: "transparent",
                }}
                _focus={{
                  boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)",
                }}
                _hover={{ bg: "#28364a !important" }}
              >
                <Flex alignItems="center">
                  <MotionIcon
                    variants={iconMotion}
                    bg="#00bee6"
                    color="white"
                    h="30px"
                    w="30px"
                    // mr={isHovered ? "12px" : "0"}
                  >
                    <QuestionIcon />
                  </MotionIcon>
                  <MotionBox w="auto">
                    <MotionText
                      w="auto"
                      ml="7.5px"
                      variants={fontMotion2}
                      my="auto"
                      _hover={{ color: "#63D1FA" }}
                      className="iconText"
                      fontSize="0.95rem"
                    >
                      FAQ
                    </MotionText>
                  </MotionBox>
                </Flex>
              </MotionButton>
            </Link>
          </Box>
        </Box>
      </MotionBox>
    </>
  );
};

export default Sidebar;
