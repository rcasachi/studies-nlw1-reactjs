import axios from 'axios';

export interface State {
  sigla: string;
}

export interface City {
  nome: string;
}

const ibge = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1',
});

export const getIbgeStates = ibge.get<State[]>('/localidades/estados');

export const getIbgeCities = (state: string) => ibge.get<City[]>(`/localidades/estados/${state}/municipios`);