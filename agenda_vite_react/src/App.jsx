import React, { useEffect, useState } from 'react';
import './index.css';
const STORAGE_KEY = 'agenda_contatos_v1';
const CONTACTS_PER_PAGE = 10;

function useLocalStorageState(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch (e) {
      console.error('Erro ao ler localStorage', e);
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.error('Erro ao gravar localStorage', e);
    }
  }, [key, state]);

  return [state, setState];
}

function ContactForm({ onSave, initial = { name: '', phone: '', email: '', category: 'Família', favorite: false }, onCancel, categories }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(initial);
    setErrors({});
  }, [initial]);

  function update(field, value) {
    setForm(f => ({ ...f, [field]: value }));
  }

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!form.name.trim()) {
      newErrors.name = 'O nome é obrigatório.';
    }
    if (form.phone.trim() && !/^\d+$/.test(form.phone)) {
      newErrors.phone = 'O telefone deve conter apenas números.';
    }
    if (form.email.trim() && !emailRegex.test(form.email)) {
      newErrors.email = 'E-mail inválido.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function submit(e) {
    e.preventDefault();
    if (validate()) {
      onSave({ ...form });
      setForm({ name: '', phone: '', email: '', category: categories[0], favorite: false });
    }
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <input
        className="w-full p-2 border rounded"
        placeholder="Nome"
        value={form.name}
        onChange={e => update('name', e.target.value)}
      />
      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}

      <input
        className="w-full p-2 border rounded"
        placeholder="Telefone (somente números)"
        value={form.phone}
        onChange={e => update('phone', e.target.value)}
      />
      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      
      <input
        className="w-full p-2 border rounded"
        placeholder="Email"
        value={form.email}
        onChange={e => update('email', e.target.value)}
      />
      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      
      <select
        className="w-full p-2 border rounded"
        value={form.category}
        onChange={e => update('category', e.target.value)}
      >
        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>

      <div className="flex gap-2">
        <button className="px-3 py-2 rounded bg-blue-600 text-white" type="submit">Salvar</button>
        {onCancel && (
          <button type="button" className="px-3 py-2 rounded border" onClick={onCancel}>Cancelar</button>
        )}
      </div>
    </form>
  );
}

