import React, { useState } from 'react';
import { createType } from '../../http/postApi';
import { Modal, Button, Form } from 'react-bootstrap';

const CreateType = ({ show, onHide }) => {
   const [value, setValue] = useState('');

   const addType = () => {
      createType({ name: value }).then((data) => {
         setValue('');
         onHide();
      });
   };

   return (
      <Modal
         show={show}
         onHide={onHide}
         aria-labelledby="contained-modal-title-vcenter"
         centered
      >
         <Modal.Body className="m-auto">
            <h4>Добавить тип</h4>
         </Modal.Body>
         <Modal.Body className="m-auto">
            <Form>
               <Form.Control
                  style={{ width: '450px' }}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={'Введите название типа'}
               />
            </Form>
         </Modal.Body>

         <Modal.Footer className="m-auto">
            <Button
               size="sm"
               className="mr-4"
               style={{ width: '100px' }}
               variant="outline-primary"
               onClick={onHide}
            >
               Закрыть
            </Button>

            <Button
               size="sm"
               className="ml-4"
               style={{ width: '100px' }}
               variant="outline-danger"
               onClick={addType}
            >
               Добавить
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default CreateType;
