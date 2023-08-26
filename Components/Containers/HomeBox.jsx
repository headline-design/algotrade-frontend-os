import { Box } from "@chakra-ui/react";

const HomeBox = ({ children }) => {
  return (
    <Box
      mt={{ base: "25px", lg: "0" }}
      w="100%"
      ml={{ base: "0", lg: "20px" }}
      pr="15px"
      pl="15px"
      pb="8px"
      pt="16px"
      borderRadius="7px"
      border="solid 1px"
      borderColor="#40444f"
    >
      {children}
    </Box>
  );
};

export default HomeBox;
