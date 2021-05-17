import { useState, useEffect, useRef } from 'react';
import logo from './images/logo.svg';
import foto from './images/profile.jpeg';
import cupom from './images/coupon-icon.svg'
import timerImg from './images/time-icon.svg'
import moneyImg from './images/money.png'
import favoritos from './images/bookmark-icon.svg'
import promocoes from './images/promotion-icon.svg'
import lupa from './images/search-icon.svg'
import Card from './Card/Card';
import Sacola from './Sacola/sacola';
import Filtros from './Filtros/filtros';
import Movies from "./data.js"
import './App.css';


export default function App() {
  let [todosFilmes, setTodosFilmes] = useState([]);
  const [filtro, setFiltro] = useState('todas');
  let [filmesTop, setFilmesTop] = useState([]);
  const [sacola, setSacola] = useState([]);
  const [timer, setTimer] = useState(60);
  const [pesquisa, setPesquisa] = useState("");
  const intervalId = useRef(null);

  useEffect(() => {
    if (timer <= 0) {
      setTimer(0);
    }
    if (intervalId.current) return;
    intervalId.current = setInterval(() => setTimer(prevTimer => prevTimer - 1), 1000);
  }, [timer, setTimer]);

  useEffect(() => {

    return () => {
      clearInterval(intervalId.current)
    }
  }, []);

  useEffect(() => {
    if (filtro === "todas") {
      setTodosFilmes(Movies);
    } else {
      const filmes = Movies.filter((filme) =>
        filme.categories.includes(filtro)
      );
      setTodosFilmes(filmes);
    }
  }, [filtro]);

  useEffect(() => {
    const FilmesTop = Movies.sort(function (a, b) { return a.starsCount < b.starsCount ? -1 : a.starsCount > b.starsCount ? 1 : 0 }).reverse();
    setFilmesTop(FilmesTop)
  }, [])

  useEffect(() => {
    const filmeBuscado = Movies.filter((e) => e.title.includes(pesquisa) === true);
    if (filmeBuscado) {
      setTodosFilmes(filmeBuscado);
    } else {
      setTodosFilmes(Movies);
    }
  }, [pesquisa]);

  function handleAdicionarSacola(title) {
    const indice = sacola.findIndex((produto) => produto.title === title);
    const novaSacola = [...sacola];
    novaSacola.splice(-1, 0, indice);
    setSacola([...novaSacola]);

  }

  function handleRetirarSacola(title) {
    const indice = sacola.findIndex((produto) => produto.title === title);
    const novaSacola = [...sacola];
    novaSacola.splice(indice, 1);
    setSacola([...novaSacola]);


  }
  console.log(sacola)

  return (
    <div className="App">
      <header>
        <img src={logo} alt="logo" />
        <form action="get" onSubmit={(e) => { e.preventDefault() }}>
          <input type="text" placeholder="Pesquise filmes..." className="search-field" onChange={(e) => setPesquisa(e.target.value)} size="50"></input> <img src={lupa} alt="Pesquisar" id='lupa' />
        </form>
        <button className='menu'> <img src={favoritos} alt="favoritos" /> Favoritos</button>
        <button className='menu'> <img src={promocoes} alt="promoções" />Promoções</button>
        <p>Bem vindo Yuendel <img src={foto} alt="Foto-Perfil" /> </p>
      </header>

      <main>

        <div className="cupom"></div>
        <div className="relogio" onClick={() => setTimer(0)} style={timer <= 0 ? { display: 'none' } : { display: 'flex' }}>
          <div className='chamada'>
            <h1>APROVEITE AGORA</h1>
            <div className='cupom'>
              <img src={cupom} alt="Cupom" />
              <h2>CUPOM: sintoQuePoderiaTerFeitoMUITOMelhor </h2>
            </div>
          </div>
          <div className='linha'></div>
          <div className='timer'>
            <h2>FINALIZA EM: </h2>
            <div className='timerCupom'> <img src={timerImg} alt="TimerDoCupom" /> <h2>{timer}</h2> </div>
          </div>
          <img src={moneyImg} alt="ImagemDinheiro" id="moneyImg" />
        </div>
        <div className='aside'>
          <Sacola
            cupom='sintoQuePoderiaTerFeitoMUITOMelhor'
            sacola={sacola}
            remover={handleRetirarSacola}
            adicionar={handleAdicionarSacola}
          />
        </div>
        <h1>Top Filmes</h1>
        <div className="filmes" >
          {filmesTop.slice(0, 5).map((filme) => (
            <Card
              capa={filme.backgroundImg}
              nome={filme.title}
              preco={filme.price}
              nota={filme.starsCount}
              addSacola={(filme) => handleAdicionarSacola(filme.title)}
            />))}
        </div>
        <h1>Filmes</h1>
        <Filtros setFiltro={setFiltro} />
        <div className="filmes" >
          {todosFilmes.map((filme) => (
            <Card
              capa={filme.backgroundImg}
              nome={filme.title}
              preco={filme.price}
              nota={filme.starsCount}
              addSacola={(filme) => handleAdicionarSacola(filme.title)}
            />
          ))}
        </div>


      </main>



    </div>
  );

}

