import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Etudiant from './etudiant';
import EtudiantDetail from './etudiant-detail';
import EtudiantUpdate from './etudiant-update';
import EtudiantDeleteDialog from './etudiant-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EtudiantUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EtudiantUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EtudiantDetail} />
      <ErrorBoundaryRoute path={match.url} component={Etudiant} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={EtudiantDeleteDialog} />
  </>
);

export default Routes;
