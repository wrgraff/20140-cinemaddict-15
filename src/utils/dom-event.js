import { KeyboardKey, ESCAPE_KEYS } from '@const/common.js';

export const isEscapeEvent = (evt) => ESCAPE_KEYS.includes(evt.key);

export const isCommandEnterEvent = (evt) => evt.key === KeyboardKey.ENTER && evt.metaKey;

export const isControlEnterEvent = (evt) => evt.key === KeyboardKey.ENTER && evt.ctrlKey;
