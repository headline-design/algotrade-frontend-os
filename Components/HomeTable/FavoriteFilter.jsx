import { Box, IconButton, Text } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const FavoriteIconFilter = ({ setFavorite }) => {
  return (
    <IconButton
      mr="17px"
      bg="#242e3c"
      border="none"
      width="auto"
      pt={{ base: "6.5px", lg: "8px" }}
      pb={{ base: "6.5px", lg: "8px" }}
      height="auto"
      pl={{ base: "17px", lg: "15px" }}
      pr={{ base: "16px", lg: "15px" }}
      onClick={setFavorite}
      _focus={{ boxShadow: "none" }}
      aria-label="Options"
      icon={
        <Box
          display="flex"
          alignItems={{ base: "center", lg: "end" }}
          pl={{ base: "27px", lg: "0" }}
          pr={{ base: "27px", lg: "0" }}
          width="auto"
          justifyContent="center"
        >
          <StarIcon
            height="auto"
            width={{ base: "12.5px", lg: "16.5px" }}
            color="yellow.400"
          />
          <Text
            color="#a0aec0"
            ml={{ base: "5.5px", lg: "7px" }}
            fontSize={{ base: "0.85rem", lg: "0.97rem" }}
          >
            Favorites
          </Text>
        </Box>
      }
      variant="outline"
    />
  );
};

export default FavoriteIconFilter;
