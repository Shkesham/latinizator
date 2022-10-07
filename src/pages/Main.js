import { useState } from 'react'
import Header from '../components/header/header'
import '../styles/main.css'

function Main() {

    const [latin, setLatin] = useState('')
    const [inputData, setInputData] = useState()

    // Словарь символов
    const dictionary = require('../components/dictionary')

    // Поиск символа в словаре
    function findSymbol(input) {

        let vocab = dictionary
        
        let value = vocab.get(input)
        if (typeof value !== 'undefined')
            return value
        else 
            return input
        
    }

    // Обработчик изменения textArea
    const changeHandler = event => {
        setInputData(event.target.value)
    }

    // Транслитерация
    function translate() {

        let processedData = '';
        [...inputData].forEach(char => {
            processedData += findSymbol(char)
        })
        setLatin(processedData)
        console.log(processedData)
        
    }
    
    return(
        <div className='wrapper'>

            <Header/>

            <div className='main-cont'>

                <div className='select-cont'>
                    <div className='language-option'><p id='left-option'>Кириллица</p></div>
                    <div className='change-options'></div>
                    <div className='language-option'><p id='right-option'>Латиница</p></div>
                </div>

                <div className='text-block-cont'>
                    <div className='text-block' id='text-block-left'>
                        <textarea onChange={changeHandler}></textarea>
                    </div>
                    <div className='text-block' id='text-block-right'>
                        <textarea readOnly={true} value={latin}></textarea>
                    </div>
                </div>
                
                <button onClick={() => translate()}>Перевести</button>

            </div>

        </div>
    )
}

export default Main