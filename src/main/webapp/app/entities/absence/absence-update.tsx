import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEtudiant } from 'app/shared/model/etudiant.model';
import { getEntities as getEtudiants } from 'app/entities/etudiant/etudiant.reducer';
import { IHoraire } from 'app/shared/model/horaire.model';
import { getEntities as getHoraires } from 'app/entities/horaire/horaire.reducer';
import { getEntity, updateEntity, createEntity, reset } from './absence.reducer';
import { IAbsence } from 'app/shared/model/absence.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAbsenceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAbsenceUpdateState {
  isNew: boolean;
  etudiantId: string;
  horaireId: string;
}

export class AbsenceUpdate extends React.Component<IAbsenceUpdateProps, IAbsenceUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      etudiantId: '0',
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

    this.props.getEtudiants();
    this.props.getHoraires();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { absenceEntity } = this.props;
      const entity = {
        ...absenceEntity,
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
    this.props.history.push('/entity/absence');
  };

  render() {
    const { absenceEntity, etudiants, horaires, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhipsterApp.absence.home.createOrEditLabel">
              <Translate contentKey="jhipsterApp.absence.home.createOrEditLabel">Create or edit a Absence</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : absenceEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="absence-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="absence-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label for="absence-etudiant">
                    <Translate contentKey="jhipsterApp.absence.etudiant">Etudiant</Translate>
                  </Label>
                  <AvInput id="absence-etudiant" type="select" className="form-control" name="etudiant.id">
                    <option value="" key="0" />
                    {etudiants
                      ? etudiants.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.cne}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="absence-horaire">
                    <Translate contentKey="jhipsterApp.absence.horaire">Horaire</Translate>
                  </Label>
                  <AvInput id="absence-horaire" type="select" className="form-control" name="horaire.id">
                    <option value="" key="0" />
                    {horaires
                      ? horaires.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.heureDepart}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/absence" replace color="info">
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
  etudiants: storeState.etudiant.entities,
  horaires: storeState.horaire.entities,
  absenceEntity: storeState.absence.entity,
  loading: storeState.absence.loading,
  updating: storeState.absence.updating,
  updateSuccess: storeState.absence.updateSuccess
});

const mapDispatchToProps = {
  getEtudiants,
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
)(AbsenceUpdate);
