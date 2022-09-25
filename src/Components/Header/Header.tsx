import React, { useContext } from 'react';
import { GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
// eslint-disable-next-line import/no-cycle
import { Context } from '../../index';

export const Header: React.FC = () => {
  const { authChatApp } = useContext(Context);
  const [user] = useAuthState(authChatApp);

  const login = async () => {
    const loginProvider = new GoogleAuthProvider();
    const { userInfo } = await authChatApp.signInWithPopup(loginProvider);

    // eslint-disable-next-line no-console
    console.log(userInfo);
  };

  // eslint-disable-next-line no-console
  console.log(user);

  return (
    <div>
      {user && (
        <button
          type="button"
          className="button is-info"
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
          className="button is-info"
          onClick={login}
        >
          Login in chat
        </button>
      )}
    </div>
  );
};
