import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Dropdown.css'
import './Dropdown_mobile.css'

// Выпадающий список
function Dropdown(props) {

    const dispatch = useDispatch()

    // Проверка мобильная или десктопная версия
    function isMobile() {
        if(window.matchMedia(
            '(max-device-width: 640px)', 
            '(min-device-width: 320px)', 
            '(-webkit-min-device-pixel-ratio: 2)'
        ).matches)
            return true
        else 
            return false
    }

    // Видимость списка элементов
    const [isVisible, setVisibility] = useState('hidden')

    // Открытие и закрытие списка
    const openListHandler = () => {
        if(!isMobile()) {
            if(isVisible==='hidden')
                setVisibility('visible')
            else
                setVisibility('hidden')
        }
        else return
    }

    // Поменять выбор
    function changeSelection (value) {
        if(!isMobile()) {
            if(value!==props.current) {
                dispatch({type: props.type, payload: value})
                openListHandler()
                return
            }
            else {
                openListHandler()
                return 
            }   
        } 
        else return      
    }

    const childrenWithProps = React.Children.map(props.children, child => {
          return React.cloneElement(child, { changeSelection })
    })

    return(
        <div className='dropdown' style={{marginTop: props.top}}>
            <div className='selected-item-cont' onClick={openListHandler}>
                <div className='selected-item'>
                    <p>{props.current}</p>
                </div>
                <div className='arrow-cont'>
                    <div className='arrow-down'></div>
                </div>
            </div>

            <div className='option-list' style={{visibility: isVisible}}>
                {childrenWithProps}
            </div>
        </div>
        
    )
}

// Элемент выпадающего списка
export function DropdownItem(props) {
    return(
        <div className='dropdownItem' onClick={() => props.changeSelection(props.children)}>
            <p>{props.children}</p>
        </div>
    )
}

export default Dropdown