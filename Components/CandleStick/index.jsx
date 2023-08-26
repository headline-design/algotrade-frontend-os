import {
  Box,
  Button,
  useControllableState,
  Text,
  useBreakpointValue,
  Spinner,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { createChart, CrosshairMode } from "lightweight-charts";
import { useRef, useEffect, useState, useContext } from "react";
import axios from "axios";
import { convertReserve } from "../../lib/goal/utils";
import useSWR from "swr";
import { GetAlgo, GetPool } from "../../lib/CustomSWR";
import { AddressContext, Default_Currency } from "../../pages/_app";
import { useRouter } from "next/router";
import { AlgoSvg, TvBulb, UsdIcon } from "../Icons/Icons.jsx";
import { ChevronDownIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  MenuItem,
  MenuList,
  Menu,
  MenuButton,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";
import {
  timeDifference,
  fetchPricee,
  updateCandles,
  candleMissingTime,
  IntervalSeconds,
  convertToUnix,
  dynamicSort,
  offsetLocale,
  convertToDate,
  convertTime,
} from "../../utils/getPricee.jsx";
import AsaHeader from "../AsaComponent/AsaHeader";

const toDateStamp = (datetime) => dayjs(datetime).unix();
const fetcher = async (url) =>
  await axios
    .get(url, {
      method: "GET",
      headers: {
        "X-Custom-TOKEN": `${process.env.candle}`,
      },
    })
    .then(async (res) => await res.data);

const KLineChartt = ({
  height,
  poolName,
  ping,
  currentPool,
  pairs,
  newAsa,
}) => {
  const router = useRouter();
  const lgg = useBreakpointValue({ eee: "655px" });

  function getKeyByValue(str, object, value) {
    try {
      return Object.keys(object).find((key) => object[key][str] === value);
    } catch {
      return undefined;
    }
  }
  const { data: price } = GetAlgo("latest");
  const [algoPrice, setAlgoPrice] = useState();

  const { defaultCurrency: curren } = useContext(Default_Currency);
  const defaultCurrency = "algo";
  const menRef = useRef();

  const scrollRef = useRef();
  const chartRef = useRef();
  const appendRef = useRef();
  const mobileAppendRef = useRef();
  const lightWeightRef = useRef({
    desktop: { current: null },
    mobile: { current: null },
  });

  const [onset, setOnSet] = useState(false);

  const [isHovered, setHovered] = useState(false);
  const volumeSeries = useRef();
  const [volume1, setVolume1] = useState([]);
  const [volume5, setVolume5] = useState([]);
  const [volume15, setVolume15] = useState([]);
  const [volume30, setVolume30] = useState([]);
  const [volume1h, setVolume1h] = useState([]);
  const [volume4h, setVolume4h] = useState([]);
  const [volume12h, setVolume12h] = useState([]);
  const [volume1d, setVolume1d] = useState([]);
  const transitionValues = {
    duration: 0.8,
    yoyo: Infinity,
    ease: "easeOut",
  };
  const candlestickSeries = useRef();
  const chart = useRef();
  const maLine = useRef();
  const [ma1h, setma1h] = useState([]);
  const [newData, setNewData] = useState([]);
  // const [             isOldData, setIsOldData  ] = useState(false)
  const [resetBar, setResetBar] = useState(false);
  const [value, setValue] = useControllableState({ defaultValue: "1h" });
  const [internalValue, setInternalValue] = useControllableState({
    value,
    onChange: setValue,
  });
  const [onem, setOnem] = useState({ ohlc: [], volume: [] });
  const [fivem, setFivem] = useState({ ohlc: [], volume: [] });
  const [fiftm, setFiftm] = useState({ ohlc: [], volume: [] });
  const [thirtm, setThirtm] = useState({ ohlc: [], volume: [] });
  const [oneh, setOneh] = useState({ ohlc: [], volume: [] });
  const [fourh, setFourh] = useState({ ohlc: [], volume: [] });
  const [twelveh, setTwelveh] = useState({ ohlc: [], volume: [] });
  const [oned, setned] = useState({ ohlc: [], volume: [] });

  const [onemUSD, setOnemUSD] = useState({ ohlc: [], volume: [] });
  const [fivemUSD, setFivemUSD] = useState({ ohlc: [], volume: [] });
  const [fiftmUSD, setFiftmUSD] = useState({ ohlc: [], volume: [] });
  const [thirtmUSD, setThirtmUSD] = useState({ ohlc: [], volume: [] });
  const [onehUSD, setOnehUSD] = useState({ ohlc: [], volume: [] });
  const [fourhUSD, setFourhUSD] = useState({ ohlc: [], volume: [] });
  const [twelvehUSD, setTwelvehUSD] = useState({ ohlc: [], volume: [] });
  const [onedUSD, setnedUSD] = useState({ ohlc: [], volume: [] });

  const [isOldData, setIsOldData] = useState(0);
  const [isOldDataa, setIsOldDataa] = useState(false);

  const [resize, setResize] = useState("");
  const [poolId, setPoolId] = useState(currentPool && currentPool);
  const { data: asset2Price } =
    router.asPath.includes("pool") == true &&
    pairs[
      getKeyByValue("pool_id", pairs, Number(router.asPath.split("pool=")[1]))
    ] != undefined &&
    pairs[
      getKeyByValue("pool_id", pairs, Number(router.asPath.split("pool=")[1]))
    ].pool_id != poolName[0].pool_id &&
    GetPool(
      pairs[
        getKeyByValue("pool_id", pairs, Number(router.asPath.split("pool=")[1]))
      ].algo_pool
    );
  const [asa_2_price, setAsa_2_Price] = useState();
  useEffect(() => {
    if (asset2Price) {
      const { asaPrice } =
        router.asPath.includes("pool") == true &&
        convertReserve(
          asset2Price,
          pairs[
            getKeyByValue(
              "pool_id",
              pairs,
              Number(router.asPath.split("pool=")[1])
            )
          ] != undefined &&
            pairs[
              getKeyByValue(
                "pool_id",
                pairs,
                Number(router.asPath.split("pool=")[1])
              )
            ].asset_2_id,
          pairs[
            getKeyByValue(
              "pool_id",
              pairs,
              Number(router.asPath.split("pool=")[1])
            )
          ] != undefined &&
            pairs[
              getKeyByValue(
                "pool_id",
                pairs,
                Number(router.asPath.split("pool=")[1])
              )
            ].asset_2_decimals,
          0,
          6
        );
      algoPrice &&
        setAlgoPrice(
          asaPrice * algoPrice.toFixed(4).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
    }
    if (price) {
      price &&
        setAlgoPrice(
          price[price.length - 1].close_price -
            price[price.length - 1].close_price *
              (0.003).toFixed(4).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
    }
  }, [price, asset2Price]);
  const [hasOffset, setHasOffset] = useState("");
  const [offset, setOffset] = useState(NaN);
  const [tf, setTf] = useState("");
  useEffect(() => {
    tf == "" ? setTf("1h") : setTf(value);
  }),
    [value];

  const { data, error } = useSWR(
    () =>
      tf
        ? `https://api-test.algotrade.net/candles/slug=${poolId}&timeframe=${tf}&currency=${defaultCurrency}&hellothere=${parseInt(
            offset
          )}`
        : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  const getTf = (timeInfo) => {
    if (defaultCurrency == "usd") {
      let thing =
        (timeInfo == "1m" && onemUSD) ||
        (timeInfo == "5m" && fivemUSD) ||
        (timeInfo == "15m" && fiftmUSD) ||
        (timeInfo == "30m" && thirtmUSD) ||
        (timeInfo == "1h" && onehUSD) ||
        (timeInfo == "4h" && fourhUSD) ||
        (timeInfo == "12h" && twelvehUSD) ||
        (timeInfo == "1d" && onedUSD);
      return thing;
    }
    if (defaultCurrency == "algo") {
      let thing =
        (timeInfo == "1m" && onem) ||
        (timeInfo == "5m" && fivem) ||
        (timeInfo == "15m" && fiftm) ||
        (timeInfo == "30m" && thirtm) ||
        (timeInfo == "1h" && oneh) ||
        (timeInfo == "4h" && fourh) ||
        (timeInfo == "12h" && twelveh) ||
        (timeInfo == "1d" && oned);
      return thing;
    }
  };
  const getTff = (timeInfo) => {
    let thing =
      (timeInfo == "1m" && volume1) ||
      (timeInfo == "5m" && volume5) ||
      (timeInfo == "15m" && volume15) ||
      (timeInfo == "30m" && volume30) ||
      (timeInfo == "1h" && volume1h) ||
      (timeInfo == "4h" && volume4h) ||
      (timeInfo == "12h" && volume12h) ||
      (timeInfo == "1d" && volume1d);
    return thing;
  };
  // const { data: poll, error: z } = useSWR(`https://api.algotrade.net/live-trades/${poolId}?limit=10&offset=0&sort_by=date&order=desc`, fetcher, {
  //   refreshInterval: 8400,
  //   revalidateOnFocus: false,
  //   revalidateIfStale: false,
  // })

  const autoSettt = async (timeInfo, newDa) => {
    if (defaultCurrency == "usd") {
      (timeInfo == "1m" &&
        setOnemUSD({
          ohlc: [...newDa.ohlc, ...onemUSD.ohlc],
          volume: [...newDa.volume, ...onemUSD.volume],
        })) ||
        (timeInfo == "5m" &&
          setFivemUSD({
            ohlc: [...newDa.ohlc, ...fivemUSD.ohlc],
            volume: [...newDa.volume, ...fivemUSD.volume],
          })) ||
        (timeInfo == "15m" &&
          setFiftmUSD({
            ohlc: [...newDa.ohlc, ...fiftmUSD.ohlc],
            volume: [...newDa.volume, ...fiftmUSD.volume],
          })) ||
        (timeInfo == "30m" &&
          setThirtmUSD({
            ohlc: [...newDa.ohlc, ...thirtmUSD.ohlc],
            volume: [...newDa.volume, ...thirtmUSD.volume],
          })) ||
        (timeInfo == "1h" &&
          setOnehUSD({
            ohlc: [...newDa.ohlc, ...onehUSD.ohlc],
            volume: [...newDa.volume, ...onehUSD.volume],
          })) ||
        (timeInfo == "4h" &&
          setFourhUSD({
            ohlc: [...newDa.ohlc, ...fourhUSD.ohlc],
            volume: [...newDa.volume, ...fourhUSD.volume],
          })) ||
        (timeInfo == "12h" &&
          setTwelvehUSD({
            ohlc: [...newDa.ohlc, ...twelvehUSD.ohlc],
            volume: [...newDa.volume, ...twelvehUSD.volume],
          })) ||
        (timeInfo == "1d" &&
          setnedUSD({
            ohlc: [...newDa.ohlc, ...onedUSD.ohlc],
            volume: [...newDa.volume, ...onedUSD.volume],
          }));
    }
    if (defaultCurrency == "algo") {
      (timeInfo == "1m" &&
        setOnem({
          ohlc: [...newDa.ohlc, ...onem.ohlc],
          volume: [...newDa.volume, ...onem.volume],
        })) ||
        (timeInfo == "5m" &&
          setFivem({
            ohlc: [...newDa.ohlc, ...fivem.ohlc],
            volume: [...newDa.volume, ...fivem.volume],
          })) ||
        (timeInfo == "15m" &&
          setFiftm({
            ohlc: [...newDa.ohlc, ...fiftm.ohlc],
            volume: [...newDa.volume, ...fiftm.volume],
          })) ||
        (timeInfo == "30m" &&
          setThirtm({
            ohlc: [...newDa.ohlc, ...thirtm.ohlc],
            volume: [...newDa.volume, ...thirtm.volume],
          })) ||
        (timeInfo == "1h" &&
          setOneh({
            ohlc: [...newDa.ohlc, ...oneh.ohlc],
            volume: [...newDa.volume, ...oneh.volume],
          })) ||
        (timeInfo == "4h" &&
          setFourh({
            ohlc: [...newDa.ohlc, ...fourh.ohlc],
            volume: [...newDa.volume, ...fourh.volume],
          })) ||
        (timeInfo == "12h" &&
          setTwelveh({
            ohlc: [...newDa.ohlc, ...twelveh.ohlc],
            volume: [...newDa.volume, ...twelveh.volume],
          })) ||
        (timeInfo == "1d" &&
          setned({
            ohlc: [...newDa.ohlc, ...oned.ohlc],
            volume: [...newDa.volume, ...oned.volume],
          }));
    }
  };
  const autoSetttt = async (timeInfo, newDa) => {
    timeInfo == "1m" && setVolume1([...newDa, ...volume1]);
    timeInfo == "5m" && setVolume5([...newDa, ...volume5]);
    timeInfo == "15m" && setVolume15([...newDa, ...volume15]);
    timeInfo == "30m" && setVolume30([...newDa, ...volume30]);
    timeInfo == "1h" && setVolume1h([...newDa, ...volume1h]);
    timeInfo == "4h" && setVolume4h([...newDa, ...volume4h]);
    timeInfo == "12h" && setVolume12h([...newDa, ...volume12h]);
    timeInfo == "1d" && setVolume1d([...newDa, ...volume1d]);
  };
  const autoSet = async (timeInfo, newDa) => {
    if (defaultCurrency == "usd") {
      (timeInfo == "1m" &&
        setOnemUSD({
          ohlc: [...newDa.ohlc],
          volume: [...newDa.volume],
        })) ||
        (timeInfo == "5m" &&
          setFivemUSD({
            ohlc: [...newDa.ohlc],
            volume: [...newDa.volume],
          })) ||
        // setFivem(newDa);
        (timeInfo == "15m" &&
          setFiftmUSD({
            ohlc: [...newDa.ohlc],
            volume: [...newDa.volume],
          })) ||
        // setFiftm(newDa);
        (timeInfo == "30m" &&
          setThirtmUSD({
            ohlc: [...newDa.ohlc],
            volume: [...newDa.volume],
          })) ||
        // setThirtm(newDa);
        (timeInfo == "1h" &&
          setOnehUSD({
            ohlc: [...newDa.ohlc],
            volume: [...newDa.volume],
          })) ||
        (timeInfo == "4h" &&
          setFourhUSD({
            ohlc: [...newDa.ohlc],
            volume: [...newDa.volume],
          })) ||
        // setFourh(newDa);
        (timeInfo == "12h" &&
          setTwelvehUSD({
            ohlc: [...newDa.ohlc],
            volume: [...newDa.volume],
          })) ||
        // setTwelveh(newDa);
        (timeInfo == "1d" &&
          setnedUSD({
            ohlc: [...newDa.ohlc],
            volume: [...newDa.volume],
          }));
    }
    if (defaultCurrency == "algo") {
      (timeInfo == "1m" &&
        setOnem({
          ohlc: [...newDa.ohlc],
          volume: [...newDa.volume],
        })) ||
        (timeInfo == "5m" &&
          setFivem({
            ohlc: [...newDa.ohlc],
            volume: [...newDa.volume],
          })) ||
        // setFivem(newDa);
        (timeInfo == "15m" &&
          setFiftm({
            ohlc: [...newDa.ohlc],
            volume: [...newDa.volume],
          })) ||
        // setFiftm(newDa);
        (timeInfo == "30m" &&
          setThirtm({
            ohlc: [...newDa.ohlc],
            volume: [...newDa.volume],
          })) ||
        // setThirtm(newDa);
        (timeInfo == "1h" &&
          setOneh({
            ohlc: [...newDa.ohlc],
            volume: [...newDa.volume],
          })) ||
        (timeInfo == "4h" &&
          setFourh({
            ohlc: [...newDa.ohlc],
            volume: [...newDa.volume],
          })) ||
        // setFourh(newDa);
        (timeInfo == "12h" &&
          setTwelveh({
            ohlc: [...newDa.ohlc],
            volume: [...newDa.volume],
          })) ||
        // setTwelveh(newDa);
        (timeInfo == "1d" &&
          setned({
            ohlc: [...newDa.ohlc],
            volume: [...newDa.volume],
          }));
    }

    // setned(newDa);
  };
  const autoSett = async (timeInfo, newDa) => {
    timeInfo == "1m" && setVolume1(newDa);
    timeInfo == "5m" && setVolume5(newDa);
    timeInfo == "15m" && setVolume15(newDa);
    timeInfo == "30m" && setVolume30(newDa);
    timeInfo == "1h" && setVolume1h(newDa);
    timeInfo == "4h" && setVolume4h(newDa);
    timeInfo == "12h" && setVolume12h(newDa);
    timeInfo == "1d" && setVolume1d(newDa);
  };
  const currentPrice = oneh;

  function TimeFrameMenu({}) {
    menRef.current = menRef.current;
    return (
      <Menu placement="bottom-end" zIndex="99" bg="#1f2733" value={value}>
        {({ isOpen }) => (
          <>
            <MenuButton
              border="1px"
              borderColor="#485c7b"
              maxH="35px"
              _active={{ borderColor: "#485c7b" }}
              _focus={{ borderColor: "#485c7b" }}
              zIndex="99"
              bg="#1f2733"
              _hover={{ bg: "#242e3c" }}
              isActive={isOpen}
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              {value}
            </MenuButton>
            <MenuList
              borderColor="#485c7b"
              bg="#1f2733"
              ref={menRef}
              className="idiotsiht"
              zIndex="99"
            >
              {["1m", "5m", "15m", "30m", "1h", "4h", "12h", "1d"].map(
                (pageSize) => (
                  <MenuItem
                    zIndex="99"
                    key={pageSize}
                    value={pageSize}
                    onClick={(e) => {
                      setValue(e.target.value);
                      setOffset(null);
                      setResetBar(true);
                    }}
                  >
                    {pageSize}
                  </MenuItem>
                )
              )}
            </MenuList>
          </>
        )}
      </Menu>
    );
  }

  useEffect(() => {
    chart.current = createChart(chartRef.current || "", {
      height,
      kineticScroll: {
        touch: true,
        mouse: false,
      },
      layout: {
        backgroundColor: "#253248",
        textColor: "rgba(255, 255, 255, 0.9)",
      },
      legend: {
        textColor: "#F2EAD0",
        fontSize: 12,
        fontFamily: "monospace",
      },
      grid: {
        vertLines: {
          color: "#334158",
        },
        horzLines: {
          color: "#334158",
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      timeScale: {
        dateFormat: "yyyy-MM-dd",
        lockVisibleTimeRangeOnResize: true,
        rightBarStaysOnScroll: true,
        shiftVisibleRangeOnNewBar: false,
        barSpacing: 10.5,
        borderColor: "#485c7b",
        timeVisible: true,
        secondsVisible: false,
        // rightOffset: 20,
      },
      priceFormat: {
        type: "price",
        precision: 8,
        minMove: 0.000001,
      },
      handleScroll: {
        vertTouchDrag: false,
      },
      handleScale: {
        mouseWheel: true,
        pinch: true,
      },
      priceScale: {
        autoScale: true,
        // fixRightEdge: true,
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
        borderColor: "#485c7b",
      },
      localization: {
        dateFormat: "yyyy-MMM-dd",
      },
    });

    data && chart.current.addCandlestickSeries();
    candlestickSeries.current = chart.current.addCandlestickSeries();
    candlestickSeries.current.applyOptions({
      priceScale: {
        autoScale: false,
      },

      priceFormat: {
        type: "custom",
        minMove: 0.000000001,
        formatter: (price) => parseFloat(price).toFixed(8),
        // type: 'price',
        // precision: 8,
        // minMove: 0.000001,
      },
    });
    // maLine.current = chart.current.addLineSeries({
    //   lastValueVisible: false,
    //   priceLineVisible: false,
    //   crosshairMarkerVisible: false,
    //   color: "rgb(126, 87, 194)",
    //   lineWidth: 1,
    // });
    volumeSeries.current = chart.current.addHistogramSeries({
      lastValueVisible: false,
      priceLineVisible: false,
      color: "#385263",
      lineWidth: 2,
      priceFormat: {
        type: "volume",
      },
      overlay: true,
      scaleMargins: {
        top: 0.7,
        bottom: 0,
      },
    });

    const startRe = () => {
      const sien = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        chartRef.current != null &&
          chart.current.applyOptions({ width, height });
      });
      chartRef.current != null && sien.observe(chartRef.current);
      setResize("yes");
      return () => {
        sien.disconnect();
        setResize("no");
      };
    };
    startRe();
    return () => {
      chart.current.remove();
    };
  }, [height, poolName, newData]);

  useEffect(() => {
    if (chart.current) {
      value != tf && chart.current.timeScale().resetTimeScale();
      value != tf && chart.current.timeScale().scrollToPosition(10, false);
    }
  }, [value, tf]);
  function calculateSMA(data, count) {
    var avg = function (data) {
      var sum = 0;
      for (var i = 0; i < data.length; i++) {
        sum += data[i].close;
      }
      return sum / data.length;
    };
    var result = [];
    for (var i = count - 1, len = data.length; i < len; i++) {
      var val = avg(data.slice(i - count + 1, i));
      result.push({ time: data[i].time, value: val });
    }
    return result;
  }
  useEffect(() => {
    // console.log(tf);
    if (data && data.results != undefined) {
      if (getTf(tf).ohlc.length == 0) {
        // console.log(getTf(tf).ohlc.length);
        const { volume: volumeDataa, ohlc: ohlcDataa } = fetchPricee(
          data.results,
          tf
        );
        // autoSettt(tf, { ohlc: [...ohlcDataa], volume: [...volumeDataa] });

        const candleLength =
          (timeDifference(tf) - ohlcDataa[ohlcDataa.length - 1].time) /
          updateCandles(tf);
        if (candleLength != 0) {
          const { missingCandle, missingVolume } = candleMissingTime(
            candleLength,
            timeDifference(tf),
            ohlcDataa,
            tf,
            volumeDataa
          );
          const mergedCandles = [...ohlcDataa, ...missingCandle];
          const mergedVolume = [...volumeDataa, ...missingVolume];
          mergedCandles.sort(dynamicSort("time"));
          mergedVolume.sort(dynamicSort("time"));
          // missingVolume.sort(dynamicSort("time"));
          // volumeDataa.sort(dynamicSort("time"));

          // mergedVolume.sort(dynamicSort("time"));

          // autoSet(tf, price);
          // autoSett(tf, volume);
          missingCandle.length > 0 &&
            autoSettt(tf, {
              ohlc: [...mergedCandles],
              volume: [...mergedVolume],
            });
        }
        if (candleLength == 0) {
          autoSet(tf, {
            ohlc: [...ohlcDataa],
            volume: [...volumeDataa],
          });
        }

        // autoSettt(tf, {
        //   ohlc: [...ohlcDataa],
        //   volume: [...volumeDataa],
        // });
      }
      if (getTf(tf).ohlc.length > 0) {
        const pp = getKeyByValue(
          "time",
          getTf(tf).ohlc,
          convertToUnix(data.results[data.results.length - 1].datetime)
        );
        // console.log(pp);
        // console.log(convertToDate(ohlcDataa[ohlcDataa.length - 1].time));

        const newOb = {
          datetime: convertToDate(getTf(tf).ohlc[0].time),
          volume: getTf(tf).volume[0].value,
          open: getTf(tf).ohlc[0].open,
          high: getTf(tf).ohlc[0].high,
          low: getTf(tf).ohlc[0].low,
          close: getTf(tf).ohlc[0].close,
        };
        if (pp == undefined) {
          const newD = [...data.results, ...[newOb]];
          // console.log(newD);
          const { volume: volumeDataa, ohlc: ohlcDataa } = fetchPricee(
            newD,
            tf
          );
          const ww = getKeyByValue("time", volumeDataa, getTf(tf).ohlc[0].time);
          // console.log(ww);
          ww != undefined &&
            Number(ww) + 1 == ohlcDataa.length &&
            ohlcDataa.pop();
          // ohlcDataa.splice(ww - 1, 1);
          ww != undefined &&
            Number(ww) + 1 == volumeDataa.length &&
            volumeDataa.pop();
          // console.log(Number(ww) + 1 == ohlcDataa.length);
          // volumeDataa.splice(ww - 1, 1);
          // console.log(volumeDataa);
          // console.log(ohlcDataa);
          // console.log(ohlcDataa.pop())
          // autoSettt(tf);
          autoSettt(tf, {
            ohlc: [...ohlcDataa],
            volume: [...volumeDataa],
          });
        }
        if (pp != undefined) {
          // console.log(isOldDataa, "ping");
          setIsOldDataa(true);

          setIsOldData(isOldData + 1);
        }
        // getTf(tf).ohlc.forEach((one) => {
        //   ohlcDataa.find((item, z) => {
        //     if (item.time === one.time) {
        //       // setIsOldData(true)
        //       // setIsOldData(true);
        //       // console.log(getTf(tf));
        //       return setIsOldData(true);

        //       // autoSett(tf, volume);
        //     }
        //     if (z == ohlcDataa.length - 1 && item.time !== one.time) {
        //       console.log("here");
        //       // If not found, add validation.
        //       return autoSettt(tf, {
        //         ohlc: [...ohlcDataa],
        //         volume: [...volumeDataa],
        //       });
        //     }
        //     // autoSetttt(tf, volume);
        //   });
        // });
      }

      setHasOffset(data.n);
    }
    setIsOldDataa(true);
  }, [data, value]);

  useEffect(() => {
    const mountData = (ptime) => {
      if (ptime == "1m") {
        candlestickSeries.current.setData(
          defaultCurrency == "usd" ? onemUSD.ohlc : onem.ohlc
        );
        volumeSeries.current.setData(
          defaultCurrency == "usd" ? onemUSD.volume : onem.volume
        );
      }
      if (ptime == "5m") {
        candlestickSeries.current.setData(
          defaultCurrency == "usd" ? fivemUSD.ohlc : fivem.ohlc
        );
        volumeSeries.current.setData(
          defaultCurrency == "usd" ? fivemUSD.volume : fivem.volume
        );
      }
      if (ptime == "15m") {
        candlestickSeries.current.setData(
          defaultCurrency == "usd" ? fiftmUSD.ohlc : fiftm.ohlc
        );
        volumeSeries.current.setData(
          defaultCurrency == "usd" ? fiftmUSD.volume : fiftm.volume
        );
      }
      if (ptime == "30m") {
        candlestickSeries.current.setData(
          defaultCurrency == "usd" ? thirtmUSD.ohlc : thirtm.ohlc
        );
        volumeSeries.current.setData(
          defaultCurrency == "usd" ? thirtmUSD.volume : thirtm.volume
        );
      }
      if (ptime == "1h") {
        // console.log(oneh);
        candlestickSeries.current.setData(
          defaultCurrency == "usd" ? onehUSD.ohlc : oneh.ohlc
        );
        volumeSeries.current.setData(
          defaultCurrency == "usd" ? onehUSD.volume : oneh.volume
        );
      }
      if (ptime == "4h") {
        candlestickSeries.current.setData(
          defaultCurrency == "usd" ? fourhUSD.ohlc : fourh.ohlc
        );
        volumeSeries.current.setData(
          defaultCurrency == "usd" ? fourhUSD.volume : fourh.volume
        );
      }
      if (ptime == "12h") {
        candlestickSeries.current.setData(
          defaultCurrency == "usd" ? twelvehUSD.ohlc : twelveh.ohlc
        );
        volumeSeries.current.setData(
          defaultCurrency == "usd" ? twelvehUSD.volume : twelveh.volume
        );
      }
      if (ptime == "1d") {
        candlestickSeries.current.setData(
          defaultCurrency == "usd" ? onedUSD.ohlc : oned.ohlc
        );
        volumeSeries.current.setData(
          defaultCurrency == "usd" ? onedUSD.volume : oned.volume
        );
      }
    };
    const mountVolume = (ptime) => {
      ptime == "1m" && volumeSeries.current.setData(volume1);
      ptime == "5m" && volumeSeries.current.setData(volume5);
      ptime == "15m" && volumeSeries.current.setData(volume15);
      ptime == "30m" && volumeSeries.current.setData(volume30);
      ptime == "1h" && volumeSeries.current.setData(volume1h);
      ptime == "4h" && volumeSeries.current.setData(volume4h);
      ptime == "12h" && volumeSeries.current.setData(volume12h);
      ptime == "1d" && volumeSeries.current.setData(volume1d);
    };
    // const mountMa = (ptime) => {
    //   ptime == "1h" && maLine.current.setData(ma1h);
    // };
    function onVisibleLogicalRangeChanged(newVisibleLogicalRange) {
      const barsInfo = candlestickSeries.current.barsInLogicalRange(
        newVisibleLogicalRange
      );
      // if there less than 50 bars to the left of the visible area
      if (barsInfo !== null && barsInfo.barsBefore < 5) {
        // parseInt(offset.split('offset=')[1]) > 0
        resetBar == false && setOffset(hasOffset);
        resetBar == false && setOnSet(true);

        chart.current
          .timeScale()
          .unsubscribeVisibleLogicalRangeChange(onVisibleLogicalRangeChanged);
      }
    }

    if (chart.current) {
      // console.log(isOldDataa, "chart");

      chart.current != null &&
        isHovered != true &&
        isOldDataa == true &&
        mountData(tf);
      if (isOldData) {
        chart.current != null &&
          isHovered != true &&
          isOldDataa == true &&
          mountData(tf);
      }
      isHovered != true && chart.current.priceScale();

      data && chart.current && resetBar == false && hasOffset != null
        ? chart.current
            .timeScale()
            .subscribeVisibleLogicalRangeChange(onVisibleLogicalRangeChanged)
        : chart.current
            .timeScale()
            .unsubscribeVisibleLogicalRangeChange(onVisibleLogicalRangeChanged);
    }
    return () => {
      resetBar == true && chart.current.timeScale().resetTimeScale();
      resetBar == true && chart.current.timeScale().scrollToPosition(10, false);
      chart.current
        .timeScale()
        .unsubscribeVisibleLogicalRangeChange(onVisibleLogicalRangeChanged);
      resetBar == true && setResetBar(false);
      setOnSet(false);
    };
    console.log(data.length);
  }, [
    isOldData,
    isOldDataa,
    onem,
    fivem,
    oneh,
    thirtm,
    fiftm,
    fourh,
    twelveh,
    oned,
    onemUSD,
    fivemUSD,
    onehUSD,
    thirtmUSD,
    fiftmUSD,
    fourhUSD,
    twelvehUSD,
    onedUSD,
    resetBar,
    ping,
  ]);

  useEffect(() => {
    var toolTip = appendRef.current;
    var toolTipWidth = 80;
    var toolTipHeight = 80;
    var toolTipMargin = 15;

    toolTip.style.flexDirection = "column-reverse";
    toolTip.style.position = "absolute";
    toolTip.style.zIndex = "99";
    toolTip.style.left = 3 + "px";
    toolTip.style.top = "0";

    const letgo = () => {
      // console.log(getTf(tf).volume[getTf(tf).volume.length - 1].value);
      const coll =
        getTf(tf).ohlc[getTf(tf).ohlc.length - 1].open ==
        getTf(tf).ohlc[getTf(tf).ohlc.length - 1].close
          ? "rgba(54, 183, 95, 1);"
          : getTf(tf).ohlc[getTf(tf).ohlc.length - 1].close >
            getTf(tf).ohlc[getTf(tf).ohlc.length - 1].open
          ? "rgba(54, 183, 95, 1);"
          : "rgba(221, 94, 86, 1);";
      // const coll =
      //   getTf(tf).ohlc[getTf(tf).ohlc.length - 1].close >
      //   getTf(tf).ohlc[getTf(tf).ohlc.length - 1].open
      //     ? "rgba(54, 183, 95, 1);"
      //     : "rgba(221, 94, 86, 1);";
      toolTip.innerHTML =
        '<div style="display: flex; align-items: end; padding-left: 10px; font-size: 0.95rem;">Volume:&nbsp;<p style="font-weight: 500; line-height: 1.5; font-size: 0.85rem; color: ' +
        coll +
        '"' +
        ">" +
        getTf(tf)
          .volume[getTf(tf).volume.length - 1].value.toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,") +
        "</p></div>" +
        '<div style="display: flex; align-items: center; justify-content: flex-start; padding-left:10px;"><div style="font-size: 17px; line-height: 1.5; font-weight: 400; color: #fff">' +
        poolName[0].asset_1_name +
        "/" +
        (router.asPath.includes("pool") != true
          ? poolName[0].asset_2_name
          : pairs[
              getKeyByValue(
                "pool_id",
                pairs,
                Number(router.asPath.split("pool=")[1])
              )
            ].asset_2_name) +
        '</div><div style="font-weight: 400; padding-left:10px; line-height: 1; font-size: 0.95rem; margin: 4px 0px; color: #fff">' +
        "O: " +
        '<chakra.span style="color:' +
        coll +
        '">' +
        getTf(tf)
          .ohlc[getTf(tf).ohlc.length - 1].open.toFixed(8)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,") +
        "</chakra.span>" +
        "  H: " +
        '<span style="color:' +
        coll +
        '">' +
        getTf(tf)
          .ohlc[getTf(tf).ohlc.length - 1].high.toFixed(8)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,") +
        "</span>" +
        "  L: " +
        '<span style="color:' +
        coll +
        '">' +
        getTf(tf)
          .ohlc[getTf(tf).ohlc.length - 1].low.toFixed(8)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,") +
        "</span>" +
        "   C: " +
        '<span style="color:' +
        coll +
        '">' +
        getTf(tf)
          .ohlc[getTf(tf).ohlc.length - 1].close.toFixed(8)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,") +
        "</span>";
      '</div><div style="color: #fff">' +
        getTf(tf).ohlc[getTf(tf).ohlc.length - 1].time;
      "</div>" + "</div>";
    };
    getTf(value) &&
      getTf(value).ohlc &&
      getTf(value).volume &&
      getTf(value).volume.length > 1 &&
      getTf(value).ohlc.length > 1 &&
      letgo();

    const funny = (param) => {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > chartRef.current.clientWidth ||
        param.point.y < 0 ||
        param.point.y > chartRef.current.clientHeight ||
        param.seriesPrices.get(candlestickSeries.current) === undefined ||
        param.seriesPrices.get(volumeSeries.current) === undefined ||
        param.seriesPrices === undefined
      ) {
        // data && setLastBarText()
      } else {
        const dateStr = param.time;
        toolTip.style.display = "absolute";

        const vol = param.seriesPrices.get(volumeSeries.current);
        // const {open, close, low, high} = param.seriesPrices.get(candlestickSeries.current);

        const price = param.seriesPrices.get(candlestickSeries.current);

        const col =
          price.open == price.close
            ? "rgba(54, 183, 95, 1);"
            : price.close > price.open
            ? "rgba(54, 183, 95, 1);"
            : "rgba(221, 94, 86, 1);";

        toolTip.innerHTML = `<div style="display: flex; align-items: end; padding-left: 10px; font-size: 0.95rem;">Volume:&nbsp;<p style="font-weight: 500; line-height: 1.5; font-size: 0.85rem; color: 
${col}
">
${vol.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")} 
</p></div>
<div style="display: flex; align-items: center; justify-content: flex-start; padding-left:10px;"><div style="font-size: 17px; line-height: 1.5; font-weight: 400; color: #fff">
${poolName[0].asset_1_name}/
${
  router.asPath.includes("pool") != true
    ? poolName[0].asset_2_name
    : pairs[
        getKeyByValue("pool_id", pairs, Number(router.asPath.split("pool=")[1]))
      ].asset_2_name
}
</div><div style="font-weight: 400; padding-left:10px; line-height: 1; font-size: 0.95rem; margin: 4px 0px; color: #fff">
O:<chakra.span style="color:${col}">
${price.open.toFixed(8).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
</chakra.span>&nbsp;H:&nbsp;<span style="color:${col}">${price.high
          .toFixed(8)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}</span>
&nbsp;L:
<span style="color:
${col}">
${price.low.toFixed(8).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
</span>
&nbsp;C:
<span style="color:
${col}">
${price.close.toFixed(8).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
</span>
</div></div>`;

        //   '<div style="display: flex; align-items: end; padding-left: 10px; font-size: 0.95rem;">Volume:&nbsp;<p style="font-weight: 500; line-height: 1.5; font-size: 0.85rem; color: ' +
        //   col +
        //   '"' +
        //   ">" +
        //   vol.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") +
        //   "</p></div>" +
        //   '<div style="display: flex; align-items: center; justify-content: flex-start; padding-left:10px;"><div style="font-size: 17px; line-height: 1.5; font-weight: 400; color: #fff">' +
        //   poolName[0].asset_1_name +
        //   "/" +
        //   poolName[0].asset_2_name +
        //   '</div><div style="font-weight: 400; padding-left:10px; line-height: 1; font-size: 0.95rem; margin: 4px 0px; color: #fff">' +
        //   "O: " +
        //   '<chakra.span style="color:' +
        //   col +
        //   '">' +
        //   price.open.toFixed(8).replace(/\d(?=(\d{3})+\.)/g, "$&,") +
        //   "</chakra.span>" +
        //   "  H: " +
        //   '<span style="color:' +
        //   col +
        //   '">' +
        //   price.high.toFixed(8).replace(/\d(?=(\d{3})+\.)/g, "$&,") +
        //   "</span>" +
        //   "  L: " +
        //   '<span style="color:' +
        //   col +
        //   '">' +
        //   price.low.toFixed(8).replace(/\d(?=(\d{3})+\.)/g, "$&,") +
        //   "</span>" +
        //   "   C: " +
        //   '<span style="color:' +
        //   col +
        //   '">' +
        //   price.close.toFixed(8).replace(/\d(?=(\d{3})+\.)/g, "$&,") +
        //   "</span>";
        // '</div><div style="color: #fff">' + dateStr;
        // "</div>" + "</div>";
        var coordinate = candlestickSeries.current.priceToCoordinate(
          param.point.y
        );
        var shiftedCoordinate = param.point.x - 50;
        if (coordinate === null) {
          return;
        }
        shiftedCoordinate = Math.max(
          0,
          Math.min(
            chartRef.current.clientWidth - toolTipWidth,
            shiftedCoordinate
          )
        );
      }
    };

    candlestickSeries.current != null &&
      chart.current.subscribeCrosshairMove(funny);

    return () => {
      chart.current.unsubscribeCrosshairMove(funny);
    };
  });
  useEffect(() => {
    if (mobileAppendRef.current) {
      var toolTipp = mobileAppendRef.current;
      var toolTipWidth = 80;
      var toolTipHeight = 80;
      var toolTipMargin = 15;

      toolTipp.style.flexDirection = "column-reverse";
      toolTipp.style.position = "absolute";
      toolTipp.style.zIndex = "99";
      toolTipp.style.left = 3 + "px";
      toolTipp.style.top = "40px";

      const letgo = () => {
        // console.log(getTf(tf).volume[getTf(tf).volume.length - 1].value);
        const coll =
          getTf(tf).ohlc[getTf(tf).ohlc.length - 1].open ==
          getTf(tf).ohlc[getTf(tf).ohlc.length - 1].close
            ? "rgba(54, 183, 95, 1);"
            : getTf(tf).ohlc[getTf(tf).ohlc.length - 1].close >
              getTf(tf).ohlc[getTf(tf).ohlc.length - 1].open
            ? "rgba(54, 183, 95, 1);"
            : "rgba(221, 94, 86, 1);";
        // const coll =
        //   getTf(tf).ohlc[getTf(tf).ohlc.length - 1].close >
        //   getTf(tf).ohlc[getTf(tf).ohlc.length - 1].open
        //     ? "rgba(54, 183, 95, 1);"
        //     : "rgba(221, 94, 86, 1);";
        toolTipp.innerHTML = `<div style="display: flex; align-items: end; padding-left: 10px; font-size: 0.95rem;">Volume:&nbsp;<p style="font-weight: 500; line-height: 1.5; font-size: 0.85rem; color: 
${coll}
">
${getTf(tf)
  .volume[getTf(tf).volume.length - 1].value.toFixed(2)
  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
</p></div>
<div style="display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding-left:10px;">
<div style="display: flex; align-items: center; justify-content: flex-start">
<div style="font-weight: 400; line-height: 1; font-size: 0.95rem; margin: 1.5px 0px; color: #fff">
&nbsp;O:<chakra.span style="color:${coll}">
${getTf(tf)
  .ohlc[getTf(tf).ohlc.length - 1].open.toFixed(8)
  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
&nbsp;
</chakra.span>
H:&nbsp;<span style="color:${coll}">
${getTf(tf)
  .ohlc[getTf(tf).ohlc.length - 1].high.toFixed(8)
  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
&nbsp;</span>
</div>
</div>
<div style="display: flex; align-items: center; justify-content: flex-start">
<div style="font-weight: 400; line-height: 1; font-size: 0.95rem; margin: 1.5px 0px; color: #fff">

L:&nbsp;<span style="color:
${coll}">
${getTf(tf)
  .ohlc[getTf(tf).ohlc.length - 1].low.toFixed(8)
  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
</span>
C:&nbsp;<span style="color:
${coll}">
${getTf(tf)
  .ohlc[getTf(tf).ohlc.length - 1].close.toFixed(8)
  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}</span>
</div></div></div>`;
      };
      getTf(value) &&
        getTf(value).ohlc &&
        getTf(value).volume &&
        getTf(value).volume.length > 1 &&
        getTf(value).ohlc.length > 1 &&
        letgo();

      const funny = (param) => {
        if (
          param.point === undefined ||
          !param.time ||
          param.point.x < 0 ||
          param.point.x > chartRef.current.clientWidth ||
          param.point.y < 0 ||
          param.point.y > chartRef.current.clientHeight ||
          param.seriesPrices.get(candlestickSeries.current) === undefined ||
          param.seriesPrices.get(volumeSeries.current) === undefined ||
          param.seriesPrices === undefined
        ) {
          // data && setLastBarText()
        } else {
          const dateStr = param.time;
          toolTipp.style.display = "absolute";

          const vol = param.seriesPrices.get(volumeSeries.current);
          // const {open, close, low, high} = param.seriesPrices.get(candlestickSeries.current);

          const price = param.seriesPrices.get(candlestickSeries.current);

          const col =
            price.open == price.close
              ? "rgba(54, 183, 95, 1);"
              : price.close > price.open
              ? "rgba(54, 183, 95, 1);"
              : "rgba(221, 94, 86, 1);";

          toolTipp.innerHTML = `<div style="display: flex; align-items: end; padding-left: 10px; font-size: 0.95rem;">Volume:&nbsp;<p style="font-weight: 500; line-height: 1.5; font-size: 0.85rem; color: 
${col}
">
${vol.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")} 
</p></div>
<div style="display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; padding-left:10px;">
<div style="display: flex; align-items: center; justify-content: flex-start">
<div style="font-weight: 400; line-height: 1; font-size: 0.95rem; margin: 1.5px 0px; color: #fff">
&nbsp;O:<chakra.span style="color:${col}">
${price.open.toFixed(8).replace(/\d(?=(\d{3})+\.)/g, "$&,")}&nbsp;
</chakra.span>
H:&nbsp;<span style="color:${col}">${price.high
            .toFixed(8)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
&nbsp;</span>
</div>
</div>
<div style="display: flex; align-items: center; justify-content: flex-start">
<div style="font-weight: 400; line-height: 1; font-size: 0.95rem; margin: 1.5px 0px; color: #fff">

L:&nbsp;<span style="color:
${col}">
${price.low.toFixed(8).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
</span>
C:&nbsp;<span style="color:
${col}">
${price.close.toFixed(8).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
</span>
</div></div></div>`;

          var coordinate = candlestickSeries.current.priceToCoordinate(
            param.point.y
          );
          var shiftedCoordinate = param.point.x - 50;
          if (coordinate === null) {
            return;
          }
          shiftedCoordinate = Math.max(
            0,
            Math.min(
              chartRef.current.clientWidth - toolTipWidth,
              shiftedCoordinate
            )
          );
        }
      };

      candlestickSeries.current != null &&
        chart.current.subscribeCrosshairMove(funny);

      return () => {
        chart.current.unsubscribeCrosshairMove(funny);
      };
    }
  });
  // [];
  useEffect(() => {
    if (tf != "") {
      const pp = getKeyByValue(
        "time",
        getTf(value).ohlc,
        timeDifference(value)
      );

      const updateBar = () => {
        const updateCandleBar = {
          open:
            pp == undefined
              ? getTf(value).ohlc[getTf(value).ohlc.length - 1].close
              : pp != undefined && getTf(value).ohlc[pp].open,
          close: ping.results[0].total_price,
          low:
            pp == undefined
              ? ping.results[0].total_price
              : ping.results[0].total_price <
                getTf(value).ohlc[getTf(value).ohlc.length - 1].low
              ? ping.results[0].total_price
              : getTf(value).ohlc[getTf(value).ohlc.length - 1].low,
          high:
            pp == undefined
              ? ping.results[0].total_price
              : ping.results[0].total_price >
                getTf(value).ohlc[getTf(value).ohlc.length - 1].high
              ? ping.results[0].total_price
              : getTf(value).ohlc[getTf(value).ohlc.length - 1].high,
          time:
            pp == undefined
              ? timeDifference(value)
              : getTf(value).ohlc[getTf(value).ohlc.length - 1].time,
          lastEntry: convertToUnix(ping.results[0].date),
        };
        let sum = 0;
        ping.results.map((i) => {
          if (
            getTf(value).ohlc[getTf(value).ohlc.length - 1].lastEntry !=
            undefined
          ) {
            if (
              convertToUnix(i.date) >
              getTf(value).ohlc[getTf(value).ohlc.length - 1].lastEntry
            ) {
              sum += i.amount_2;
            }
          }
          if (
            getTf(value).ohlc[getTf(value).ohlc.length - 1].lastEntry ==
              undefined &&
            convertToUnix(i.date) >
              getTf(value).ohlc[getTf(value).ohlc.length - 1].time &&
            convertToUnix(i.date) <
              offsetLocale(Math.floor(new Date().getTime() / 1000)) + 10
          ) {
            sum += i.amount_2;
          }
        });
        const updateVolumeBar = {
          time:
            pp == undefined
              ? timeDifference(value)
              : getTf(value).ohlc[getTf(value).ohlc.length - 1].time,
          value:
            pp == undefined
              ? sum
              : sum + getTf(value).volume[getTf(value).volume.length - 1].value,
          color:
            updateCandleBar.close <= updateCandleBar.open
              ? "rgba(221, 94, 86, 0.3)"
              : "rgba(82, 164, 154, 0.3)",
        };
        onset == false &&
          convertToUnix(ping.results[0].date) <
            offsetLocale(Math.floor(new Date().getTime() / 1000)) + 10 &&
          candlestickSeries.current.update(updateCandleBar);
        onset == false &&
          convertToUnix(ping.results[0].date) <
            offsetLocale(Math.floor(new Date().getTime() / 1000)) + 10 &&
          volumeSeries.current.update(updateVolumeBar);
        setHovered(true);
        function update(index, newValue, newVol) {
          const newCandleArray = [...getTf(value).ohlc];
          const newVolumeArray = [...getTf(value).volume];
          newCandleArray[index] = newValue;
          newVolumeArray[index] = newVol;
          autoSet(value, {
            ohlc: [...newCandleArray],
            volume: [...newVolumeArray],
          });
        }
        if (
          convertToUnix(ping.results[0].date) <
          offsetLocale(Math.floor(new Date().getTime() / 1000)) + 10
        ) {
          onset == false &&
            update(
              pp == undefined ? getTf(value).ohlc.length : pp,
              updateCandleBar,
              updateVolumeBar
            );
          setHovered(false);
          // setIsOldDataa(true);
        }
      };
      ping != undefined &&
        getTf(value).ohlc.length > 0 &&
        onset != true &&
        value == tf &&
        updateBar();
      ping != undefined &&
        getTf(value).ohlc.length > 0 &&
        value == tf &&
        updateBar();
    }
    return () => {
      setIsOldDataa(false);
    };
  }, [ping, value]);

  useEffect(() => {
    const scrollButton = scrollRef.current;

    function visibleLogicalRangeChanged(newVisibleLogicalRange) {
      const barsInfo = candlestickSeries.current.barsInLogicalRange(
        newVisibleLogicalRange
      );
      // if there less than 50 bars to the left of the visible area
      if (barsInfo !== null && barsInfo.barsAfter > 20) {
        scrollButton.style.display = "block";
        scrollButton.style.position = "block";
        scrollButton.style.display = "block";
      }
      if (barsInfo !== null && barsInfo.barsAfter < 20) {
        scrollButton.style.display = "none";
      }
    }
    if (chart.current) {
      chart.current
        .timeScale()
        .subscribeVisibleLogicalRangeChange(visibleLogicalRangeChanged);
    }
    return () => {
      chart.current
        .timeScale()
        .unsubscribeVisibleLogicalRangeChange(visibleLogicalRangeChanged);
    };
  }, []);

  return (
    <Box width="100%" position="relative">
      <AsaHeader
        latestPrice={typeof window !== "undefined" && ping != undefined && ping}
        currentPrice={currentPrice}
        poolName={poolName}
        algoPrice={algoPrice}
        pairs={pairs}
      />
      <Box
        position="relative"
        display="flex"
        bg="#253248"
        justifyContent={{ base: "space-between", zz: "flex-end" }}
        alignItems="center"
      >
        {typeof window !== "undefined" && ping != undefined && ping ? (
          <Box
            flexDirection="column"
            display={{ base: "flex", zz: "none" }}
            alignItems="flex-start"
            pl="15px"
          >
            <Box display="flex" alignItems="center" pt="15px">
              {!ping ? (
                <Spinner ml="15px" />
              ) : (
                ping &&
                ping.results != undefined && (
                  <>
                    {router.asPath.includes("pool") != true ? (
                      curren == "usd" ? (
                        <Box display="flex" alignItems="center">
                          <UsdIcon
                            position="relative"
                            bottom="-0.5px"
                            w="12.5px"
                            height="auto"
                            fill="white"
                          />
                        </Box>
                      ) : (
                        <AlgoSvg
                          w={{ base: "15.5px", sm: "19px" }}
                          height="auto"
                          fill="white"
                        />
                      )
                    ) : router.asPath.includes("pool") == true &&
                      router.asPath.split("pool=")[1] != poolName[0].pool_id ? (
                      curren == "algo" ? (
                        <Text>
                          {
                            pairs[
                              getKeyByValue(
                                "pool_id",
                                pairs,
                                Number(router.asPath.split("pool=")[1])
                              )
                            ].asset_2_name
                          }
                        </Text>
                      ) : (
                        <Box display="flex" alignItems="center">
                          <UsdIcon
                            position="relative"
                            bottom="-0.5px"
                            w="12.5px"
                            height="auto"
                            fill="white"
                          />
                        </Box>
                      )
                    ) : (
                      router.asPath.includes("pool") == true &&
                      router.asPath.split("pool=")[1] == poolName[0].pool_id &&
                      (curren == "algo" ? (
                        <AlgoSvg
                          w={{ base: "15.5px", sm: "19px" }}
                          height="auto"
                          fill="white"
                        />
                      ) : (
                        <Box display="flex" alignItems="center">
                          <UsdIcon
                            position="relative"
                            bottom="-2.5px"
                            w="12.5px"
                            height="auto"
                            fill="white"
                          />
                        </Box>
                      ))
                    )}

                    <Text
                      ml="5px"
                      lineHeight="1"
                      fontWeight="500"
                      fontSize={{ base: "1.4rem", sm: "1.65rem" }}
                    >
                      {ping &&
                      router.asPath.includes("pool") == true &&
                      pairs[
                        getKeyByValue(
                          "pool_id",
                          pairs,
                          Number(router.asPath.split("pool=")[1])
                        )
                      ] != undefined &&
                      pairs[
                        getKeyByValue(
                          "pool_id",
                          pairs,
                          Number(router.asPath.split("pool=")[1])
                        )
                      ].pool_id != poolName[0].pool_id
                        ? curren == "usd"
                          ? (ping.results[0].total_price * asa_2_price)
                              .toFixed(8)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                          : ping.results[0].total_price
                        : router.asPath.includes("pool") == true &&
                          pairs[
                            getKeyByValue(
                              "pool_id",
                              pairs,
                              Number(router.asPath.split("pool=")[1])
                            )
                          ] != undefined &&
                          pairs[
                            getKeyByValue(
                              "pool_id",
                              pairs,
                              Number(router.asPath.split("pool=")[1])
                            )
                          ].pool_id == poolName[0].pool_id
                        ? curren == "usd"
                          ? (ping.results[0].total_price * algoPrice)
                              .toFixed(8)
                              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                          : ping.results[0].total_price
                        : router.asPath.includes("pool") != true &&
                          (curren == "usd"
                            ? (ping.results[0].total_price * algoPrice)
                                .toFixed(8)
                                .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                            : ping.results[0].total_price)}
                    </Text>
                    <TvBulb
                      ml="6px"
                      borderRadius="100%"
                      w={{ base: "16px", sm: "16px" }}
                      height="auto"
                      color="#00c1a1"
                      bg="rgb(75 86 106 / 53%)"
                    />
                  </>
                )
              )}
            </Box>
            <Box display="flex" alignItems="baseline">
              <Box
                id="isMobile"
                className="gg"
                display={{ base: "flex", zz: "none" }}
                mt="5px"
                ref={mobileAppendRef}
              />
              {/* {getTf(value) &&
              getTf(value).volume &&
              getTf(value).volume.length == 0 ? (
                <Spinner mt="7px" width="12px" />
              ) : (
                getTf(value) &&
                getTf(value).volume &&
                getTf(value).volume.length > 0 && (
                  <>
                    <Text mr="3px" fontSize="0.9rem">
                      Volume:
                    </Text>

                    <Text fontSize="0.9rem" color="#19bd78">
                      {getTf(tf)
                        .volume[getTf(tf).volume.length - 1].value.toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                    </Text>
                  </>
                )
              )} */}
            </Box>
          </Box>
        ) : (
          <Spinner ml="15px" />
        )}
        <Box
          id="isDesktop"
          className="gg"
          display={{ base: "none", zz: "flex" }}
          mt="5px"
          ref={appendRef}
        />
        <TimeFrameMenu />
      </Box>
      {!chartRef.current && "z"}
      <div key={poolName[0] && poolName[0].asset_1_id} ref={chartRef} />
      <Tooltip
        textTransform="capitalize"
        pt="5px"
        pb="5px"
        fontWeight="500"
        color="#fff"
        bg="var(--chakra-colors-gray-800)"
        label="Scroll to real-time"
        placement="top"
      >
        <IconButton
          _hover="none"
          _focus="none"
          _active="none"
          bottom="69px"
          bg="none"
          right="95px"
          fill="white"
          position="absolute"
          zIndex="2"
          icon={<ArrowRightIcon />}
          display="none"
          onClick={() => {
            chart.current.timeScale().scrollToPosition(10, true);
          }}
          ref={scrollRef}
        ></IconButton>
      </Tooltip>
    </Box>
  );
};

export default KLineChartt;
