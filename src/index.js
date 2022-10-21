import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import './index.css';
import Main from './pages/Main';
import reportWebVitals from './reportWebVitals';

// Дефолтные состояния хранилища
const defaultState = {
  optionLeft: 'Кириллица',
  optionRight: 'Латиница',
  optionLanguage: 'Русский'
}

// Редюсер выпадающего списка
const selectReducer = (state = defaultState, action) => {
  switch (action.type) {
    
    case 'CHANGE_LEFT_SELECTION':
      return {...state, optionRight: state.optionLeft, optionLeft: action.payload}
    case 'CHANGE_RIGHT_SELECTION':
      return {...state, optionLeft: state.optionRight, optionRight: action.payload}

    case 'REPLACE_TRANSLITERATION':
      return {...state, optionLeft: state.optionRight, optionRight: state.optionLeft}

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
