import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext }  from '../../context/auth.context';
import { useContext } from 'react';

function Navbar() {
  const { loggedIn, user,  logout } = useContext(AuthContext)

  return (
    <nav className='Navbar'>
        <Link to="/">
            <button className='nav-navbar'>Home</button>
        </Link>

        {loggedIn && (
          <>
            <Link to={`/profile/${user._id}`}>
              <button className='nav-navbar'>My Profile</button>
            </Link>
            <button onClick={logout} className='nav-navbar'>Logout</button>
          </>
        )}

        {!loggedIn && (
          <>
            <Link to="/login">
              <button className='nav-navbar'>Login</button>
            </Link>

            <Link to="/signup">
              <button className='nav-navbar'>Signup</button>
            </Link>
          </>
        )}
    </nav>
  )
}

export default Navbar