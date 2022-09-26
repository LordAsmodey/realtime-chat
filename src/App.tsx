import React, { useContext, useEffect } from 'react';
import './App.scss';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
// eslint-disable-next-line import/no-cycle
import { LoginPage } from './Components/LoginPage/LoginPage';
// eslint-disable-next-line import/no-cycle
import { Context } from './index';
// eslint-disable-next-line import/no-cycle
import { Header } from './Components/Header/Header';
// eslint-disable-next-line import/no-cycle
import { Chat } from './Components/Chat/Chat';
import { Loader } from './Components/Loader';

export const App: React.FC = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { authChatApp } = useContext(Context);
  const [user, isLoading] = useAuthState(authChatApp);

  useEffect(() => {
    if (user) {
      navigate('/chat');
    }

    if (!user) {
      navigate('/');
    }
  }, [user]);

  return (
    <div className="app container mt-3 p-5">
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="chat" element={<Chat />} />
            <Route path="*" element={<h1>Not found page!</h1>} />
          </Routes>
        </>
      )}
    </div>
  );
};
