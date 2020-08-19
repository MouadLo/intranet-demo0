import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './horaire.reducer';
import { IHoraire } from 'app/shared/model/horaire.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHoraireDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class HoraireDetail extends React.Component<IHoraireDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { horaireEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jhipsterApp.horaire.detail.title">Horaire</Translate> [<b>{horaireEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="heureDepart">
                <Translate contentKey="jhipsterApp.horaire.heureDepart">Heure Depart</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={horaireEntity.heureDepart} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="heureFin">
                <Translate contentKey="jhipsterApp.horaire.heureFin">Heure Fin</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={horaireEntity.heureFin} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="dateJour">
                <Translate contentKey="jhipsterApp.horaire.dateJour">Date Jour</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={horaireEntity.dateJour} type="date" format={APP_DATE_FORMAT} />
            </dd>
          </dl>
          <Button tag={Link} to="/entity/horaire" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/horaire/${horaireEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ horaire }: IRootState) => ({
  horaireEntity: horaire.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HoraireDetail);
