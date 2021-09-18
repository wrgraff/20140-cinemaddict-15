import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import isToday from 'dayjs/plugin/isToday';
dayjs.extend(dayOfYear);
dayjs.extend(isToday);

const DAYS_IN_WEEK = 7;

export const updateItemById = (items, updatedItem) => {
  const index = items.findIndex((item) => item.id === updatedItem.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    updatedItem,
    ...items.slice(index + 1),
  ];
};

export const isTodayDate = (date) => dayjs(date).isToday();

export const isWeekAgoDate = (date) => {
  const yearDayNumber = dayjs().dayOfYear();
  const weekAgo = dayjs().dayOfYear(yearDayNumber - DAYS_IN_WEEK);

  return weekAgo <= date;
};

export const isMonthAgoDate = (date) => {
  const yearMonthNumber = dayjs().month();
  const monthAgo = dayjs().month(yearMonthNumber - 1);

  return monthAgo <= date;
};

export const isYearAgoDate = (date) => {
  const yearNumber = dayjs().year();
  const yearAgo = dayjs().year(yearNumber - 1);

  return yearAgo <= date;
};
