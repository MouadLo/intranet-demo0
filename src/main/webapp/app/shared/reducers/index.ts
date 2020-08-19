import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import group, {
  GroupState
} from 'app/entities/group/group.reducer';
// prettier-ignore
import etudiant, {
  EtudiantState
} from 'app/entities/etudiant/etudiant.reducer';
// prettier-ignore
import filiere, {
  FiliereState
} from 'app/entities/filiere/filiere.reducer';
// prettier-ignore
import absence, {
  AbsenceState
} from 'app/entities/absence/absence.reducer';
// prettier-ignore
import horaire, {
  HoraireState
} from 'app/entities/horaire/horaire.reducer';
// prettier-ignore
import matiere, {
  MatiereState
} from 'app/entities/matiere/matiere.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly group: GroupState;
  readonly etudiant: EtudiantState;
  readonly filiere: FiliereState;
  readonly absence: AbsenceState;
  readonly horaire: HoraireState;
  readonly matiere: MatiereState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  group,
  etudiant,
  filiere,
  absence,
  horaire,
  matiere,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
