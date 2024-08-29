import img from '../assets/shushing_face.png';

export function Header(){
    return (<header className="App-header">
        {<img src={img} className="icon" alt="Shushing Face"/>}
      </header>)
}