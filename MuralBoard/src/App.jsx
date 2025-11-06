import React from 'react';
import RecadoForm from './components/RecadoForm';
import RecadoList from './components/RecadoList';

function App() {
  return (
    <div className="App">
      <h1>Mural de Recados</h1>
      <RecadoForm />
      <RecadoList />
    </div>
  );
}

export default App;