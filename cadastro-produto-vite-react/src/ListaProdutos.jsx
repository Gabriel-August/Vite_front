import React from 'react';
import ItemProduto from './ItemProduto';

function ListaProdutos({ produtos, onRemover, onEditar }) {
  return (
    <div className="lista-produtos">
      <h2>Produtos Cadastrados</h2>
      {produtos.length === 0 && <p>Nenhum produto encontrado.</p>}
      <ul>
        {produtos.map(produto => (
          <ItemProduto
            key={produto.id}
            produto={produto}
            onRemover={onRemover}
            onEditar={onEditar}
          />
        ))}
      </ul>
    </div>
  );
}

export default ListaProdutos;