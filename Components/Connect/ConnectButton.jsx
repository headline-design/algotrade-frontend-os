import { Button, Text } from "@chakra-ui/react";
import MyAlgo from "@randlabs/myalgo-connect";
import { useRouter } from "next/router";
import axios from "axios";
import { getMinBalance } from "../../lib/goal/utils";
import { minOptInBalance } from "../../lib/goal/constants";

const myAlgoWallet = new MyAlgo();

const ConnectButton = ({
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

  const router = useRouter();

  const connectToMyAlgo = async () => {
    try {
      const settings = {
        shouldSelectOneAccount: true,
        openManager: false,
      };
      const accounts = await myAlgoWallet.connect(settings);
      if (accounts.length > 0) {
        const addresses = accounts.map((account) => account.address);
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
            address: addresses[0],
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
          localStorage.setItem("walletType", "myalgo-wallet");

          router.reload(window.location.pathname);
        }
      }
    } catch (err) {
      console.error(err);
      setOnSuccess("failed");
    }
  };

  return (
    <>
      {onFailed == "true" ? (
        <Button
          pl="40px"
          pr="40px"
          fontSize="0.9rem"
          margin="auto"
          padding="25px"
          fontWeight="600"
          width="120px"
          onClick={() => {
            connectToMyAlgo();
            setOnSuccess("");
          }}
          color="inherit"
          bg="#242e3c"
        >
          TRY AGAIN
        </Button>
      ) : (
        <Text
          fontSize="1.25rem"
          fontWeight="700"
          lineHeight="1.2"
          onClick={() => {
            connectToMyAlgo();
            setConnecting("true");
          }}
          cursor="pointer"
        >
          My Algo Wallet
        </Text>
      )}
    </>
  );
};

export default ConnectButton;
