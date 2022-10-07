import './header.css'

function Header() {
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
                            <select>
                                <option>Русский</option>
                                <option>Олыкмарий</option>
                                <option>Olykmarii</option>
                            </select>
                        </div>
                    </nav>
                </div>
        </header>
    )
}

export default Header