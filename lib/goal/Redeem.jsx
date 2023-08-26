import MyAlgoConnect from "@randlabs/myalgo-connect";
import algodClient from "./Client";
import algosdk from "algosdk";
import { getPoolLogicSig } from "./contracts";
import { confirmTxn } from "./AppOptIn";

const signTransactions = async (tx, account, poolAddress, LOGICSIG) => {
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
    .sendRawTransaction([done[0][0].blob, log[0].blob, log[1].blob])
    .do();
  const confirmedTx = await confirmTxn(postRawTx.txId);

  return {
    confirmed: confirmedTx,
    txId: appId,
  };
};

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
            fee: 1000,
          });
    const groupedArray = [payTxn, appltxn, redeemTxn];
    return groupedArray;
  };
  const transactionGroup = composeGroup();
  return transactionGroup;
};

export const RedeemTransaction = async (
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
