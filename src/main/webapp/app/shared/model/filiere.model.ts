import { IGroup } from 'app/shared/model/group.model';

export interface IFiliere {
  id?: number;
  nomFiliere?: string;
  abreviation?: string;
  group?: IGroup;
}

export const defaultValue: Readonly<IFiliere> = {};
