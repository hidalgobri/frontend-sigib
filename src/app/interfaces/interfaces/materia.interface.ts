import { CarreraInterface } from './carrera.interface';

export interface MateriaInterface {

  id?: number;
  codigo: string;
  nombre: string;
  anio: string;
  tipoMateria: string;
  carrera: number |CarreraInterface;

}
