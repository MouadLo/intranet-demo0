import { IGroup } from 'app/shared/model/group.model';

export interface IEtudiant {
  id?: number;
  cne?: string;
  group?: IGroup;
}

export const defaultValue: Readonly<IEtudiant> = {};
