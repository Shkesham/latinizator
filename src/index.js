import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import Main from './pages/Main'
import reportWebVitals from './reportWebVitals'
import './index.css'

// Дефолтные состояния хранилища
const defaultState = {
  optionLanguage: 'Русский'
}

// Редюсер выпадающего списка
const selectReducer = (state = defaultState, action) => {
  switch (action.type) {
    
    case 'CHANGE_LANGUAGE_SELECTION':
      return {...state, optionLanguage: action.payload}

    default:
      return state
  }
}

// Хранилище состояний
const store = configureStore({
  reducer: {
    selection: selectReducer
  }
})
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Main />
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
