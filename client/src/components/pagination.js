import React from 'react';

const Pagination = ({ picturePerPage, totalPicture, paginate }) => {
   const padeNumbers = [];

   for (let i = 1; i <= Math.ceil(totalPicture / picturePerPage); i++) {
      padeNumbers.push(i);
   }
   return (
      <div className="pagination__list">
         <ul>
            {padeNumbers.map((number) => (
               <li key={number}>
                  <button onClick={() => paginate(number)}>{number}</button>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default Pagination;
