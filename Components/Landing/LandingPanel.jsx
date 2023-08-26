import { Box } from "@chakra-ui/react";

const LandingPanel = ({ children }) => {
  return (
    <Box
      margin="auto"
      pl={{ base: "2rem", llg: "85px" }}
      pr={{ base: "2rem", llg: "85px" }}
      w={{
        base: "100%",
        xl: "100%",
        "2xl": "1400px",
      }}
    >
      {children}
    </Box>
  );
};

export default LandingPanel;
