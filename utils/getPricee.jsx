var moment = require("moment-timezone");
import dayjs from "dayjs";
const toDateStamp = (datetime) => dayjs(datetime).unix();

export const dynamicSort = (property) => {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
};
export const dynamicSortMultiple = () => {
  /*
   * save the arguments object as it will be overwritten
   * note that arguments object is an array-like object
   * consisting of the names of the properties to sort by
   */
  var props = arguments;
  return function (obj1, obj2) {
    var i = 0,
      result = 0,
      numberOfProperties = props.length;
    /* try getting a different result from 0 (equal)
     * as long as we have extra properties to compare
     */
    while (result === 0 && i < numberOfProperties) {
      result = dynamicSort(props[i])(obj1, obj2);
      i++;
    }
    return result;
  };
};
export class MyArrayy extends Array {
  sortBy(...args) {
    return this.sort(dynamicSortMultiple(...args));
  }
}
export const updateCandles = (timeFrame) => {
  let seconds =
    (timeFrame == "1m" && 60) ||
    (timeFrame == "5m" && 300) ||
    (timeFrame == "15m" && 900) ||
    (timeFrame == "30m" && 1800) ||
    (timeFrame == "1h" && 3600) ||
    (timeFrame == "4h" && 14400) ||
    (timeFrame == "12h" && 43200) ||
    (timeFrame == "1d" && 86400);
  return seconds;
};
export const timeDifference = (timeFrame) => {
  const d = new Date();
  const UTC_OFFSET = d.getTimezoneOffset();
  // const UTC_MINUTE =
  //   d.getMinutes() < Number(`${Number(String(d.getMinutes()).slice(0, 1))}5`)
  //     ? Number(`${Number(String(d.getMinutes()).slice(0, 1))}0`)
  //     : Number(`${Number(String(d.getMinutes()).slice(0, 1))}5`);
  // const UTC_15_MINUTE =
  //   d.getMinutes() < Number(`${Number(String(d.getMinutes()).slice(0, 1))}5`)
  //     ? Number(`${Number(String(d.getMinutes()).slice(0, 1))}0`)
  //     : Number(`${Number(String(d.getMinutes()).slice(0, 1))}5`);
  // console.log(d.getMinutes());
  // console.log(Number(`${Number(String(d.getMinutes()).slice(0, 1))}5`));
  // console.log(UTC_MINUTE);
  const UNIX_OFFSET =
    String(UTC_OFFSET).includes("-") == true
      ? Number(`${String(UTC_OFFSET).split("-")[1]}`) * 120
      : UTC_OFFSET * 120;
  const UTC_DATE =
    (timeFrame == "1h" &&
      `${d.getUTCFullYear()}-${
        d.getUTCMonth() + 1
      }-${d.getUTCDate()}T${d.getUTCHours()}:00`) ||
    (timeFrame == "4h" &&
      `${d.getUTCFullYear()}-${
        d.getUTCMonth() + 1
      }-${d.getUTCDate()}T${d.getUTCHours()}:00`) ||
    (timeFrame == "12h" &&
      `${d.getUTCFullYear()}-${
        d.getUTCMonth() + 1
      }-${d.getUTCDate()}T${d.getUTCHours()}:00`) ||
    (timeFrame == "1d" &&
      `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}T00:00`) ||
    (timeFrame == "1m" &&
      `${d.getUTCFullYear()}-${
        d.getUTCMonth() + 1
      }-${d.getUTCDate()}T${d.getUTCHours()}:${d.getMinutes()}`) ||
    (timeFrame == "5m" &&
      `${d.getUTCFullYear()}-${
        d.getUTCMonth() + 1
      }-${d.getUTCDate()}T${d.getUTCHours()}:${
        Math.floor(d.getMinutes() / 5) * 5
      }`) ||
    (timeFrame == "15m" &&
      `${d.getUTCFullYear()}-${
        d.getUTCMonth() + 1
      }-${d.getUTCDate()}T${d.getUTCHours()}:${
        Math.floor(d.getMinutes() / 15) * 15
      }`) ||
    (timeFrame == "30m" &&
      `${d.getUTCFullYear()}-${
        d.getUTCMonth() + 1
      }-${d.getUTCDate()}T${d.getUTCHours()}:${
        Math.floor(d.getMinutes() / 30) * 30
      }`);
  const UTC_UNIX =
    String(UTC_OFFSET).includes("-") == true
      ? toDateStamp(UTC_DATE) + UNIX_OFFSET
      : toDateStamp(UTC_DATE) - UNIX_OFFSET;
  return UTC_UNIX;
};

