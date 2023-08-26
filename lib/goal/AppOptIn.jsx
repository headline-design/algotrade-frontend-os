import algodClient from "./Client";
import algosdk, { Algodv2 } from "algosdk";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { getExcessIndex } from "./utils";
import axios from "axios";
function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key]["address"] === value);
}

export const confirmTxn = async (txId) => {
  const myFunc01 = async () => {
    while (true) {
      const status = await algodClient.pendingTransactionInformation(txId).do();

      // console.log(status);
      setTimeout(function () {
        if (
          status["confirmed-round"] == null &&
          status["confirmed-round"] < 0
        ) {
          myFunc01();
        }
      }, 2000);
      if (status["pool-error"]) {
        throw new Error(`Transaction Pool Error: ${status["pool-error"]}`);
      }
      if (status["confirmed-round"]) {
        return status["confirmed-round"];
      }
    }
  };
  const cfm = await myFunc01();
  return cfm;
};

export const getSwapAmount = async (round, account) => {
  const parseState = async () => {
    const { data } = await axios.get(
      `https://mainnet-idx.algonode.cloud/v2/accounts/${account}/transactions?round=${round}`
    );
    if (data != undefined) {
      const swapAmount = {
        in:
          data.transactions[0].sender !== account &&
          data.transactions[0]["tx-type"] == "pay"
            ? data.transactions[0]["payment-transaction"].amount
            : data.transactions[0]["asset-transfer-transaction"].amount,
        out:
          data.transactions[1].sender === account &&
          data.transactions[1]["tx-type"] == "pay"
            ? data.transactions[1]["payment-transaction"].amount
            : data.transactions[1]["asset-transfer-transaction"].amount,
      };
      return swapAmount;
    }
  };

  const stateInfo = await parseState();

  return stateInfo;
};

export const getExcessAmount = async (txId, account) => {
  const parseState = async () => {
    const status = await algodClient.pendingTransactionInformation(txId).do();
    const stateDelta = status["local-state-delta"];
    // console.log(stateDelta[getKeyByValue(stateDelta, account)])

    // const accountKey = stateDelta[getKeyByValue(stateDelta, account)].address;
    // console.log(stateDelta[getKeyByValue(stateDelta, account)])
    // console.log(accountKey)
    if (stateDelta[getKeyByValue(stateDelta, account)] != undefined) {
      for (let x in stateDelta) {
        if (stateDelta[x].address === account) {
          const stateLength = stateDelta[x].delta.length;
          if (stateLength == 1) {
            const state1 = stateDelta[x].delta.map((d) => {
              return {
                assetIndex: getExcessIndex(d.key),
                value: d.value.uint,
              };
            });
            return state1;
          }
        }
      }
    }
  };
  const stateInfo = await parseState();

  return stateInfo;
};

export const AssetOptIn = async (account, assetId) => {
  const params = await algodClient.getTransactionParams().do();
  const txn =
    String(assetId).includes("-") == false
      ? algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
          suggestedParams: {
            ...params,
          },
          from: account,
          to: account,
          assetIndex: Number(assetId),
          amount: 0,
        })
      : [
          algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            suggestedParams: {
              ...params,
            },
            from: account,
            to: account,
            assetIndex: Number(String(assetId).split("-")[0]),
            amount: 0,
          }),
          algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            suggestedParams: {
              ...params,
            },
            from: account,
            to: account,
            assetIndex: Number(String(assetId).split("-")[1]),
            amount: 0,
          }),
        ];
  const groupID =
    String(assetId).includes("-") == true && algosdk.computeGroupID(txn);
  if (String(assetId).includes("-") == true) {
    for (let i = 0; i < 2; i++) txn[i].group = groupID;
  }

  const myAlgoConnect = new MyAlgoConnect();
  let done = [];

  const signedTxn =
    String(assetId).includes("-") == false
      ? await myAlgoConnect.signTransaction(txn.toByte())
      : done.push(
          await myAlgoConnect.signTransaction(txn.map((txn) => txn.toByte()))
        );

  String(assetId).includes("-") == false
    ? await algodClient.sendRawTransaction(signedTxn.blob).do()
    : await algodClient.sendRawTransaction(done[0].map((i) => i.blob)).do();
  const confirmedTx =
    String(assetId).includes("-") == false
      ? await confirmTxn(signedTxn.txID)
      : await confirmTxn(done[0][0].txID);
  return {
    confirmed: confirmedTx,
    txId:
      String(assetId).includes("-") == false ? signedTxn.txID : done[0][0].txID,
  };
};

export const ApplOptIn = async (account) => {
  // console.log(account);
  const params = await algodClient.getTransactionParams().do();
  const txn = algosdk.makeApplicationOptInTxnFromObject({
    suggestedParams: {
      ...params,
    },
    from: account,
    appIndex: 552635992,
  });
  const myAlgoConnect = new MyAlgoConnect();
  const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
  await algodClient.sendRawTransaction(signedTxn.blob).do();
  const confirmedTx = await confirmTxn(signedTxn.txID);
  return confirmedTx;
};

// export const PrepareSwap = async (
//   poolAddress,
//   account,
//   assetIndexOne,
//   assetIndexTwo,
//   swapType,
//   outAmount,
//   inAmount,
//   assetOneDecimals,
//   assetTwoDecimals,
//   poolId
// ) => {
//   const LOGICSIG = getPoolLogicSig(552635992, assetIndex, 0);

//   const params = await algodClient.getTransactionParams().do();

//   const assetIndex = assetIndexOne == 0 ? assetIndexTwo : assetIndexOne;
//   const { assetOutAmount, assetInAmount } = convertAmount(
//     swapType,
//     outAmount,
//     assetOneDecimals,
//     inAmount,
//     assetTwoDecimals
//   );
//   let txnsToGroup = composeGroupTransactions(
//     params,
//     account,
//     poolAddress,
//     swapType,
//     assetIndex,
//     poolId,
//     assetIndexOne,
//     assetOutAmount,
//     assetIndexTwo,
//     assetInAmount
//   );
//   const groupID = algosdk.computeGroupID(txnsToGroup);
//   for (let i = 0; i < 4; i++) txnsToGroup[i].group = groupID;
//   const myAlgoConnect = new MyAlgoConnect();
// };
