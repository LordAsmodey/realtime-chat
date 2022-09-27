import React, { useContext } from 'react';
import { GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
import { Context } from '../../index';

export const Header: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { authChatApp } = useContext(Context);
  const [user] = useAuthState(authChatApp);

  const login = async () => {
    const loginProvider = new GoogleAuthProvider();
    const { userInfo } = await authChatApp.signInWithPopup(loginProvider);

    // eslint-disable-next-line no-console
    console.log(userInfo);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            Home
          </Link>

          <Link to="/chat" className="navbar-item">
            Chat
          </Link>

          <div className="navbar-item has-dropdown is-hoverable">
            <Link to="/#" className="navbar-link">
              More
            </Link>

            <div className="navbar-dropdown">
              <Link to="/" className="navbar-item">
                About
              </Link>
              <Link to="/" className="navbar-item">
                Jobs
              </Link>
              <Link to="/" className="navbar-item">
                Contact
              </Link>
              <hr className="navbar-divider" />
              <Link to="/" className="navbar-item">
                Report an issue
              </Link>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {user && (
                <button
                  type="button"
                  className="button is-primary"
                  onClick={() => {
                    authChatApp.signOut();
                  }}
                >
                  Logout
                </button>
              )}
              {!user && (
                <button
                  type="button"
                  className="button is-primary"
                  onClick={login}
                >
                  Login in chat
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
