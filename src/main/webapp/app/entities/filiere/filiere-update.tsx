import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IGroup } from 'app/shared/model/group.model';
import { getEntities as getGroups } from 'app/entities/group/group.reducer';
import { getEntity, updateEntity, createEntity, reset } from './filiere.reducer';
import { IFiliere } from 'app/shared/model/filiere.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFiliereUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IFiliereUpdateState {
  isNew: boolean;
  groupId: string;
}

export class FiliereUpdate extends React.Component<IFiliereUpdateProps, IFiliereUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      groupId: '0',
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

    this.props.getGroups();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { filiereEntity } = this.props;
      const entity = {
        ...filiereEntity,
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
    this.props.history.push('/entity/filiere');
  };

  render() {
    const { filiereEntity, groups, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhipsterApp.filiere.home.createOrEditLabel">
              <Translate contentKey="jhipsterApp.filiere.home.createOrEditLabel">Create or edit a Filiere</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : filiereEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="filiere-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="filiere-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nomFiliereLabel" for="filiere-nomFiliere">
                    <Translate contentKey="jhipsterApp.filiere.nomFiliere">Nom Filiere</Translate>
                  </Label>
                  <AvField id="filiere-nomFiliere" type="text" name="nomFiliere" />
                </AvGroup>
                <AvGroup>
                  <Label id="abreviationLabel" for="filiere-abreviation">
                    <Translate contentKey="jhipsterApp.filiere.abreviation">Abreviation</Translate>
                  </Label>
                  <AvField id="filiere-abreviation" type="text" name="abreviation" />
                </AvGroup>
                <AvGroup>
                  <Label for="filiere-group">
                    <Translate contentKey="jhipsterApp.filiere.group">Group</Translate>
                  </Label>
                  <AvInput id="filiere-group" type="select" className="form-control" name="group.id">
                    <option value="" key="0" />
                    {groups
                      ? groups.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.abreviation}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/filiere" replace color="info">
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
  groups: storeState.group.entities,
  filiereEntity: storeState.filiere.entity,
  loading: storeState.filiere.loading,
  updating: storeState.filiere.updating,
  updateSuccess: storeState.filiere.updateSuccess
});

const mapDispatchToProps = {
  getGroups,
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
)(FiliereUpdate);
