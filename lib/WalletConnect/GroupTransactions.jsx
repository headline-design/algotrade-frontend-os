//@ts-check
import algodClient from "../goal/Client";
import { confirmTxn, getExcessAmount, getSwapAmount } from "../goal/AppOptIn";
import { ALGORAND_SIGN_TRANSACTION_REQUEST } from "./constants";
import { connector } from "./walletConnect";
import algosdk from "algosdk";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";

/**
 *
 * @param {any} params
 * @param {string} account
 * @param {string} poolAddress
 * @param {string} swapType
 * @param {number} assetIndex
 * @param {number} poolId
 * @param {number} assetIndexOne
 * @param {number} assetOutAmount
 * @param {number} assetIndexTwo
 * @param {number} assetInAmount
 * @returns
 */

export const composeGroupTransactions = (
  params,
  account,
  poolAddress,
  swapType,
  assetIndex,
  poolId,
  assetIndexOne,
  assetOutAmount,
  assetIndexTwo,
  assetInAmount
) => {
  const composeGroup = () => {
    const payTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      suggestedParams: {
        ...params,
      },
      from: account,
      to: poolAddress,
      amount: 2000,
      note: new Uint8Array(Buffer.from("AQ==", "base64")),
    });
    const appltxn = algosdk.makeApplicationNoOpTxnFromObject({
      suggestedParams: {
        ...params,
      },
      from: poolAddress,
      accounts: [account],
      appArgs: [
        new Uint8Array(Buffer.from("swap")),
        new Uint8Array(Buffer.from(swapType)),
      ],
      appIndex: 552635992,
      foreignAssets:
        assetIndexOne != 0 && assetIndexTwo != 0
          ? [assetIndexTwo, assetIndexOne, poolId]
          : [assetIndex, poolId],
      //@ts-ignore
      fee: 1000,
    });
    const payPoolTxn =
      assetIndexOne == 0
        ? algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            suggestedParams: {
              ...params,
            },
            from: account,
            to: poolAddress,
            amount: assetOutAmount,
            //@ts-ignore
            fee: 1000,
          })
        : algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            suggestedParams: {
              ...params,
            },
            from: account,
            to: poolAddress,
            amount: assetOutAmount,
            assetIndex: assetIndexOne,
            //@ts-ignore
            fee: 1000,
          });
    const asaTxn =
      assetIndexTwo != 0
        ? algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            suggestedParams: {
              ...params,
            },
            from: poolAddress,
            to: account,
            amount: assetInAmount,
            assetIndex: assetIndexTwo,
            //@ts-ignore
            fee: 1000,
          })
        : algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            suggestedParams: {
              ...params,
            },
            from: poolAddress,
            to: account,
            amount: assetInAmount,
            //@ts-ignore
            fee: 1000,
          });
    const groupedArray = [payTxn, appltxn, payPoolTxn, asaTxn];
    return groupedArray;
  };
  const transactionGroup = composeGroup();
  return transactionGroup;
};

/**
 * @param {array} tx
 * @param {string} account
 * @param {string} poolAddress
 * @param {any} LOGICSIG
 */
export const signTransactions = async (tx, account, poolAddress, LOGICSIG) => {
  /**
   *
   * @param {array} tx
   */
  const lol = async (tx) => {
    let qq = [];
    let vv = [];
    tx.map((txn, i) => {
      const FROM = algosdk.encodeAddress(tx[i].from.publicKey);

      const encodedTxn = Buffer.from(
        algosdk.encodeUnsignedTransaction(txn)
      ).toString("base64");
      if (FROM == poolAddress) {
        vv.push(algosdk.signLogicSigTransaction(txn, LOGICSIG));

        qq.push({
          txn: encodedTxn,
          message: "Description of transaction being signed",
          signers: [],
          // Note: if the transaction does not need to be signed (because it's part of an atomic group
          // that will be signed by another party), specify an empty singers array like so:
          // signers: [],
        });
      }
      if (FROM == account) {
        qq.push({
          txn: encodedTxn,
          message: "Description of transaction being signed",
          signers: [account],
          // Note: if the transaction does not need to be signed (because it's part of an atomic group
          // that will be signed by another party), specify an empty singers array like so:
          // signers: [],
        });
      }
    });
    // tx.map(async (txn, i) => {
    //   const FROM = algosdk.encodeAddress(tx[i].from.publicKey);
    //   if (FROM == account) {
    //     qq.push(txn);
    //   }
    //   if (FROM == poolAddress) {
    //     vv.push(algosdk.signLogicSigTransaction(txn, LOGICSIG));
    //   }
    // });
    return { self: qq, log: vv };
  };
  // console.log("Signed transaction: ", Buffer.from(response).toString("base64"));
  const { self, log } = await lol(tx);
  const request = formatJsonRpcRequest(ALGORAND_SIGN_TRANSACTION_REQUEST, [
    self,
  ]);

  const wa = await connector.sendCustomRequest(request);
  const decodedResult = wa.map((element) => {
    return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
  });

  const postRawTx = await algodClient
    .sendRawTransaction([
      decodedResult[0],
      log[0].blob,
      decodedResult[2],
      log[1].blob,
    ])
    .do();
  const confirmedTx = await confirmTxn(postRawTx.txId);
  const appId = log[0].txID;

  const finalAmount = await getSwapAmount(confirmedTx, account);
  const state = await getExcessAmount(appId, account);
  // console.log(finalAmount)
  return {
    confirmed: confirmedTx,
    finalAmount: finalAmount,
    state: state,
    txId: postRawTx.txId,
  };
};
