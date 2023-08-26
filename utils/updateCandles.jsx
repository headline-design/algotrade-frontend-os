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
