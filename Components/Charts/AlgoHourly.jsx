import dayjs from "dayjs";


export const SetAlgoUsdd = (ppp) => {
  const breakAlgo = ppp.response
    .slice(-1)[0]
    .close_price.toFixed(3)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  return breakAlgo;
};


export const AlgoDay = (ppp) => {
  const breakAlgo = ppp.response[ppp.response.length - 25].close_price
    .toFixed(8)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  return breakAlgo;
};



export const AlgoHourly = (ppp) => {
  const breakAlgo = ppp.response.map((d) => {
    return {
      x: dayjs(d.bucket).format("DD MMM HH:mm"),
      y: (d.close_price - d.close_price * 0.003)
        .toFixed(4)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,"),
    };
  });
  return breakAlgo;
};

