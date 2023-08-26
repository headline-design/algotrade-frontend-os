//@ts-check
import algodClient from "../goal/Client";
import algosdk from "algosdk";
import { getPoolLogicSig } from "../goal/contracts";
import { confirmTxn } from "./AppOptIn";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { connector } from "./walletConnect";
import { ALGORAND_SIGN_TRANSACTION_REQUEST } from "./constants";

/**
 *
 * @param {any} tx
 * @param {string} account
 * @param {string} poolAddress
 * @param {any} LOGICSIG
 * @returns
 */

const signTransactions = async (tx, account, poolAddress, LOGICSIG) => {
  /**
   *
   * @param {array} tx
   */
  const lol = async (tx) => {
    let qq = [];
    let vv = [];

    tx.map(async (txn, i) => {
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
        });
      }

      if (FROM == account) {
        qq.push({
          txn: encodedTxn,
          message: "Description of transaction being signed",
          signers: [account],
        });
      }
    });
    return { self: qq, log: vv };
  };
  const { self, log } = await lol(tx);
  const request = formatJsonRpcRequest(ALGORAND_SIGN_TRANSACTION_REQUEST, [
    self,
  ]);
  const wa = await connector.sendCustomRequest(request);

  const decodedResult = wa.map((element) => {
    return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
  });

  const postRawTx = await algodClient
    .sendRawTransaction([decodedResult[0], log[0].blob, log[1].blob])
    .do();
  const confirmedTx = await confirmTxn(postRawTx.txId);
  const appId = log[0].txID;

  return {
    confirmed: confirmedTx,
    txId: appId,
  };
};

/**
 *
 * @param {any} params
 * @param {string} account
 * @param {string} poolAddress
 * @param {number} poolId
 * @param {number} assetIndexOne
 * @param {number} assetIndexTwo
 * @param {number} redeemId
 * @param {number} assetInAmount
 * @returns
 */
const composeGroupTransactions = (
  params,
  account,
  poolAddress,
  poolId,
  assetIndexOne,
  assetIndexTwo,
  redeemId,
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
      //@ts-ignore
      fee: 1000,
      note: new Uint8Array(Buffer.from("AQ==", "base64")),
    });
    const appltxn = algosdk.makeApplicationNoOpTxnFromObject({
      suggestedParams: {
        ...params,
      },
      from: poolAddress,
      accounts: [account],
      appArgs: [new Uint8Array(Buffer.from("redeem"))],
      appIndex: 552635992,
      foreignAssets:
        assetIndexOne != 0 && assetIndexTwo != 0
          ? [assetIndexTwo, assetIndexOne, poolId]
          : [assetIndexOne != 0 ? assetIndexOne : assetIndexTwo, poolId],
      //@ts-ignore
      fee: 1000,
    });
    const redeemTxn =
      redeemId == 0
        ? algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            suggestedParams: {
              ...params,
            },
            from: poolAddress,
            to: account,
            amount: assetInAmount,
            //@ts-ignore
            fee: 1000,
          })
        : algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            suggestedParams: {
              ...params,
            },
            from: poolAddress,
            to: account,
            amount: assetInAmount,
            assetIndex: redeemId,
            //@ts-ignore
            fee: 1000,
          });
    const groupedArray = [payTxn, appltxn, redeemTxn];
    return groupedArray;
  };
  const transactionGroup = composeGroup();
  return transactionGroup;
};

/**
 *
 * @param {string} poolAddress
 * @param {string} account
 * @param {number} assetIndexOne
 * @param {number} assetIndexTwo
 * @param {number} redeemId
 * @param {number} inAmount
 * @param {number} poolId
 * @returns
 */

export const RedeemTransactions = async (
  poolAddress,
  account,
  assetIndexOne,
  assetIndexTwo,
  redeemId,
  inAmount,
  poolId
) => {
  const LOGICSIG = getPoolLogicSig(552635992, assetIndexOne, assetIndexTwo);
  const params = await algodClient.getTransactionParams().do();
  let txnsToGroup = composeGroupTransactions(
    params,
    account,
    poolAddress,
    poolId,
    assetIndexOne,
    assetIndexTwo,
    redeemId,
    inAmount
  );
  const groupID = algosdk.computeGroupID(txnsToGroup);
  for (let i = 0; i < 3; i++) txnsToGroup[i].group = groupID;
  const { confirmed, txId } = await signTransactions(
    txnsToGroup,
    account,
    poolAddress,
    LOGICSIG
  );

  return {
    confirmed: confirmed,
    txId: txId,
  };
};
