import PropTypes from 'prop-types';
import { useDroppable } from '@dnd-kit/core';

const WithDroppable = ({ droppableId, children, ...rest }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: droppableId,
  });

  const style = {
    all: 'unset',
    color: isOver ? 'gray' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...rest}>
      {children}
    </div>
  );
};

WithDroppable.propTypes = {
  droppableId: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default WithDroppable;
