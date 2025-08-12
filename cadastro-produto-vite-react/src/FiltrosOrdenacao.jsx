import React from 'react';

const categorias = ['todas', 'Eletrônicos', 'Vestuário', 'Alimentos', 'Outros'];

function FiltrosOrdenacao({
  termoBusca,
  onBuscaChange,
  filtroCategoria,
  onFiltroCategoriaChange,
  ordenacao,
  onOrdenacaoChange
}) {
  const handleOrdenacao = (campo) => {
    const direcao = ordenacao.campo === campo && ordenacao.direcao === 'asc' ? 'desc' : 'asc';
    onOrdenacaoChange({ campo, direcao });
  };

  return (
    <div className="filtros-ordenacao">
      <div className="filtro-busca">
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={termoBusca}
          onChange={(e) => onBuscaChange(e.target.value)}
        />
        <select value={filtroCategoria} onChange={(e) => onFiltroCategoriaChange(e.target.value)}>
          {categorias.map(cat => <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>)}
        </select>
      </div>
      <div className="ordenacao-botoes">
        <span>Ordenar por:</span>
        <button onClick={() => handleOrdenacao('nome')}>
          Nome {ordenacao.campo === 'nome' && (ordenacao.direcao === 'asc' ? '↑' : '↓')}
        </button>
        <button onClick={() => handleOrdenacao('preco')}>
          Preço {ordenacao.campo === 'preco' && (ordenacao.direcao === 'asc' ? '↑' : '↓')}
        </button>
        <button onClick={() => handleOrdenacao('quantidade')}>
          Quantidade {ordenacao.campo === 'quantidade' && (ordenacao.direcao === 'asc' ? '↑' : '↓')}
        </button>
      </div>
    </div>
  );
}

export default FiltrosOrdenacao;