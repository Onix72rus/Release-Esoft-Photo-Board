import React, { Fragment, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import {
   InputGroup,
   Dropdown,
   DropdownButton,
   FormControl,
} from 'react-bootstrap';
import PictureItem from './pictureItem';

const PictureList = observer(() => {
   const { pictureItem } = useContext(Context);
   const [valueSerch, setValueSerch] = useState('');

   const filterPost = pictureItem.pictures.filter((post) => {
      return post.name.toLowerCase().includes(valueSerch.toLowerCase());
   });

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
               {filterPost.map((picture) => (
                  <PictureItem key={picture.id} picture={picture} />
               ))}
            </div>
         </div>
      </Fragment>
   );
});

export default PictureList;
