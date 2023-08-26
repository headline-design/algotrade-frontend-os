import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  Heading,
  useOutsideClick,
  Text,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Link,
  Tooltip,
  Progress,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import { AlgoSvg, ConnectWallet } from "../Icons/Icons";
import { connector } from "../../lib/WalletConnect/walletConnect";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import WalletConnectButton from "../Connect/WalletConnectButton";
import dynamic from "next/dynamic";
import TruncateString from "../../utils/truncateString";
import { useBreakpointValue } from "@chakra-ui/media-query";

import { ApplOptIn } from "../../lib/goal/AppOptIn";
import { PeraApplOptIn } from "../../lib/WalletConnect/AppOptIn";
const ConnectButton = dynamic(() => import("../Connect/ConnectButton"), {
  ssr: false,
});

const ConnectModal = ({ useWallet, trueWidth, head }) => {
  const disconnectWallet = async () => {
    if (!connector.connected) return;
    await connector.killSession();
  };
  const router = useRouter();
  const responsiveImg = useBreakpointValue({ base: 36.5, lg: 36 });
  const [onFailed, setOnFailed] = useState("true");
  const [connecting, setConnecting] = useState("");
  const [onSuccess, setOnSuccess] = useState("");
  const [isOptedIn, setIsOptedIn] = useState("");
  const [addressList, setAddressList] = useState([]);
  const [isSufficient, setIsSufficient] = useState("");
  const [requiredBalance, setRequiredBalance] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const ref = useRef();
  const [isFocus, setFocus] = useState(false);
  useOutsideClick({
    ref: ref,
    handler: () => setFocus(false),
  });
  useEffect(() => {
    if (!isOpen) {
      setConnecting("");
      setOnSuccess("");
      setIsOptedIn("");
      setAddressList();
      setIsSufficient("");
      setRequiredBalance("");
    }
    if (!isOpen && isOptedIn == "false") {
      setConnecting("");
      setOnSuccess("");
      setIsOptedIn("");
      setAddressList();
      setIsSufficient("");
      disconnectWallet();
    }
  }),
    [isOpen];
  const toggleValue = () => {
    setFocus(true);
  };
  const optIn = async (add) => {
    try {
      setConnecting("true");
      const optingIn = !connector.connected
        ? await ApplOptIn(add)
        : await PeraApplOptIn(add);

      if (typeof optingIn == "number") {
        localStorage.setItem("wallet", add);
        !connector.connected
          ? localStorage.setItem("walletType", "myalgo-wallet")
          : localStorage.setItem("walletType", "pera-wallet");
        router.reload(window.location.pathname);
      }
    } catch (err) {
      console.error(err);
      setOnSuccess("failed");
    }
  };
  return (
    <>
      {useWallet == true ? (
        <Box
          onClick={onOpen}
          cursor="pointer"
          bg="#1c9eef"
          position="relative"
          bottom="50%"
          borderRadius="35%"
          width="64px"
          height="64px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <ConnectWallet height="auto" w="30px" />
          <Text lineHeight="1.3" fontSize="0.8rem" fontWeight="500">
            Wallet
          </Text>
        </Box>
      ) : (
        trueWidth == true && (
          <Button
            _focus="none"
            _hover={{bg: "#00819c"}}
            _active="none"
            fontWeight="600"
            height="39px"
            fontSize="0.9rem"
            bg="#069dbd"
            onClick={onOpen}
            mt={trueWidth == true && head == false && "17px"}
            mb={trueWidth == true &&  head == false &&  "7px"}
            width={trueWidth == true &&  head == false &&  "100%"}
          >
            CONNECT WALLET
          </Button>
        )
      )}
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent width={{ base: "87vw", lg: "100%" }}>
          {isOptedIn == "false" ? (
            <>
              <ModalHeader fontWeight="500" fontSize="1.15rem">
                Select account
              </ModalHeader>
              <ModalCloseButton _active="none" _focus="none" />
              <ModalBody pt="20px" pb="35px">
                <Box
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <Box display="flex" alignItems="center">
                      <InfoOutlineIcon />
                    </Box>
                    <Box ml="10px">
                      <Text fontSize="0.9rem" color="white">
                        You need to opt-in to the Tinyman app in order to
                        perform swaps and start using wallet connect feature.
                      </Text>
                    </Box>
                  </Box>
                  <Box
                    onClick={toggleValue}
                    cursor="pointer"
                    borderRadius="8px"
                    mt="37px"
                    bg={isFocus == true ? "#1A202C" : "#242e3c"}
                    padding="20px"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                    >
                      <Heading
                        userSelect="none"
                        as="h4"
                        fontSize="1.1rem"
                        fontWeight="600"
                        lineHeight="1.5"
                      >
                        {addressList &&
                          TruncateString(`${addressList.address}`, 13)}
                      </Heading>
                      <Text userSelect="none" fontSize="0.9rem">
                        {addressList && addressList.assets + 1} assets
                      </Text>
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-end"
                    >
                      <Box display="flex" alignItems="baseline">
                        <AlgoSvg
                          fill={isSufficient == "false" ? "#ff6c4c" : "white"}
                          height="auto"
                          width="13px"
                        />
                        <Text
                          userSelect="none"
                          color={isSufficient == "false" ? "#ff6c4c" : "white"}
                          ml="4px"
                          fontSize="1.1rem"
                          fontWeight="600"
                        >
                          {addressList && addressList.balance / 1000000}
                        </Text>
                      </Box>
                      {isSufficient == "false" ? (
                        <Box borderBottom="dashed 1px" borderColor="#ff6c4c">
                          <Tooltip
                            placement="bottom"
                            fontWeight="500"
                            borderRadius="7px"
                            bg="#2d3b50"
                            paddingLeft="10px"
                            paddingRight="10px"
                            pt="7px"
                            pb="7px"
                            color="white"
                            label={`You need to have at least ${
                              Number(requiredBalance) / 1000000
                            } ALGO to start trading.`}
                            aria-label="A tooltip"
                          >
                            <Text
                              userSelect="none"
                              fontWeight="500"
                              color="#ff6c4c"
                              fontSize="0.9rem"
                            >
                              Insufficient balance
                            </Text>
                          </Tooltip>
                        </Box>
                      ) : (
                        <Box>
                          <Text userSelect="none">Balance</Text>
                        </Box>
                      )}
                    </Box>
                  </Box>
                  <Box
                    mt="15px"
                    display="flex"
                    justifyContent="center"
                    alignContent="center"
                    width="100%"
                  >
                    {isSufficient == "false" ? (
                      <Button pl="30px" pr="30px" isDisabled>
                        OPT-IN
                      </Button>
                    ) : (
                      addressList && (
                        <Button
                          ref={ref}
                          _focus="none"
                          _active="none"
                          isDisabled={isFocus == false ? true : false}
                          onClick={() => {
                            isFocus == true && optIn(`${addressList.address}`);
                          }}
                          pl="30px"
                          pr="30px"
                        >
                          OPT-IN
                        </Button>
                      )
                    )}
                  </Box>
                </Box>
              </ModalBody>
            </>
          ) : (
            <>
              <ModalHeader fontWeight="500" fontSize="1.15rem">
                Choose a wallet
              </ModalHeader>
              <ModalCloseButton _active="none" _focus="none" />
              <ModalBody pt="20px" pb="35px">
                {connecting == "true" ? (
                  <Box
                    padding="43px"
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                  >
                    {onSuccess == "failed" ? (
                      <>
                        <Heading
                          fontSize="1.7rem"
                          fontWeight="600"
                          textAlign="center"
                          marginBottom="20px"
                        >
                          Connection failed
                        </Heading>
                        <ConnectButton
                          setRequiredBalance={setRequiredBalance}
                          setIsSufficient={setIsSufficient}
                          setAddressList={setAddressList}
                          setIsOptedIn={setIsOptedIn}
                          onFailed={onFailed}
                          setOnSuccess={setOnSuccess}
                          setConnecting={setConnecting}
                        />
                      </>
                    ) : (
                      <>
                        <Heading
                          fontSize="1.7rem"
                          fontWeight="600"
                          textAlign="center"
                          marginBottom="20px"
                        >
                          Connecting to <br /> My Algo Wallet
                        </Heading>
                        <Progress
                          borderRadius="11px"
                          size="sm"
                          isIndeterminate
                        />
                      </>
                    )}
                  </Box>
                ) : (
                  <>
                    <Box
                      ml="-4px"
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-start"
                      mb="15px"
                    >
                      <Box display="flex" alignItems="center">
                        <Image
                          src="/myalgo.png"
                          alt="Myalgo wallet"
                          width={responsiveImg}
                          height={responsiveImg}
                        />
                      </Box>
                      <Box
                        ml="10px"
                        borderBottom="1.2px solid var(--chakra-colors-gray-400)"
                      >
                        <ConnectButton
                          setRequiredBalance={setRequiredBalance}
                          setIsSufficient={setIsSufficient}
                          setAddressList={setAddressList}
                          setIsOptedIn={setIsOptedIn}
                          setOnSuccess={setOnSuccess}
                          setConnecting={setConnecting}
                        />
                      </Box>
                    </Box>
                    <Box
                      ml="-4px"
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <Box display="flex" alignItems="center">
                        <Image
                          src="/PeraWalletLogo.a7b5818d.svg"
                          alt="Pera Wallet"
                          width={responsiveImg}
                          height={responsiveImg}
                        />
                      </Box>
                      <Box
                        ml="10px"
                        borderBottom="1.2px solid var(--chakra-colors-gray-400)"
                      >
                        <WalletConnectButton
                          setRequiredBalance={setRequiredBalance}
                          setIsSufficient={setIsSufficient}
                          setAddressList={setAddressList}
                          setIsOptedIn={setIsOptedIn}
                          setOnSuccess={setOnSuccess}
                          setConnecting={setConnecting}
                        />
                      </Box>
                    </Box>
                  </>
                )}
              </ModalBody>
            </>
          )}
          <ModalFooter
          borderBottomRadius="0.375rem"
            bg="#242e3c"
            justifyContent="flex-start"
            pl="40px"
            pr="40px"
            pt="25px"
            pb="25px"
          >
            <Box>
              <Heading
                as="h3"
                fontSize={{ base: "0.85rem", lg: "0.95rem" }}
                fontWeight="500"
                color="var(--chakra-colors-gray-400)"
              >
                How does My Algo work?
              </Heading>
              <Link
                _focus="none"
                _active="none"
                fontSize={{ base: "0.9rem", lg: "1rem" }}
                textDecoration="underline"
                fontWeight="500"
                href="https://wallet.myalgo.com/home#faq"
                isExternal
              >
                Learn more about My Algo wallet
              </Link>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConnectModal;
