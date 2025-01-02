import { Component } from 'react';
import ArrowIcon from '@/components/common/icons/arrow-icon';
import BarsIcon from '@/components/common/icons/bars-icon';
import DotsIcon from '@/components/common/icons/dots-icon';
import GroupIcon from '@/components/common/icons/group-icon';
import LightningIcon from '@/components/common/icons/lightning-icon';
import NavBar from '@/components/common/nav-bar';
import PropTypes from 'prop-types';
import RocketIcon from '@/components/common/icons/rocket-icon';
import ShareIcon from '@/components/common/icons/share-icon';
import StarIcon from '@/components/common/icons/star-icon';
import { connect } from 'react-redux';
import { removeBoard } from '@/store/boards';

class BoardNavBar extends Component {
  render() {
    const { title } = this.props;

    return (
      <NavBar>
        <span className="navbar-brand text-white">{title}</span>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link text-white" href="#">
              <StarIcon />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">
              <GroupIcon />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">
              Tablero
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">
              Tabla
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">
              <ArrowIcon />
            </a>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link text-white" href="#">
              <RocketIcon />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">
              <LightningIcon />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">
              <BarsIcon />
              Filtros
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">
              Cuenta
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">
              <ShareIcon />
              Compartir
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">
              <DotsIcon />
            </a>
          </li>
          <li className="nav-item">
            <button
              onClick={() => this.props.removeBoard(this.props.boardId)}
              className="btn btn-danger"
            >
              X
            </button>
          </li>
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
