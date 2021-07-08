import React, { Fragment, useContext, useEffect } from 'react';
import NavBar from '../components/navBar';
import PictureList from '../components/pictureList';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { fetchTypes, fetchPost } from '../http/postApi';
import { Redirect } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/const';
import jwt_decode from 'jwt-decode';

const Board = observer(() => {
   const { user } = useContext(Context);
   const { pictureItem } = useContext(Context);
   const userName = localStorage.getItem('token');
   const parseUserName = jwt_decode(userName);

   useEffect(() => {
      fetchTypes().then((data) => pictureItem.setTypes(data));
      fetchPost(null).then((data) => pictureItem.setPictures(data));
   }, []);

   useEffect(() => {
      fetchPost(pictureItem.selectedType.id).then((data) => {
         pictureItem.setPictures(data);
      });
   }, [pictureItem.selectedType]);

   console.log(user);

   return (
      <Fragment>
         {user.isAuth === false && <Redirect to={LOGIN_ROUTE} />}

         <div style={{ height: 120 }}></div>

         <NavBar />

         <h2 className="d-flex justify-content-center mb-5">
            Добро пожаловать {parseUserName.name}!
         </h2>

         <div className="container">
            <PictureList />
         </div>
      </Fragment>
   );
});

export default Board;
