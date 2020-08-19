import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './horaire.reducer';
import { IHoraire } from 'app/shared/model/horaire.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHoraireProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Horaire extends React.Component<IHoraireProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { horaireList, match } = this.props;
    return (
      <div>
        <h2 id="horaire-heading">
          <Translate contentKey="jhipsterApp.horaire.home.title">Horaires</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="jhipsterApp.horaire.home.createLabel">Create new Horaire</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {horaireList && horaireList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jhipsterApp.horaire.heureDepart">Heure Depart</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jhipsterApp.horaire.heureFin">Heure Fin</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jhipsterApp.horaire.dateJour">Date Jour</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {horaireList.map((horaire, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${horaire.id}`} color="link" size="sm">
                        {horaire.id}
                      </Button>
                    </td>
                    <td>
                      <TextFormat type="date" value={horaire.heureDepart} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={horaire.heureFin} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={horaire.dateJour} format={APP_DATE_FORMAT} />
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${horaire.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${horaire.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${horaire.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="jhipsterApp.horaire.home.notFound">No Horaires found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ horaire }: IRootState) => ({
  horaireList: horaire.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Horaire);
