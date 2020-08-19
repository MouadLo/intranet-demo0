import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './etudiant.reducer';
import { IEtudiant } from 'app/shared/model/etudiant.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEtudiantDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EtudiantDetail extends React.Component<IEtudiantDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { etudiantEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jhipsterApp.etudiant.detail.title">Etudiant</Translate> [<b>{etudiantEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="cne">
                <Translate contentKey="jhipsterApp.etudiant.cne">Cne</Translate>
              </span>
            </dt>
            <dd>{etudiantEntity.cne}</dd>
            <dt>
              <Translate contentKey="jhipsterApp.etudiant.group">Group</Translate>
            </dt>
            <dd>{etudiantEntity.group ? etudiantEntity.group.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/etudiant" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/etudiant/${etudiantEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ etudiant }: IRootState) => ({
  etudiantEntity: etudiant.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EtudiantDetail);
