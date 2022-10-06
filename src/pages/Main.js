import Header from '../components/header/header'
import '../styles/main.css'

function Main() {
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
                        <textarea></textarea>
                    </div>
                    <div className='text-block' id='text-block-right'>
                        <textarea readOnly={true}></textarea>
                    </div>
                </div>
                


            </div>

        </div>
    )
}

export default Main