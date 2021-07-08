import React, { useEffect, useContext } from 'react';
import AppRouter from './components/appRouter';
import { BrowserRouter } from 'react-router-dom';
import { Context } from './index';
import { check } from './http/userApi';
import app from './css/app.css';

function App() {
   const { user } = useContext(Context);

   useEffect(() => {
      check()
         .then(() => {
            user.setUser(user);
            user.setIsAuth(true);
         })
         .catch(() => {
            user.setUser(user);
            user.setIsAuth(false);
         });
   }, []);

   return (
      <BrowserRouter>
         <AppRouter />
      </BrowserRouter>
   );
}

export default App;
