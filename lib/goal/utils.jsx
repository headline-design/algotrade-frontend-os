import ReturnDecimals from "../../utils/returnDecimals";
import { bytesToBigInt } from "algosdk";
import { minAppBalance, minAssetBalance, minStateBalance } from "./constants";
/**
 *
 * @param {string} swapType
 * @param {number} outAmount
 * @param {number} assetOneDecimals
 * @param {number} inAmount
 * @param {number} assetTwoDecimals
 * @returns
 */
export const convertAmount = (
  swapType,
  outAmount,
  assetOneDecimals,
  inAmount,
  assetTwoDecimals
) => {
  convertDecimals(Number(outAmount), assetOneDecimals, "add");

  const assetOutAmount =
    swapType == "fi"
      ? convertDecimals(Number(outAmount), assetOneDecimals, "add")
      : // assetOneDecimals != 0
        //   ? Number(
        //       String(outAmount * ReturnDecimals(assetOneDecimals)).replaceAll(
        //         ".",
        //         ""
        //       )
        //     )
        //   : Number(String(outAmount).replaceAll(".", ""))
        convertDecimals(Number(inAmount), assetTwoDecimals, "add");
  // convertDecimals(Number(inAmount), assetTwoDecimals, "add");
  // convertDecimals(Number(outAmount), assetTwoDecimals, "add")
  const assetInAmount =
    swapType == "fi"
      ? convertDecimals(Number(inAmount), assetTwoDecimals, "add")
      : convertDecimals(Number(outAmount), assetTwoDecimals, "add");
  // console.log(assetOutAmount)
  // console.log(assetInAmount)
  return { assetOutAmount: assetOutAmount, assetInAmount: assetInAmount };
};

/**
 *
 * @param {any} hex
 * @returns
 */
export const getExcessIndex = (hex) => {
  const assetIndex = Number(
    bytesToBigInt(Buffer.from(hex.slice(-8), "base64"))
  );
  return assetIndex;
};

/**
 *
 * @param {any} value
 * @param {string} type
 * @returns
 */
function encode_value(value, type) {
  if (type == "int") return encode_varint(value);
  throw new Error(`Unsupported value type ${type}!`);
}

/**
 *
 * @param {number} number
 * @returns
 */
function encode_varint(number) {
  let buf = [];
  let offset = 0;
  while (true) {
    let towrite = number & 0x7f;
    number >>= 7;
    if (number > 0) {
      buf.push(Buffer.from([towrite | 0x80]));
    } else {
      buf.push(Buffer.from([towrite]));
      break;
    }
  }
  return Buffer.concat(buf);
}
/**
 *
 * @param {any} definition
 * @param {any} variables
 * @returns
 */

export const get_program = (definition, variables) => {
  const template = definition["bytecode"];

  const sortedVariables = definition["variables"].sort(
    (a, b) => a["index"] - b["index"]
  );

  let template_bytes = [...new Uint8Array(Buffer.from(template, "base64"))];
  let offset = 0;

  for (const { name, type, index, length } of sortedVariables) {
    const FORMATTED_NAME = name.split("TMPL_")[1].toLowerCase();
    const VALUE = variables[FORMATTED_NAME];
    const START = index - offset;
    const END = START + length;
    const VALUE_ENCODED = encode_value(VALUE, type);
    const VALUE_ENCODED_LENGTH = VALUE_ENCODED.byteLength;
    const DIFF = length - VALUE_ENCODED_LENGTH;
    offset += DIFF;
    template_bytes = template_bytes
      .slice(0, START)
      .concat(...VALUE_ENCODED)
      .concat(template_bytes.slice(END));
  }
  return new Uint8Array(template_bytes);
};

/**
 *
 * @param {any} object
 * @param {any} value
 * @returns
 */

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key]["key"] === value);
}

/**
 *
 * @param {any} data
 * @param {number} asset_1_decimals
 * @param {number} asset_1_id
 * @param {number} asset_2_id
 * @param {number} asset_2_decimals
 */

export const convertReserve = (
  data,
  asset_1_id,
  asset_1_decimals,
  asset_2_id,
  asset_2_decimals
) => {
  const pollAlgod = data["apps-local-state"][0]["key-value"];
  const algoBalance = data.amount;
  const minBalance = data["min-balance"];
  const outStanding =
    asset_2_id == 0 &&
    pollAlgod[getKeyByValue(pollAlgod, "bwAAAAAAAAAA")].value.uint;
  const reserve_1 =
    asset_1_decimals != 0
      ? pollAlgod[getKeyByValue(pollAlgod, "czE=")].value.uint /
        ReturnDecimals(asset_1_decimals)
      : pollAlgod[getKeyByValue(pollAlgod, "czE=")].value.uint;
  const reserve_2 =
    asset_2_id == 0
      ? (algoBalance - minBalance - outStanding) /
        ReturnDecimals(asset_2_decimals)
      : asset_2_id != 0 && asset_2_decimals != 0
      ? pollAlgod[getKeyByValue(pollAlgod, "czI=")].value.uint /
        ReturnDecimals(asset_2_decimals)
      : asset_2_id != 0 &&
        asset_2_decimals == 0 &&
        pollAlgod[getKeyByValue(pollAlgod, "czI=")].value.uint;

  const price = reserve_2 / reserve_1;
  return { reserve_1: reserve_1, reserve_2: reserve_2, asaPrice: price };
};

/**
 *
 * @param {any} x
 * @param {any} y
 * @returns
 */

export const FormatOgPrice = (x, y) => {
  const formatted = x / y;
  return formatted;
};

/**
 *
 * @param {any} x
 * @param {any} y
 * @returns
 */

export const FormatFixedPrice = (x, y) => {
  const formatted = Number(x / y)
    .toFixed(6)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  return formatted;
};

/**
 *
 * @param {any} oldNumber
 * @param {any} newNumber
 * @returns
 */
export const getPercentageChange = (oldNumber, newNumber) => {
  var decreaseValue = oldNumber - newNumber;
  return (decreaseValue / oldNumber) * 100;
};

/**
 *
 * @param {number} n
 * @param {number} p
 * @returns
 */

export const IncreaseFees = (n, p) => {
  return n + n * p;
};

export const getMinBalance = (account) => {
  const appCount =
    account["total-apps-opted-in"] != undefined
      ? account["total-apps-opted-in"] * minAppBalance
      : null;
  const assetCount =
    account["total-assets-opted-in"] != 0
      ? (account["total-assets-opted-in"] + 1) * minAssetBalance
      : 1 * minAssetBalance;
  const stateCount =
    account["apps-total-schema"] != undefined
      ? account["apps-total-schema"]["num-uint"] * minStateBalance
      : null;
  const minBalance = appCount + assetCount + stateCount;
  return minBalance;
};
/**
 *
 * @param {number} number
 * @param {number} points
 * @param {string} func
 * @returns
 */
export const convertDecimals = (number, points, func) => {
  const decimal = Math.pow(10, points);
  if (func == "add") {
    return number * decimal;
  }
  if (func == "minus") {
    return number / decimal;
  }
};
