import { IEtudiant } from 'app/shared/model/etudiant.model';
import { IHoraire } from 'app/shared/model/horaire.model';

export interface IAbsence {
  id?: number;
  etudiant?: IEtudiant;
  horaire?: IHoraire;
}

export const defaultValue: Readonly<IAbsence> = {};
