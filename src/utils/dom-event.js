import { ESCAPE_KEYS } from '@const/common.js';

export const isEscapeEvent = (evt) => ESCAPE_KEYS.includes(evt.key);
