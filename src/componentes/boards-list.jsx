import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBoard, loadBoards } from '../store/boards';
import NewBoardForm from './new-board-form';

const BoardsList = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.entities.boards.list);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(loadBoards());
  }, []);

  return (
    <ul>
      Sus tableros <button onClick={() => setShowForm(true)}>+</button>
      {showForm && <NewBoardForm />}
      {boards.map((board) => (
        <li key={board.id} className="nav-item">
          <a href="" className="nav-link text-light">
            {board.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default BoardsList;
