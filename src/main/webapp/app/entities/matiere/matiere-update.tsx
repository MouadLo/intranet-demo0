import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IHoraire } from 'app/shared/model/horaire.model';
import { getEntities as getHoraires } from 'app/entities/horaire/horaire.reducer';
import { getEntity, updateEntity, createEntity, reset } from './matiere.reducer';
import { IMatiere } from 'app/shared/model/matiere.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMatiereUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IMatiereUpdateState {
  isNew: boolean;
  userId: string;
  horaireId: string;
}

export class MatiereUpdate extends React.Component<IMatiereUpdateProps, IMatiereUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
      horaireId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUsers();
    this.props.getHoraires();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { matiereEntity } = this.props;
      const entity = {
        ...matiereEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/matiere');
  };

  render() {
    const { matiereEntity, users, horaires, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhipsterApp.matiere.home.createOrEditLabel">
              <Translate contentKey="jhipsterApp.matiere.home.createOrEditLabel">Create or edit a Matiere</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : matiereEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="matiere-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="matiere-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nomMatiereLabel" for="matiere-nomMatiere">
                    <Translate contentKey="jhipsterApp.matiere.nomMatiere">Nom Matiere</Translate>
                  </Label>
                  <AvField id="matiere-nomMatiere" type="text" name="nomMatiere" />
                </AvGroup>
                <AvGroup>
                  <Label id="abreviationLabel" for="matiere-abreviation">
                    <Translate contentKey="jhipsterApp.matiere.abreviation">Abreviation</Translate>
                  </Label>
                  <AvField id="matiere-abreviation" type="text" name="abreviation" />
                </AvGroup>
                <AvGroup>
                  <Label for="matiere-user">
                    <Translate contentKey="jhipsterApp.matiere.user">User</Translate>
                  </Label>
                  <AvInput id="matiere-user" type="select" className="form-control" name="user.id">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.login}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="matiere-horaire">
                    <Translate contentKey="jhipsterApp.matiere.horaire">Horaire</Translate>
                  </Label>
                  <AvInput id="matiere-horaire" type="select" className="form-control" name="horaire.id">
                    <option value="" key="0" />
                    {horaires
                      ? horaires.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/matiere" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  horaires: storeState.horaire.entities,
  matiereEntity: storeState.matiere.entity,
  loading: storeState.matiere.loading,
  updating: storeState.matiere.updating,
  updateSuccess: storeState.matiere.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getHoraires,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatiereUpdate);
