//Ajuda De Ernesto Junior
import { useState, useEffect } from "react";


import bagIcon from "../images/bag-icon.svg";
import cupomIcon from "../images/coupon-icon.svg";
import personIlustration from "../images/person-illustration.svg";
import trashIcon from "../images/trash-icon.svg";
import menosIcon from "../images/minus-icon.svg";
import addIcon from "../images/plus-icon.svg";

import "./sacola.css";

function Sacola(props) {
    const [inputCupom, setInputCupom] = useState("");
    const [totalSacola, setTotalSacola] = useState(0);

    useEffect(() => {
        const totalSacola = props.sacola.reduce(
            (acc, item) => acc + item.quantidade * item.price,
            0
        );
        setTotalSacola(totalSacola);
    }, [props.sacola]);

    function aplicarCupom(e) {
        if (e.key === "Enter") {
            if (inputCupom === "sintoQuePoderiaTerFeitoMUITOMelhor") {
                let valorSacola = props.sacola.reduce(
                    (acc, item) => acc + item.quantidade * item.price,
                    0
                );
                let valorDesconto = valorSacola * 0.9;
                setTotalSacola(valorDesconto);
            }
        }
    }

    useEffect(() => {
        setInputCupom(props.cupom);
    }, [props.cupom]);

    return (
        <div className="sacola">
            <header>
                <img src={bagIcon} alt="sacola" />
                <h1>Sacola</h1>
            </header>
            <div className="sacola-main">
                <div
                    className={props.sacola.length ? "sacola-vazia-none" : "sacola-vazia"}
                >
                    <h1>Sua sacola está vazia</h1>
                    <h2>Adicione filmes agora</h2>
                    <img src={personIlustration} alt="" />
                </div>
                <div className="corpo-sacola">
                    {props.sacola.map((p) => (
                        <div className="item-sacola">
                            <img src={p.backgroundImg} alt="" />
                            <div className="item-sacola-preco">
                                <p>{p.title}</p>
                                <p>R$ {p.price}</p>
                            </div>
                            <div className="sacola-btns-options">
                                <button onClick={() => props.adicionar(p.title)}>
                                    <img src={addIcon} alt="" />
                                </button>
                                <p>{p.quantidade}</p>
                                <button onClick={() => props.remover(p.title)}>
                                    <img src={p.quantidade > 1 ? menosIcon : trashIcon} alt="" />
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
                                placeholder="Cupom de desconto "
                                value={inputCupom}
                                onChange={(e) => setInputCupom(e.target.value)}
                                onKeyPress={(e) => aplicarCupom(e)}
                            />
                            <button>
                                <img src={cupomIcon} alt="" />
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