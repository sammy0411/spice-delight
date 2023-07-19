import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  let data = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#461111' }}>
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            Spice Delight
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => {
              toggleCollapse();
              setIsCollapsed(!isCollapsed);
              // You can add any other actions you want to perform on toggling the collapse state.
              // For example, you can also close the cart dropdown when the navbar is collapsed.
              setCartView(false);
            }}
            aria-controls="navbarNav"
            aria-expanded={!isCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {localStorage.getItem('authToken') ? (
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">
                    My Orders
                  </Link>
                </li>
              ) : (
                ''
              )}
            </ul>

            {!localStorage.getItem('authToken') ? (
              <div className="d-flex">
                <Link className="btn bg-white mx-1" to="/login" style={{ color: '#4C230A' }}>
                  Login
                </Link>
                <Link className="btn bg-white mx-1" to="/createuser" style={{ color: '#4C230A' }}>
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <div className="btn bg-white mx-1" style={{ color: '#4C230A' }} onClick={toggleDropdown}>
                  My Cart{'        '}
                  {data.length > 0 ? <Badge pill bg="danger"> {data.length} </Badge> : null}
                </div>

                {showDropdown ? (
                  <Modal onClose={toggleDropdown}>
                    {' '}
                    {/* Call toggleDropdown when the close button or outside the modal is clicked */}
                    <Cart />
                  </Modal>
                ) : null}

                <div className="btn bg-white mx-1" style={{ color: '#4C230A' }} onClick={handleLogout}>
                  Logout{' '}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
