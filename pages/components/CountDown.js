import { useEffect, useState } from 'react';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 100,
  strokeWidth: 14
};

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper shadow-lg">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

const totalDuration = 6 * hourSeconds + 35 * minuteSeconds; // 3 hours, 35 minutes

export default function CountDown() {
  const [remainingTime, setRemainingTime] = useState(totalDuration);

  useEffect(() => {
    const storedStartTime = localStorage.getItem('countdownStartTime');
    let startTime;

    if (storedStartTime) {
      startTime = parseFloat(storedStartTime);
    } else {
      startTime = Date.now() / 1000;
      localStorage.setItem('countdownStartTime', startTime);
    }

    const calculateRemainingTime = () => {
      const currentTime = Date.now() / 1000;
      const elapsedTime = currentTime - startTime;
      return Math.max(totalDuration - elapsedTime, 0);
    };

    setRemainingTime(calculateRemainingTime());

    const interval = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center gap-5 mb-10 flex-col lg:flex-row items-center">
      <CountdownCircleTimer
        {...timerProps}
        colors="#075448"
        duration={daySeconds}
        initialRemainingTime={remainingTime % daySeconds}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > hourSeconds
        })}
      >
        {({ elapsedTime, color }) => (
          <span style={{ color }}>
            {renderTime("hours", getTimeHours(daySeconds - elapsedTime))}
          </span>
        )}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors="#333"
        duration={hourSeconds}
        initialRemainingTime={remainingTime % hourSeconds}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds
        })}
      >
        {({ elapsedTime, color }) => (
          <span style={{ color }}>
            {renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))}
          </span>
        )}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors="#ff9999"
        duration={minuteSeconds}
        initialRemainingTime={remainingTime % minuteSeconds}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > 0
        })}
      >
        {({ elapsedTime, color }) => (
          <span style={{ color }}>
            {renderTime("seconds", getTimeSeconds(elapsedTime))}
          </span>
        )}
      </CountdownCircleTimer>
    </div>
  );
}
