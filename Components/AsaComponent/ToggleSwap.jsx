import {
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  Box,
  Heading
} from "@chakra-ui/react";
const ToggleSwap = ({ children }) => {

  return (
    <Accordion allowToggle>
      <AccordionItem border="none" mt="15px">
        <AccordionButton
          _focus="none"
          _hover="none"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderRadius="5px"
          _expanded={{ borderBottomRadius: 0 }}

          bg="#1f2733"
          padding="12px 15px 12px 15px"
        >
          <Box
            display="flex"
            border="1px solid rgba(255, 255, 255, 0.16)"
            borderRadius="8px"
            justifyContent="space-between"
            bg="#242e3c"
            width="100%"
            alignItems="center"
          >
            <Box
              userSelect="none"
              flex="1"
              textAlign="left"
              display="flex"
              height="35px"
              alignItems="center"
              pl="1rem"
            >
              <Heading as="h2" fontSize="1.2rem" fontWeight="500">
                Swap
              </Heading>
            </Box>
          </Box>
          <Box pl="10px" bg="#1f2733">
            <Box
              borderRadius="8px"
              border="1px solid rgba(255, 255, 255, 0.16)"
              bg="#242e3c"
              _focus="none"
              height="35px"
              // _expanded={expandToggle}
              width="42px"
              justifyContent="center"
            >
              <AccordionIcon height="auto" width="22px" />

            </Box>
          </Box>
        </AccordionButton>

        <AccordionPanel padding="0" bg="#242e3c" borderRadius="8px">
          {children}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default ToggleSwap;
