import PropTypes from 'prop-types';
import { useDraggable } from '@dnd-kit/core';

const WithDraggable = ({ draggableId, children, ...rest }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: draggableId,
  });

  const style = transform
    ? {
        all: 'unset',
        WebkitTransform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style ?? { all: 'unset' }}
      {...attributes}
      {...listeners}
      {...rest}
    >
      {children}
    </div>
  );
};

WithDraggable.propTypes = {
  draggableId: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default WithDraggable;
