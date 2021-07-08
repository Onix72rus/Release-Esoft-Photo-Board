import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import PictureStore from './store/pictureStore';
import UserStore from './store/userStore';

require('dotenv').config();

export const Context = createContext(null);

ReactDOM.render(
   <Context.Provider
      value={{
         user: new UserStore(),
         pictureItem: new PictureStore(),
      }}
   >
      <App />
   </Context.Provider>,
   document.getElementById('root')
);
