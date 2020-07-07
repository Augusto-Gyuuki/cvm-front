import React, { useState, useEffect } from 'react';
import './App.css';
import fileIcon from './assets/file.png'
import plusIcon from './assets/plus.png'
import instructionsFile from './assets/Screenshot from 2020-05-18 14-55-05.png'
import Axios from 'axios';

const App = () => {
    const [file, setFile] = useState()
    const [relatorio, setRelatorio] = useState()
    const [pageLoading, setPageLoading] = useState(true)
    const [loading, setLoading] = useState()
    
    
    useEffect(async() => {
        await Axios.get('https://cvm-project.herokuapp.com/cdi')
        setPageLoading(false)    
    }, [])
    
    const handleSubmit = async() => {
        setRelatorio(null)
        setLoading(true)

        const info  = new FormData()
        info.append('CNPJ',file)
        const { data } = await Axios.post('https://cvm-project.herokuapp.com/data', info)
        
        setRelatorio(data)
        setLoading(false)
    }
    
    const spinner = <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    const loadingPage = <div class="lds-facebook"><div></div><div></div><div></div></div>
    
    let haveRelat = null 
    if(relatorio){
        haveRelat = <button className='input-button'>
            <a href={relatorio} style={{ textDecoration: 'none', color: 'black'  }}>Relatorio</a>
        </button>
    }

    return(
        <>
            {pageLoading ? <div style={{display: 'flex', height: "100vh", justifyContent: 'center', alignItems: 'center', background: '#000'}}>
                {loadingPage}
            </div> : null}
            <div className={pageLoading ? 'loading' :"container"}>
                <div className="header">
                    <div className="title">CVM Project</div>
                </div>
                <div className="box">
                    <div className="right">
                        No maximo arquivos com até 100 CNPJs <br/><br/> Tempo de espera : ~ 1 minuto
                    </div>
                    <div className="input">
                        <label className='file'>
                            <input className='file-input' type="file" onChange={ event => {setFile(event.target.files[0])}}/>
                            <img className='file-icon' src={file ? fileIcon : plusIcon} alt=""/>
                        </label>
                        {loading ? null : <button className='input-button' disabled={file ? false : true} onClick={() => { handleSubmit() }}>{file ? 'Gerar Relatorio' : 'Insira um Arquivo'}</button>}
                        {loading ? spinner  : haveRelat}
                    </div>
                    <div className="left">
                        <div className="instructions">
                            Adicione um arquivo .csv ou .tsv com o seguinte formato: <br/><br/>
                            <img src={instructionsFile} className='instructions-img' alt="instruções do arquivo"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



export default App;
