import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Form, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Context } from '../index';
import NavBar from '../components/navBar';
import { observer } from 'mobx-react-lite';
import { createPost, fetchTypes } from '../http/postApi';
import jwt_decode from 'jwt-decode';
import { BOARD_ROUTE } from '../utils/const';
import CreateType from '../components/modal/createType';

const Add = observer(() => {
   const { pictureItem } = useContext(Context);
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');
   const [file, setFile] = useState(null);
   const [typeVisible, setTypeVisible] = useState(false);
   const history = useHistory();

   useEffect(() => {
      fetchTypes().then((data) => pictureItem.setTypes(data));
   }, []);

   const selectFile = (event) => {
      setFile(event.target.files[0]);
   };

   const addPostPicture = () => {
      const userId = localStorage.getItem('token');
      const parseUser = jwt_decode(userId);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('img', file);
      formData.append('author', parseUser.name);
      formData.append('typeId', pictureItem.selectedType.id);
      formData.append('userId', parseUser.id);
      createPost(formData);
      history.push(BOARD_ROUTE);
   };

   return (
      <Fragment>
         <NavBar />

         <div style={{ height: 150 }}></div>

         <Form
            className="mt-5 justify-content-center align-items-center m-auto"
            style={{ width: 700 }}
         >
            <Form.Group>
               <Form.File id="exampleFormControlFile1" onChange={selectFile} />
               <Form.Group controlId="exampleForm.ControlSelect1"></Form.Group>
               <DropdownButton
                  className="d-flex flex-column"
                  id="dropdown-basic-button"
                  title={
                     pictureItem.selectedType.name || 'Выберите тип изображения'
                  }
               >
                  {pictureItem.types.map((type) => (
                     <Dropdown.Item
                        style={{ width: 700 }}
                        onClick={() => pictureItem.setSelectedType(type)}
                        key={type.id}
                     >
                        {type.name}
                     </Dropdown.Item>
                  ))}
               </DropdownButton>
               <br />
               <Button
                  variant="outline-primary"
                  size="md"
                  block
                  onClick={() => setTypeVisible(true)}
               >
                  Добавить тип изображения
               </Button>{' '}
               <br />
               <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Введите название изображения"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
               />
               <br />
               <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Введите описание изображения"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
               />
            </Form.Group>
            <Button
               variant="outline-primary"
               size="md"
               block
               onClick={addPostPicture}
            >
               Добавить изображение
            </Button>{' '}
         </Form>
         <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      </Fragment>
   );
});

export default Add;
