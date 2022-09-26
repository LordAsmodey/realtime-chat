import React, { useContext, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import cn from 'classnames';
import firebase from 'firebase/compat';
// eslint-disable-next-line import/no-cycle
import { Context } from '../../index';
import './Chat.scss';
import { Loader } from '../Loader';
import { Message } from '../../Types/Message';

export const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { authChatApp, firestore } = useContext(Context);
  const [user] = useAuthState(authChatApp);
  const [messages, isLoading] = useCollectionData<Message>(
    firestore.collection('messages').orderBy('createdAt'),
  );

  const sendMessage = async () => {
    firestore.collection('messages').add({
      uid: user?.uid,
      displayName: user?.displayName,
      photoURL: user?.photoURL,
      message,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMessage('');
  };

  // eslint-disable-next-line no-console
  console.log(messages);

  return (
    <>
      {!user && (
        <p>Please login!</p>
      )}
      {isLoading && <Loader />}
      {user && !isLoading && (
        <>
          <div className="box chat ">
            {messages?.map(msg => (
              <div
                key={msg.createdAt}
                className={cn('card message',
                  {
                    'is-link': user?.uid === msg.uid,
                    'is-warning': user?.uid !== msg.uid,
                  })}
              >
                <div className="card-image">
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-left">
                      <figure className="image is-48x48">
                        <img
                          src={msg.photoURL}
                          alt="img"
                        />
                      </figure>
                    </div>
                    <div className="media-content">
                      <p className="title is-4">{msg.displayName}</p>
                      <time dateTime="2016-1-1">DATE</time>
                    </div>
                  </div>

                  <div className="content">
                    {msg.message}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="field has-addons has-addons-fullwidth">
            <div className="control">
              <input
                className="input is-fullwidth"
                type="text"
                placeholder="Enter text message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </div>
            <div className="control">
              <button
                type="button"
                className="button is-info ml-3"
                onClick={sendMessage}
              >
                Send message
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
