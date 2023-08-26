import algosdk from "algosdk";
import { get_program } from "./utils";

const data = await import("./asc.json");
const asc = JSON.stringify(data);
const _contracts = JSON.parse(asc.toString());
export const getPoolLogicSig = (validator_app_id, asset1_id, asset2_id) => {
  const pool_logicsig_def = _contracts["contracts"]["pool_logicsig"]["logic"];
  const validator_app_def = _contracts["contracts"]["validator_app"];
  try {
    const ASSETS = [asset1_id, asset2_id];
    const ASSETID1 = Math.max(...ASSETS);
    const ASSETID2 = Math.min(...ASSETS);

    const PROGRAM_BYTES = get_program(pool_logicsig_def, {
      validator_app_id: validator_app_id,
      asset_id_1: ASSETID1,
      asset_id_2: ASSETID2,
    });

    return new algosdk.LogicSigAccount(PROGRAM_BYTES);
  } catch (e) {
    throw e;
  }
};


export const poolIdSig = (validator_app_id) => {
  const pool_logicsig_def = _contracts["contracts"]["pool_logicsig"]["logic"];
  const validator_app_def = _contracts["contracts"]["validator_app"];
  try {

    const PROGRAM_BYTES = get_program(pool_logicsig_def, {
      validator_app_id: validator_app_id,
      asset_id_1: ASSETID1,
      asset_id_2: ASSETID2,
    });

    return new algosdk.LogicSigAccount(PROGRAM_BYTES);
  } catch (e) {
    throw e;
  }
};