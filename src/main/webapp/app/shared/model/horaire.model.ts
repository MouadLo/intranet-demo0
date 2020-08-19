import { Moment } from 'moment';
import { IMatiere } from 'app/shared/model/matiere.model';

export interface IHoraire {
  id?: number;
  heureDepart?: Moment;
  heureFin?: Moment;
  dateJour?: Moment;
  matieres?: IMatiere[];
}

export const defaultValue: Readonly<IHoraire> = {};
