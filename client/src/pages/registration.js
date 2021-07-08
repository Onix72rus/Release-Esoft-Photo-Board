import React, { Fragment, useState, useContext } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { Container, Form, Card, Button, Row } from 'react-bootstrap';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, BOARD_ROUTE } from '../utils/const';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { login, registration } from '../http/userApi';
import preview from '../assets/preview.png';
import Image from 'react-bootstrap/Image';

const Registration = observer(() => {
   const { user } = useContext(Context);
   const location = useLocation();
   const history = useHistory();
   const isLogin = location.pathname === LOGIN_ROUTE;
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [name, setName] = useState('');

   const SubmitForm = async () => {
      try {
         let data;
         if (isLogin) {
            data = await login(email, password, name);
         } else {
            data = await registration(email, password, name);
         }
         user.setUser(user);
         user.setIsAuth(true);
         history.push(BOARD_ROUTE);
      } catch (e) {
         alert(e.response.data.message);
      }
   };

   return (
      <Fragment>
         <Image
            width={220}
            height={220}
            src={preview}
            className="d-flex m-auto"
         />

         <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 254 }}
         >
            <Card style={{ width: 600 }} className="p-5">
               <h2 className="m-auto">
                  {isLogin ? 'Авторизация' : 'Регистрация'}
               </h2>

               <Form className="d-flex flex-column">
                  <Form.Control
                     size="sm"
                     className="mt-3"
                     placeholder="Введите email..."
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />

                  <Form.Control
                     size="sm"
                     className="mt-3"
                     placeholder="Введите пароль..."
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />

                  <Form.Control
                     size="sm"
                     className="mt-3"
                     placeholder="Введите имя..."
                     type="text"
                     name="name"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                  />

                  <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                     {isLogin ? (
                        <div>
                           Нет аккаунта?{' '}
                           <NavLink to={REGISTRATION_ROUTE}>
                              Зарегистрируйся!
                           </NavLink>
                        </div>
                     ) : (
                        <div>
                           Есть аккаунт?{' '}
                           <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                        </div>
                     )}

                     <Button
                        size="sm"
                        className="mt-3"
                        variant={'primary'}
                        onClick={SubmitForm}
                     >
                        {isLogin ? 'Войти' : 'Регистрация'}
                     </Button>
                  </Row>
               </Form>
            </Card>
         </Container>
      </Fragment>
   );
});

export default Registration;
