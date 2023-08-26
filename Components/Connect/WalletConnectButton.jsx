import { useRouter } from "next/router";
import axios from "axios";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { connector } from "../../lib/WalletConnect/walletConnect";
import { Text } from "@chakra-ui/react";
import { getMinBalance } from "../../lib/goal/utils";
import { minOptInBalance } from "../../lib/goal/constants";
const WalletConnectButton = ({
  setRequiredBalance,
  setIsSufficient,
  setConnecting,
  setOnSuccess,
  onFailed,
  setIsOptedIn,
  setAddressList,
}) => {
  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key]["id"] === value);
  }
  const proceedConnect = async () => {
    if (connector.connected && connector.accounts.length > 0) {
      const addresses = connector.accounts[0];
      const { data: validateApp } = await axios.get(
        `https://indexer.algoexplorerapi.io/v2/accounts/${addresses}?include-all=true`
      );
      if (
        validateApp.account["apps-local-state"] == undefined ||
        getKeyByValue(validateApp.account["apps-local-state"], 552635992) ==
          undefined
      ) {
        setIsOptedIn("false");
        setAddressList({
          address: addresses,
          assets:
            validateApp.account.assets != undefined
              ? validateApp.account.assets.length
              : 0,
          balance: validateApp.account.amount,
        });
        const requiredBalance = minOptInBalance;
        const minWalletBalance = getMinBalance(validateApp.account);
        if (validateApp.account.amount < requiredBalance + minWalletBalance) {
          setIsSufficient("false");
          setRequiredBalance(`${requiredBalance}`);
        }
      }
      if (
        validateApp.account["apps-local-state"] != undefined &&
        getKeyByValue(validateApp.account["apps-local-state"], 552635992) !=
          undefined
      ) {
        localStorage.setItem("wallet", addresses);
        localStorage.setItem("walletType", "pera-wallet");

        router.reload(window.location.pathname);
      }
    }
  };

  const router = useRouter();
  const connectToMobileWallet = async () => {
    if (connector.connected) return proceedConnect();
    if (connector.pending)
      return QRCodeModal.open(connector.uri, () => {
        // console.log("QR Code Modal closed");
      });
    await connector.createSession();

    connector.on("connect", async (error, payload) => {
      if (error) {
        throw error;
      }
      // Get provided accounts and chainId
      if (connector.connected && connector.accounts.length > 0) {
        const addresses = connector.accounts[0];
        const { data: validateApp } = await axios.get(
          `https://algoindexer.algoexplorerapi.io/v2/accounts/${addresses}`
        );
        if (
          validateApp.account["apps-local-state"] == undefined ||
          getKeyByValue(validateApp.account["apps-local-state"], 552635992) ==
            undefined
        ) {
          setIsOptedIn("false");
          setAddressList({
            address: addresses,
            assets:
              validateApp.account.assets != undefined
                ? validateApp.account.assets.length
                : 0,
            balance: validateApp.account.amount,
          });
          const requiredBalance = minOptInBalance;
          const minWalletBalance = getMinBalance(validateApp.account);
          if (validateApp.account.amount < requiredBalance + minWalletBalance) {
            setIsSufficient("false");
            setRequiredBalance(`${requiredBalance}`);
          }
        }
        if (
          validateApp.account["apps-local-state"] != undefined &&
          getKeyByValue(validateApp.account["apps-local-state"], 552635992) !=
            undefined
        ) {
          localStorage.setItem("wallet", addresses);
          localStorage.setItem("walletType", "pera-wallet");

          router.reload(window.location.pathname);
        }
      }
    });
  };

  return (
    <Text
      fontSize="1.25rem"
      fontWeight="700"
      lineHeight="1.2"
      onClick={connectToMobileWallet}
      cursor="pointer"
    >
      Pera Wallet
    </Text>
  );
};

export default WalletConnectButton;
