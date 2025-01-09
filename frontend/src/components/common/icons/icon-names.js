export const ICONS = {
  GROUP: 'group',
  LEFT_RIGHT_ARROWS: 'left-right-arrows',
  LIGHTNING: 'lightning',
  LOGO_TRELLO: 'logo-trello',
  NOTIFICATION: 'notification',
  PENCIL: 'pencil',
  QUESTION_MARK: 'question-mark',
  ROCKET: 'rocket',
  SEARCH: 'search',
  SETTINGS: 'settings',
  SHARE: 'share',
  SQUARE_DOTS: 'square-dots',
  STAR: 'star',
  TABLE: 'table',
  THREE_DOTS: 'three-dots',
  USER: 'user',
  BARS: 'bars',
  BOARDS: 'boards',
  BOTTOM_ARROW: 'bottom-arrow',
  CALENDAR: 'calendar',
  DOTS: 'dots',
  FRONT_ARROWS: 'front-arrows',
  LIST: 'list',
  CROSS: 'cross',
};

const iconNames = Object.fromEntries(
  Object.keys(ICONS).map((key) => [key, key]),
);
export default iconNames;