export const convertToDate = (t) => {
  const d = new Date();
  const UTC_OFFSET = d.getTimezoneOffset();

  const UNIX_OFFSET =
    String(UTC_OFFSET).includes("-") == true
      ? Number(`${String(UTC_OFFSET).split("-")[1]}`) * 60
      : UTC_OFFSET * 60;

  const UTC_UNIX =
    String(UTC_OFFSET).includes("-") == true
      ? t - UNIX_OFFSET
      : t + UNIX_OFFSET;
  // console.log(UTC_UNIX);
  const c = moment.utc(UTC_UNIX*1000, 'x').format('YYYY-MM-DDTHH:mm:ss.SSSZ');

  // console.log(c);
  return c;
};
export const convertToUnix = (t) => {
  const d = new Date();
  const UTC_OFFSET = d.getTimezoneOffset();

  const UNIX_OFFSET =
    String(UTC_OFFSET).includes("-") == true
      ? Number(`${String(UTC_OFFSET).split("-")[1]}`) * 60
      : UTC_OFFSET * 60;

  const UTC_UNIX =
    String(UTC_OFFSET).includes("-") == true
      ? toDateStamp(t) + UNIX_OFFSET
      : toDateStamp(t) - UNIX_OFFSET;
  // console.log(UTC_UNIX);
  // const c = moment.utc(UTC_UNIX*1000, 'x').format('YYYY-MM-DDTHH:mm:ss.SSSZ');

  // console.log(UTC_UNIX);
  return UTC_UNIX;
};
export const convertTime = (dataDate) => {
  const d = new Date();
  const UTC_OFFSET = d.getTimezoneOffset();
  const UNIX_OFFSET =
    String(UTC_OFFSET).includes("-") == true
      ? Number(`${String(UTC_OFFSET).split("-")[1]}`) * 60
      : UTC_OFFSET * 60;
  if (String(UTC_OFFSET).includes("-") == true) {
    return toDateStamp(dataDate) + UNIX_OFFSET;
  }
  if (String(UTC_OFFSET).includes("-") != true) {
    return toDateStamp(dataDate) - UNIX_OFFSET;
  }
};
export const offsetLocale = (dataDate) => {
  
  const d = new Date();
  const UTC_OFFSET = d.getTimezoneOffset();
  const UNIX_OFFSET =
    String(UTC_OFFSET).includes("-") == true
      ? Number(`${String(UTC_OFFSET).split("-")[1]}`) * 60
      : UTC_OFFSET * 60;
  if (String(UTC_OFFSET).includes("-") == true) {
    return dataDate + UNIX_OFFSET;
  }
  if (String(UTC_OFFSET).includes("-") != true) {
    return dataDate - UNIX_OFFSET;
  }
};
export const fetchPricee = (data, tf) => {
  const d = new Date();
  const UTC_OFFSET = d.getTimezoneOffset();
  const UNIX_OFFSET =
    String(UTC_OFFSET).includes("-") == true
      ? Number(`${String(UTC_OFFSET).split("-")[1]}`) * 60
      : UTC_OFFSET * 60;

  const volumeData = data.map((d) => {
    return {
      time:
        String(UTC_OFFSET).includes("-") == true
          ? toDateStamp(d.datetime) + UNIX_OFFSET
          : toDateStamp(d.datetime) - UNIX_OFFSET,
      value: d.volume,
      open: d.open,
      close: d.close,
      color:
        d.close <= d.open
          ? "rgba(221, 94, 86, 0.3)"
          : "rgba(82, 164, 154, 0.3)",
    };
  });

  const ohlcData = data.map((d) => {
    return {
      volume: {
        time:
          String(UTC_OFFSET).includes("-") == true
            ? toDateStamp(d.datetime) + UNIX_OFFSET
            : toDateStamp(d.datetime) - UNIX_OFFSET,
        value: d.volume,
        open: d.open,
        close: d.close,
        color:
          d.close <= d.open
            ? "rgba(221, 94, 86, 0.3)"
            : "rgba(82, 164, 154, 0.3)",
      },
      ohlc: {
        open: d.open,
        close: d.close,
        low: d.low,
        high: d.high,
        time:
          String(UTC_OFFSET).includes("-") == true
            ? toDateStamp(d.datetime) + UNIX_OFFSET
            : toDateStamp(d.datetime) - UNIX_OFFSET,
      },
    };
  });
  const candleLength =
    (ohlcData[ohlcData.length - 1].ohlc.time - ohlcData[0].ohlc.time) /
    updateCandles(tf);
  function getWeekDates() {
    let dates = [];
    for (let i = 0; i <= candleLength; i++) {
      dates.push(ohlcData[0].ohlc.time + i * updateCandles(tf));
    }

    return dates;
  }

  let dates = getWeekDates();

  let r = dates.map((d) => {
    let o = ohlcData.find((x) => x.ohlc.time === d);
    return o ?? { time: d };
  });
  let rr = dates.map((d) => {
    let o = ohlcData.find((x) => x.ohlc.time === d);
    return o ?? { time: d };
  });
  r.sort(dynamicSort("time"));
  rr.sort(dynamicSort("time"));
  let nonEmpty = [];
  const finalData = () => {
    let volume = [];
    let ohlc = [];
    r.map((items, index) => {
      if (items.ohlc && items.ohlc.open) {
        nonEmpty.push({ id: index });
      }
      const volumee = {
        time: items.ohlc ? items.ohlc.time : items.time,
        value: !items.volume ? 0 : items.volume.value,
        color: !items.volume
          ? rr[nonEmpty[nonEmpty.length - 1].id].ohlc.close <=
            rr[nonEmpty[nonEmpty.length - 1].id].ohlc.open
            ? "rgba(221, 94, 86, 0.3)"
            : "rgba(82, 164, 154, 0.3)"
          : !items.volume
          ? rr[nonEmpty[nonEmpty.length - 1].id].volume.color
          : items.volume.color,
      };
      volume.push(volumee);
      const ohlcc = {
        open: !items.ohlc
          ? r[nonEmpty[nonEmpty.length - 1].id].ohlc.close
          : items.ohlc.open,
        close: !items.ohlc
          ? r[nonEmpty[nonEmpty.length - 1].id].ohlc.close
          : items.ohlc.close,
        low: !items.ohlc
          ? r[nonEmpty[nonEmpty.length - 1].id].ohlc.close
          : items.ohlc.low,
        high: !items.ohlc
          ? r[nonEmpty[nonEmpty.length - 1].id].ohlc.close
          : items.ohlc.high,
        time: items.ohlc ? items.ohlc.time : items.time,
      };
      ohlc.push(ohlcc);
    });
    volume.sort(dynamicSort("time"));
    ohlc.sort(dynamicSort("time"));

    return {
      volume: volume,
      ohlc: ohlc,
    };
  };
  const { volume: volumeDataa, ohlc: ohlcDataa } = finalData();

  // if (type == "volume") {
  //   items.volume.map((item, index) => {
  //     if (item.open) {
  //       nonEmpty.map(
  //         (i) => i.id == index && nonEmpty.push({ id: index })
  //         // includes(index) nonEmpty.push({ id: index });
  //       );
  //     }
  //     // z.map((z) => z.id == 'z'
  //     return {
  //       open: !item.open
  //         ? r[nonEmpty[nonEmpty.length - 1].id].open
  //         : item.open,
  //       close: !item.close
  //         ? r[nonEmpty[nonEmpty.length - 1].id].open
  //         : item.close,
  //       low: !item.low ? r[nonEmpty[nonEmpty.length - 1].id].open : item.low,
  //       high: !item.high
  //         ? r[nonEmpty[nonEmpty.length - 1].id].open
  //         : item.high,
  //       time: item.time,
  //     };
  //   });
  // }

  // const finalData = (items, type) => {
  //   items.map((item, index)=>
  //   if (item.open) {
  //     nonEmpty.push({ id: index }
  //   )}})})

  //   return {
  //     open: !item.open ? r[nonEmpty[nonEmpty.length - 1].id].open : item.open,
  //     close: !item.close
  //       ? r[nonEmpty[nonEmpty.length - 1].id].open
  //       : item.close,
  //     low: !item.low ? r[nonEmpty[nonEmpty.length - 1].id].open : item.low,
  //     high: !item.high ? r[nonEmpty[nonEmpty.length - 1].id].open : item.high,
  //     time: item.time,
  //   };
  // });
  const finalVolume = rr.map((item, index) => {
    return {
      time: item.time,
      value: !item.value ? 0 : item.value,
      color: !item.color
        ? rr[nonEmpty[nonEmpty.length - 1].id].close <=
          rr[nonEmpty[nonEmpty.length - 1].id].open
          ? "rgba(221, 94, 86, 0.3)"
          : "rgba(82, 164, 154, 0.3)"
        : item.color,
    };
  });
  // MyArrayy.from(finalData).sortBy("ohlc", "-time");

  // finalData.sort(dynamicSort(["volume"]["time"]));
  return { volume: volumeDataa, ohlc: ohlcDataa };
};

