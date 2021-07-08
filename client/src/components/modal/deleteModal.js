import React, { useEffect } from 'react';
import { deletePost, fetchOnePost } from '../../http/postApi';
import { useParams, useHistory } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { PERSONAL_ROUTE } from '../../utils/const';

const DeleteModal = ({ show, onHide }) => {
   const { id } = useParams();
   const history = useHistory();
   useEffect(() => {
      fetchOnePost(id);
   }, []);

   const del = () => {
      deletePost(id).then((data) => {
         history.push(PERSONAL_ROUTE);
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
            <h4>Удалить изображение?</h4>
         </Modal.Body>

         <Modal.Footer className="m-auto">
            <Button
               className="mr-4"
               style={{ width: '70px' }}
               variant="outline-primary"
               onClick={onHide}
            >
               Нет
            </Button>

            <Button
               className="ml-4"
               style={{ width: '70px' }}
               variant="outline-danger"
               onClick={del}
            >
               Да
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default DeleteModal;
