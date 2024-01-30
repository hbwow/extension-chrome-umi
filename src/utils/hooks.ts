import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';

// 定时刷新获取当前时间
export const useRegularRefreshDate = ({ delay } = { delay: 60 * 1e3 }) => {
  const [date, setDate] = useState(dayjs());
  const timer = useRef<any>(null);

  useEffect(() => {
    const calcCurHour = () => {
      timer.current = setTimeout(() => {
        setDate(dayjs());
      }, delay);
    };

    calcCurHour();

    return () => {
      clearTimeout(timer.current);
      timer.current = null;
    };
  }, []);

  return { date }; // 返回一个表示当前时间的 dayjs 对象
};
