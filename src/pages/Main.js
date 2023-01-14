import { useState } from 'react'
import Header from '../components/header/header'
import transliterate from '../components/transliteration/transliteration'
import '../styles/main.css'
import '../styles/main_mobile.css'

function Main() {

    const selection = 'Кириллица'

    const [latin, setLatin] = useState('')

    // Обработчик изменения текста
    const translitHandler = event => {
        const text = event.target.value
        let translitedText = transliterate(text, selection)
        setLatin(translitedText)
    }

    // Скопировать текст
    const copyHandler = () => {
        navigator.clipboard.writeText(latin)
    }
    
    return(
        <div className='wrapper'>

            <Header/>

            <div className='main-cont'>

                <div className='select-cont'>
                    <div className='language-option'>
                        <p>Кириллица</p>
                    </div>

                    <div className='change-options'></div>

                    <div className='language-option'>
                        <p>Латиница</p>
                    </div>
                </div>

                <div className='text-block-cont'>
                    <div className='text-block' id='text-block-left'>
                        <textarea onChange={translitHandler}></textarea>
                        <div className='textarea-icon-cont'>
                            <div className='textarea-icon' id='keyboard'/>
                        </div>  
                    </div>
                    <div className='text-block' id='text-block-right'>
                        <textarea readOnly={true} value={latin}></textarea>
                        <div className='textarea-icon-cont'>
                            <div className='textarea-icon' id='copy' onClick={copyHandler}/>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Main