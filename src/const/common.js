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
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  PATCH_COMMENTS: 'PATCH_COMMENTS',
  PATCH_WATCHED: 'PATCH_WATCHED',
  PATCH_WATCHLIST: 'PATCH_WATCHLIST',
  PATCH_FAVORITE: 'PATCH_FAVORITE',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};
