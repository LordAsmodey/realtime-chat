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

export const App: React.FC = () => {
  const navigate = useNavigate();
  const { authChatApp } = useContext(Context);
  const [user] = useAuthState(authChatApp);

  useEffect(() => {
    if (user) {
      navigate('/chat');
    }

    if (!user) {
      navigate('/');
    }
  }, [user]);

  return (
    <div className="app container mt-3 p-3">
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="chat" element={<h1>Chat</h1>} />
        <Route path="*" element={<h1>Not found page!</h1>} />
      </Routes>
    </div>
  );
};
