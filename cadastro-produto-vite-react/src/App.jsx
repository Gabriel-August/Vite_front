import React, { useState, useEffect } from 'react';
import FormularioProduto from './FormularioProduto.jsx';
import ListaProdutos from './ListaProdutos.jsx';
import ResumoEstoque from './ResumoEstoque.jsx';
import FiltrosOrdenacao from './FiltrosOrdenacao.jsx';
import './index.css';

function App() {
  const [produtos, setProdutos] = useState(() => {
    const savedProducts = localStorage.getItem('produtos');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [termoBusca, setTermoBusca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('todas');
  const [ordenacao, setOrdenacao] = useState({ campo: 'id', direcao: 'asc' });

  useEffect(() => {
    localStorage.setItem('produtos', JSON.stringify(produtos));
  }, [produtos]);

  const handleAdicionarOuAtualizar = (produto) => {
    if (produto.id) {
      setProdutos(produtos.map(p => (p.id === produto.id ? produto : p)));
    } else {
      const novoProduto = { ...produto, id: Date.now() };
      setProdutos([...produtos, novoProduto]);
    }
    setProdutoEditando(null);
  };

  const handleRemoverProduto = (id) => {
    if (window.confirm('Tem certeza que deseja remover este produto?')) {
      setProdutos(produtos.filter(p => p.id !== id));
    }
  };

  const handleEditarProduto = (produto) => {
    setProdutoEditando(produto);
  };

  const produtosFiltrados = produtos.filter(p => {
    const nomeCorresponde = p.nome.toLowerCase().includes(termoBusca.toLowerCase());
    const categoriaCorresponde = filtroCategoria === 'todas' || p.categoria === filtroCategoria;
    return nomeCorresponde && categoriaCorresponde;
  });

  const produtosOrdenados = [...produtosFiltrados].sort((a, b) => {
    const aValue = a[ordenacao.campo];
    const bValue = b[ordenacao.campo];

    if (aValue < bValue) {
      return ordenacao.direcao === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return ordenacao.direcao === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="container">
      <h1>Cadastro e Gestão de Produtos</h1>
      <FormularioProduto
        onSave={handleAdicionarOuAtualizar}
        produtoParaEditar={produtoEditando}
      />
      <ResumoEstoque produtos={produtos} />
      <FiltrosOrdenacao
        termoBusca={termoBusca}
        onBuscaChange={setTermoBusca}
        filtroCategoria={filtroCategoria}
        onFiltroCategoriaChange={setFiltroCategoria}
        ordenacao={ordenacao}
        onOrdenacaoChange={setOrdenacao}
      />
      <ListaProdutos
        produtos={produtosOrdenados}
        onRemover={handleRemoverProduto}
        onEditar={handleEditarProduto}
      />
    </div>
  );
}

export default App;