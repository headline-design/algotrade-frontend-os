import ReturnDecimals from "../../utils/returnDecimals";
import algodClient from "./Client";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { confirmTxn, getExcessAmount, getSwapAmount } from "./AppOptIn";
import algosdk, { Algodv2 } from "algosdk";

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
            fee: 1000,
          })
        : algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            suggestedParams: {
              ...params,
            },
            from: poolAddress,
            to: account,
            amount: assetInAmount,
            fee: 1000,
          });
    const groupedArray = [payTxn, appltxn, payPoolTxn, asaTxn];
    return groupedArray;
  };
  const transactionGroup = composeGroup();
  return transactionGroup;
};

/**
 * @param {any} tx
 * @param {string} account
 * @param {string} poolAddress
 * @param {any} LOGICSIG
 */
export const signTransactions = async (tx, account, poolAddress, LOGICSIG) => {
  const myAlgoConnect = new MyAlgoConnect();
  const lol = async (tx) => {
    let qq = [];
    let vv = [];
    tx.map(async (txn, i) => {
      const FROM = algosdk.encodeAddress(tx[i].from.publicKey);
      if (FROM == account) {
        qq.push(txn);
      }
      if (FROM == poolAddress) {
        vv.push(algosdk.signLogicSigTransaction(txn, LOGICSIG));
      }
    });
    return { self: qq, log: vv };
  };
  let done = [];
  const { self, log } = await lol(tx);
  done.push(
    await myAlgoConnect.signTransaction(self.map((txn) => txn.toByte()))
  );

  const appId = log[0].txID;
  const postRawTx = await algodClient
    .sendRawTransaction([
      done[0][0].blob,
      log[0].blob,
      done[0][1].blob,
      log[1].blob,
    ])
    .do();

  const confirmedTx = await confirmTxn(postRawTx.txId);
  const finalAmount = await getSwapAmount(confirmedTx, account);

  const state = await getExcessAmount(appId, account);
  return {
    confirmed: confirmedTx,
    finalAmount: finalAmount,
    state: state,
    txId: postRawTx.txId,
  };
};
