import { formatAmount } from '@utils/format.js';

export const createFooterStatisticsTemplate = ( amount ) => (`<p>${formatAmount(amount)} movies inside</p>`);
