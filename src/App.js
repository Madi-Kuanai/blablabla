import { useEffect, useState, useCallback } from 'react';

function App() {
  const [text, setText] = useState('');
  var WebApp = window.Telegram.WebApp;

  WebApp.showAlert(`Добро пожаловать, @${WebApp.WebAppUser.username}.`);

  useEffect(() => {
    if (!window.Telegram) {
      console.error('Telegram WebApp API не доступен');
    }
  }, []);

  const onSendData = useCallback(() => {
    const tg = window.Telegram ? window.Telegram.WebApp : null;
    if (tg) {
      const user = tg.initDataUnsafe.user;
      const data = {
        text,
        user: {
          firstName: user?.first_name,
          lastName: user?.last_name,
          username: user?.username,
        },
      };
      tg.sendData(JSON.stringify(data));
    } else {
      console.error('Telegram WebApp API не доступен');
    }
  }, [text]);

  return (
    <div className="App">
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
  );
}

export default App;
