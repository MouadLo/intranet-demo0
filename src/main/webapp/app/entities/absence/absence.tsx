import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './absence.reducer';
import { IAbsence } from 'app/shared/model/absence.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAbsenceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Absence extends React.Component<IAbsenceProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { absenceList, match } = this.props;
    return (
      <div>
        <h2 id="absence-heading">
          <Translate contentKey="jhipsterApp.absence.home.title">Absences</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="jhipsterApp.absence.home.createLabel">Create new Absence</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {absenceList && absenceList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jhipsterApp.absence.etudiant">Etudiant</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jhipsterApp.absence.horaire">Horaire</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {absenceList.map((absence, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${absence.id}`} color="link" size="sm">
                        {absence.id}
                      </Button>
                    </td>
                    <td>{absence.etudiant ? <Link to={`etudiant/${absence.etudiant.id}`}>{absence.etudiant.cne}</Link> : ''}</td>
                    <td>{absence.horaire ? <Link to={`horaire/${absence.horaire.id}`}>{absence.horaire.heureDepart}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${absence.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${absence.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${absence.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="jhipsterApp.absence.home.notFound">No Absences found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ absence }: IRootState) => ({
  absenceList: absence.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Absence);