export const candleMissingTime = (
  candleLength,
  nowTime,
  data,
  tf,
  volumeData
) => {
  function getWeekDates() {
    let dates = [];
    for (let i = 0; i <= candleLength; i++) {
      dates.push(nowTime - i * updateCandles(tf));
    }

    return dates;
  }

  let dates = getWeekDates();

  // console.log(dates);
  let r = dates.map((d) => {
    let o = data.find((x) => x.time === d);
    return o ?? { time: d };
  });
  let rr = dates.map((d) => {
    let o = volumeData.find((x) => x.time === d);
    return o ?? { time: d };
  });
  r.sort(dynamicSort("time"));
  rr.sort(dynamicSort("time"));
  let nonEmpty = [];
  let missingCandle = [];
  let missingVolume = [];

  r.map((item, index) => {
    item.open && nonEmpty.push({ id: index });
    // console.log(item);
    // console.log(nonEmpty);
    if (!item.open) {
      if (nonEmpty.length > 0) {
        missingCandle.push({
          open: r[nonEmpty[nonEmpty.length - 1].id].close,
          close: r[nonEmpty[nonEmpty.length - 1].id].close,
          low: r[nonEmpty[nonEmpty.length - 1].id].close,
          high: r[nonEmpty[nonEmpty.length - 1].id].close,

          time: item.time,
        });
      }
      if (nonEmpty.length > 0 == false) {
        missingCandle.push({
          open: data[data.length - 1].close,
          close: data[data.length - 1].close,
          low: data[data.length - 1].close,
          high: data[data.length - 1].close,
          time: item.time,
        });
      }
    }
  });
  // console.log(missingCandle);
  rr.map((item, index) => {
    if (!item.value) {
      if (nonEmpty.length > 0) {
        missingVolume.push({
          time: item.time,
          value: 0,
          color:
            rr[nonEmpty[nonEmpty.length - 1].id].close <=
            rr[nonEmpty[nonEmpty.length - 1].id].open
              ? "rgba(221, 94, 86, 0.3)"
              : "rgba(82, 164, 154, 0.3)",
        });
      }
      if (nonEmpty.length > 0 == false) {
        missingVolume.push({
          time: item.time,
          value: 0,
          color:
            volumeData[volumeData.length - 1].close <=
            volumeData[volumeData.length - 1].open
              ? "rgba(221, 94, 86, 0.3)"
              : "rgba(82, 164, 154, 0.3)",
        });
      }
    }
  });
  missingCandle.sort(dynamicSort("time"));
  missingVolume.sort(dynamicSort("time"));

  return {
    missingCandle: missingCandle,
    missingVolume: missingVolume,
  };
};

export const IntervalSeconds = (tf) => {
  const d = new Date();

  if (tf == "5m" || tf == "15m" || tf == "30m") {
    const CURRENT_MINS = d.getMinutes();
    const NEXT_MINS =
      Math.floor(d.getMinutes() / Number(tf.split("m")[0])) *
        Number(tf.split("m")[0]) +
      Number(tf.split("m")[0]);
    const remainingSeconds = (NEXT_MINS - CURRENT_MINS) * 60 + d.getSeconds();
    return remainingSeconds;
  }
  if (tf == "1m") {
    const seconds = 60 - d.getSeconds();
    return seconds;
  }
  if (tf == "1h") {
    const hourMinutes = (60 - d.getMinutes()) * 60;
    return hourMinutes;
  }
  return;
};
