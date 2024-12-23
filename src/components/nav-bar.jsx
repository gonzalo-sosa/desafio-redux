import { Link } from 'react-router-dom';
import DropDown from './common/drop-down';
import NotificationIcon from './common/icons/notification-icon';
import QuestionMarkIcon from './common/icons/question-mark-icon';
import Search from './search';

const NavBar = () => {
  const dropdownItems = [
    { label: 'Action', href: '#' },
    { label: 'Another action', href: '#' },
    { label: 'Something else here', href: '#' },
  ];

  return (
    <nav className="nav navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="d-flex">
        <button className="btn btn-secondary mx-2">Menú</button>
        <Link to="/" className="navbar-brand">
          Trello
        </Link>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item">
            <DropDown label={'Espacios de trabajo'} items={dropdownItems} />
          </li>
          <li className="nav-item">
            <DropDown label={'Reciente'} items={dropdownItems} />
          </li>
          <li className="nav-item">
            <DropDown label={'Marcado'} items={dropdownItems} />
          </li>
          <li className="nav-item">
            <DropDown label={'Plantillas'} items={dropdownItems} />
          </li>
          <li>
            <button className="btn btn-primary text-dark">Crear</button>
          </li>
        </ul>
        <div className="w-100 d-flex justify-content-end">
          <div className="d-flex mx-2">
            <Search />
          </div>
          <div className="d-flex mx-2">
            <button className="nav-link">
              <NotificationIcon />
            </button>
            <button className="nav-link">
              <QuestionMarkIcon />
            </button>
            <button className="nav-link">
              <span>Cuenta</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
