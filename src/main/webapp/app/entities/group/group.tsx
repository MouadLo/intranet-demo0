import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './group.reducer';
import { IGroup } from 'app/shared/model/group.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGroupProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Group extends React.Component<IGroupProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { groupList, match } = this.props;
    return (
      <div>
        <h2 id="group-heading">
          <Translate contentKey="jhipsterApp.group.home.title">Groups</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="jhipsterApp.group.home.createLabel">Create new Group</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {groupList && groupList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jhipsterApp.group.nomGroup">Nom Group</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jhipsterApp.group.abreviation">Abreviation</Translate>
                  </th>
                  <th>
                    <Translate contentKey="jhipsterApp.group.niveau">Niveau</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {groupList.map((group, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${group.id}`} color="link" size="sm">
                        {group.id}
                      </Button>
                    </td>
                    <td>{group.nomGroup}</td>
                    <td>{group.abreviation}</td>
                    <td>{group.niveau}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${group.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${group.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${group.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="jhipsterApp.group.home.notFound">No Groups found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ group }: IRootState) => ({
  groupList: group.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Group);
