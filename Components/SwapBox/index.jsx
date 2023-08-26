import {
  Box,
  NumberInput,
  NumberInputField,
  InputLeftElement,
  InputRightElement,
  Heading,
  IconButton,
  Text,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState, useRef, useContext } from "react";
import ResultsBox from "./Results";
import { SettingsIcon, CheckIcon } from "@chakra-ui/icons";
import dynamic from "next/dynamic";
import { GetAlgo, GetAddress, GetPool } from "../../lib/CustomSWR";
import { ReverseArrow } from "../Icons/Icons";
import InputBox from "./InputBox";
import RedeemBox from "./RedeemBox";
import AnimatedLoading from "./AnimatedText";
import ReturnDecimals from "../../utils/returnDecimals";
import { convertReserve } from "../../lib/goal/utils";
import ConfirmSwap from "./ConfirmSwap";
import { useRouter } from "next/router";
import { fixedInputQuote, fixedOutputQuote } from "../../lib/goal/Pool";
import { AddressContext } from "../../pages/_app";
const BuyButton = dynamic(() => import("./BuyButton"), {
  ssr: false,
});
const ConnectModal = dynamic(() => import("../Wallet/ConnectModal"), {
  ssr: false,
});

const Calculator = ({ poolName, pairs }) => {
  const router = useRouter();
  function getKeyByValuee(object, value) {
    return Object.keys(object).find((key) => object[key]["pool_id"] === value);
  }
  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key]["asset-id"] === value);
  }
  const [optInAssetId, setOptInAssetId] = useState();
  const [optedIn_Asa1, setoptedIn_Asa1] = useState(false);
  const [optedIn_Asa2, setoptedIn_Asa2] = useState(false);

  const [optedIn, setOptedIn] = useState(false);
  const [transacting, setTransacting] = useState(false);

  const account = useContext(AddressContext);
  const { data: algoPrice } = GetAlgo("latest");
  const { data: addressOwner } = GetAddress(account);
  const firstRef = useRef();
  const secondRef = useRef();
  const [liquidity_1, setLiquidity_1] = useState("");
  const [liquidity_2, setLiquidity_2] = useState("");
  const [asa_1_Price, setAsa_1_Price] = useState();
  const [asa_2_Price, setAsa_2_Price] = useState();
  const [price, setPrice] = useState();
  const [type, setType] = useState("");
  const [asaAddress, setAsaAddress] = useState(
    router.asPath.includes("pool") != true
      ? poolName[0] && poolName[0].pool_creator
      : router.asPath.includes("pool") == true &&
        pairs[getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))] !=
          undefined &&
        pairs[getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))]
          .asset_2_id == 0
      ? pairs[getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))] !=
          undefined &&
        pairs[getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))]
          .pool_creator
      : router.asPath.includes("pool") == true &&
        pairs[getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))] !=
          undefined &&
        pairs[getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))]
          .pool_creator
  );
  const [swapImpact, setSwapImpact] = useState();
  const [swapImpactt, setSwapImpactt] = useState();
  const [asaPrice, setAsaPrice] = useState();
  const [confirm, setConfirm] = useState(false);
  const [successSwap, setSuccessSwap] = useState(false);
  const [failedSwap, setFailedSwap] = useState(false);
  const [swapTx, setSwapTx] = useState({
    in: "",
    out: "",
    txId: "",
    redeemAmount: "",
    redeemId: "",
  });
  const [redeemTx, setRedeemTx] = useState("");
  const [value_1, setValue_1] = useState();
  const [value_2, setValue_2] = useState();
  const [slippage, setSlippage] = useState();
  const [fixedOutPut, setFixedOutPut] = useState();
  const [minMax, setMinMax] = useState();
  const [fees, setFees] = useState();
  const [swapState, setSwapState] = useState(false);
  const [swapPrice, setSwapPrice] = useState(false);
  const [redeeming, setRedeeming] = useState(false);
  const [redeemSuccess, setRedeemSuccess] = useState(false);
  const { data } = GetPool(asaAddress);
  const { data: asset1Price } =
    router.asPath.includes("pool") == true &&
    GetPool(poolName[0] && poolName[0].pool_creator);
  const { data: asset2Price } =
    router.asPath.includes("pool") == true &&
    pairs[getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))] !=
      undefined &&
    pairs[getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))]
      .pool_id != poolName[0].pool_id &&
    GetPool(
      pairs[getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))] !=
        undefined &&
        pairs[getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))]
          .algo_pool
    );
  useEffect(() => {
    if (asset1Price) {
      const { asaPrice } =
        router.asPath.includes("pool") == true &&
        convertReserve(
          asset1Price,
          poolName[0].asset_1_id,
          poolName[0].asset_1_decimals,
          poolName[0].asset_2_id,
          poolName[0].asset_2_decimals
        );
      algoPrice &&
        setAsa_1_Price(
          asaPrice *
            (
              algoPrice[algoPrice.length - 1].close_price -
              algoPrice[algoPrice.length - 1].close_price * 0.003
            )
              .toFixed(4)
              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
    }
    if (asset2Price) {
      const { asaPrice } =
        router.asPath.includes("pool") == true &&
        convertReserve(
          asset2Price,
          pairs[
            getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
          ] != undefined &&
            pairs[
              getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
            ].asset_2_id,
          pairs[
            getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
          ] != undefined &&
            pairs[
              getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
            ].asset_2_decimals,
          0,
          6
        );
      algoPrice &&
        setAsa_2_Price(
          asaPrice *
            (
              algoPrice[algoPrice.length - 1].close_price -
              algoPrice[algoPrice.length - 1].close_price * 0.003
            )
              .toFixed(4)
              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
    }
  }, [asset1Price, asset2Price]);
  const [idRef, setIdRef] = useState({
    asset_1_id: `${poolName[0] && poolName[0].asset_1_id}`,
    asset_1_name: poolName[0] && poolName[0].asset_1_name,
    asset_1_decimals: poolName[0] && poolName[0].asset_1_decimals,
    asset_2_id: `${
      router.asPath.includes("pool") != true
        ? poolName[0] && poolName[0].asset_2_id
        : router.asPath.includes("pool") == true &&
          pairs[
            getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
          ] != undefined &&
          pairs[getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))]
            .asset_2_id == 0
        ? poolName[0] && poolName[0].asset_2_id
        : router.asPath.includes("pool") == true &&
          pairs[
            getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
          ] != undefined &&
          pairs[getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))]
            .asset_2_id
    }`,
    asset_2_name:
      router.asPath.includes("pool") != true
        ? poolName[0] && poolName[0].asset_2_name
        : pairs[
            getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
          ] != undefined &&
          pairs[getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))]
            .asset_2_name,
    asset_2_decimals:
      router.asPath.includes("pool") != true
        ? poolName[0] && poolName[0].asset_2_decimals
        : router.asPath.includes("pool") == true &&
          pairs[
            getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
          ] != undefined &&
          pairs[getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))]
            .asset_2_id == 0
        ? poolName[0] && poolName[0].asset_2_decimals
        : router.asPath.includes("pool") == true &&
          pairs[
            getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
          ] != undefined &&
          pairs[getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))]
            .asset_2_decimals,
  });
  const a1balance =
    addressOwner != undefined &&
    idRef.asset_1_id != undefined &&
    idRef.asset_1_id != 0
      ? addressOwner.account.assets[
          getKeyByValue(addressOwner.account.assets, Number(idRef.asset_1_id))
        ] != undefined &&
        addressOwner.account.assets[
          getKeyByValue(addressOwner.account.assets, Number(idRef.asset_1_id))
        ].amount
      : addressOwner != undefined &&
        addressOwner.account != undefined &&
        addressOwner.account.amount;

  // useEffect(() => {
  //   setAsaAddress(poolName[0].pool_creator);
  // }),
  //   [];
  useEffect(() => {
    if (data) {
      const { reserve_1, reserve_2, asaPrice } =
        router.asPath.includes("pool") != true
          ? convertReserve(
              data,
              poolName[0].asset_1_id,
              poolName[0].asset_1_decimals,
              poolName[0].asset_2_id,
              poolName[0].asset_2_decimals
            )
          : router.asPath.includes("pool") == true &&
            pairs[
              getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
            ] != undefined &&
            pairs[
              getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
            ].asset_2_id == 0
          ? convertReserve(
              data,
              poolName[0].asset_1_id,
              poolName[0].asset_1_decimals,
              poolName[0].asset_2_id,
              poolName[0].asset_2_decimals
            )
          : router.asPath.includes("pool") == true &&
            pairs[
              getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
            ] != undefined &&
            convertReserve(
              data,
              poolName[0].asset_1_id,
              poolName[0].asset_1_decimals,
              pairs[
                getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
              ].asset_2_id,
              pairs[
                getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
              ].asset_2_decimals
            );

      setLiquidity_1(`${reserve_1}`);
      setLiquidity_2(`${reserve_2}`);
      algoPrice &&
        setAsaPrice(
          asaPrice *
            (
              algoPrice[algoPrice.length - 1].close_price -
              algoPrice[algoPrice.length - 1].close_price * 0.003
            )
              .toFixed(4)
              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
      // if (addressOwner != undefined) {
      //   try {
      //     let current_id = "";
      //     if (
      //       router.asPath.includes("pool") == true &&
      //       router.asPath.split("pool=")[1] != poolName[0].poolId
      //     ) {
      //       current_id =
      //         pairs[
      //           getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
      //         ] != undefined &&
      //         String(
      //           pairs[
      //             getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
      //           ].asset_2_id
      //         );
      //       console.log(current_id);
      //     }
      //     router.asPath.includes("pool") != true
      //       ? addressOwner.account.assets[
      //           getKeyByValue(
      //             addressOwner.account.assets,
      //             poolName[0].asset_1_id
      //           )
      //         ]["asset-id"] != undefined &&
      //         optedIn == false &&
      //         setOptedIn(true)
      //       : router.asPath.includes("pool") == true &&
      //         pairs[
      //           getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
      //         ] != undefined &&
      //         pairs[
      //           getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
      //         ].asset_2_id == 0
      //       ? addressOwner.account.assets[
      //           getKeyByValue(
      //             addressOwner.account.assets,
      //             poolName[0].asset_1_id
      //           )
      //         ]["asset-id"] != undefined &&
      //         optedIn == false &&
      //         setOptedIn(true)
      //       : router.asPath.includes("pool") == true &&
      //         pairs[
      //           getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
      //         ] != undefined &&
      //         pairs[
      //           getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
      //         ].asset_2_id != undefined &&
      //         optedIn == false &&
      //         setOptedIn(true);
      //   } catch {}
      // }
    }
  }, [data]);

  useEffect(() => {
    let current_id = "";
    // current_id = poolName[0].asset_1_id;

    addressOwner != undefined &&
    addressOwner.account.assets[
      getKeyByValue(addressOwner.account.assets, poolName[0].asset_1_id)
    ] != undefined
      ? optedIn_Asa1 == false && setoptedIn_Asa1(true)
      : (current_id = poolName[0].asset_1_id);
    if (
      addressOwner != undefined &&
      addressOwner.account.assets[
        getKeyByValue(addressOwner.account.assets, poolName[0].asset_1_id)
      ] == undefined
    ) {
      optedIn_Asa1 == false && setOptInAssetId(current_id);
    }
    if (
      (router.asPath.includes("pool") == true &&
        router.asPath.split("pool=")[1] == poolName[0].pool_id) ||
      router.asPath.includes("pool") == false
    ) {
      setoptedIn_Asa2(true);
    }
    if (
      router.asPath.includes("pool") == true &&
      router.asPath.split("pool=")[1] != poolName[0].pool_id
    ) {
      try {
        if (
          pairs[
            getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
          ] != undefined &&
          addressOwner.account.assets[
            getKeyByValue(
              addressOwner.account.assets,
              pairs[
                getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
              ].asset_2_id
            )
          ] != undefined
        ) {
          optedIn_Asa2 == false && setoptedIn_Asa2(true);
        }
        //  optedIn_Asa2 == false && setoptedIn_Asa2(true)
        if (
          pairs[
            getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
          ] != undefined &&
          addressOwner.account.assets[
            getKeyByValue(
              addressOwner.account.assets,
              pairs[
                getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
              ].asset_2_id
            )
          ] == undefined
        ) {
          String(current_id).length == 0
            ? setOptInAssetId(
                `${
                  pairs[
                    getKeyByValuee(
                      pairs,
                      Number(router.asPath.split("pool=")[1])
                    )
                  ].asset_2_id
                }`
              )
            : setOptInAssetId(
                `${poolName[0].asset_1_id}-${
                  pairs[
                    getKeyByValuee(
                      pairs,
                      Number(router.asPath.split("pool=")[1])
                    )
                  ].asset_2_id
                }`
              );
          // optedIn_Asa2 == false && setoptedIn_Asa2(true);
        }
        // : (optedIn == false || optedIn == true) && setOptedIn(false);
        // current_id =
        //   pairs[
        //     getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
        //   ] != undefined &&
        //   String(
        //     pairs[
        //       getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))
        //     ].asset_2_id
        //   );
      } catch {}
    }
  }, [addressOwner, pairs]);
  useEffect(() => {
    optedIn_Asa1 == true && optedIn_Asa2 == true && setOptedIn(true);
  }, [optedIn_Asa1, optedIn_Asa2]);
  const handlePriceChange = (value_1) => {
    const {
      quote,
      impact,
      fees: feess,
      price: z,
      with_slippage,
    } = router.asPath.includes("pool") != true
      ? fixedInputQuote(
          idRef.asset_1_id == `${poolName[0].asset_1_id}`
            ? Number(liquidity_1)
            : Number(liquidity_2),
          idRef.asset_1_id == `${poolName[0].asset_1_id}`
            ? Number(liquidity_2)
            : Number(liquidity_1),
          value_1,
          slippage == null ? 0.5 : slippage
        )
      : router.asPath.includes("pool") == true &&
        pairs[getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))] !=
          undefined &&
        pairs[getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))]
          .asset_2_id == 0
      ? fixedInputQuote(
          idRef.asset_1_id == `${poolName[0].asset_1_id}`
            ? Number(liquidity_1)
            : Number(liquidity_2),
          idRef.asset_1_id == `${poolName[0].asset_1_id}`
            ? Number(liquidity_2)
            : Number(liquidity_1),
          value_1,
          slippage == null ? 0.5 : slippage
        )
      : router.asPath.includes("pool") == true &&
        pairs[getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))] !=
          undefined &&
        pairs[getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))]
          .asset_2_id != 0 &&
        fixedInputQuote(
          poolName[0].asset_1_id == firstRef.current.id
            ? Number(liquidity_1)
            : Number(liquidity_2),
          poolName[0].asset_1_id == firstRef.current.id
            ? Number(liquidity_2)
            : Number(liquidity_1),
          value_1,
          slippage == null ? 0.5 : slippage
        );

    setSwapImpact(
      impact
        .toFixed(3)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        .split("-")[1]
    );
    setType("fi");
    setValue_1(value_1);
    setValue_2(
      quote.toFixed(idRef.asset_2_decimals).replace(/\d(?=(\d{3})+\.)/g, "$&,")
    );
    setMinMax(with_slippage);
    setFees(feess);
    setPrice(z.replaceAll(",", ""));
  };

  const handlePriceChange_1 = (value_2) => {
    const {
      in: p,
      out,
      impact,
      fees: feess,
      price: z,
      with_slippage,
    } = router.asPath.includes("pool") != true
      ? fixedOutputQuote(
          idRef.asset_2_id == `${poolName[0].asset_2_id}`
            ? Number(liquidity_1)
            : Number(liquidity_2),
          idRef.asset_2_id == `${poolName[0].asset_2_id}`
            ? Number(liquidity_2)
            : Number(liquidity_1),
          value_2,
          slippage == null ? 0.5 : slippage
        )
      : router.asPath.includes("pool") == true &&
        pairs[getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))] !=
          undefined &&
        pairs[getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))]
          .asset_2_id == 0
      ? fixedOutputQuote(
          idRef.asset_2_id == `${poolName[0].asset_2_id}`
            ? Number(liquidity_1)
            : Number(liquidity_2),
          idRef.asset_2_id == `${poolName[0].asset_2_id}`
            ? Number(liquidity_2)
            : Number(liquidity_1),
          value_2,
          slippage == null ? 0.5 : slippage
        )
      : router.asPath.includes("pool") == true &&
        pairs[getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))] !=
          undefined &&
        pairs[getKeyByValuee(pairs, Number(router.asPath.split("pool=")[1]))]
          .asset_2_id != 0 &&
        fixedOutputQuote(
          idRef.asset_2_id != `${poolName[0].asset_1_id}`
            ? Number(liquidity_1)
            : Number(liquidity_2),
          idRef.asset_2_id != `${poolName[0].asset_1_id}`
            ? Number(liquidity_2)
            : Number(liquidity_1),
          value_2,
          slippage == null ? 0.5 : slippage
        );
    setSwapImpact(
      impact
        .toFixed(3)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        .split("-")[1]
    );

    setType("fo");
    setValue_2(value_2);
    setValue_1(
      out.toFixed(idRef.asset_1_decimals).replace(/\d(?=(\d{3})+\.)/g, "$&,")
    );
    setMinMax(with_slippage);
    setFees(feess);
    setPrice(
      idRef.asset_2_id == secondRef.current.id
        ? z.toFixed(idRef.asset_2_decimals).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        : (value_2 / value_1)
            .toFixed(idRef.asset_2_decimals)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
    );
  };
  useEffect(() => {
    if (value_1 != NaN && value_2 != NaN) {
      if (confirm == false) {
        type == "fi" && handlePriceChange(value_1);
        type == "fo" && handlePriceChange_1(value_2);
      }
    }
  }),
    [liquidity_2];
  const swapRef = () => {
    setIdRef({
      asset_1_id:
        idRef.asset_1_id != secondRef.current.id
          ? secondRef.current.id
          : firstRef.current.id,
      asset_1_name:
        idRef.asset_1_name != secondRef.current.name
          ? secondRef.current.name
          : firstRef.current.name,
      asset_1_decimals:
        idRef.asset_1_decimals != idRef.asset_2_decimals
          ? idRef.asset_2_decimals
          : idRef.asset_1_decimals,
      asset_2_id:
        idRef.asset_2_id != firstRef.current.id
          ? firstRef.current.id
          : secondRef.current.id,
      asset_2_name:
        idRef.asset_2_name != firstRef.current.name
          ? firstRef.current.name
          : secondRef.current.name,
      asset_2_decimals:
        idRef.asset_2_decimals != idRef.asset_1_decimals
          ? idRef.asset_1_decimals
          : idRef.asset_2_decimals,
    });

    const swapValue = () => {
      if (price != undefined) {
        type == "fi"
          ? handlePriceChange_1(value_1)
          : handlePriceChange(value_2);
      }
    };
    swapValue();
    swapPrice == false ? setSwapPrice(true) : setSwapPrice(false);
  };
  const cleanAll = () => {
    setTransacting(false);
    setConfirm(false);
    setSuccessSwap(false);
    setFailedSwap(false);
    setSwapTx({
      in: "",
      out: "",
      txId: "",
      redeemAmount: "",
      redeemId: "",
    });
    setRedeemTx("");
    setRedeemSuccess(false);
  };
  return (
    <Box
      bg="#1f2733"
      padding="15px"
      borderTopRadius={{ base: "0", llg: "5px" }}
      borderBottomRadius={{ base: "0", llg: "5px" }}
      // borderRadius="5px"
      mt={{ base: "0", llg: "15px" }}
      pt={{ base: "0", llg: "10px" }}
      pb="10px"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          {successSwap == true ? (
            transacting == false ? (
              <>
                <CheckIcon
                  padding="4.5px"
                  w="1.25rem"
                  h="1.15rem"
                  mr="8px"
                  mb="3.5px"
                  borderRadius="8px"
                  color="var(--chakra-colors-gray-800)"
                  bg="rgb(70 214 160)"
                />
                <Heading
                  as="h2"
                  fontSize="1.06rem"
                  mb="3.5px"
                  color="rgb(70 214 160)"
                  fontWeight="500"
                >
                  Swap completed!
                </Heading>
              </>
            ) : (
              <>
                <Heading
                  as="h2"
                  fontSize="1.06rem"
                  mb="3.5px"
                  color="rgb(70 214 160)"
                  fontWeight="500"
                >
                  {redeeming != true ? "Transacting" : "Redeeming"}
                </Heading>
                {/* <AnimatedLoading /> */}
              </>
            )
          ) : (
            <Heading as="h2" fontSize="1.2rem" mb="3.5px" fontWeight="500">
              {confirm == false
                ? "Swap"
                : transacting == false
                ? "Sign transaction"
                : transacting == true && redeeming == true
                ? "Redeeming"
                : "Transacting"}
            </Heading>
          )}

          {transacting == true && <AnimatedLoading />}
        </Box>
        <Box>
          {confirm == false && (
            <IconButton
              isDisabled
              _focus="none"
              _active="none"
              bg="none"
              width="32px"
              height="37px"
              aria-label="Search database"
              icon={<SettingsIcon />}
            />
          )}
        </Box>
      </Box>
      {confirm == false ? (
        <>
          <InputBox
            refId={idRef.asset_1_id}
            refName={idRef.asset_1_name}
            asaId={poolName[0] && poolName[0].asset_1_id}
            asaName={poolName[0] && poolName[0].asset_1_name}
            asaVerified={poolName[0] && poolName[0].is_verified}
            decimals={idRef.asset_1_decimals}
            wallet={addressOwner}
            algo={algoPrice}
            asaPrice={
              router.asPath.includes("pool") != true
                ? asaPrice
                : router.asPath.includes("pool") == true &&
                  router.asPath.split("pool=")[1] == poolName[0].pool_id
                ? asaPrice
                : router.asPath.includes("pool") == true &&
                  router.asPath.split("pool=")[1] != poolName[0].pool_id &&
                  idRef.asset_1_id == poolName[0].asset_1_id
                ? asa_1_Price
                : asa_2_Price
            }
            hideBalance={account == false ? true : false}
          />
          <NumberInput
            ref={firstRef}
            id={idRef.asset_1_id}
            onChange={(value_1) => {
              handlePriceChange(value_1);
            }}
            value={type == "fi" && Number(value_1) > 0 ? value_1 : value_1}
          >
            <NumberInputField
              height="63px"
              placeholder="0.00"
              pb={
                value_1 != undefined && Number(value_1.replaceAll(",", "")) > 0
                  ? "15px"
                  : "0"
              }
              ref={firstRef}
              name={`${idRef.asset_1_name}`}
              _focus="none"
              _active="none"
              fontSize="1.3rem"
            />
            <InputLeftElement
              pt="47px"
              width="auto"
              pointerEvents="none"
              pl="19px"
              children={
                value_1 != undefined &&
                Number(value_1.replaceAll(",", "")) > 0 && (
                  <Text color="#b3bac1" fontSize="0.75rem">
                    {idRef.asset_1_id ==
                    `${poolName[0] && poolName[0].asset_1_id}`
                      ? type == "fi"
                        ? `= $ ${(
                            Number(value_1) *
                            Number(
                              router.asPath.includes("pool") != true
                                ? asaPrice
                                : router.asPath.includes("pool") == true &&
                                  idRef.asset_1_id == poolName[0].asset_1_id
                                ? asa_1_Price
                                : asa_2_Price
                            )
                          )
                            .toFixed(idRef.asset_1_decimals)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
                        : value_1 != undefined &&
                          `= $ ${(
                            value_1 != undefined &&
                            Number(value_1.replaceAll(",", "")) *
                              Number(
                                router.asPath.includes("pool") != true
                                  ? asaPrice
                                  : router.asPath.includes("pool") == true &&
                                    idRef.asset_1_id == poolName[0].asset_1_id
                                  ? asa_1_Price
                                  : asa_2_Price
                              )
                          )
                            .toFixed(idRef.asset_1_decimals)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
                      : idRef.asset_1_id == 0
                      ? algoPrice &&
                        `= $ ${(
                          Number(value_1) *
                          (algoPrice[algoPrice.length - 1].close_price -
                            algoPrice[algoPrice.length - 1].close_price * 0.003)
                        )
                          .toFixed(idRef.asset_1_decimals)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
                      : `= $ ${(
                          Number(value_1) *
                          (router.asPath.includes("pool") != true
                            ? asaPrice
                            : router.asPath.includes("pool") == true &&
                              idRef.asset_1_id == poolName[0].asset_1_id
                            ? asa_1_Price
                            : asa_2_Price)
                        )
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}
                  </Text>
                )
              }
            />
            {account != false &&
              String(
                addressOwner != undefined &&
                  idRef != undefined &&
                  idRef.asset_1_id != 0
                  ? addressOwner.account.assets[
                      getKeyByValue(
                        addressOwner.account.assets,
                        Number(idRef.asset_1_id)
                      )
                    ] != undefined &&
                      addressOwner.account.assets[
                        getKeyByValue(
                          addressOwner.account.assets,
                          Number(idRef.asset_1_id)
                        )
                      ].amount
                  : addressOwner != undefined &&
                      addressOwner.account != undefined &&
                      addressOwner.account.amount
              ) != 0 &&
              optedIn == true && (
                <InputRightElement
                  width="auto"
                  pr="19px"
                  cursor="pointer"
                  onClick={() => {
                    handlePriceChange(
                      String(
                        addressOwner != undefined &&
                          idRef != undefined &&
                          idRef.asset_1_id != 0
                          ? addressOwner.account.assets[
                              getKeyByValue(
                                addressOwner.account.assets,
                                Number(idRef.asset_1_id)
                              )
                            ] != undefined &&
                              addressOwner.account.assets[
                                getKeyByValue(
                                  addressOwner.account.assets,
                                  Number(idRef.asset_1_id)
                                )
                              ].amount / ReturnDecimals(idRef.asset_1_decimals)
                          : addressOwner != undefined &&
                              addressOwner.account != undefined &&
                              addressOwner.account.amount /
                                ReturnDecimals(idRef.asset_1_decimals)
                      )
                    );
                  }}
                  height="100%"
                  userSelect="none"
                  children={
                    value_1 != undefined &&
                    Number(value_1.replaceAll(",", "")) > 0 && (
                      <Box
                        bg="#253248"
                        pt="7px"
                        pb="7px"
                        pl="17px"
                        pr="17px"
                        borderRadius="8px"
                      >
                        <Text color="white" fontSize="0.85rem" fontWeight="500">
                          MAX
                        </Text>
                      </Box>
                    )
                  }
                />
              )}
          </NumberInput>
          <Box
            userSelect="none"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ReverseArrow
              userSelect="none"
              onClick={() => {
                swapRef();
              }}
              mt="11px"
              mb="11px"
              cursor="pointer"
              h="auto"
              w="18px"
              fill="white"
            />
          </Box>
          <InputBox
            refId={idRef.asset_2_id}
            refName={idRef.asset_2_name}
            asaId={poolName[0] && poolName[0].asset_2_id}
            asaName={poolName[0] && poolName[0].asset_2_name}
            asaVerified={poolName[0] && poolName[0].is_verified}
            decimals={idRef.asset_2_decimals}
            wallet={addressOwner}
            algo={algoPrice}
            asaPrice={
              router.asPath.includes("pool") != true
                ? asaPrice
                : router.asPath.includes("pool") == true &&
                  router.asPath.split("pool=")[1] == poolName[0].pool_id
                ? asaPrice
                : router.asPath.includes("pool") == true &&
                  router.asPath.split("pool=")[1] != poolName[0].pool_id &&
                  idRef.asset_2_id != poolName[0].asset_1_id
                ? asa_2_Price
                : asa_1_Price
            }
            hideBalance={account == false ? true : false}
          />
          <NumberInput
            ref={secondRef}
            id={idRef.asset_2_id}
            value={type == "fo" && Number(value_2) > 0 ? value_2 : value_2}
            onChange={(value_2) => {
              handlePriceChange_1(value_2);
            }}
          >
            <NumberInputField
              height="63px"
              pb={
                value_2 != undefined && Number(value_2.replaceAll(",", "")) > 0
                  ? "15px"
                  : "0"
              }
              placeholder="0.00"
              ref={secondRef}
              name={`${idRef.asset_2_name}`}
              _focus="none"
              _active="none"
              fontSize="1.3rem"
            />
            <InputLeftElement
              pt="47px"
              pl="19px"
              width="auto"
              pointerEvents="none"
              children={
                value_2 != undefined &&
                Number(value_2.replaceAll(",", "")) > 0 && (
                  <Text color="#b3bac1" fontSize="0.75rem">
                    {router.asPath.includes("pool") != true &&
                      (idRef.asset_2_id ==
                      `${poolName[0] && poolName[0].asset_1_id}`
                        ? value_2 != undefined &&
                          `= $ ${(
                            Number(value_2.replaceAll(",", "")) * asaPrice
                          )
                            .toFixed(idRef.asset_2_decimals)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
                        : algoPrice &&
                          value_2 != undefined &&
                          `= $ ${(
                            Number(value_2.replaceAll(",", "")) *
                            (algoPrice[algoPrice.length - 1].close_price -
                              algoPrice[algoPrice.length - 1].close_price *
                                0.003)
                          )
                            .toFixed(idRef.asset_2_decimals)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`)}
                    {router.asPath.includes("pool") == true &&
                      router.asPath.split("pool=")[1] == poolName[0].pool_id &&
                      (idRef.asset_2_id ==
                      `${poolName[0] && poolName[0].asset_1_id}`
                        ? value_2 != undefined &&
                          `= $ ${(
                            Number(value_2.replaceAll(",", "")) * asaPrice
                          )
                            .toFixed(idRef.asset_2_decimals)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
                        : algoPrice &&
                          value_2 != undefined &&
                          `= $ ${(
                            Number(value_2.replaceAll(",", "")) *
                            (algoPrice[algoPrice.length - 1].close_price -
                              algoPrice[algoPrice.length - 1].close_price *
                                0.003)
                          )
                            .toFixed(idRef.asset_2_decimals)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`)}
                    {router.asPath.includes("pool") == true &&
                      router.asPath.split("pool=")[1] != poolName[0].pool_id &&
                      (idRef.asset_2_id ==
                      `${poolName[0] && poolName[0].asset_1_id}`
                        ? value_2 != undefined &&
                          `= $ ${(
                            Number(value_2.replaceAll(",", "")) * asa_1_Price
                          )
                            .toFixed(idRef.asset_2_decimals)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
                        : value_2 != undefined &&
                          `= $ ${(
                            Number(value_2.replaceAll(",", "")) * asa_2_Price
                          )
                            .toFixed(idRef.asset_2_decimals)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`)}
                  </Text>
                )
              }
            />
            {account != false &&
              optedIn == true &&
              String(
                addressOwner != undefined &&
                  idRef != undefined &&
                  idRef.asset_2_id != 0
                  ? addressOwner.account.assets[
                      getKeyByValue(
                        addressOwner.account.assets,
                        Number(idRef.asset_2_id)
                      )
                    ] != undefined &&
                      addressOwner.account.assets[
                        getKeyByValue(
                          addressOwner.account.assets,
                          Number(idRef.asset_2_id)
                        )
                      ].amount
                  : addressOwner != undefined &&
                      addressOwner.account != undefined &&
                      addressOwner.account.amount
              ) != 0 && (
                <InputRightElement
                  width="auto"
                  pr="19px"
                  cursor="pointer"
                  onClick={() => {
                    handlePriceChange_1(
                      String(
                        addressOwner != undefined &&
                          idRef != undefined &&
                          idRef.asset_2_id != 0
                          ? addressOwner.account.assets[
                              getKeyByValue(
                                addressOwner.account.assets,
                                Number(idRef.asset_2_id)
                              )
                            ] != undefined &&
                              addressOwner.account.assets[
                                getKeyByValue(
                                  addressOwner.account.assets,
                                  Number(idRef.asset_2_id)
                                )
                              ].amount / ReturnDecimals(idRef.asset_2_decimals)
                          : addressOwner != undefined &&
                              addressOwner.account != undefined &&
                              addressOwner.account.amount /
                                ReturnDecimals(idRef.asset_2_decimals)
                      )
                    );
                  }}
                  height="100%"
                  userSelect="none"
                  children={
                    value_1 != undefined &&
                    Number(value_1.replaceAll(",", "")) > 0 && (
                      <Box
                        bg="#253248"
                        pt="7px"
                        pb="7px"
                        pl="17px"
                        pr="17px"
                        borderRadius="8px"
                      >
                        <Text color="white" fontSize="0.85rem" fontWeight="500">
                          MAX
                        </Text>
                      </Box>
                    )
                  }
                />
              )}
          </NumberInput>
          
          {fees != undefined && Number(fees) > 0 && (
            <Box
              pt="10px"
              pb="10px"
              borderRadius="5px"
              pr="15px"
              pl="15px"
              bg="#242e3c"
              mt="19px"
              display="flex"
              alignItems="baseline"
              justifyContent="space-between"
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                width="100%"
              >
                <Box display="flex" justifyContent="space-between" width="100%">
                  <Text fontSize="0.9rem" fontWeight="500">
                    1 {idRef.asset_1_name} = {""}
                  </Text>
                  <Text
                    ml="5px"
                    fontSize="0.9rem"
                    fontWeight="500"
                    textAlign="right"
                  >{` ${price} ${idRef.asset_2_name}`}</Text>
                </Box>
              </Box>
            </Box>
          )}

          {fees != undefined && Number(fees) > 0 && (
            <ResultsBox
              setSlippage={setSlippage}
              slippage={slippage}
              type={type}
              decimals={poolName}
              idRef={idRef}
              value={value_1}
              impact={swapImpact}
              fees={fees}
              minMax={minMax}
              received={value_2}
              liquidity_1={liquidity_1}
              liquidity_2={liquidity_2}
              optInAssetId={optInAssetId}
              isOptedIn={optedIn}
              account={account}
            />
          )}
        </>
      ) : (
        <>
          {transacting == false ? (
            successSwap == false ? (
              <>
                <ConfirmSwap
                  type={type}
                  idRef={idRef}
                  minMax={
                    type == "fi"
                      ? minMax
                          .toFixed(idRef.asset_2_decimals)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                      : minMax
                          .toFixed(idRef.asset_1_decimals)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                  }
                  outAmount={value_1}
                  inAmount={value_2}
                  asaVerified={poolName[0] && poolName[0].is_verified}
                  successSwap={successSwap}
                  swapTx={swapTx}
                >
                  {" "}
                  <ResultsBox
                    setSlippage={setSlippage}
                    slippage={slippage}
                    type={type}
                    decimals={poolName}
                    idRef={idRef}
                    value={value_1}
                    impact={swapImpact}
                    fees={fees}
                    confirmTrue={true}
                    minMax={minMax}
                    received={value_2}
                    liquidity_1={liquidity_1}
                    liquidity_2={liquidity_2}
                    isOptedIn={optedIn}
                    account={account}
                  />
                </ConfirmSwap>
              </>
            ) : (
              <>
                <ConfirmSwap
                  type={type}
                  idRef={idRef}
                  minMax={
                    type == "fi"
                      ? minMax
                          .toFixed(idRef.asset_2_decimals)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                      : minMax
                          .toFixed(idRef.asset_1_decimals)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                  }
                  outAmount={value_1}
                  inAmount={value_2}
                  asaVerified={poolName[0] && poolName[0].is_verified}
                  successSwap={successSwap}
                  swapTx={swapTx}
                >
                  <RedeemBox
                    redeeming={redeeming}
                    redeemSuccess={redeemSuccess}
                    swapTx={swapTx}
                    idRef={idRef}
                    txId={redeemTx}
                  />
                </ConfirmSwap>
              </>
            )
          ) : redeeming == false ? (
            successSwap == false ? (
              <ConfirmSwap
                type={type}
                idRef={idRef}
                minMax={
                  type == "fi"
                    ? minMax
                        .toFixed(idRef.asset_2_decimals)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                    : minMax
                        .toFixed(idRef.asset_1_decimals)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                }
                outAmount={value_1}
                inAmount={value_2}
                asaVerified={poolName[0] && poolName[0].is_verified}
                transacting={transacting}
                successSwap={successSwap}
                swapTx={swapTx}
              />
            ) : (
              <ConfirmSwap
                type={type}
                idRef={idRef}
                minMax={
                  type == "fi"
                    ? minMax
                        .toFixed(idRef.asset_2_decimals)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                    : minMax
                        .toFixed(idRef.asset_1_decimals)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                }
                outAmount={value_1}
                inAmount={value_2}
                asaVerified={poolName[0] && poolName[0].is_verified}
                successSwap={successSwap}
                swapTx={swapTx}
              >
                <RedeemBox
                  redeeming={redeeming}
                  redeemSuccess={redeemSuccess}
                  swapTx={swapTx}
                  idRef={idRef}
                  txId={redeemTx}
                />
              </ConfirmSwap>
            )
          ) : (
            <ConfirmSwap
              type={type}
              idRef={idRef}
              minMax={
                type == "fi"
                  ? minMax
                      .toFixed(idRef.asset_2_decimals)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                  : minMax
                      .toFixed(idRef.asset_1_decimals)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
              }
              outAmount={value_1}
              inAmount={value_2}
              asaVerified={poolName[0] && poolName[0].is_verified}
              successSwap={successSwap}
              swapTx={swapTx}
            >
              {" "}
              {redeeming == true && (
                <RedeemBox
                  redeeming={redeeming}
                  redeemSuccess={redeemSuccess}
                  swapTx={swapTx}
                  idRef={idRef}
                />
              )}
            </ConfirmSwap>
          )}
        </>
      )}
      {account == false && <ConnectModal head={false} trueWidth={true} />}
      {account != false &&
        (fees != undefined && Number(fees) > 0 ? (
          optedIn == true &&
          successSwap == false &&
          (type == "fi"
            ? Number(a1balance != undefined && a1balance) === 0 ||
              Number(value_1) >
                Number(
                  a1balance != undefined && idRef.asset_1_decimals != 0
                    ? a1balance / ReturnDecimals(idRef.asset_1_decimals)
                    : a1balance
                )
            : (type == "fo" &&
                Number(a1balance != undefined && a1balance) === 0) ||
              Number(
                minMax
                  .toFixed(idRef.asset_1_decimals)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                  .replaceAll(",", "") >
                  Number(
                    addressOwner != undefined &&
                      idRef != undefined &&
                      idRef.asset_1_id != 0
                      ? addressOwner.account.assets[
                          getKeyByValue(
                            addressOwner.account.assets,
                            Number(idRef.asset_1_id)
                          )
                        ] != undefined &&
                          addressOwner.account.assets[
                            getKeyByValue(
                              addressOwner.account.assets,
                              Number(idRef.asset_1_id)
                            )
                          ].amount / ReturnDecimals(idRef.asset_1_decimals)
                      : addressOwner != undefined &&
                          addressOwner.account != undefined &&
                          addressOwner.account.amount /
                            ReturnDecimals(idRef.asset_1_decimals)
                  )
              )) ? (
            <Button
              _hover="none"
              _active="none"
              _focus="none"
              mb="10px"
              fontWeight="600"
              fontSize="0.9rem"
              bg="#069dbd"
              isDisabled
              width="100%"
            >
              INSUFFICIENT {idRef.asset_1_name} BALANCE
            </Button>
          ) : (
            <BuyButton
              assetIndexOne={idRef.asset_1_id}
              assetIndexTwo={idRef.asset_2_id}
              account={account}
              poolAddress={
                router.asPath.includes("pool") != true
                  ? poolName[0] && poolName[0].pool_creator
                  : pairs[
                      getKeyByValuee(
                        pairs,
                        Number(router.asPath.split("pool=")[1])
                      )
                    ] != undefined &&
                    pairs[
                      getKeyByValuee(
                        pairs,
                        Number(router.asPath.split("pool=")[1])
                      )
                    ].pool_creator
              }
              type={type}
              value_1={type == "fi" ? value_1 : value_2}
              value_2={
                type == "fi"
                  ? minMax
                      .toFixed(idRef.asset_2_decimals)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                  : minMax
                      .toFixed(idRef.asset_1_decimals)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
              }
              isOptedIn={optedIn}
              optInAssetId={optInAssetId}
              setoptedIn_Asa1={setoptedIn_Asa1}
              setoptedIn_Asa2={setoptedIn_Asa2}
              assetOneDecimals={idRef.asset_1_decimals}
              assetTwoDecimals={idRef.asset_2_decimals}
              poolId={
                router.asPath.includes("pool") != true
                  ? poolName[0] && poolName[0].pool_id
                  : pairs[
                      getKeyByValuee(
                        pairs,
                        Number(router.asPath.split("pool=")[1])
                      )
                    ] != undefined &&
                    pairs[
                      getKeyByValuee(
                        pairs,
                        Number(router.asPath.split("pool=")[1])
                      )
                    ].pool_id
              }
              confirm={confirm}
              setConfirm={setConfirm}
              transacting={transacting}
              setTransacting={setTransacting}
              successSwap={successSwap}
              setSuccessSwap={setSuccessSwap}
              failedSwap={failedSwap}
              setFailedSwap={setFailedSwap}
              setSwapTx={setSwapTx}
              swapTx={swapTx}
              cleanAll={cleanAll}
              setRedeeming={setRedeeming}
              setRedeemSuccess={setRedeemSuccess}
              setRedeemTx={setRedeemTx}
              redeemSuccess={redeemSuccess}
            />
          )
        ) : (
          <Button
            mb="5px"
            mt="15px"
            bg="#00bee6"
            _hover="none"
            _active="none"
            _focus="none"
            fontWeight="600"
            width="100%"
            isDisabled
          >
            BUY NOW
          </Button>
        ))}
    </Box>
  );
};

export default Calculator;
