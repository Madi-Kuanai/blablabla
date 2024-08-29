import './App.css';
import { Header } from './components/Header';
import { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const user = window.Telegram.WebApp.initDataUnsafe.user;
  const tg = window.Telegram.WebApp;


  const onSendData = useCallback(() => {
    const data = {
      text,
      data_user: {
        firstName: user?.first_name,
        lastName: user?.last_name,
        username: user?.username,
      }
    }
    console.log(data)
    tg.sendData(JSON.stringify(data));
}, [text, data_user])


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
