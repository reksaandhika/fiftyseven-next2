import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

const getCurrentTime = () => {
  const dateTime = DateTime.now();

  return {
    h: dateTime.hour,
    m: dateTime.minute,
    s: dateTime.second,
    formatted: dateTime.toLocaleString(DateTime.TIME_SIMPLE).replace(/\s/g, ''),
  };
}

export function useCurrentTime() {
  const [time, setTime] = useState(getCurrentTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getCurrentTime);
    }, 1000 * 60);

    return () => {
      clearInterval(intervalId)
    }
  }, []);

  return time;
}
