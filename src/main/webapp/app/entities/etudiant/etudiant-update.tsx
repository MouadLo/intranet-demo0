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
import { getEntity, updateEntity, createEntity, reset } from './etudiant.reducer';
import { IEtudiant } from 'app/shared/model/etudiant.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEtudiantUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEtudiantUpdateState {
  isNew: boolean;
  groupId: string;
}

export class EtudiantUpdate extends React.Component<IEtudiantUpdateProps, IEtudiantUpdateState> {
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
      const { etudiantEntity } = this.props;
      const entity = {
        ...etudiantEntity,
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
    this.props.history.push('/entity/etudiant');
  };

  render() {
    const { etudiantEntity, groups, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhipsterApp.etudiant.home.createOrEditLabel">
              <Translate contentKey="jhipsterApp.etudiant.home.createOrEditLabel">Create or edit a Etudiant</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : etudiantEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="etudiant-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="etudiant-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="cneLabel" for="etudiant-cne">
                    <Translate contentKey="jhipsterApp.etudiant.cne">Cne</Translate>
                  </Label>
                  <AvField id="etudiant-cne" type="text" name="cne" />
                </AvGroup>
                <AvGroup>
                  <Label for="etudiant-group">
                    <Translate contentKey="jhipsterApp.etudiant.group">Group</Translate>
                  </Label>
                  <AvInput id="etudiant-group" type="select" className="form-control" name="group.id">
                    <option value="" key="0" />
                    {groups
                      ? groups.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/etudiant" replace color="info">
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
  etudiantEntity: storeState.etudiant.entity,
  loading: storeState.etudiant.loading,
  updating: storeState.etudiant.updating,
  updateSuccess: storeState.etudiant.updateSuccess
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
)(EtudiantUpdate);
