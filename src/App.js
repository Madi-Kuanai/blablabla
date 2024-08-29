import './App.css';
import {Header} from './components/Header'

function App() {
  return (
    <>    <div className="App">
      {<Header/>}
      <textarea className="text-box" placeholder="Введите текст..."></textarea>
      <button className="submit-button">Отправить</button>
    </div>
    </>
  );
}

export default App;
