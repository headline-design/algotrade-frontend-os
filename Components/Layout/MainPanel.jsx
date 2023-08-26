import { Box } from "@chakra-ui/react";

function MainPanel({ children }) {
  return (
    <Box
      margin="auto"
      as="main"
      pl={{ base: "0", lg: "85px" }}
      pr={{ base: "0", lg: "0" }}
      w={{
        base: "100%",
        xl: "100%",
        "3xl": "1400px",
      }}
    >
      {children}
    </Box>
  );
}

export default MainPanel;
