import { Component } from 'react';
import ArrowIcon from './common/icons/arrow-icon';
import BarsIcon from './common/icons/bars-icon';
import DotsIcon from './common/icons/dots-icon';
import GroupIcon from './common/icons/group-icon';
import LightningIcon from './common/icons/lightning-icon';
import NavBar from './common/nav-bar';
import PropTypes from 'prop-types';
import RocketIcon from './common/icons/rocket-icon';
import ShareIcon from './common/icons/share-icon';
import StarIcon from './common/icons/star-icon';

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
        </ul>
      </NavBar>
    );
  }
}

BoardNavBar.propTypes = {
  title: PropTypes.string,
};

export default BoardNavBar;
