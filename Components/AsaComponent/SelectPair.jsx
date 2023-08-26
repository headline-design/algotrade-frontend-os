import {
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  Box,
  Heading,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import SelectPairModal from "./SelectPairModal";
import { useRouter } from "next/router";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { AlgoSvg } from "../Icons/Icons";
const SelectPair = ({ asaInfo, poolName, pairs, setCurrentPool, newAsa }) => {
  const router = useRouter();
  function getKeyByValuee(object, value) {
    return Object.keys(object).find((key) => object[key]["pool_id"] === value);
  }
  useEffect(() => {
    if (
      router.asPath.includes("pool") == true &&
      pairs[getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))] ==
        undefined
    ) {
      return router.push(router.asPath.split("?pool=")[0], undefined, {
        shallow: true,
      });
    }
  }, [pairs]);

  return (
    <Accordion allowToggle>
      <AccordionItem border="none">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box
            display="flex"
            border="1px solid rgba(255, 255, 255, 0.16)"
            borderRadius="8px"
            justifyContent="space-between"
            bg="#242e3c"
            position="relative"
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
                {router.asPath.includes("pool") != true
                  ? `${poolName[0] && poolName[0].asset_1_name}/
                ${poolName[0] && poolName[0].asset_2_name}`
                  : router.asPath.includes("pool") == true &&
                    `${poolName[0].asset_1_name}/${
                      pairs[
                        getKeyByValuee(
                          pairs,
                          Number(router.asPath.split("pool=")[1])
                        )
                      ] != undefined &&
                      pairs[
                        getKeyByValuee(
                          pairs,
                          Number(router.asPath.split("pool=")[1])
                        )
                      ].asset_2_name
                    }`}
              </Heading>
            </Box>
            <SelectPairModal
              pairs={pairs}
              asa_name={poolName[0] && poolName[0].asset_1_name}
              slug_id={poolName[0] && poolName[0]}
              setCurrentPool={setCurrentPool}
            />
            {/* <AccordionButton _focus="none" height="35px" width="auto">
              <SettingsIcon height="auto" width="12px" />
            </AccordionButton> */}
          </Box>
          <Box pl="10px" bg="#1f2733">
            <AccordionButton
              borderRadius="8px"
              border="1px solid rgba(255, 255, 255, 0.16)"
              bg="#242e3c"
              _focus="none"
              height="35px"
              width="42px"
              justifyContent="center"
            >
              <AccordionIcon height="auto" width="22px" />

              {/* <Info height="auto" width="10px" fill="#fff" /> */}
            </AccordionButton>
          </Box>
        </Box>

        <AccordionPanel
          mt="10px"
          pb="10px"
          bg="#242e3c"
          pt="0"
          borderRadius="8px"
        >
          <Box
            pb="5px"
            borderBottom="1.8px solid #38455a"
            pt="7px"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <Text
                mr="3.5px"
                fontSize="0.95rem"
                fontWeight="500"
                color="#a0aec0"
              >
                Market Cap
              </Text>
              <Tooltip
                pt="3px"
                pb="3px"
                fontWeight="500"
                color="#fff"
                bg="var(--chakra-colors-gray-800)"
                label={
                  "Total market value of a cryptocurrency’s circulating supply."
                }
                placement="top"
              >
                <QuestionOutlineIcon
                  color="#a0aec0"
                  height="auto"
                  width="13px"
                />
              </Tooltip>
            </Box>
            <Box display="flex" alignItems="center" pt="3.8px" pb="3.8px">
              {router.asPath.includes("pool") != true ? (
                <AlgoSvg w="11px" height="auto" fill="white" />
              ) : (
                pairs[
                  getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
                ] != undefined &&
                pairs[
                  getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
                ].asset_2_id == 0 && (
                  <AlgoSvg w="11px" height="auto" fill="white" />
                )
              )}
              {router.asPath.includes("pool") == true &&
                pairs[
                  getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
                ] != undefined &&
                pairs[
                  getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
                ].asset_2_id != 0 && (
                  <Text fontSize="0.95rem" fontWeight="500" lineHeight="1">
                    {pairs[
                      getKeyByValuee(
                        pairs,
                        Number(router.asPath.split("pool=")[1])
                      )
                    ] != undefined &&
                      pairs[
                        getKeyByValuee(
                          pairs,
                          Number(router.asPath.split("pool=")[1])
                        )
                      ].asset_2_name}
                  </Text>
                )}
              {/* <AlgoSvg w="10.8px" height="auto" fill="white" /> */}
              <Text
                ml="3.5px"
                fontSize="0.95rem"
                fontWeight="500"
                lineHeight="1"
              >
                {router.asPath.includes("pool") != true
                  ? asaInfo != undefined && asaInfo.market_cap == null
                    ? "0"
                    : asaInfo.market_cap
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                  : router.asPath.includes("pool") == true &&
                    newAsa != undefined &&
                    newAsa[0] != undefined &&
                    newAsa[0].market_cap != undefined &&
                    newAsa[0].market_cap
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </Text>
            </Box>
            {router.asPath.includes("pool") == true &&
              pairs[
                getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
              ] != undefined &&
              pairs[
                getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
              ].asset_2_id != 0 &&
              newAsa != undefined &&
              newAsa[0] != undefined && (
                <Box display="flex" alignItems="flex-start">
                  <Text fontSize="0.8rem" fontWeight="400" color="#a0aec0">
                    =
                  </Text>
                  <Box display="flex" alignItems="baseline">
                    <AlgoSvg ml="3.5px" w="10px" height="auto" fill="#a0aec0" />
                    <Text
                      ml="3.5px"
                      fontSize="0.85rem"
                      fontWeight="500"
                      color="#a0aec0"
                    >
                      {(
                        newAsa != undefined &&
                        newAsa[0] != undefined &&
                        newAsa[0].market_cap * newAsa[0].current_price
                      )
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                    </Text>
                  </Box>
                </Box>
              )}
          </Box>
          <Box
            pb="5px"
            borderBottom="1.8px solid #38455a"
            pt="5px"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <Text
                mr="3.5px"
                fontSize="0.95rem"
                fontWeight="500"
                color="#a0aec0"
              >
                Volume (24h)
              </Text>
              <Tooltip
                pt="3px"
                pb="3px"
                fontWeight="500"
                color="#fff"
                bg="var(--chakra-colors-gray-800)"
                label={
                  "A measure of an asset trading volume in the last 24 hours."
                }
                placement="top"
              >
                <QuestionOutlineIcon
                  color="#a0aec0"
                  height="auto"
                  width="13px"
                />
              </Tooltip>
            </Box>
            <Box display="flex" alignItems="center" pt="3.8px" pb="3.8px">
              {router.asPath.includes("pool") != true ? (
                <AlgoSvg w="11px" height="auto" fill="white" />
              ) : (
                pairs[
                  getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
                ] != undefined &&
                pairs[
                  getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
                ].asset_2_id == 0 && (
                  <AlgoSvg w="11px" height="auto" fill="white" />
                )
              )}
              {router.asPath.includes("pool") == true &&
                pairs[
                  getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
                ] != undefined &&
                pairs[
                  getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
                ].asset_2_id != 0 && (
                  <Text fontSize="0.95rem" fontWeight="500" lineHeight="1">
                    {pairs[
                      getKeyByValuee(
                        pairs,
                        Number(router.asPath.split("pool=")[1])
                      )
                    ] != undefined &&
                      pairs[
                        getKeyByValuee(
                          pairs,
                          Number(router.asPath.split("pool=")[1])
                        )
                      ].asset_2_name}
                  </Text>
                )}
              <Text
                ml="3.5px"
                fontSize="0.95rem"
                fontWeight="500"
                lineHeight="1"
              >
                {router.asPath.includes("pool") != true
                  ? asaInfo != undefined && asaInfo.volume == null
                    ? "0"
                    : asaInfo.volume
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                  : router.asPath.includes("pool") == true &&
                    newAsa != undefined &&
                    newAsa[0] != undefined &&
                    newAsa[0].volume != undefined &&
                    newAsa[0].volume
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </Text>
            </Box>
            {router.asPath.includes("pool") == true &&
              pairs[
                getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
              ] != undefined &&
              pairs[
                getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
              ].asset_2_id != 0 &&
              newAsa != undefined &&
              newAsa[0] != undefined && (
                <Box display="flex" alignItems="flex-start">
                  <Text fontSize="0.8rem" fontWeight="400" color="#a0aec0">
                    =
                  </Text>
                  <Box display="flex" alignItems="baseline">
                    <AlgoSvg ml="3.5px" w="10px" height="auto" fill="#a0aec0" />
                    <Text
                      ml="3.5px"
                      fontSize="0.85rem"
                      fontWeight="500"
                      color="#a0aec0"
                    >
                      {(
                        newAsa != undefined &&
                        newAsa[0] != undefined &&
                        newAsa[0].volume * newAsa[0].current_price
                      )
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                    </Text>
                  </Box>
                </Box>
              )}
          </Box>
          <Box
            pb="5px"
            borderBottom="1.8px solid #38455a"
            pt="5px"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <Text
                mr="3.5px"
                fontSize="0.95rem"
                fontWeight="500"
                color="#a0aec0"
              >
                Liquidity
              </Text>
              <Tooltip
                pt="3px"
                pb="3px"
                fontWeight="500"
                color="#fff"
                bg="var(--chakra-colors-gray-800)"
                label={"Total value locked."}
                placement="top"
              >
                <QuestionOutlineIcon
                  color="#a0aec0"
                  height="auto"
                  width="13px"
                />
              </Tooltip>
            </Box>
            <Box display="flex" alignItems="center" pt="3.8px" pb="3.8px">
              {router.asPath.includes("pool") != true ? (
                <AlgoSvg w="11px" height="auto" fill="white" />
              ) : (
                pairs[
                  getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
                ] != undefined &&
                pairs[
                  getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
                ].asset_2_id == 0 && (
                  <AlgoSvg w="11px" height="auto" fill="white" />
                )
              )}
              {router.asPath.includes("pool") == true &&
                pairs[
                  getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
                ] != undefined &&
                pairs[
                  getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
                ].asset_2_id != 0 && (
                  <Text fontSize="0.95rem" fontWeight="500" lineHeight="1">
                    {pairs[
                      getKeyByValuee(
                        pairs,
                        Number(router.asPath.split("pool=")[1])
                      )
                    ] != undefined &&
                      pairs[
                        getKeyByValuee(
                          pairs,
                          Number(router.asPath.split("pool=")[1])
                        )
                      ].asset_2_name}
                  </Text>
                )}
              <Text
                ml="3.5px"
                fontSize="0.95rem"
                fontWeight="500"
                lineHeight="1"
              >
                {router.asPath.includes("pool") != true
                  ? asaInfo != undefined && asaInfo.liquidity == null
                    ? "0"
                    : asaInfo.liquidity
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                  : router.asPath.includes("pool") == true &&
                    newAsa != undefined &&
                    newAsa[0] != undefined &&
                    newAsa[0].liquidity != undefined &&
                    newAsa[0].liquidity
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </Text>
            </Box>
            {router.asPath.includes("pool") == true &&
              pairs[
                getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
              ] != undefined &&
              pairs[
                getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
              ].asset_2_id != 0 &&
              newAsa != undefined &&
              newAsa[0] != undefined && (
                <Box display="flex" alignItems="flex-start">
                  <Text fontSize="0.8rem" fontWeight="400" color="#a0aec0">
                    =
                  </Text>
                  <Box display="flex" alignItems="baseline">
                    <AlgoSvg ml="3.5px" w="10px" height="auto" fill="#a0aec0" />
                    <Text
                      ml="3.5px"
                      fontSize="0.85rem"
                      fontWeight="500"
                      color="#a0aec0"
                    >
                      {(
                        newAsa != undefined &&
                        newAsa[0] != undefined &&
                        newAsa[0].liquidity * newAsa[0].current_price
                      )
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                    </Text>
                  </Box>
                </Box>
              )}
          </Box>
          <Box
            pb="5px"
            borderBottom="1.8px solid #38455a"
            pt="5px"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <Text
                mr="3.5px"
                fontSize="0.95rem"
                fontWeight="500"
                color="#a0aec0"
              >
                Circulating Supply
              </Text>
              <Tooltip
                pt="3px"
                pb="3px"
                fontWeight="500"
                color="#fff"
                bg="var(--chakra-colors-gray-800)"
                label={"Amount of tokens that are circulating in the market."}
                placement="top"
              >
                <QuestionOutlineIcon
                  color="#a0aec0"
                  height="auto"
                  width="13px"
                />
              </Tooltip>
            </Box>
            <Box display="flex" alignItems="center">
              {/* <AlgoSvg w="10.8px" height="auto" fill="white" /> */}
              <Text ml="3.5px" fontSize="0.95rem" fontWeight="500">
                {poolName[0] && poolName[0].circulating_supply == null
                  ? "0"
                  : poolName[0].circulating_supply &&
                    poolName[0].circulating_supply
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </Text>
            </Box>
          </Box>
          <Box
            pt="5px"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <Text
                mr="3.5px"
                fontSize="0.95rem"
                fontWeight="500"
                color="#a0aec0"
              >
                Total Supply
              </Text>
              <Tooltip
                pt="3px"
                pb="3px"
                fontWeight="500"
                color="#fff"
                bg="var(--chakra-colors-gray-800)"
                label={"Total amount of coins that have already been created."}
                placement="top"
              >
                <QuestionOutlineIcon
                  color="#a0aec0"
                  height="auto"
                  width="13px"
                />
              </Tooltip>
            </Box>
            <Box display="flex" alignItems="center">
              {/* <AlgoSvg w="10.8px" height="auto" fil="white" /> */}
              <Text ml="3.5px" fontSize="0.95rem" fontWeight="500">
                {poolName[0] && poolName[0].total_amount == null
                  ? "0"
                  : poolName[0].total_amount &&
                    poolName[0].total_amount
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </Text>
            </Box>
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default SelectPair;
