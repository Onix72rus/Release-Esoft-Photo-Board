import Add from './pages/add';
import Board from './pages/board';
import Login from './pages/login';
import Registration from './pages/registration';
import Personal_area from './pages/personalArea';
import OnePost from './pages/onePostItem';
import CommentPost from './pages/commentPages';

import {
   ADD_PICTURE,
   LOGIN_ROUTE,
   REGISTRATION_ROUTE,
   BOARD_ROUTE,
   PERSONAL_ROUTE,
   POST_ROUTE,
   COMMENT_ROUTE,
} from './utils/const';

export const authRoutes = [
   {
      path: ADD_PICTURE,
      Component: Add,
   },

   {
      path: PERSONAL_ROUTE,
      Component: Personal_area,
   },

   {
      path: COMMENT_ROUTE + '/:id',
      Component: CommentPost,
   },

   {
      path: POST_ROUTE + '/:id',
      Component: OnePost,
   },

   {
      path: BOARD_ROUTE,
      Component: Board,
   },
];

export const publicRoutes = [
   {
      path: LOGIN_ROUTE,
      Component: Login,
   },

   {
      path: REGISTRATION_ROUTE,
      Component: Registration,
   },
];
