import React, { Fragment, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { Context } from '../index';
import { InputGroup, Dropdown, DropdownButton, Button } from 'react-bootstrap';
import PersonalPictureItem from './personalPictureItem';
import jwt_decode from 'jwt-decode';
import { ADD_PICTURE } from '../utils/const';

const PersonalPictureList = observer(() => {
   const { pictureItem } = useContext(Context);
   const userId = localStorage.getItem('token');
   const parseUser = jwt_decode(userId);
   const history = useHistory();

   const filterPost = pictureItem.pictures.filter(
      (post) => post.userId === parseUser.id
   );
   console.log(filterPost);
   return (
      <Fragment>
         <InputGroup className="mb-3">
            <InputGroup className="mb-3">
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
         </InputGroup>

         <div className="card__list">
            <div className="card__inner">
               {filterPost.map((picture) => (
                  <PersonalPictureItem key={picture.id} picture={picture} />
               ))}
            </div>
         </div>
      </Fragment>
   );
});

export default PersonalPictureList;
