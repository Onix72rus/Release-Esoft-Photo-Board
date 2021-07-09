import React, { Fragment, useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { fetchPost } from '../http/postApi';
import {
   InputGroup,
   Dropdown,
   DropdownButton,
   FormControl,
} from 'react-bootstrap';
import PictureItem from './pictureItem';
import Pagination from './pagination';

const PictureList = observer(() => {
   const { pictureItem } = useContext(Context);
   const [valueSerch, setValueSerch] = useState('');
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

   const filterPost = currenPicture.filter((post) => {
      return post.name.toLowerCase().includes(valueSerch.toLowerCase());
   });

   const postReverse = filterPost.reverse();

   return (
      <Fragment>
         <InputGroup style={{ width: 800 }} className="m-auto">
            <DropdownButton
               size="sm"
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

            <FormControl
               size="sm"
               placeholder="Поиск по названию изображения"
               onChange={(e) => setValueSerch(e.target.value)}
               aria-describedby="basic-addon1"
            />
         </InputGroup>

         <div className="card__list">
            <div className="card__inner">
               {postReverse.map((picture) => (
                  <PictureItem key={picture.id} picture={picture} />
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

export default PictureList;
