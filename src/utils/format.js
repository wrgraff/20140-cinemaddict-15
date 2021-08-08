import { MINUTES_IN_HOURS } from '@const/common.js';

export const formatAmount = (amount, separator = ' ') => (
  amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
);

export const formatRuntime = (runtime) => {
  const runtimeHours = Math.round(runtime / MINUTES_IN_HOURS);
  const runtimeMinutes = runtime % MINUTES_IN_HOURS;

  return `${runtimeHours}h ${runtimeMinutes}m`;
};
