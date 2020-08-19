import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/group">
      <Translate contentKey="global.menu.entities.group" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/etudiant">
      <Translate contentKey="global.menu.entities.etudiant" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/filiere">
      <Translate contentKey="global.menu.entities.filiere" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/absence">
      <Translate contentKey="global.menu.entities.absence" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/horaire">
      <Translate contentKey="global.menu.entities.horaire" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/matiere">
      <Translate contentKey="global.menu.entities.matiere" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
