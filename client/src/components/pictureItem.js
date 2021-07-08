import React from 'react';
import { useHistory } from 'react-router-dom';
import comment from '../assets/comment.png';
import { COMMENT_ROUTE } from '../utils/const';

const PictureItem = ({ picture }) => {
   const history = useHistory();
   return (
      <div className="card__item">
         <div className="card">
            <div className="card__img">
               <a
                  className="card__photo"
                  href={process.env.REACT_APP_API_URL + picture.img}
               >
                  <img
                     className="card__photo"
                     src={process.env.REACT_APP_API_URL + picture.img}
                     alt=""
                  />
               </a>
            </div>
            <div className="card__name">{picture.name}</div>
            <div className="card__description">
               Описание : {picture.description}
            </div>
            <div className="card__author">
               Автор : <span>{picture.author}</span>
            </div>
            <div className="d-flex justify-content-end">
               <button
                  onClick={() => history.push(COMMENT_ROUTE + '/' + picture.id)}
               >
                  <img width={18} height={18} src={comment} alt="" />
               </button>
            </div>
         </div>
      </div>
   );
};

export default PictureItem;
