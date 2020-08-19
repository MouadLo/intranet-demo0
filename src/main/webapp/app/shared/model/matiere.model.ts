import { IUser } from 'app/shared/model/user.model';
import { IHoraire } from 'app/shared/model/horaire.model';

export interface IMatiere {
  id?: number;
  nomMatiere?: string;
  abreviation?: string;
  user?: IUser;
  horaire?: IHoraire;
}

export const defaultValue: Readonly<IMatiere> = {};
