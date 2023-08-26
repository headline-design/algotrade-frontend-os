import { decodeAddress, bytesToBigInt, encodeAddress } from "algosdk";
function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key]["id"] === value);
}

function getKeyByAddress(object, value) {
  return Object.keys(object).find(
    (key) => object[key]["pool_creator"] === value
  );
}

export const getExcessIndex = (hex) => {
  const assetIndex = Number(
    bytesToBigInt(Buffer.from(hex.slice(-8), "base64"))
  );
  return assetIndex;
};
export const getExcessAcc = (hex) => {
  const diu = Buffer.from(hex, "base64");
  const wa = encodeAddress(diu.slice(0, diu.length - 9));

  return wa;
};
export const getExcessAccount = async (asaList, assetsList) => {
  const stateBytes =
    asaList.account["apps-local-state"][
      getKeyByValue(asaList.account["apps-local-state"], 552635992)
    ]["key-value"];
  const parseState = async (z) => {
    let qwe = [];

    for (let x in z) {
      let decodedKey = Buffer.from(z[x]["key"], "base64");
      let pool_address = encodeAddress(
        decodedKey.slice(0, decodedKey.length - 9)
      );
      getKeyByAddress(assetsList, pool_address) != undefined &&
        qwe.push({
          pool_address:
            assetsList[getKeyByAddress(assetsList, pool_address)].pool_creator,
          pool_id:
            assetsList[getKeyByAddress(assetsList, pool_address)].pool_id,
          asset_1_id:
            assetsList[getKeyByAddress(assetsList, pool_address)].asset_1_id,
          asset_1_decimals:
            assetsList[getKeyByAddress(assetsList, pool_address)]
              .asset_1_decimals,
          name: assetsList[getKeyByAddress(assetsList, pool_address)]
            .asset_1_name,
          verified:
            assetsList[getKeyByAddress(assetsList, pool_address)].is_verified,
          excessAsset: getExcessIndex(z[x].key),
          amount: z[x].value.uint,
          xKey: x,
        });

      //   for(x in assetsList) {
      //   if (getKeyByAddress(assetsList, pool_address) != undefined) {
      //     const excessAccount = {
      //       poold_id:
      //         assetsList[getKeyByAddress(assetsList, pool_address)].pool_id,
      //       pool_address:
      //         assetsList[getKeyByAddress(assetsList, pool_address)].pool_creator,
      //       asset_1_id:
      //         assetsList[getKeyByAddress(assetsList, pool_address)].asset_1_id,
      //       asset_2_id:
      //         assetsList[getKeyByAddress(assetsList, pool_address)].asset_2_id,
      //       amount: z[x].value.uint,
      //     };
      //     return excessAccount;
      //   }
      // }
      //   let decodedKey = Buffer.from(x["key"], "base64");

      //   let pool_address = encodeAddress(
      //     decodedKey.slice(0, decodedKey.length - 9)
      //   );

      //   console.log(x);
      // if (stateDelta[x].address === account) {
      //   const stateLength = stateDelta[x].delta.length;
      //   if (stateLength == 1) {
      //     const state1 = stateDelta[x].delta.map((d) => {
      //       return {
      //         assetIndex: getExcessIndex(d.key),
      //         value: d.value.uint,
      //       };
      //     });
      //     return state1;
      //   }
      // }
    }
    return qwe;
  };
  const stateInfo = await parseState(stateBytes);

  return stateInfo;
};

/**
 *
 * @param {any} asa
 * @param {any} key
 * @returns
 */
export const getWalletExcess = (asa, key) => {
  const getKeyByAddress = (object, value) => {
    return Object.keys(object).find(
      (key) => object[key]["asset_1_id"] === value
    );
  };

  return asa[getKeyByAddress(asa, key)];
};

export const getWalletExcesss = (asa, key, ob) => {
  const getKeyByAddress = (object, value, z) => {
    return Object.keys(object).find((key) => object[key][`${z}`] === value);
  };

  return asa[getKeyByAddress(asa, key, ob)];
};

export const getAsaSeo = (seo, value) => {
  return (
    seo &&
    seo[2] != undefined &&
    seo[2][`${value}`] != undefined &&
    seo[2][`${value}`] != null &&
    seo[2][`${value}`]
      .toFixed(seo[0].asset_1_decimals)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
  );
};

export const convertDecimals = (number, points, func) => {
	const decimal = Math.pow(10,points)
    if(func == "add") {      
    	return number * decimal
    }
    if(func == "minus") {      
    	return number / decimal
    }  	
}