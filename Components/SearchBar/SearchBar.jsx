import { useRouter } from "next/router";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { Box, Text, Heading, Link } from "@chakra-ui/react";
import { useContext } from "react";
import { AssetsList } from "../../pages/_app";
import { VerifiedIcon } from "../Icons/Icons";
import { chakraComponents, AsyncSelect } from "chakra-react-select";
import ImageWithFallback from "../Image/nextImage";
import NextLink from "next/link";
import { useBreakpointValue } from "@chakra-ui/media-query";

const VirtualizedSelect = dynamic(() => import("./index"), {
  ssr: false,
});

const VirtualizedSelectExample = ({ customClose, onClose }) => {
  const ASSET_LOGO_BASE_URL = "https://mainnet-asa.algotrade.net/assets";
  const mobile = useBreakpointValue({ lg: "960px" });
  const router = useRouter();
  const cb = useRef();
  const asaList = useContext(AssetsList);
  const asa =
    asaList &&
    asaList.map((asaa) => {
      return {
        value: asaa.name,
        label: asaa.asset_1_name,
        id: `${asaa.asset_1_id}`,
        verified: asaa.is_verified,
        title: `${asaa.address}`,
        pool: asaa.pool_creator,
      };
    });

  const [chosen, setChosen] = useState();
  const handleChange = (selectedOption) => {
    setChosen(selectedOption);
  };
  const customComponents = {
    Option: ({ children, ...props }) => (
      <chakraComponents.Option
        id={props.data.id}
        {...props}
        isDisabled={router.asPath.split("/asa/")[1] == props.data.id && true}
      >
        {router.asPath.split("/asa/")[1] == props.data.id ? (
          <Link
            cursor="not-allowed"
            _focus="none"
            display="flex"
            alignItems="center"
            textDecoration="none"
            _hover="none"
            w="100%"
          >
            <Box
              height="37px"
              w="100%"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box w="auto" display="flex" alignItems="center">
                <Box
                  display="flex"
                  alignItems="center"
                  mr="8px"
                  minW="32px"
                  minH="32px"
                >
                  <ImageWithFallback
                    alt={props.data.value}
                    key={props.data.id}
                    className="imgBorder"
                    src={`${ASSET_LOGO_BASE_URL}/${props.data.id}/icon.png`}
                    width={32}
                    height={32}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Box display="flex" alignItems="baseline">
                    <Heading
                      as="h2"
                      color="var(--chakra-colors-whiteAlpha-900)"
                      fontSize="1rem"
                      mb="0.5px"
                      fontWeight="600"
                      maxW="130px"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {props.data.value}
                    </Heading>
                    {props.data.verified == "true" && (
                      <VerifiedIcon
                        fill="#00aed3"
                        ml="4px"
                        height="auto"
                        width="13.5px"
                      />
                    )}
                  </Box>
                  <Box>
                    <Text
                      lineHeight="1"
                      fontWeight="400"
                      color="#a0aec0"
                      fontSize="0.8rem"
                    >
                      {props.data.id}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Link>
        ) : (
          <NextLink
            prefetch={false}
            key={`${props.data.id}`}
            href={
              router.pathname.split("/[slug]")[0].includes("asa") == true
                ? `${props.data.id}`
                : `/asa/${props.data.id}`
            }
            passHref
          >
            <Link
              onClick={() => {
                mobile ? customClose() : onClose();
              }}
              // href={`/asa/${props.data.id}`}
              _focus="none"
              display="flex"
              alignItems="center"
              textDecoration="none"
              _hover="none"
              w="100%"
            >
              <Box
                height="37px"
                w="100%"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                pt={!mobile && "25px"}
                pb={!mobile && "25px"}
              >
                <Box w="auto" display="flex" alignItems="center">
                  <Box
                    display="flex"
                    alignItems="center"
                    mr={{ base: "15px", lg: "8px" }}
                    minW="32px"
                    minH="32px"
                  >
                    <ImageWithFallback
                      alt={props.data.value}
                      key={props.data.id}
                      className="imgBorder"
                      src={`${ASSET_LOGO_BASE_URL}/${props.data.id}/icon.png`}
                      width={32}
                      height={32}
                    />
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <Box display="flex" alignItems="baseline">
                      <Heading
                        as="h2"
                        color="var(--chakra-colors-whiteAlpha-900)"
                        fontSize={{ base: "1.1rem", lg: "1rem" }}
                        mb="0.5px"
                        fontWeight="600"
                        maxW={{ base: "unset", lg: "130px" }}
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        {props.data.value}
                      </Heading>
                      {props.data.verified == "true" && (
                        <VerifiedIcon
                          fill="#00aed3"
                          ml="4px"
                          height="auto"
                          width="13.5px"
                        />
                      )}
                    </Box>
                    <Box>
                      <Text
                        lineHeight="1"
                        fontWeight="400"
                        color="#a0aec0"
                        fontSize={{ base: "0.9rem", lg: "0.8rem" }}
                      >
                        {props.data.id}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Link>
          </NextLink>
        )}
      </chakraComponents.Option>
    ),
    NoOptionsMessage: (props) => (
      <chakraComponents.NoOptionsMessage {...props}>
        <Text fontWeight="500" className="custom-css-class">
          Search name or address
        </Text>
      </chakraComponents.NoOptionsMessage>
    ),
    DropdownIndicator: () => null,
    // IndicatorSeperator: () => null,
  };

  return (
    <>
      <AsyncSelect
        escapeClearsValue
        menuPortalTarget={cb.current}
        as={VirtualizedSelect}
        async
        controlShouldRenderValue={false}
        menuIsOpen
        classNamePrefix="chakra-react-select"
        chakraStyles={{
          menu: (provided) => ({
            ...provided,
            zIndex: 100,
          }),
          menuList: (provided) => ({
            ...provided,
            maxHeight: {
              base: "55vh",
              lg: "300px",
            },
            bg: "#2a3444",
            "&::-webkit-scrollbar": {
              width: "9px",
              background: "#242e3c",
            },

            "&::-webkit-scrollbar-thumb": {
              width: "9px",
              background: "#1A202C",
              borderRadius: "8px",
            },
          }),
          control: (provided) => ({
            ...provided,
            userSelect: "text",
            borderRadius: { base: "20px", lg: "6px" },
            _active: "none",
            _focus: "none",
          }),
          valueContainer: (provided) => ({
            ...provided,
            padding: 0,
          }),
          inputContainer: (provided) => ({
            ...provided,
            pr: "1rem",
            pl: "1rem",
          }),
          placeholder: (provided) => ({
            ...provided,
            userSelect: "text",
            ml: "1rem",
          }),
          input: (provided) => ({
            ...provided,
            pt: "0.125rem",
            pb: "0.125rem",
            height: { base: "50px", lg: "unset" },
            w: {
              base: "calc(100% - 280px - 10px - 10px - 28px)",
              lg: "100%",
            },
            minW: "197px",
          }),
          option: (provided, state) => ({
            ...provided,
            bg: state.isFocused && "#1f2733",
          }),
        }}
        backspaceRemoves={false}
        labelKey="login"
        minimumInput={3}
        onChange={handleChange}
        //   onValueClick={this._goToGithubUser}
        components={customComponents}
        options={asa}
        value={chosen}
        loadOptions={(chosen, CallBack) => {
          chosen.length > 2 &&
            setTimeout(() => {
              const values = asa.filter(
                (i) =>
                  (Object.is(Number(chosen), NaN) == false &&
                    chosen.includes(i.id)) ||
                  (chosen.length > 40 &&
                    i.title
                      .toLowerCase()
                      .includes(`${chosen.toLowerCase()}`)) ||
                  (chosen.length < 40 &&
                    i.value.toLowerCase().includes(chosen.toLowerCase())) ||
                  (chosen.length < 40 &&
                    i.label.toLowerCase().includes(chosen.toLowerCase()))

                // ||
                // chosen.toLowerCase().includes(i.label.toLowerCase() || toString(i.id))

                /*                             i.label.toLowerCase().includes(chosen.toLowerCase())
                 */
              );
              CallBack(
                mobile
                  ? values.slice(0, values.length - (values.length - 5))
                  : values.slice(0, values.length - (values.length - 15))
              );
            }, 1500);
        }}
        instanceId="asa-search"
      />

      {/* <Select
          as={VirtualizedSelect}          
          labelKey='label'
          multi
          onChange={(selectedCreatable) => this.setState({ selectedCreatable })}
          optionHeight={40}
          options={creatableOptions}
          selectComponent={Creatable}
          simpleValue
          value={selectedCreatable}
          valueKey='value'
        /> */}
    </>
  );
};

export default VirtualizedSelectExample;
