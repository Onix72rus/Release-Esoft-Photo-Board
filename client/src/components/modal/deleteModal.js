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
            <div className="button__edit--page">
               <button className="button__edit" type="submit" onClick={onHide}>
                  Нет
               </button>

               <button className="button__danger" type="submit" onClick={del}>
                  Да
               </button>
            </div>
         </Modal.Footer>
      </Modal>
   );
};

export default DeleteModal;
