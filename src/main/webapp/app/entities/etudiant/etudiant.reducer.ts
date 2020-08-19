import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEtudiant, defaultValue } from 'app/shared/model/etudiant.model';

export const ACTION_TYPES = {
  FETCH_ETUDIANT_LIST: 'etudiant/FETCH_ETUDIANT_LIST',
  FETCH_ETUDIANT: 'etudiant/FETCH_ETUDIANT',
  CREATE_ETUDIANT: 'etudiant/CREATE_ETUDIANT',
  UPDATE_ETUDIANT: 'etudiant/UPDATE_ETUDIANT',
  DELETE_ETUDIANT: 'etudiant/DELETE_ETUDIANT',
  RESET: 'etudiant/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEtudiant>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type EtudiantState = Readonly<typeof initialState>;

// Reducer

export default (state: EtudiantState = initialState, action): EtudiantState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ETUDIANT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ETUDIANT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ETUDIANT):
    case REQUEST(ACTION_TYPES.UPDATE_ETUDIANT):
    case REQUEST(ACTION_TYPES.DELETE_ETUDIANT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ETUDIANT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ETUDIANT):
    case FAILURE(ACTION_TYPES.CREATE_ETUDIANT):
    case FAILURE(ACTION_TYPES.UPDATE_ETUDIANT):
    case FAILURE(ACTION_TYPES.DELETE_ETUDIANT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ETUDIANT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ETUDIANT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ETUDIANT):
    case SUCCESS(ACTION_TYPES.UPDATE_ETUDIANT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ETUDIANT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/etudiants';

// Actions

export const getEntities: ICrudGetAllAction<IEtudiant> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ETUDIANT_LIST,
  payload: axios.get<IEtudiant>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IEtudiant> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ETUDIANT,
    payload: axios.get<IEtudiant>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEtudiant> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ETUDIANT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEtudiant> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ETUDIANT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEtudiant> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ETUDIANT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
