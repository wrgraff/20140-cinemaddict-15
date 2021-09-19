export const MINUTES_IN_HOURS = 60;

export const KeyboardKey = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
  ENTER: 'Enter',
};

export const ESCAPE_KEYS = [
  KeyboardKey.ESCAPE,
  KeyboardKey.ESC,
];

export const UserAction = {
  UPDATE_WATCHED: 'UPDATE_WATCHED',
  UPDATE_WATCHLIST: 'UPDATE_WATCHLIST',
  UPDATE_FAVORITE: 'UPDATE_FAVORITE',
  SWITCH_COMMENT: 'UPDATE_COMMENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};
