import React, { Fragment, useEffect, useState } from 'react';
import NavBar from '../components/navBar';
import { Button, Card, Col, Container, Row, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useParams, useHistory } from 'react-router-dom';
import { fetchOnePost } from '../http/postApi';
import { PERSONAL_ROUTE } from '../utils/const';
import DeleteModal from '../components/modal/deleteModal';

const PostItem = observer(() => {
   const [picture, setPictures] = useState({ info: [] });
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');
   const [modalShow, setModalShow] = React.useState(false);
   const history = useHistory();
   const { id } = useParams();
   useEffect(() => {
      fetchOnePost(id).then((data) => setPictures(data));
   }, []);

   const updateDescription = async (e) => {
      e.preventDefault();
      try {
         const body = { name, description };
         const response = await fetch(
            `http://localhost:5000/api/picture/${id}`,
            {
               method: 'PUT',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(body),
            }
         );

         history.push(PERSONAL_ROUTE);
      } catch (err) {
         console.error(err.message);
      }
   };

   return (
      <Fragment>
         <NavBar />
         <div style={{ height: 120 }}></div>
         <Container fluid="sm">
            <Row>
               <Card className="ml-2 m-auto" style={{ width: '45%' }}>
                  <a href={process.env.REACT_APP_API_URL + picture.img}>
                     <Card.Img
                        className="img-responsive"
                        variant="top"
                        src={process.env.REACT_APP_API_URL + picture.img}
                     />
                  </a>

                  <Card.Body>
                     <div className="card__name--edit">{picture.name}</div>
                     <div className="card__description--edit">
                        ???????????????? : {picture.description}
                     </div>
                     <div className="card__author--edit">
                        ?????????? : <span>{picture.author}</span>
                     </div>

                     <Form.Control
                        size="sm"
                        type="text"
                        placeholder="?????????????? ???????????????? ??????????????????????"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                     />

                     <br />

                     <Form.Control
                        size="sm"
                        type="text"
                        placeholder="?????????????? ???????????????? ??????????????????????"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                     />

                     <br />

                     <div className="button__edit--page">
                        <button
                           className="button__danger"
                           type="submit"
                           onClick={() => setModalShow(true)}
                        >
                           ??????????????
                        </button>

                        <button
                           className="button__edit"
                           type="submit"
                           onClick={updateDescription}
                        >
                           ??????????????????????????
                        </button>
                     </div>
                  </Card.Body>
               </Card>
            </Row>
         </Container>

         <DeleteModal show={modalShow} onHide={() => setModalShow(false)} />
      </Fragment>
   );
});

export default PostItem;
