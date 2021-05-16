import '../Card/Card.css'
import star from '../images/golden-star.svg'

export default function Card(Props) {
    return (
        <div className='card'>
            <img src={Props.capa} alt='' />
            <div className='cardInfo'>
                <div className='cardTitle'>
                    <h2>{Props.nome}</h2>
                    <div className='nota'>


                        <h3> <img src={star} alt="estrela" id='star' />{Props.nota}  </h3>
                    </div>
                </div>
                <button onClick={() => Props.addSacola(Props.title)}> <p>Sacola</p> <p>R${Props.preco}</p></button>
            </div>
        </div>
    );
}