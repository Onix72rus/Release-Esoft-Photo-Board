import React, { Fragment, useContext, useEffect } from 'react';
import NavBar from '../components/navBar';
import PersonalPictureList from '../components/personalPictureList';
import { Context } from '../index';
import { fetchTypes, fetchPost } from '../http/postApi';
import { observer } from 'mobx-react-lite';
import jwt_decode from 'jwt-decode';

const PersonalArea = observer(() => {
   const { pictureItem } = useContext(Context);
   const userId = localStorage.getItem('token');
   const parseUser = jwt_decode(userId);

   useEffect(() => {
      fetchTypes().then((data) => pictureItem.setTypes(data));
      fetchPost(null).then((data) => pictureItem.setPictures(data));
   }, []);

   useEffect(() => {
      fetchPost(pictureItem.selectedType.id).then((data) => {
         pictureItem.setPictures(data);
      });
   }, [pictureItem.selectedType]);

   return (
      <Fragment>
         <NavBar />

         <div className="personal__area--title">
            Личный кабинет Пользователя : {parseUser.name}
         </div>

         <div className="container">
            <PersonalPictureList />
         </div>
      </Fragment>
   );
});

export default PersonalArea;
