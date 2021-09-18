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

export const isToday = (date) => {
  const today = new Date();

  return (
    date.getDate() === today.getDate()
    && date.getMonth() === today.getMonth()
    && date.getFullYear() === today.getFullYear()
  );
};

export const isWeekAgo = (date) => {
  const weekAgo = new Date( new Date().getDate() - 7 );

  return weekAgo <= date;
};

export const isMonthAgo = (date) => {
  const monthAgo = new Date( new Date().getDate() - 30 );

  return monthAgo <= date;
};

export const isYearAgo = (date) => {
  const yearAgo = new Date( new Date().getDate() - 365 );

  return yearAgo <= date;
};
