import { IFiliere } from 'app/shared/model/filiere.model';
import { IEtudiant } from 'app/shared/model/etudiant.model';

export interface IGroup {
  id?: number;
  nomGroup?: string;
  abreviation?: string;
  niveau?: string;
  filieres?: IFiliere[];
  etudiants?: IEtudiant[];
}

export const defaultValue: Readonly<IGroup> = {};
