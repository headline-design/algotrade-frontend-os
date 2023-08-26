//@ts-check

import {
  IncreaseFees,
  FormatOgPrice,
  FormatFixedPrice,
  getPercentageChange,
} from "./utils";
import MinusFees from "../../utils/minusFees";
/**
 *
 * @param {number} liquidity_1
 * @param {number} liquidity_2
 * @param {number} amount
 * @param {number} slippage
 *
 * @returns
 */

export const fixedInputQuote = (liquidity_1, liquidity_2, amount, slippage) => {
  const input_supply = liquidity_1;
  const output_supply = liquidity_2;
  const k = input_supply * output_supply;
  const asset_in_amount_minus_fee = (amount * 997) / 1000;
  const swap_fees = amount - asset_in_amount_minus_fee;
  const asset_out_amount =
    output_supply - k / (input_supply + asset_in_amount_minus_fee);
  const ogPrice = FormatOgPrice(output_supply, input_supply);
  const impact = getPercentageChange(
    FormatOgPrice(asset_out_amount, amount),
    ogPrice
  );

  const fixedPrice = FormatFixedPrice(asset_out_amount, amount);
  return {
    quote: asset_out_amount,
    impact: impact,
    fees: swap_fees,
    price: fixedPrice,
    with_slippage: MinusFees(asset_out_amount, slippage / 100, ""),
  };
};

/**
 *
 * @param {number} liquidity_1
 * @param {number} liquidity_2
 * @param {number} amount
 * @param {number} slippage
 * @returns
 */
export const fixedOutputQuote = (
  liquidity_1,
  liquidity_2,
  amount,
  slippage
) => {
  const input_supply = liquidity_1;
  const output_supply = liquidity_2;

  const k = input_supply * output_supply;

  const calculated_amount_in_without_fee =
    k / (output_supply - amount) - input_supply;
  const asset_in_amount = (calculated_amount_in_without_fee * 1003) / 1000;
  const swap_fees =
    (asset_in_amount * 1000000) / 1000000 - calculated_amount_in_without_fee;
  const ogPrice = FormatOgPrice(output_supply, input_supply);

  const impact = getPercentageChange(
    FormatOgPrice(amount, asset_in_amount),
    ogPrice
  );

  const amount_in = asset_in_amount;
  const fixedPrice = amount / amount_in;

  const outSlippage = IncreaseFees(
    calculated_amount_in_without_fee * 1.003,
    slippage / 100
  );

  return {
    out: calculated_amount_in_without_fee * 1.003,
    in: amount,
    // quote: asset_out_amount,
    impact: impact,
    fees: swap_fees,
    with_slippage: outSlippage,
    price: fixedPrice,
  };
};

// export const CalculateFixedOutput = (
//   liquidity_1,
//   liquidity_2,
//   amount,
//   slippage,
//   type
// ) => {
//   const input_supply = liquidity_1;
//   const output_supply = liquidity_2;
//   const k = input_supply * output_supply;
//   const asset_in_amount_minus_fee = (amount * 999991) / 1000000;
//   const swap_fees = asset_in_amount_minus_fee;
//   const asset_out_amount =
//   output_supply - k / (input_supply + asset_in_amount_minus_fee);
//   const ogPrice = FormatOgPrice(output_supply, input_supply);
//   const impact = getPercentageChange(FormatOgPrice(asset_out_amount, amount));

//   const fixedPrice = FormatFixedPrice(asset_out_amount, amount);

//   return {
//     quote: asset_out_amount,
//     impact: impact,
//     fees: swap_fees,
//     price: fixedPrice,
//   };
// };

// export const CalculateFixedOutput = (
//   liquidity_2,
//   liquidity_1,
//   amount,
//   slippage,
//   type
// ) => {
//   const input_supply = liquidity_1;
//   const output_supply = liquidity_2;
//   const k = input_supply * output_supply;

//   const calculated_amount_in_without_fee =
//     k / (output_supply - amount) - input_supply;
//   const asset_in_amount = (calculated_amount_in_without_fee * 1000) / 1000;
//   const swap_fees = asset_in_amount - calculated_amount_in_without_fee;
//   // const amount_in = AssetAmount(asset_in, Number(asset_in_amount));
//   const impact = getPercentageChange(FormatOgPrice(asset_in_amount, amount));

//   return {
//     swap_type: "fixed-output",
//     // amount_out: amount_out,
//     impact: impact,
//     quote: asset_in_amount,
//     slippage: slippage,
//   };

//   // const asset_in_amount_minus_fee = (amount * 997) / 1000;
//   // const swap_fees = amount - asset_in_amount_minus_fee;
//   // const asset_out_amount =
//   //   output_supply - k / (input_supply + asset_in_amount_minus_fee);
//   // const ogPrice = FormatOgPrice(output_supply, input_supply);
//   // const impact = getPercentageChange(FormatOgPrice(asset_out_amount, amount));

//   // const fixedPrice = FormatFixedPrice(asset_out_amount, amount);

//   // return {
//   //   quote: asset_out_amount,
//   //   impact: impact,
//   //   fees: swap_fees,
//   //   price: fixedPrice,
//   // };
// };
