import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ReactApexChart from "react-apexcharts";
import { Box } from "@chakra-ui/react";
import Sparkline from "react-sparkline-svg";
import useSWR from "swr";
import axios from "axios";
import dayjs from "dayjs";
const fetcherr = async (url) => await axios.get(url).then((res) => res.data);

export const AlgoHourly = (ppp) => {
  const breakAlgo = ppp.response.map((d) => {
    return {
      y: Number((d.close_price - d.close_price * 0.003)
        .toFixed(8)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,"))*10,
    };
  });
  return breakAlgo;
};

const AsaSparkline = ({ pool_id, decimals }) => {
  const { data: sparkline } = useSWR(
    `https://api.algotrade.net/sparkline-7d/${pool_id}`,
    fetcherr,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  return !sparkline ? (
    <Box width="130px" height="42px" />
  ) : (
    <ResponsiveContainer width={130} height={50}>
      <LineChart data={sparkline && AlgoHourly(sparkline)}>
        <YAxis hide domain={["dataMin", "dataMax"]} />
        <Line
          dataKey="y"
          isAnimationActive={false}
          type="linear"
          stroke="#77B6EA"
          strokeWidth={1.4}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AsaSparkline;
