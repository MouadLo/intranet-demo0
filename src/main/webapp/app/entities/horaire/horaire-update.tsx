import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './horaire.reducer';
import { IHoraire } from 'app/shared/model/horaire.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IHoraireUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IHoraireUpdateState {
  isNew: boolean;
}

export class HoraireUpdate extends React.Component<IHoraireUpdateProps, IHoraireUpdateState> {
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
    values.heureDepart = convertDateTimeToServer(values.heureDepart);
    values.heureFin = convertDateTimeToServer(values.heureFin);
    values.dateJour = convertDateTimeToServer(values.dateJour);

    if (errors.length === 0) {
      const { horaireEntity } = this.props;
      const entity = {
        ...horaireEntity,
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
    this.props.history.push('/entity/horaire');
  };

  render() {
    const { horaireEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhipsterApp.horaire.home.createOrEditLabel">
              <Translate contentKey="jhipsterApp.horaire.home.createOrEditLabel">Create or edit a Horaire</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : horaireEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="horaire-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="horaire-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="heureDepartLabel" for="horaire-heureDepart">
                    <Translate contentKey="jhipsterApp.horaire.heureDepart">Heure Depart</Translate>
                  </Label>
                  <AvInput
                    id="horaire-heureDepart"
                    type="datetime-local"
                    className="form-control"
                    name="heureDepart"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.horaireEntity.heureDepart)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="heureFinLabel" for="horaire-heureFin">
                    <Translate contentKey="jhipsterApp.horaire.heureFin">Heure Fin</Translate>
                  </Label>
                  <AvInput
                    id="horaire-heureFin"
                    type="datetime-local"
                    className="form-control"
                    name="heureFin"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.horaireEntity.heureFin)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dateJourLabel" for="horaire-dateJour">
                    <Translate contentKey="jhipsterApp.horaire.dateJour">Date Jour</Translate>
                  </Label>
                  <AvInput
                    id="horaire-dateJour"
                    type="datetime-local"
                    className="form-control"
                    name="dateJour"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.horaireEntity.dateJour)}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/horaire" replace color="info">
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
  horaireEntity: storeState.horaire.entity,
  loading: storeState.horaire.loading,
  updating: storeState.horaire.updating,
  updateSuccess: storeState.horaire.updateSuccess
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
)(HoraireUpdate);
