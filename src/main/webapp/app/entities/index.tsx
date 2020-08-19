import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Group from './group';
import Etudiant from './etudiant';
import Filiere from './filiere';
import Absence from './absence';
import Horaire from './horaire';
import Matiere from './matiere';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/group`} component={Group} />
      <ErrorBoundaryRoute path={`${match.url}/etudiant`} component={Etudiant} />
      <ErrorBoundaryRoute path={`${match.url}/filiere`} component={Filiere} />
      <ErrorBoundaryRoute path={`${match.url}/absence`} component={Absence} />
      <ErrorBoundaryRoute path={`${match.url}/horaire`} component={Horaire} />
      <ErrorBoundaryRoute path={`${match.url}/matiere`} component={Matiere} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
