import { Box } from "@chakra-ui/react";

const HomeContainer = ({ children }) => {
  return (
    <Box
      marginBottom="50px"
      flexDirection={{ base: "column", lg: "row" }}
      display="flex"
      justifyContent="space-between"
    >
      {children}
    </Box>
  );
};

export default HomeContainer;
