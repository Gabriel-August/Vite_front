import React from 'react';

function ResumoEstoque({ produtos }) {
  const totalProdutos = produtos.length;
  const valorTotal = produtos.reduce((acc, p) => acc + (p.preco * p.quantidade), 0);
  const produtoMaisCaro = produtos.reduce((max, p) => (p.preco > max.preco ? p : max), { preco: 0 });

  return (
    <div className="resumo-estoque">
      <h2>Resumo do Estoque</h2>
      <p>Total de produtos cadastrados: <b>{totalProdutos}</b></p>
      <p>Valor total do estoque: <b>R$ {valorTotal.toFixed(2)}</b></p>
      <p>Produto com maior preço: <b>{produtoMaisCaro.nome || 'N/A'}</b> (R$ {produtoMaisCaro.preco.toFixed(2)})</p>
    </div>
  );
}

export default ResumoEstoque;