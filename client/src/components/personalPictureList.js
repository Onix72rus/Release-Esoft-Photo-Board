import React, { Fragment, useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { Context } from '../index';
import { fetchPost } from '../http/postApi';
import { InputGroup, Dropdown, DropdownButton, Button } from 'react-bootstrap';
import PersonalPictureItem from './personalPictureItem';
import jwt_decode from 'jwt-decode';
import { ADD_PICTURE } from '../utils/const';
import Pagination from './pagination';

const PersonalPictureList = observer(() => {
   const { pictureItem } = useContext(Context);
   const userId = localStorage.getItem('token');
   const parseUser = jwt_decode(userId);
   const history = useHistory();
   const [picture, setPictures] = useState([]);
   const [currenPage, setCurrenPage] = useState(1);
   const [picturePerPage] = useState(12);

   useEffect(() => {
      fetchPost(null).then((data) => setPictures(data));
   }, []);

   const lastPictureIndex = currenPage * picturePerPage;
   const firstPictureIndex = lastPictureIndex - picturePerPage;
   const currenPicture = pictureItem.pictures.slice(
      firstPictureIndex,
      lastPictureIndex
   );

   const paginate = (pageNumber) => setCurrenPage(pageNumber);

   const filterPost = currenPicture.filter(
      (post) => post.userId === parseUser.id
   );
   const postReverse = filterPost.reverse();

   return (
      <Fragment>
         <InputGroup className="m-auto">
            <DropdownButton
               size="sm"
               className="ml-5"
               as={InputGroup.Prepend}
               variant="outline-secondary"
               title={
                  pictureItem.selectedType.name || 'Выберите тип изображения'
               }
               id="input-group-dropdown-1"
            >
               {pictureItem.types.map((type) => (
                  <Dropdown.Item
                     as="button"
                     onClick={() => pictureItem.setSelectedType(type)}
                     key={type.id}
                  >
                     {type.name}
                  </Dropdown.Item>
               ))}
            </DropdownButton>
            <Button
               size="sm"
               onClick={() => history.push(ADD_PICTURE)}
               variant="outline-secondary"
            >
               Добавить изображение
            </Button>
         </InputGroup>

         <div className="card__list">
            <div className="card__inner">
               {postReverse.map((picture) => (
                  <PersonalPictureItem key={picture.id} picture={picture} />
               ))}
            </div>
         </div>
         <Pagination
            picturePerPage={picturePerPage}
            totalPicture={picture.length}
            paginate={paginate}
         />
      </Fragment>
   );
});

export default PersonalPictureList;
