import './App.css';
import { Header } from './components/Header';
import { useState, useCallback } from 'react';

function App() {
  const [text, setText] = useState('');
  const user = window.Telegram.WebApp.initDataUnsafe.user;
  const tg = window.Telegram.WebApp;

  const onSendData = useCallback(() => {
    const data = {
      text,
      user: {
        firstName: user?.first_name,
        lastName: user?.last_name,
        username: user?.username,
      }
    };
    tg.sendData(JSON.stringify(data));
  }, [text, user, tg]);

  return (
    <>    
      <div className="App">
        <Header />
        <textarea
          className="text-box"
          placeholder="Введите текст..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button className="submit-button" onClick={onSendData}>
          Отправить
        </button>
      </div>
    </>
  );
}

export default App;
