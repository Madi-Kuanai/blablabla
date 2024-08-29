import { useEffect, useState, useCallback } from 'react';
import "./App.css"
import {wait} from "@testing-library/user-event/dist/utils";

function App() {
  const [text, setText] = useState('');

  useEffect(() => {
    if (!window.Telegram) {
      console.error('Telegram WebApp API не доступен');
    }
  }, []);

  const onSendData = useCallback(() => {
    const tg = window.Telegram ? window.Telegram.WebApp : null;
    const user = tg.initData?.user;
    const logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
      ]
    });
    if (tg) {
      const data = {
        text,
        user: {
          first_name: user?.first_name,
          last_name: user?.last_name,
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
