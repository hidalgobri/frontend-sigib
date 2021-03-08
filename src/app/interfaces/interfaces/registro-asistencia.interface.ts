import { EstudianteInterface } from "./estudiante.interface";
import { CursoInterface } from "./curso.interface";

export interface RegistroAsistenciaInterface {
  id?: number;
  horasAsistidas: number;
  estudiante: number | EstudianteInterface;
  curso: number | CursoInterface;
}
