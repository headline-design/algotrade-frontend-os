import { useDisclosure, IconButton, useOutsideClick } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { useState, useRef } from "react";
import { Search2Icon } from "@chakra-ui/icons";
import SearchBar from "../SearchBar/SearchBar.jsx";

const SearchIndicator = () => {
  const mobile = useBreakpointValue({ lg: "960px" });
  const { getButtonProps, getDisclosureProps, isOpen, onClose } =
    useDisclosure();
  const [hidden, setHidden] = useState(!isOpen);
  const ref = useRef();
  useOutsideClick({
    ref: ref,
    handler: () => isOpen && setHidden(onClose),
  });
  const customClose = () => {
    return setHidden(onClose);
  };
  return (
    <>
      <motion.div
        ref={ref}
        {...getDisclosureProps()}
        hidden={hidden}
        initial={false}
        onAnimationStart={() => setHidden(false)}
        onAnimationComplete={() => setHidden(!isOpen)}
        animate={{ width: isOpen ? 257 : 0 }}
        style={{
          borderRadius: "0.375rem",
          whiteSpace: "nowrap",
          position: "relative",
          right: "0",
          paddingRight: "7px",
          height: "39px",
          top: "0",
        }}
      >
        <SearchBar customClose={customClose} />
      </motion.div>
      {mobile && (
        <IconButton
          _focus="none"
          _active="none"
          maxH="39px"
          bg="#242e3c"
          mr={{ lg: "12px" }}
          width="44px"
          height="44px"
          aria-label="Search database"
          icon={<Search2Icon />}
          {...getButtonProps()}
        />
      )}
    </>
  );
};

export default SearchIndicator;
