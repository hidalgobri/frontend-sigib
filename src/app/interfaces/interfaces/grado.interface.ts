import { EstudianteInterface } from './estudiante.interface';

export interface GradoInterface {
  id?: number;
  notaCurriculum: number;
  notaProyecto: number;
  notaGrado: number;
  estudiante: number | EstudianteInterface;
}
