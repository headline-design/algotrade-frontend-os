import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  Heading,
  Text,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import dynamic from "next/dynamic";
const SearchBar = dynamic(() => import("../SearchBar/SearchBar"), {
  ssr: false,
});
const SearchModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box
        _focus="none"
        textDecoration="none"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        _hover="none"
        onClick={onOpen}
        cursor="pointer"
        alignItems="center"
      >
        <IconButton
          _hover="none"
          bg="none"
          _focus="none"
          height="25px"
          w="auto"
          _active="none"
          aria-label="Search database"
          icon={<Search2Icon h="20px" w="auto" fill="white" />}
        />
        <Text lineHeight="1.3" fontWeight="500" fontSize="0.8rem">
          Search
        </Text>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent height="80vh" width="85vw" borderRadius="20px">
          <ModalHeader
            pt="20px"
            pb="5px"
            display="flex"
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Heading fontWeight="500" fontSize="1.3rem">
              Search assets
            </Heading>
            <ModalCloseButton
              position="unset"
              _hover="none"
              _active="none"
              _focus="none"
            />
          </ModalHeader>
          <ModalBody>
            <SearchBar onClose={onClose} />
          </ModalBody>

          <ModalFooter>
            <Button
              bg="#1f2733"
              _hover={{ bg: "#242e3c" }}
              onClick={onClose}
              width="100%"
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchModal;
