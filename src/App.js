import './App.css';
import {Header} from './components/Header'
import { useState } from 'react';

function App() {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    const user = window.Telegram.WebApp.initDataUnsafe.user;
    window.Telegram.WebApp.sendData(text);
    window.Telegram.WebApp.sendData(user);
    
  };
  return (
    <>    <div className="App">
      {<Header/>}
      <textarea
          className="text-box"
          placeholder="Введите текст..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button className="submit-button" onClick={handleSubmit}>
          Отправить
        </button>
    </div>
    </>
  );
}

export default App;
