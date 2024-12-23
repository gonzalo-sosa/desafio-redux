import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadBoards } from '../store/boards';
import NewBoardForm from './new-board-form';
import { Link } from 'react-router-dom';
import Modal from './common/modal';

const BoardsList = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.entities.boards.list);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(loadBoards());
  }, [dispatch]);

  return (
    <>
      <ul>
        <button className="" onClick={() => setShowForm(true)}>
          +
        </button>
        {showForm && (
          <Modal
            label={'Nuevo tablero'}
            onClose={() => setShowForm(false)}
            btnSave={{
              type: 'submit',
              form: 'new-board-form',
            }}
          >
            <NewBoardForm
              onSubmit={() => setShowForm(false)}
              form={{ id: 'new-board-form' }}
            />
          </Modal>
        )}
        {boards.map((board) => (
          <li key={board.id} className="nav-item">
            <Link href="" className="nav-link text-light">
              {board.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BoardsList;
