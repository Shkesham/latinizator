import Dropdown from '../dropdown/Dropdown'
import { DropdownItem } from '../dropdown/Dropdown'
import { useDispatch, useSelector } from 'react-redux'
import './header.css'

function Header() {

    const selection = useSelector(state => state.selection)

    return(
        <header>
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
        </header>
    )
}

export default Header