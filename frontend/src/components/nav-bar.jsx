import { Link } from 'react-router-dom';
import DropDown from '@/components/common/drop-down';
import Search from '@/components/search';
import iconNames from './common/icons/icon-names';
import LoadIcon from './common/icons/load-icon';
import Logo from './logo';

const dropdownItems = {
  ESPACIOS_DE_TRABAJO: [
    { label: 'Action', href: '#' },
    { label: 'Another action', href: '#' },
    { label: 'Something else here', href: '#' },
  ],
  RECIENTE: [
    { label: 'Action', href: '#' },
    { label: 'Another action', href: '#' },
    { label: 'Something else here', href: '#' },
  ],
  MARCADO: [
    { label: 'Action', href: '#' },
    { label: 'Another action', href: '#' },
    { label: 'Something else here', href: '#' },
  ],
  PLANTILLAS: [
    { label: 'Action', href: '#' },
    { label: 'Another action', href: '#' },
    { label: 'Something else here', href: '#' },
  ],
};

const NavBar = () => {
  return (
    <nav className="nav-bar navbar navbar-expand-lg border-bottom py-1">
      <div className="d-flex align-items-center">
        <button className="btn">
          <LoadIcon name={iconNames.SQUARE_DOTS} height={20} width={20} />
        </button>
        <Link to="/" className="navbar-brand">
          <Logo alt="Logo de Trello" width={80} />
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
            <DropDown
              label={'Espacios de trabajo'}
              items={dropdownItems.ESPACIOS_DE_TRABAJO}
            />
          </li>
          <li className="nav-item">
            <DropDown label={'Reciente'} items={dropdownItems.RECIENTE} />
          </li>
          <li className="nav-item">
            <DropDown label={'Marcado'} items={dropdownItems.MARCADO} />
          </li>
          <li className="nav-item">
            <DropDown label={'Plantillas'} items={dropdownItems.PLANTILLAS} />
          </li>
          <li>
            <button
              className="btn text-dark"
              style={{ backgroundColor: '#a5a5a5' }}
            >
              Crear
            </button>
          </li>
        </ul>
        <div className="w-100 d-flex justify-content-end">
          <div className="d-flex align-items-center mx-2">
            <Search />
          </div>
          <div className="d-flex align-items-center mx-2">
            <button className="nav-link mx-1">
              <LoadIcon name={iconNames.NOTIFICATION} height={24} width={24} />
            </button>
            <button className="nav-link mx-1">
              <LoadIcon name={iconNames.QUESTION_MARK} height={24} width={24} />
            </button>
            <button className="btn p-0 mx-1 d-flex align-items-center">
              <span className="user-icon">
                <span>GS</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
