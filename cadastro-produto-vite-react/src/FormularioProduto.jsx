import React, { useState, useEffect } from 'react';

const categorias = ['Eletrônicos', 'Vestuário', 'Alimentos', 'Outros'];

function FormularioProduto({ onSave, produtoParaEditar }) {
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    preco: '',
    quantidade: '',
    categoria: categorias[0],
  });
  const [erros, setErros] = useState({});

  useEffect(() => {
    if (produtoParaEditar) {
      setForm(produtoParaEditar);
    } else {
      setForm({ nome: '', descricao: '', preco: '', quantidade: '', categoria: categorias[0] });
    }
  }, [produtoParaEditar]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validarForm = () => {
    const novosErros = {};
    if (!form.nome.trim()) novosErros.nome = 'O nome é obrigatório.';
    if (form.preco <= 0) novosErros.preco = 'O preço deve ser um número positivo.';
    if (form.quantidade <= 0) novosErros.quantidade = 'A quantidade deve ser um número positivo.';
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarForm()) {
      onSave({
        ...form,
        preco: parseFloat(form.preco),
        quantidade: parseInt(form.quantidade),
      });
      setForm({ nome: '', descricao: '', preco: '', quantidade: '', categoria: categorias[0] });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{produtoParaEditar ? 'Editar Produto' : 'Cadastrar Novo Produto'}</h2>
      <div className="form-group">
        <label>Nome:</label>
        <input name="nome" value={form.nome} onChange={handleChange} />
        {erros.nome && <p className="erro">{erros.nome}</p>}
      </div>
      <div className="form-group">
        <label>Categoria:</label>
        <select name="categoria" value={form.categoria} onChange={handleChange}>
          {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Descrição:</label>
        <textarea name="descricao" value={form.descricao} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Preço:</label>
        <input name="preco" type="number" step="0.01" value={form.preco} onChange={handleChange} />
        {erros.preco && <p className="erro">{erros.preco}</p>}
      </div>
      <div className="form-group">
        <label>Quantidade:</label>
        <input name="quantidade" type="number" value={form.quantidade} onChange={handleChange} />
        {erros.quantidade && <p className="erro">{erros.quantidade}</p>}
      </div>
      <button type="submit">{produtoParaEditar ? 'Salvar Edição' : 'Cadastrar'}</button>
    </form>
  );
}

export default FormularioProduto;