export const ICONS = {
  LOGO_TRELLO: 'logo-trello',
  NOTIFICATION: 'notification',
  QUESTION_MARK: 'question-mark',
  SEARCH: 'search',
  SETTINGS: 'settings',
  SQUARE_DOTS: 'square-dots',
  TABLE: 'table',
  USER: 'user',
  BOARDS: 'boards',
  CALENDAR: 'calendar',
  DOTS: 'dots',
  LIST: 'list',
  CROSS: 'cross',
};

const iconNames = Object.fromEntries(
  Object.keys(ICONS).map((key) => [key, key]),
);
export default iconNames;
