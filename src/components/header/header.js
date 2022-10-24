import { useState } from 'react'
import Dropdown from '../dropdown/Dropdown'
import { DropdownItem } from '../dropdown/Dropdown'
import { useDispatch, useSelector } from 'react-redux'
import './header.css'
import './header_mobile.css'

function Header() {

    const selection = useSelector(state => state.selection)

    const [isVisible, setVisibility] = useState('hidden')
    const [openIsVisible, setOpenVisibility] = useState('visible')
    const [closeIsVisible, setCloseVisibility] = useState('hidden')

    // Обработчик нажатия кнокпи меню
    const menuBtnHandler = () => {

        let menu = document.querySelector('.menu-cont')

        if(openIsVisible==='visible') {
            setOpenVisibility('hidden')
            setCloseVisibility('visible')
        }
        else {
            setOpenVisibility('visible')
            setCloseVisibility('hidden')
        }

        if(isVisible==='hidden') {
            setVisibility('visible')
            menu.animate([
                {transform: 'translateY(-100vh)'},
                {transform: `translateY(0vh)`}
            ], {
                duration: 300,
                iterations: 1,
            })
        }
        else {
            menu.animate([   
                {transform: `translateY(0vh)`},
                {transform: 'translateY(-100vh)'}
            ], {
                duration: 300,
                iterations: 1,
            })
            setTimeout(() => {
                setVisibility('hidden')
            }, 300) 
        }

    }

    return(
        <header>
            <div className='main-block'>

                <div className='half-block' id='half-left'>
                    <div className='logo-cont'>
                        <div className='logo-image'/>
                        <div className='title-cont'>
                            <p>Шкешам Латинизатор</p>
                        </div>
                    </div>
                </div>
            
                <div className='half-block' id='half-right'>
                    <nav>
                        <div className='nav-item'><p>Наши преокты</p></div>
                        <div className='nav-item'><p>О Шкешам</p></div>
                        <div className='nav-item'>
                            <Dropdown 
                                id='left-option' 
                                top={'122px'}
                                current={selection.optionLanguage}
                                type={'CHANGE_LANGUAGE_SELECTION'}
                            >
                                <DropdownItem>Русский</DropdownItem>
                                <DropdownItem>Олыкмарий</DropdownItem>
                                <DropdownItem>Olykmarii</DropdownItem>
                            </Dropdown>
                        </div>
                    </nav>
                </div>

                {/* Только для моб версии */}
                <div className='menu-btn-cont'>
                    <div className='menu-btn' onClick={menuBtnHandler}>
                        <div className='open-btn' style={{visibility: openIsVisible}}>
                            <div className='menu-line'/>
                            <div className='menu-line'/>
                            <div className='menu-line'/>
                        </div>

                        <div className='close-btn' style={{visibility: closeIsVisible}}>
                            <div className='cross-line cross-left'/>
                            <div className='cross-line cross-right'/>
                        </div>      
                    </div>
                </div>
            </div>

            <div className='menu-cont' style={{visibility: isVisible}}>
                <div className='menu-language-selection'>
                    <div className='lang-select'>
                        <p>Выбрать язык</p>
                    </div>
                    <div className='dropdown-cont'>
                        <Dropdown 
                            id='left-option' 
                            top={'40px'}
                            current={selection.optionLanguage}
                            type={'CHANGE_LANGUAGE_SELECTION'}
                            desktop={true}
                            displayMode={'flex'}
                            font={'32px'}
                        >
                            <DropdownItem>Русский</DropdownItem>
                            <DropdownItem>Олыкмарий</DropdownItem>
                            <DropdownItem>Olykmarii</DropdownItem>
                        </Dropdown>
                    </div> 
                </div>

                <div className='menu-nav'>
                    <p>Меню</p>
                    <a href='#'>Наши проекты</a>
                    <a href='#'>О Шкешам</a>
                    <a href='#'>Поддержать</a>
                </div>
            </div>

        </header>
    )
}

export default Header