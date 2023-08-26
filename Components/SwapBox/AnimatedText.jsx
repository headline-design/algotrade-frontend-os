import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const AnimatedLoading = () => {
  const transitionValues = {
    duration: 1.3,
    yoyo: Infinity,
    ease: "easeOut",
  };
  const transitionValuess = {
    duration: 1.3,
    delay: "0s",
    yoyo: Infinity,
    ease: "easeOut",
  };
  const transitionValuesss = {
    duration: 1.3,
    delay: ".1s",
    yoyo: Infinity,
    ease: "easeOut",
  };

  const ballStyle = {
    display: "block",
    width: "7x",
    height: "7px",
    backgroundColor: "white",
    borderRadius: "5rem",
    marginRight: "3.5px",
    marginBottom: "8px",
    marginLeft: "auto",
  };
  const MotionSpan = motion(Text);

  return (
    <>
      <Box display="flex" ml="5px">
        <MotionSpan
          style={ballStyle}
          transition={{
            y: transitionValues,
            width: transitionValues,
            height: transitionValues,
          }}
          animate={{
            y: ["3px", "5px", "8px"],
            width: ["7px", "7px", "9px"],
            height: ["7px", "7px", "8px"],
          }}
        />
        <MotionSpan
          style={ballStyle}
          transition={{
            y: transitionValuess,
            width: transitionValuess,
            height: transitionValuess,
          }}
          animate={{
            y: ["3px", "5px", "8px"],
            width: ["7px", "7px", "9px"],
            height: ["7px", "7px", "8px"],
          }}
        />
        <MotionSpan
          style={ballStyle}
          transition={{
            y: transitionValuesss,
            width: transitionValuesss,
            height: transitionValuesss,
          }}
          animate={{
            y: ["3px", "5px", "8px"],
            width: ["7px", "7px", "9px"],
            height: ["7px", "7px", "8px"],
          }}
        />
      </Box>
    </>
  );
};

export default AnimatedLoading;
