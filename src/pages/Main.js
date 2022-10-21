import { useState } from 'react'
import Header from '../components/header/header'
import Dropdown from '../components/dropdown/Dropdown'
import { DropdownItem } from '../components/dropdown/Dropdown'
import '../styles/main.css'
import { useDispatch, useSelector } from 'react-redux'
import transliterate from '../components/transliteration/transliteration'

function Main() {

    const dispatch = useDispatch()
    const selection = useSelector(state => state.selection)

    const [latin, setLatin] = useState('')

    // Обработчик изменения текста
    const translitHandler = event => {
        let translitedData = transliterate(event, selection)
        setLatin(translitedData)
    }

    // Поменять местами выборы
    const replaceSelections = () => {
        dispatch({type: 'REPLACE_TRANSLITERATION'})
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
                        <Dropdown 
                            id='left-option' 
                            top={'91px'} 
                            current={selection.optionLeft}
                            type={'CHANGE_LEFT_SELECTION'}
                        >
                            <DropdownItem>Кириллица</DropdownItem>
                            <DropdownItem>Латиница</DropdownItem>
                        </Dropdown>
                    </div>

                    <div className='change-options'>
                        <div className='change-button' onClick={replaceSelections}></div>
                    </div>

                    <div className='language-option'>
                        <Dropdown 
                            id='right-option' 
                            top={'91px'} 
                            current={selection.optionRight}
                            type={'CHANGE_RIGHT_SELECTION'}
                        >
                            <DropdownItem>Латиница</DropdownItem>
                            <DropdownItem>Кириллица</DropdownItem>
                        </Dropdown>
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