import api from './api';

interface Point {
  name: string;
  email: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  items: number[];
};

const createPoint = (data: FormData) => api.post('points', data);

export {
  createPoint,
};