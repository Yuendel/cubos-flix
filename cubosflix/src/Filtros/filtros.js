import { useState } from 'react';

import './filtros.css';

export default function Filtros({ setFiltro }) {
    const [filtroAtivo, setFiltroAtivo] = useState('todas');

    function handleFilterChange(novoFiltro) {
        setFiltroAtivo(novoFiltro);
        setFiltro(novoFiltro);
    }

    return (
        <div className="container">
            <button onClick={() => handleFilterChange('todas')} className={filtroAtivo === "todas" ? "filtro filtro-ativo" : "filtro"}>Todos</button>
            <button onClick={() => handleFilterChange('action')} className={filtroAtivo === "action" ? "filtro filtro-ativo" : "filtro"}>Ação</button>
            <button onClick={() => handleFilterChange('romance')} className={filtroAtivo === "romance" ? "filtro filtro-ativo" : "filtro"}>Romance</button>
            <button onClick={() => handleFilterChange('science fiction')} className={filtroAtivo === "science fiction" ? "filtro filtro-ativo" : "filtro"}>Ficção Cientifica</button>
            <button onClick={() => handleFilterChange('horror')} className={filtroAtivo === "horror" ? "filtro filtro-ativo" : "filtro"}>Terror</button>
        </div>
    )
}