import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';

function App() {
  const [file, setFile] = useState()
  const [relatorio, setRelatorio] = useState()
  const [loading, setLoading] = useState()
  
  const handleSubmit = async() => {
    setRelatorio(null)
    setLoading(true)
    await Axios.get('https://cvm-project.herokuapp.com/cdi')
    const info  = new FormData()
    info.append('CNPJ',file)
    const { data } = await Axios.post('https://cvm-project.herokuapp.com/data', info)
    setRelatorio(data)
    setLoading(false)
  }
  let haveRelat = null 
  if(relatorio){
    haveRelat = <a href={relatorio}>Relatorio</a>
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <input type="file" onChange={async event => {
            setFile(event.target.files[0])
          }}/>
          {loading ? null :<button onClick={() => {
            handleSubmit()
          }}>gerar relatorio</button>}
        </p>
        {loading ? <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>  : haveRelat}
      </header>
    </div>
  );
}

export default App;
