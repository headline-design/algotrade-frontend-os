//@ts-check
import algodClient from "../goal/Client";
import algosdk from "algosdk";
import { getPoolLogicSig } from "../goal/contracts";
import { convertAmount } from "../goal/utils";
import {
  composeGroupTransactions,
  signTransactions,
} from "./GroupTransactions";
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
 * @returns
 */

export const SwapTransactions = async (
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
  return { confirmed: confirmed, finalAmount: finalAmount, state: state, txId: txId };
};
