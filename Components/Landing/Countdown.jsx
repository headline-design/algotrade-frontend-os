import { useEffect, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const Countdown = () => {
  const releaseDate = "2022-04-20T11:00:00.000Z";
  const leading0 = (num) => {
    return num < 10 ? "0" + num : num;
  };
  const [clockInt, setClockInt] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const getTimeUntil = (deadline) => {
    const time = Date.parse(deadline) - Date.parse(new Date());
    if (time < 0) {
      setClockInt({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    } else {
      const seconds = Math.floor((time / 1000) % 60);
      const minutes = Math.floor((time / 1000 / 60) % 60);
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      setClockInt({
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      });
    }
  };

  useEffect(() => {
    getTimeUntil(releaseDate);
  }, []);
  useEffect(() => {
    setInterval(() => getTimeUntil(releaseDate), 1000);
  }, []);

  return (
    <Box mt="55px">
      <Box
        display="flex"
        flexDirection="column"
        alignItems={{ base: "center", lg: "flex-start" }}
      >
        <Heading
          mb={{ base: "15px", lg: "0" }}
          fontSize={{
            base: "4.1vw",
            custom: "3.9vw",
            zz: "3.3vw",
            lg: "0.9rem",
            llg: "1.25rem",
          }}
          letterSpacing="0.1rem"
          fontWeight="600"
          color="#a0aec0"
          fontFamily="sans-serif"
          as="h2"
        >
          WE ARE COMING SOON
        </Heading>
        <Box
          display="flex"
          alignItems="center"
          width={{ base: "100%", lg: "300px", llg: "370px" }}
          justifyContent="space-between"
        >
          <Box display="block">
            <Box display="flex" flexDirection="column" alignItems="center">
              <Text
                lineHeight="1.03"
                fontFamily="sans-serif"
                letterSpacing="0.15rem"
                className="Clock-days"
                fontSize={{
                  base: "13vw",
                  custom: "12vw",
                  zz: "11vw",
                  lg: "3rem",
                  llg: "3.5rem",
                }}
              >
                {leading0(clockInt.days)}
              </Text>
              <Text
                fontFamily="sans-serif"
                className="Clock-days"
                fontSize="0.75rem"
                color="#a0aec0"
              >
                Days
              </Text>
            </Box>
          </Box>

          <Box display="block">
            <Box display="flex" flexDirection="column" alignItems="center">
              <Text
                lineHeight="1.03"
                fontFamily="sans-serif"
                className="Clock-days"
                letterSpacing="0.15rem"
                fontSize={{
                  base: "13vw",
                  custom: "12vw",
                  zz: "11vw",
                  lg: "3rem",
                  llg: "3.5rem",
                }}
              >
                {" "}
                {leading0(clockInt.hours)}
              </Text>
              <Text
                fontFamily="sans-serif"
                className="Clock-days"
                fontSize="0.75rem"
                color="#a0aec0"
              >
                {" "}
                Hours
              </Text>
            </Box>
          </Box>
          <Box display="block">
            <Box display="flex" flexDirection="column" alignItems="center">
              <Text
                lineHeight="1.03"
                fontFamily="sans-serif"
                className="Clock-days"
                letterSpacing="0.15rem"
                fontSize={{
                  base: "13vw",
                  custom: "12vw",
                  zz: "11vw",
                  lg: "3rem",
                  llg: "3.5rem",
                }}
              >
                {" "}
                {leading0(clockInt.minutes)}
              </Text>
              <Text
                fontFamily="sans-serif"
                className="Clock-days"
                fontSize="0.75rem"
                color="#a0aec0"
              >
                {" "}
                Minutes
              </Text>
            </Box>
          </Box>
          <Box display="block">
            <Box display="flex" flexDirection="column" alignItems="center">
              <Text
                lineHeight="1.03"
                fontFamily="sans-serif"
                className="Clock-days"
                fontSize={{
                  base: "13vw",
                  custom: "12vw",
                  zz: "11vw",
                  lg: "3rem",
                  llg: "3.5rem",
                }}
                letterSpacing="0.15rem"
              >
                {" "}
                {leading0(clockInt.seconds)}
              </Text>
              <Text
                fontFamily="sans-serif"
                className="Clock-days"
                fontSize="0.75rem"
                color="#a0aec0"
              >
                {" "}
                Seconds
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Countdown;