export default function App() {
  const [contacts, setContacts] = useLocalStorageState(STORAGE_KEY, []);
  const [editingId, setEditingId] = useState(null);
  const [query, setQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('Todas');
  const [showFavorites, setShowFavorites] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc'); 
  const [sortBy, setSortBy] = useState('name'); 
  const [currentPage, setCurrentPage] = useState(1);
  
  const categories = ['Todas', 'Família', 'Trabalho', 'Amigos', 'Outros'];

  function addContact(contact) {
    const newContact = { id: Date.now().toString(), favorite: false, ...contact };
    setContacts(prev => [newContact, ...prev]);
  }

  function updateContact(updated) {
    setContacts(prev => prev.map(c => (c.id === updated.id ? updated : c)));
    setEditingId(null);
  }

  function removeContact(id) {
    if (!confirm('Excluir contato?')) return;
    setContacts(prev => prev.filter(c => c.id !== id));
  }

  function toggleFavorite(id) {
    setContacts(prev => prev.map(c => (c.id === id ? { ...c, favorite: !c.favorite } : c)));
  }

  const filteredAndSorted = [...contacts]
    .filter(c => {
      const q = query.trim().toLowerCase();
      const matchesQuery = c.name.toLowerCase().includes(q) ||
                           (c.phone || '').toLowerCase().includes(q) ||
                           (c.email || '').toLowerCase().includes(q);
      
      const matchesCategory = filterCategory === 'Todas' || c.category === filterCategory;
      const matchesFavorites = !showFavorites || c.favorite;
      
      return matchesQuery && matchesCategory && matchesFavorites;
    })
    .sort((a, b) => {
      const aValue = (a[sortBy] || '').toLowerCase();
      const bValue = (b[sortBy] || '').toLowerCase();
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const totalPages = Math.ceil(filteredAndSorted.length / CONTACTS_PER_PAGE);
  const startIndex = (currentPage - 1) * CONTACTS_PER_PAGE;
  const paginatedContacts = filteredAndSorted.slice(startIndex, startIndex + CONTACTS_PER_PAGE);

  return (
    <div className="min-h-screen flex items-start justify-center p-6 bg-gray-50">
      <div className="w-full max-w-3xl bg-white shadow p-6 rounded-lg">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Agenda de Contatos</h1>
          <div className="text-sm text-gray-500">Salvo no localStorage</div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <h2 className="font-semibold mb-2">Adicionar contato</h2>
            {editingId ? (
              <ContactForm
                initial={contacts.find(c => c.id === editingId) || {}}
                onSave={updateContact}
                onCancel={() => setEditingId(null)}
                categories={categories}
              />
            ) : (
              <ContactForm onSave={addContact} categories={categories} />
            )}

            <hr className="my-4" />
            
            <h3 className="font-semibold mb-2">Buscar e Filtrar</h3>
            <input
              placeholder="Buscar por nome, telefone ou email"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            
            <div className="flex flex-wrap gap-2 mb-2">
              <label className="font-medium text-sm">Categoria:</label>
              <select
                className="p-1 border rounded text-sm"
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <label className="font-medium text-sm">Favoritos:</label>
              <input
                type="checkbox"
                checked={showFavorites}
                onChange={e => setShowFavorites(e.target.checked)}
              />
            </div>

            <div className="mt-4 text-sm text-gray-600">Total: {contacts.length}</div>
          </div>

          <div className="md:col-span-2">
            <h2 className="font-semibold mb-2">Lista de contatos</h2>

            {}
            <div className="flex gap-2 mb-4 text-sm items-center">
              <span>Ordenar por:</span>
              {['name', 'phone', 'email'].map(field => (
                <button
                  key={field}
                  onClick={() => {
                    if (sortBy === field) {
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    } else {
                      setSortBy(field);
                      setSortOrder('asc');
                    }
                  }}
                  className={`px-2 py-1 rounded ${sortBy === field ? 'bg-gray-200' : 'bg-gray-100'}`}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)} {sortBy === field && (sortOrder === 'asc' ? '↓' : '↑')}
                </button>
              ))}
            </div>

            {paginatedContacts.length === 0 ? (
              <div className="p-4 text-gray-500">Nenhum contato encontrado.</div>
            ) : (
              <ul className="space-y-3">
                {paginatedContacts.map(contact => (
                  <li key={contact.id} className="p-3 border rounded flex items-start justify-between">
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {contact.name}
                        {contact.favorite && (
                          <span className="text-yellow-500">★</span>
                        )}
                        <span className="text-xs text-gray-500 ml-2">({contact.category})</span>
                      </div>
                      <div className="text-sm text-gray-600">{contact.phone}</div>
                      <div className="text-sm text-gray-600">{contact.email}</div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="flex gap-2">
                        <button
                          className={`px-2 py-1 text-sm rounded ${contact.favorite ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-700'}`}
                          onClick={() => toggleFavorite(contact.id)}
                        >
                          ★
                        </button>
                        <button
                          className="px-2 py-1 text-sm border rounded"
                          onClick={() => setEditingId(contact.id)}
                        >
                          Editar
                        </button>
                        <button
                          className="px-2 py-1 text-sm border rounded text-red-600"
                          onClick={() => removeContact(contact.id)}
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            
            {}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        <footer className="mt-6 text-xs text-gray-500">
          Dica: para resetar, abra as Ferramentas do Desenvolvedor → Application → Local Storage e apague a chave <code>{STORAGE_KEY}</code>.
        </footer>
      </div>
    </div>
  );
}