import algodClient from "./Client";
import algosdk, { Algodv2 } from "algosdk";
import { getPoolLogicSig } from "./contracts";
import { convertAmount } from "./utils";
import {
  composeGroupTransactions,
  signTransactions,
} from "./GroupTransactions";

export const SwapTransaction = async (
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


  const assetIndex = assetIndexOne == 0 ? assetIndexTwo : assetIndexOne;
  const { assetOutAmount, assetInAmount } = convertAmount(
    swapType,
    outAmount,
    assetOneDecimals,
    inAmount,
    assetTwoDecimals
  );


  const LOGICSIG = getPoolLogicSig(552635992, assetIndexOne, assetIndexTwo);
  const params = await algodClient.getTransactionParams().do();

  let txnsToGroup = composeGroupTransactions(
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
  );
  const groupID = algosdk.computeGroupID(txnsToGroup);
  for (let i = 0; i < 4; i++) txnsToGroup[i].group = groupID;
  const { confirmed, finalAmount, state, txId } = await signTransactions(
    txnsToGroup,
    account,
    poolAddress,
    LOGICSIG
  );
  return {
    confirmed: confirmed,
    finalAmount: finalAmount,
    state: state,
    txId: txId,
  };
};
