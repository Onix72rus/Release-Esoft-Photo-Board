import React, { Fragment, useContext } from 'react';
import { Navbar, Button, Image } from 'react-bootstrap';
import { BOARD_ROUTE, LOGIN_ROUTE, PERSONAL_ROUTE } from '../utils/const';
import { useHistory, useLocation } from 'react-router-dom';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import logo from '../assets/logo.png';

const NavBar = observer(() => {
   const { user } = useContext(Context);
   const history = useHistory();
   const location = useLocation();
   const isAdd = location.pathname === BOARD_ROUTE;

   const logOut = () => {
      user.setIsAuth(false);
      localStorage.removeItem('token');
      history.push(LOGIN_ROUTE);
   };

   return (
      <Fragment>
         <Navbar bg="primary fixed-top" variant="dark" className="mb-5">
            <Navbar.Brand className="mr-auto pl-4" href={BOARD_ROUTE}>
               <Image width={106} height={57} src={logo} />
            </Navbar.Brand>

            {isAdd ? (
               <Button
                  size="sm"
                  className="mr-3"
                  variant="outline-light"
                  onClick={() => history.push(PERSONAL_ROUTE)}
               >
                  Личный кабинет
               </Button>
            ) : (
               <Button
                  size="sm"
                  className="mr-3 ml-5"
                  variant="outline-light"
                  onClick={() => history.push(BOARD_ROUTE)}
               >
                  Назад
               </Button>
            )}

            <Button
               size="sm"
               className="ml-3 mr-4"
               variant="outline-light"
               onClick={() => logOut()}
            >
               Выйти
            </Button>
         </Navbar>
      </Fragment>
   );
});

export default NavBar;
