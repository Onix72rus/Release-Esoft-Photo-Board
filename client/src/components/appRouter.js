import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { LOGIN_ROUTE } from '../utils/const';

import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {
   return (
      <Switch>
         {authRoutes.map(({ path, Component, id }) => (
            <Route key={path} path={path} component={Component} id={id} exact />
         ))}
         {publicRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} component={Component} exact />
         ))}
         <Redirect to={LOGIN_ROUTE} />
      </Switch>
   );
});

export default AppRouter;
