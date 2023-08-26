//@ts-check
import algodClient from "../goal/Client";
import algosdk, { Algodv2 } from "algosdk";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { connector } from "./walletConnect";
import { ALGORAND_SIGN_TRANSACTION_REQUEST } from "./constants";

/**
 *
 * @param {string} txId
 */
export const confirmTxn = async (txId) => {
  const myFunc01 = async () => {
    while (true) {
      const status = await algodClient.pendingTransactionInformation(txId).do();

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

/**
 *
 * @param {string} account
 * @param {number} assetId
 * @returns
 */
export const PeraAssetOptIn = async (account, assetId) => {
  // console.log(assetId)
  // console.log(account)
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
          //@ts-ignore
          fee: 0,
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
    String(assetId).includes("-") == true &&
    algosdk.computeGroupID(
      //@ts-ignore
      txn
    );
  if (String(assetId).includes("-") == true) {
    for (let i = 0; i < 2; i++) txn[i].group = groupID;
  }

  const encodedTxn =
    String(assetId).includes("-") != true &&
    Buffer.from(
      algosdk.encodeUnsignedTransaction(
        //@ts-ignore
        txn
      )
    ).toString("base64");

  const peraSign = String(assetId).includes("-") != true && [
    {
      txn: encodedTxn,
      message: "Description of transaction being signed",
      signers: [account],
      // Note: if the transaction does not need to be signed (because it's part of an atomic group
      // that will be signed by another party), specify an empty singers array like so:
      // signers: [],
    },
  ];
  const done = [];
  String(assetId).includes("-") == true &&
    //@ts-ignore
    txn.map(
      /**
       *
       * @param {any} i
       * @returns
       */
      (i) =>
        done.push({
          txn: Buffer.from(algosdk.encodeUnsignedTransaction(i)).toString(
            "base64"
          ),
          message: "Description of transaction being signed",
          signers: [account],
        })
    );

  const requestParams = [String(assetId).includes("-") != true && peraSign];
  const request = formatJsonRpcRequest(
    ALGORAND_SIGN_TRANSACTION_REQUEST,
    String(assetId).includes("-") != true ? requestParams : [done]
  );
  const wa = await connector.sendCustomRequest(request);
  const decodedResult = wa.map(
    /**
     *
     * @param {any} element
     * @returns
     */
    (element) => {
      return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
    }
  );
  const signedTxn =
    String(assetId).includes("-") != true
      ? await algodClient.sendRawTransaction(decodedResult).do()
      : await algodClient
          .sendRawTransaction([decodedResult[0], decodedResult[1]])
          .do();

  const confirmedTx = await confirmTxn(signedTxn.txId);
  return { confirmed: confirmedTx, txId: signedTxn.txId };
};

/**
 *
 * @param {string} account
 * @returns
 */
export const PeraApplOptIn = async (account) => {
  const params = await algodClient.getTransactionParams().do();
  const txn = algosdk.makeApplicationOptInTxnFromObject({
    suggestedParams: {
      ...params,
    },
    from: account,
    appIndex: 552635992,
  });
  const encodedTxn = Buffer.from(
    algosdk.encodeUnsignedTransaction(txn)
  ).toString("base64");
  const peraSign = [
    {
      txn: encodedTxn,
      message: "Description of transaction being signed",
      signers: [account],
      // Note: if the transaction does not need to be signed (because it's part of an atomic group
      // that will be signed by another party), specify an empty singers array like so:
      // signers: [],
    },
  ];
  const requestParams = [peraSign];
  const request = formatJsonRpcRequest(
    ALGORAND_SIGN_TRANSACTION_REQUEST,
    requestParams
  );
  const wa = await connector.sendCustomRequest(request);
  const decodedResult = wa.map((element) => {
    return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
  });
  const signedTxn = await algodClient.sendRawTransaction(decodedResult).do();

  const confirmedTx = await confirmTxn(signedTxn.txID);
  return confirmedTx;
};
