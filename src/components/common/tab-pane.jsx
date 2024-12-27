import PropTypes from 'prop-types';

const TabPane = ({ id, active, children, ...rest }) => {
  const classes = active ? 'tab-pane fade in active' : '';

  return (
    <div
      className={classes}
      id={id}
      role="tabpanel"
      aria-labelledby={id}
      tabIndex="0"
      {...rest}
    >
      {children}
    </div>
  );
};

TabPane.propTypes = {
  id: PropTypes.string.isRequired,
  active: PropTypes.bool,
  children: PropTypes.node,
};

export default TabPane;
