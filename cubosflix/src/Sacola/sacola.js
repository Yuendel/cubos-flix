/*Colaboração de Ernesto Junior na Sacola*/
import { useState, useEffect } from "react";


import icone from "../images/bag-icon.svg";
import iconeCupom from "../images/coupon-icon.svg";
import sacolaVaziaImg from "../images/person-illustration.svg";
import excluir from "../images/trash-icon.svg";
import diminuir from "../images/minus-icon.svg";
import aumentar from "../images/plus-icon.svg";

import "./sacola.css";

function Sacola(props) {
    const [totalSacola, setTotalSacola] = useState(0);
    let quantidade = 0;
    useEffect(() => {
        const totalSacola = props.sacola.reduce(
            (acc, item) => acc * item.price,
            0
        );
        setTotalSacola(totalSacola);
    }, [props.sacola]);

    return (
        <div className="sacola">
            <header>
                <img src={icone} alt="sacola" />
                <h1>Sacola</h1>
            </header>
            <div className="main">
                <div
                    className={props.sacola.length > 0 ? "sacola-cheia" : "sacola-vazia"}
                >
                    <h1>Sua sacola está vazia</h1>
                    <h2>Adicione filmes agora</h2>
                    <img src={sacolaVaziaImg} alt="Imagem Sacola Vazia" />
                </div>
                <div className="body">
                    {props.sacola.map((x) => (
                        <div className="itemSacola">
                            <img src={x.backgroundImg} alt="" />
                            <div className="preco">
                                <p>{x.title}</p>
                                <p>R$ {x.price}</p>
                            </div>
                            <div className="sacola-btns-options">
                                <button onClick={() => props.adicionar(x.title)}>
                                    <img src={aumentar} alt="" />
                                </button>
                                <p>{quantidade}</p>
                                <button onClick={() => props.remover(x.title)}>
                                    <img src={x.quantidade > 1 ? diminuir : excluir} alt="" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <footer>
                    <div>
                        Insira seu cumpom
            <div className="input-cupom">
                            <input
                                placeholder="Cupom de desconto"
                            />
                            <button>
                                <img src={iconeCupom} alt="" />
                            </button>
                        </div>
                        <button
                            hidden={props.sacola.length ? false : true}
                            className="btn-confirmacao"
                        >
                            Confirme seus dados R$ {totalSacola.toFixed(2)}
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default Sacola;