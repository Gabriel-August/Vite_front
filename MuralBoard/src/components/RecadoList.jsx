// src/components/RecadoList.jsx
import React, { useEffect, useState } from 'react';
import { getRecados } from '../firebase';
import RecadoItem from './RecadoItem';

const RecadoList = () => {
  const [recados, setRecados] = useState([]);

  useEffect(() => {
    const unsubscribe = getRecados((snapshot) => {
      const newRecados = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRecados(newRecados);
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      {recados.map((recado) => (
        <RecadoItem key={recado.id} recado={recado} />
      ))}
    </div>
  );
};

export default RecadoList;
