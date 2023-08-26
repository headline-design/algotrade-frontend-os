import { Box } from "@chakra-ui/react";

function HomePanel({ children }) {
  return (
    <Box
      as="main"
    >
      {children}
    </Box>
  );
}

export default HomePanel;
