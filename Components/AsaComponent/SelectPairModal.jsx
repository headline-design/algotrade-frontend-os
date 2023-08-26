import {
  Button,
  Box,
  Menu,
  MenuList,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Heading,
  ModalCloseButton,
  useDisclosure,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import ImageWithFallback from "../Image/nextImage";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { SettingsIcon } from "@chakra-ui/icons";
const SelectPairModal = ({ pairs, asa_name, setCurrentPool, slug_id }) => {
  const router = useRouter();
  const mobile = useBreakpointValue({ base: "0px", llg: "1100px" });

  const ASSET_LOGO_BASE_URL = "https://mainnet-asa.algotrade.net/assets";
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {mobile != "0px" ? (
        <Menu isOpen={isOpen} onClose={onClose}>
          <Button
            onClick={onOpen}
            _focus="none"
            height="35px"
            width="auto"
            bg="none"
          >
            <SettingsIcon height="auto" width="12px" />
          </Button>
          {isOpen && (
            <Box
              position="fixed"
              zIndex="100"
              left="0"
              top="0"
              w="100vw"
              bg="var(--chakra-colors-blackAlpha-600)"
              h="100vh"
            />
          )}

          <MenuList
            mt="45px"
            border="none"
            minW="0"
            w={"218px"}
            zIndex="100"
            pt="7.5px"
            pb="7.5px"
            bg="#242e3c"
          >
            {pairs.map((item, index) => (
              <NextLink
                prefetch={false}
                key={index}
                href={`/asa/${slug_id.asset_1_id}`}
                as={`${slug_id.asset_1_id}?pool=${item.pool_id}`}
                shallow={true}
                scroll={false}
              >
                <Box
                  onClick={() => setCurrentPool(item.pool_id)}
                  cursor="pointer"
                  _focus={{ bg: "none", boxShadow: "none" }}
                  key={item.pool_id}
                  _hover={{
                    bg: "#334156",
                    color: "#e5e5e5",
                    textDecoration: "none",
                  }}
                  borderRadius="0"
                  bg="none"
                  _active={{ bg: "none" }}
                  width="100%"
                  pl="15px"
                  pr="15px"
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                  >
                    <Box display="flex" alignItems="center" pt="6px" pb="6px">
                      <ImageWithFallback
                        alt={`${item.unit_name}/${item.asset_2_name}`}
                        key={item.pool_id}
                        className="imgBorder"
                        src={`${ASSET_LOGO_BASE_URL}/${item.asset_2_id}/icon.png`}
                        fallbackSrc="/placeholder.png"
                        width={27}
                        height={27}
                      />
                      <Box display="flex" flexDirection="column" pl="7px">
                        <Text fontWeight="500" fontSize="0.85rem" lineHeight="1">
                          {item.unit_name}/{item.asset_2_name}{" "}
                        </Text>
                        <Text
                          color="#a0aec0"
                          fontWeight="400"
                          fontSize="0.75rem"
                          mt="1.5px"
                          lineHeight="1"
                        >
                          #{item.asset_2_id}
                        </Text>
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center">
                    </Box>
                  </Box>
                </Box>
              </NextLink>
            ))}
          </MenuList>
        </Menu>
      ) : (
        mobile && (
          <>
            <Button
              onClick={onOpen}
              _focus="none"
              height="35px"
              width="auto"
              bg="none"
            >
              <SettingsIcon height="auto" width="12px" />
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
              <ModalOverlay />
              <ModalContent width="85vw">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="100%"
                  bg="#1f2733"
                  alignItems="center"
                >
                  <ModalHeader minWidth="max-content" bg="#1f2733">
                    {asa_name} Pairs
                  </ModalHeader>
                  <ModalCloseButton
                    mr="1.3rem"
                    position="unset"
                    bg="#242e3c"
                    _hover="none"
                    _active="none"
                    _focus="none"
                  />
                </Box>

                <ModalBody
                  bg="#1f2733"
                  borderTop="1px solid #40444f"
                  pr="0"
                  pl="0"
                  pb="unset"
                  borderBottom="1px solid #40444f"
                >
                  <Box
                    maxH="300px"
                    overflow="auto"
                    // bg="#1f2733"
                    css={{
                      "&::-webkit-scrollbar": {
                        width: "9px",
                        background: "#1A202C",
                      },

                      "&::-webkit-scrollbar-thumb": {
                        width: "9px",
                        background: "#46556b",
                        borderRadius: "8px",
                      },
                    }}
                  >
                    {pairs.map((item, index) => (
                      <NextLink
                        prefetch={false}
                        key={index}
                        href={`/asa/${slug_id.asset_1_id}`}
                        as={`${slug_id.asset_1_id}?pool=${item.pool_id}`}
                        shallow={true}
                        scroll={false}
                      >
                        <Box
                          onClick={() => setCurrentPool(item.pool_id)}
                          _hover={{ background: "#28364a" }}
                          cursor="pointer"
                          _focus="none"
                          display="flex"
                          alignItems="center"
                          textDecoration="none"
                          key={item.pool_id}
                          w="100%"
                          pt="10px"
                          pb="10px"
                        >
                          <Box
                            pl="var(--chakra-space-6)"
                            pr="var(--chakra-space-6)"
                            height="37px"
                            w="100%"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Box w="auto" display="flex" alignItems="center">
                              <Box
                                display="flex"
                                alignItems="center"
                                mr="8px"
                                minW="32px"
                                minH="32px"
                              >
                                <ImageWithFallback
                                  alt={`${item.unit_name}/${item.asset_2_name}`}
                                  key={item.pool_id}
                                  className="imgBorder"
                                  src={`${ASSET_LOGO_BASE_URL}/${item.asset_2_id}/icon.png`}
                                  fallbackSrc="/placeholder.png"
                                  width={32}
                                  height={32}
                                />
                              </Box>
                              <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                              >
                                <Box display="flex" alignItems="baseline">
                                  <Heading
                                    as="h2"
                                    color="var(--chakra-colors-whiteAlpha-900)"
                                    fontSize="1rem"
                                    mb="0.5px"
                                    fontWeight="600"
                                    maxW="130px"
                                    overflow="hidden"
                                    textOverflow="ellipsis"
                                  >
                                    {item.unit_name}/${item.asset_2_name}{" "}
                                  </Heading>
                                </Box>
                                <Box>
                                  <Text
                                    lineHeight="1"
                                    fontWeight="400"
                                    color="#a0aec0"
                                    fontSize="0.8rem"
                                  >
                                    {item.pool_id}
                                  </Text>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </NextLink>
                    ))}
                  </Box>
                </ModalBody>

                <ModalFooter bg="#1f2733">
                  <Button
                    bg="#242e3c"
                    _hover={{ background: "#28364a" }}
                    onClick={onClose}
                    width="100%"
                  >
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )
      )}
    </>
  );
};

export default SelectPairModal;
