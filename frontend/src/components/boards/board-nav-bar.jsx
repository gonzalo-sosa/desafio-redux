import { Component } from 'react';
import NavBar from '@/components/common/nav-bar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeBoard } from '@/store/boards';
import LoadIcon from '@/components/common/icons/load-icon';
import iconNames from '@/components/common/icons/icon-names';

class BoardNavBar extends Component {
  render() {
    const { title } = this.props;

    return (
      <NavBar className="board-nav-bar">
        <span className="navbar-brand">{title}</span>
        <ul className="navbar-nav">
          <li className="nav-item">
            <button className="btn">
              <LoadIcon name={iconNames.STAR} height={16} width={16} />
            </button>
          </li>
          <li className="nav-item">
            <button className="btn">
              <LoadIcon name={iconNames.GROUP} height={16} width={16} />
            </button>
          </li>
          <li className="nav-item">
            <button className="btn">
              <LoadIcon name={iconNames.LIST} height="24" width="24" />
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
              <LoadIcon name={iconNames.BOTTOM_ARROW} height={16} width={16} />
            </button>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item">
            <button className="btn">
              <LoadIcon name={iconNames.ROCKET} height={16} width={16} />
            </button>
          </li>
          <li className="nav-item">
            <button className="btn">
              <LoadIcon name={iconNames.LIGHTNING} height={16} width={16} />
            </button>
          </li>
          <li className="nav-item">
            <button className="btn">
              <LoadIcon name={iconNames.BARS} height={16} width={16} />
              Filtros
            </button>
          </li>
          <li className="nav-item d-flex align-items-center mx-2">
            <button className="btn p-0 d-flex align-items-center">
              <span className="user-icon">
                <span>GS</span>
              </span>
            </button>
          </li>
          <li className="nav-item">
            <button
              className="btn text-white d-flex align-items-center"
              style={{ backgroundColor: 'rgb(0 0 0 / 58%)' }}
            >
              <LoadIcon name={iconNames.SHARE} height={16} width={16} />
              Compartir
            </button>
          </li>
          <li className="nav-item">
            <button className="btn">
              <LoadIcon name={iconNames.THREE_DOTS} height={16} width={16} />
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
