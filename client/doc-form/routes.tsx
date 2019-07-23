import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import DocFormIndex from './views/Index';
import Page404 from 'art-lib-react/src/components/errorpage/404';

const Routes = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact={true} path="/" component={DocFormIndex} ></Route>
        <Route component={Page404}></Route>
      </Switch>
    </HashRouter>
  );
};

export default Routes;