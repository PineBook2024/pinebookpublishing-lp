import { useEffect, useState } from 'react';

export default function CountDown({ initialHours = 0, initialMinutes = 0, initialSeconds = 0 }) {
  const [time, setTime] = useState({
    hours: initialHours,
    minutes: initialMinutes,
    seconds: initialSeconds,
  });

  useEffect(() => {
    const timerId = setInterval(() => {
      if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
        clearInterval(timerId);
      } else if (time.minutes === 0 && time.seconds === 0) {
        setTime({
          hours: time.hours - 1,
          minutes: 59,
          seconds: 59,
        });
      } else if (time.seconds === 0) {
        setTime({
          hours: time.hours,
          minutes: time.minutes - 1,
          seconds: 59,
        });
      } else {
        setTime({
          hours: time.hours,
          minutes: time.minutes,
          seconds: time.seconds - 1,
        });
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [time]);

  const getStrokeDashoffset = (value, max) => {
    const circumference = 2 * Math.PI * 45;
    return circumference - (value / max) * circumference;
  };

  return (
    <div className="new-lp-counter-container mb-8">
      <div className="circleContainer">
        <svg className="svg">
          <circle className="circleBackground" cx="50" cy="50" r="45" />
          <circle
            className="circleForeground hours"
            cx="50"
            cy="50"
            r="45"
            style={{ strokeDashoffset: getStrokeDashoffset(time.hours, 24) }}
          />
        </svg>
        <div className="timeLabel">Hours</div>
        <div className="timeValue">{time.hours}</div>
      </div>
      <div className="circleContainer">
        <svg className="svg">
          <circle className="circleBackground" cx="50" cy="50" r="45" />
          <circle
            className="circleForeground minutes"
            cx="50"
            cy="50"
            r="45"
            style={{ strokeDashoffset: getStrokeDashoffset(time.minutes, 60) }}
          />
        </svg>
        <div className="timeLabel">Minutes</div>
        <div className="timeValue">{time.minutes}</div>
      </div>
      <div className="circleContainer">
        <svg className="svg">
          <circle className="circleBackground" cx="50" cy="50" r="45" />
          <circle
            className="circleForeground seconds"
            cx="50"
            cy="50"
            r="45"
            style={{ strokeDashoffset: getStrokeDashoffset(time.seconds, 60) }}
          />
        </svg>
        <div className="timeLabel">Seconds</div>
        <div className="timeValue">{time.seconds}</div>
      </div>
    </div>
  );
}
