export const formatNumber = (number, separator = ' ') => (
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
);
