import { formatNumber } from '@utils/format.js';

export const createFooterStatisticsTemplate = ( amount ) => (`<p>${formatNumber(amount)} movies inside</p>`);
