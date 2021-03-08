import {EstudianteInterface} from './estudiante.interface';
import {CursoInterface} from './curso.interface';

export interface RegistroNotaInterface {
  id?: number;
  notaPrimerQuimestre: number;
  notaSegundoQuimestre: number;
  estudiante: number  | EstudianteInterface;
  curso: number  | CursoInterface;
}
