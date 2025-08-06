import { useState } from 'react'

function App(){
  const[valor1, setValor1]=useState(0)
  const[valor2, setValor2]=useState(0)
  const[valor3, setValor3]=useState(null) 
  const[resultado, setResultado]=useState(null)
  
  const handleValor3Change = (e) => {
    const value = e.target.value;
    if(value === '') {
      setValor3(null); 
    } else {
      setValor3(Number(value));
    }
  }

  const somar = ()=>{
    const v3 = valor3 === null ? 0 : valor3;
    setResultado(valor1 + valor2 + v3);
  }

  const subtrair = ()=>{
    const v3 = valor3 === null ? 0 : valor3;
    setResultado(valor1 - valor2 - v3);
  }

  const multiplicacao = ()=>{
    const v3 = valor3 === null ? 1 : valor3;
    setResultado(valor1 * valor2 * v3);
  }

  const divisao = ()=>{
    const v3 = valor3 === null ? 1 : valor3;
    if(v3 === 0){
        setResultado("Erro: Divisão por zero.");
    } else {
        setResultado(valor1 / valor2 / v3);
    }
  }

  return(
    <div style={{padding: '2rem', fontFamily: 'Arial'}}>
        <h1>Calculadora de Três Valores</h1>
        <input
          type='number'
          placeholder='Valor 1'
          onChange={(e)=>setValor1(Number(e.target.value))}
        />
        <span style={{margin: '0 10px'}}></span>
        <input
        type='number'
        placeholder='Valor 2'
        onChange={(e)=>setValor2(Number(e.target.value))}
      />

      <span style={{margin: '0 10px'}}></span>
        <input 
        type='number'
        placeholder='Valor 3 (opcional)' 
        onChange={handleValor3Change}
      />
      <button style={{marginTop:'20px'}}onClick={somar}>
        Somar
      </button>

      <button style={{marginTop:'20px'}}onClick={subtrair}>
        Subtrair
      </button>

      <button style={{marginTop:'20px'}}onClick={multiplicacao}>
        Multiplicar
      </button>
      
      <button style={{marginTop:'20px'}}onClick={divisao}>
        Divisão
      </button>


          {resultado !== null && (
            <h2 style={{marginTop:'20px'}}>Resultado: {resultado}</h2>
        )}
    </div>
  )
}

export default App
