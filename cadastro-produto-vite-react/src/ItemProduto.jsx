import React from 'react';

function ItemProduto({ produto, onRemover, onEditar }) {
  return (
    <li className="item-produto">
      <div className="produto-info">
        <b>{produto.nome}</b>
        <span> - {produto.categoria}</span>
        <p>Preço: R$ {produto.preco.toFixed(2)} | Qtd: {produto.quantidade}</p>
        {produto.descricao && <p className="descricao">{produto.descricao}</p>}
      </div>
      <div className="produto-acoes">
        <button className="btn-editar" onClick={() => onEditar(produto)}>Editar</button>
        <button className="btn-remover" onClick={() => onRemover(produto.id)}>Excluir</button>
      </div>
    </li>
  );
}

export default ItemProduto;