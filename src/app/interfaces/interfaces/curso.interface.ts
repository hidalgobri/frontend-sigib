import { ProfesorInterface } from "./profesor.interface";
import { MateriaInterface } from "./materia.interface";

export interface CursoInterface {
  id?: number;
  grupo: string;
  horario: string;
  aula: string;
  numeroMaximoAlumnos: number;
  periodoAcademico: string;
  profesor?: number | ProfesorInterface;
  materia?: number | MateriaInterface;
  idCarrera: number;
}
