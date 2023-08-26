import { useToast, Button, CircularProgress } from "@chakra-ui/react";
import { useState } from "react";
import { AssetOptIn } from "../../lib/goal/AppOptIn";
import { SuccessToast, FailedSwapp } from "./SwapToast";
import { SwapTransaction } from "../../lib/goal/Swap";
import { SwapTransactions } from "../../lib/WalletConnect/Swap";
import { PeraAssetOptIn } from "../../lib/WalletConnect/AppOptIn";
import { RedeemTransaction } from "../../lib/goal/Redeem";
import { isIOS, isAndroid } from "@walletconnect/utils";
import { RedeemTransactions } from "../../lib/WalletConnect/Redeem";

const BuyButton = ({
  assetIndexOne,
  assetIndexTwo,
  type,
  isOptedIn,
  poolAddress,
  value_1,
  value_2,
  account,
  optInAssetId,
  assetOneDecimals,
  assetTwoDecimals,
  poolId,
  confirm,
  setConfirm,
  transacting,
  setTransacting,
  successSwap,
  setSuccessSwap,
  failedSwap,
  setFailedSwap,
  setSwapTx,
  swapTx,
  cleanAll,
  setRedeeming,
  setoptedIn_Asa1,
  setoptedIn_Asa2,
  setRedeemSuccess,
  setRedeemTx,
  redeemSuccess,
}) => {
  const toast = useToast();
  const [onProgress, setOnProgress] = useState(false);
  /**
   *
   * @param {string} account
   * @param {number} assetIndexOne
   */
  const optIn = async (account, assetIndexOne) => {
    try {
      setOnProgress(true);
      if (localStorage.getItem("walletType") == "pera-wallet") {
        // console.log(isIOS());
        if (isIOS() === true) {
          window.location.href = `algorand-wc://`;
        }
        if (isAndroid() === true) {
          window.location.href = `algorand://`;
        }
      }
      const optingIn =
        localStorage.getItem("walletType") == "pera-wallet"
          ? await PeraAssetOptIn(account, assetIndexOne)
          : await AssetOptIn(account, assetIndexOne);
      if (typeof optingIn.confirmed == "number") {
        String(assetIndexOne).includes("-") == false && setoptedIn_Asa1(true);
        if (String(assetIndexOne).includes("-") == true) {
          setoptedIn_Asa1(true);
          setoptedIn_Asa2(true);
        }

        SuccessToast(toast, assetIndexOne, optingIn.txId);
        setOnProgress(false);
      }
    } catch (err) {
      console.error(err);
      err.toString().includes("cancelled") == true
        ? FailedSwapp(toast, "Transaction cancelled.")
        : FailedSwapp(toast, err.toString());
      setOnProgress(false);
    }
  };
  /**
   *
   * @param {string} poolAddress
   * @param {string} account
   * @param {number} assetIndexOne
   * @param {number} assetIndexTwo
   * @param {string} swapType
   * @param {number} outAmount
   * @param {number} inAmount
   * @param {number} assetOneDecimals
   * @param {number} assetTwoDecimals
   * @param {number} poolId
   */
  const performSwap = async (
    poolAddress,
    account,
    assetIndexOne,
    assetIndexTwo,
    swapType,
    outAmount,
    inAmount,
    assetOneDecimals,
    assetTwoDecimals,
    poolId
  ) => {
    try {
      setOnProgress(true);
      if (localStorage.getItem("walletType") == "pera-wallet") {
        if (isIOS() === true) {
          window.location.href = `algorand-wc://`;
        }
        if (isAndroid() === true) {
          window.location.href = `algorand://`;
        }
      }
      const optingIn =
        localStorage.getItem("walletType") == "pera-wallet"
          ? await SwapTransactions(
              poolAddress,
              account,
              Number(assetIndexOne),
              Number(assetIndexTwo),
              swapType,
              outAmount,
              inAmount,
              assetOneDecimals,
              assetTwoDecimals,
              poolId
            )
          : await SwapTransaction(
              poolAddress,
              account,
              Number(assetIndexOne),
              Number(assetIndexTwo),
              swapType,
              outAmount,
              inAmount,
              assetOneDecimals,
              assetTwoDecimals,
              poolId
            );

      if (typeof optingIn.confirmed == "number") {
        setSwapTx({
          in: String(optingIn.finalAmount.in),
          out: String(optingIn.finalAmount.out),
          txId: optingIn.txId,
          redeemAmount:
            optingIn.state != undefined
              ? String(optingIn.state[0].value)
              : null,
          redeemId:
            optingIn.state != undefined
              ? String(optingIn.state[0].assetIndex)
              : null,
        });
        // SuccessToast(toast, assetIndexOne, optingIn.txId, false);
        setTransacting(false);
        setSuccessSwap(true);
        setOnProgress(false);
      }
    } catch (err) {
      setTransacting(false);
      console.error(err);
      err.toString().includes("cancelled") == true
        ? FailedSwapp(toast, "Transaction cancelled.")
        : err.toString().includes("Received status 400") == true
        ? FailedSwapp(
            toast,
            "Received status 400. Logic eval error: - would result negative."
          )
        : FailedSwapp(toast, err.toString());
      setOnProgress(false);
    }
  };
  /**
   *
   * @param {string} poolAddress
   * @param {string} account
   * @param {number} assetIndexOne
   * @param {number} assetIndexTwo
   * @param {number} redeemI
   * @param {number} redeemAmou
   * @param {number} poolId
   */
  const performRedeem = async (
    poolAddress,
    account,
    assetIndexOne,
    assetIndexTwo,
    redeemI,
    redeemAmou,
    poolId
  ) => {
    try {
      setOnProgress(true);
      if (localStorage.getItem("walletType") == "pera-wallet") {
        // console.log(isIOS());
        if (isIOS() === true) {
          window.location.href = `algorand-wc://`;
        }
        if (isAndroid() === true) {
          window.location.href = `algorand://`;
        }
        // window.location.href =
        //   (isIOS() == true && `algorand-wc://`) ||
        //   (isAndroid() == true && `algorand://`);
      }
      const optingIn =
        localStorage.getItem("walletType") == "pera-wallet"
          ? await RedeemTransactions(
              poolAddress,
              account,
              assetIndexOne,
              assetIndexTwo,
              redeemI,
              redeemAmou,
              poolId
            )
          : await RedeemTransaction(
              poolAddress,
              account,
              assetIndexOne,
              assetIndexTwo,
              redeemI,
              redeemAmou,
              poolId
            );
      // console.log(optingIn);

      if (typeof optingIn.confirmed == "number") {
        setRedeemTx(optingIn.txId);
        setTransacting(false);
        setSuccessSwap(true);
        setRedeemSuccess(true);
        setOnProgress(false);
        setRedeeming(false);
      }
    } catch (err) {
      setTransacting(false);
      console.error(err);
      err.toString().includes("cancelled") == true
        ? FailedSwapp(toast, "Transaction cancelled.")
        : FailedSwapp(toast, err.toString());
      setOnProgress(false);
      setRedeeming(false);
    }
  };
  return (
    <>
      {isOptedIn == true ? (
        confirm == true ? (
          transacting == false &&
          (successSwap == false ? (
            <>
              <Button
                mt="7px"
                _hover="none"
                _active="none"
                _focus="none"
                mb="10px"
                fontWeight="600"
                bg="#069dbd"
                onClick={() => {
                  performSwap(
                    poolAddress,
                    account,
                    assetIndexOne,
                    assetIndexTwo,
                    type,
                    value_1,
                    value_2,
                    assetOneDecimals,
                    assetTwoDecimals,
                    poolId
                  );
                  setTransacting(true);
                  // window.location.href = isIOS ? `algorand-wc://` : `algorand://`;
                }}
                width="100%"
              >
                BUY NOW
              </Button>
              <Button
                _hover="none"
                _active="none"
                _focus="none"
                mb="10px"
                fontWeight="600"
                bg="whiteAlpha.200"
                onClick={() => {
                  setConfirm(false);
                  cleanAll();
                }}
                width="100%"
              >
                BACK
              </Button>
            </>
          ) : (
            <>
              {" "}
              {swapTx.redeemAmount != null && redeemSuccess != true && (
                <Button
                  mt="7px"
                  _hover="none"
                  _active="none"
                  _focus="none"
                  mb="10px"
                  fontWeight="600"
                  bg="#069dbd"
                  onClick={() => {
                    performRedeem(
                      poolAddress,
                      account,
                      Number(assetIndexOne),
                      Number(assetIndexTwo),
                      Number(swapTx.redeemId),
                      Number(swapTx.redeemAmount),
                      poolId
                    );
                    setTransacting(true);
                    setRedeeming(true);
                    // window.location.href = isIOS ? `algorand-wc://` : `algorand://`;
                  }}
                  width="100%"
                >
                  REDEEM
                </Button>
              )}
              <Button
                _hover="none"
                _active="none"
                _focus="none"
                mb="10px"
                fontWeight="600"
                bg="whiteAlpha.200"
                onClick={() => {
                  setConfirm(false);
                  cleanAll();
                }}
                width="100%"
              >
                BACK
              </Button>
            </>
          ))
        ) : (
          <Button
            _hover="none"
            _active="none"
            _focus="none"
            mb="10px"
            fontWeight="600"
            bg="#069dbd"
            onClick={() => {
              setConfirm(true);
            }}
            width="100%"
          >
            SWAP
          </Button>
        )
      ) : (
        <Button
          _hover="none"
          _active="none"
          mb="10px"
          _focus="none"
          fontWeight="600"
          isDisabled={onProgress == true ? true : false}
          bg="#069dbd"
          onClick={() => {
            // SuccessToast(
            //   toast,
            //   assetIndexOne,
            //   "HBRMKBXAEWSPHRGXSNSDUG7BBPIBIWNMCGCHWPMFH3JUH5JASBFEXVLJ2A"
            // );
            onProgress == false &&
              optIn(
                account,
                String(optInAssetId).length == 0
                  ? Number(optInAssetId)
                  : optInAssetId
              );
          }}
          width="100%"
        >
          {onProgress == true ? (
            <CircularProgress
              size="30px"
              isIndeterminate
              color="var(--chakra-colors-gray-800)"
            />
          ) : (
            "OPT IN"
          )}
          {/* OPT IN */}
        </Button>
      )}
    </>
  );
};

export default BuyButton;
