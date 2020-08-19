import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './group.reducer';
import { IGroup } from 'app/shared/model/group.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IGroupUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IGroupUpdateState {
  isNew: boolean;
}

export class GroupUpdate extends React.Component<IGroupUpdateProps, IGroupUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { groupEntity } = this.props;
      const entity = {
        ...groupEntity,
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
    this.props.history.push('/entity/group');
  };

  render() {
    const { groupEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhipsterApp.group.home.createOrEditLabel">
              <Translate contentKey="jhipsterApp.group.home.createOrEditLabel">Create or edit a Group</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : groupEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="group-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="group-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nomGroupLabel" for="group-nomGroup">
                    <Translate contentKey="jhipsterApp.group.nomGroup">Nom Group</Translate>
                  </Label>
                  <AvField id="group-nomGroup" type="text" name="nomGroup" />
                </AvGroup>
                <AvGroup>
                  <Label id="abreviationLabel" for="group-abreviation">
                    <Translate contentKey="jhipsterApp.group.abreviation">Abreviation</Translate>
                  </Label>
                  <AvField id="group-abreviation" type="text" name="abreviation" />
                </AvGroup>
                <AvGroup>
                  <Label id="niveauLabel" for="group-niveau">
                    <Translate contentKey="jhipsterApp.group.niveau">Niveau</Translate>
                  </Label>
                  <AvField id="group-niveau" type="text" name="niveau" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/group" replace color="info">
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
  groupEntity: storeState.group.entity,
  loading: storeState.group.loading,
  updating: storeState.group.updating,
  updateSuccess: storeState.group.updateSuccess
});

const mapDispatchToProps = {
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
)(GroupUpdate);
