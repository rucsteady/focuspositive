import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationStyle.css';
import AuthContext from '../context/AuthContext';

function Navigation() {
  const { userLoggedIn } = useContext(AuthContext);

  return (
    <>
      <div className='topnav'>
        <div
          style={{
            display: 'inline-block',
            float: 'left',
            marginTop: 13,
            marginLeft: 15,
            marginRight: 15,
            color: '#fff',
          }}
        >
          Focus Positive
        </div>

        <NavLink to='/dashboard'>Dashboard</NavLink>
        {userLoggedIn && <NavLink to='/chat'>Random Chat</NavLink>}
        {userLoggedIn && <NavLink to='/journal'>Journal</NavLink>}
        {userLoggedIn && <NavLink to='/account'>Account</NavLink>}

        {!userLoggedIn && <NavLink to='/login'>Login</NavLink>}
        {!userLoggedIn && <NavLink to='/register'>Registrieren</NavLink>}
      </div>
    </>
  );
}

export default Navigation;
