import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './filiere.reducer';
import { IFiliere } from 'app/shared/model/filiere.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFiliereProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Filiere extends React.Component<IFiliereProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { filiereList, match } = this.props;
    return (
      <div>
        <h2 id="filiere-heading">
          <Translate contentKey="jhipsterApp.filiere.home.title">Filieres</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="jhipsterApp.filiere.home.createLabel">Create new Filiere</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {filiereList && filiereList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jhipsterApp.filiere.nomFiliere">Nom Filiere</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jhipsterApp.filiere.abreviation">Abreviation</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jhipsterApp.filiere.group">Group</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {filiereList.map((filiere, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${filiere.id}`} color="link" size="sm">
                        {filiere.id}
                      </Button>
                    </td>
                    <td>{filiere.nomFiliere}</td>
                    <td>{filiere.abreviation}</td>
                    <td>{filiere.group ? <Link to={`group/${filiere.group.id}`}>{filiere.group.abreviation}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${filiere.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${filiere.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${filiere.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="jhipsterApp.filiere.home.notFound">No Filieres found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ filiere }: IRootState) => ({
  filiereList: filiere.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filiere);
