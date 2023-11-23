import { useState } from 'react';
import './App.css';

function App() {
  const [valor, setValor] = useState('');
  const [resultados, setResultados] = useState([]);

  const buscarResultados = async () => {
    const API_KEY = 'a6iPyz7wlTXV50F_eGAVf3IIK2ESFBYVlJdveVS1igc'
    const URL = `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&query=${valor}&per_page=20`;

    const response = await fetch(URL);
    const data = await response.json();
    setResultados(data.results)
    console.log(data);
  }

  return (
    <div className="App">
      <div className='search__box'>
        <input className='search__box--input' placeholder='Buscar imagenes' onChange={e => setValor(e.target.value)} />
        <button onClick={() => buscarResultados()} className='search__box--btn'>buscar</button>
      </div>

      <div className='main__content'>
        <div className='main__content--grid'>
          {
            resultados.map((elemento, indice) => {
              return (
                <img key={indice} src={elemento.urls.regular} />
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;