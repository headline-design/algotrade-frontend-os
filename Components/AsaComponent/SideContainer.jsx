import { Box, useBreakpointValue } from "@chakra-ui/react";
import SelectPair from "./SelectPair";
import Calculator from "../SwapBox/index";
import ToggleSwap from "./ToggleSwap";
const SideContainer = ({
  asaInfo,
  poolName,
  pairs,
  setCurrentPool,
  newAsa,
}) => {
  const lgg = useBreakpointValue({ llg: "1100px" });

  return (
    <Box
      display={{ base: "block", llg: "block" }}
      width="100%"
      maxW={{ base: "100%", llg: "300px" }}
      height="100%"
      ml={{ base: "0", llg: "23px" }}
    >
      <Box
        borderRadius="5px"
        bg="#1f2733"
        pt="12px"
        pb="12px"
        pl="15px"
        mt={{ base: "15px", llg: "0" }}
        pr="15px"
      >
        <SelectPair
          newAsa={newAsa}
          setCurrentPool={setCurrentPool}
          pairs={pairs}
          asaInfo={asaInfo}
          poolName={poolName}
        />
      </Box>
      {lgg ? (
        <Calculator pairs={pairs} poolName={poolName} />
      ) : (
        <ToggleSwap>
          <Calculator pairs={pairs} poolName={poolName} />
        </ToggleSwap>
      )}
    </Box>
  );
};

export default SideContainer;
