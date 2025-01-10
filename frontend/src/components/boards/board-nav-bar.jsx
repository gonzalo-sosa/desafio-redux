import { Component } from 'react';
import NavBar from '@/components/common/nav-bar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeBoard } from '@/store/boards';
import LoadIcon from '@/components/common/icons/load-icon';
import RocketIcon from '@/components/common/icons/rocket-icon';
import LightningIcon from '@/components/common/icons/lightning-icon';
import iconNames from '@/components/common/icons/icon-names';
import BottomArrowIcon from '@/components/common/icons/bottom-arrow-icon';
import StarIcon from '@/components/common/icons/star-icon';
import GroupIcon from '@/components/common/icons/group-icon';
import ShareIcon from '../common/icons/share-icon';
import ThreeDotsIcon from '../common/icons/three-dots-icon';
import BarsIcon from '../common/icons/bars-icon';
import ListIcon from '../common/icons/list-icon';
import UserContext from '../../context/user-context';

class BoardNavBar extends Component {
  static contextType = UserContext;

  render() {
    const { title } = this.props;

    if (!title) return null;

    return (
      <UserContext.Consumer>
        {(userContext) => (
          <NavBar className="board-nav-bar">
            <h4 className="navbar-brand mb-0">{title}</h4>
            <ul className="navbar-nav">
              <li className="nav-item">
                <button className="btn">
                  <StarIcon height={16} width={16} />
                </button>
              </li>
              <li className="nav-item">
                <button className="btn">
                  <GroupIcon height={16} width={16} />
                </button>
              </li>
              <li className="nav-item">
                <button className="btn bg-secondary text-light">
                  <ListIcon height="18" width="18" className="me-2" />
                  Tablero
                </button>
              </li>
              <li className="nav-item">
                <button className="btn">
                  <LoadIcon name={iconNames.TABLE} height={16} width={16} />
                  Tabla
                </button>
              </li>
              <li className="nav-item">
                <button className="btn">
                  <BottomArrowIcon height={16} width={16} />
                </button>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <button className="btn">
                  <RocketIcon width={16} height={16} />
                </button>
              </li>
              <li className="nav-item">
                <button className="btn">
                  <LightningIcon height={16} width={16} />
                </button>
              </li>
              <li className="nav-item">
                <button className="btn">
                  <BarsIcon height={16} width={16} className="me-2" />
                  Filtros
                </button>
              </li>
              <li className="nav-item d-flex align-items-center mx-2">
                <button className="btn p-0 d-flex align-items-center">
                  <span className="user-icon">
                    <span>{userContext?.initials}</span>
                  </span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="btn text-white d-flex align-items-center"
                  style={{ backgroundColor: 'rgb(0 0 0 / 58%)' }}
                >
                  <ShareIcon height={16} width={16} />
                  Compartir
                </button>
              </li>
              <li className="nav-item">
                <button className="btn">
                  <ThreeDotsIcon height={16} width={16} />
                </button>
              </li>
              {/* <li className="nav-item">
            <button
              onClick={() => this.props.removeBoard(this.props.boardId)}
              className="btn btn-danger"
            >
              X
            </button>
          </li> */}
            </ul>
          </NavBar>
        )}
      </UserContext.Consumer>
    );
  }
}

BoardNavBar.propTypes = {
  title: PropTypes.string,
  boardId: PropTypes.number,
  removeBoard: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  removeBoard: (board) => dispatch(removeBoard(board)),
});

export default connect(null, mapDispatchToProps)(BoardNavBar);
