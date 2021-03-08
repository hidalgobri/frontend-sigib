import {UsuarioInterface} from './usuario.interface';
import {CarreraInterface} from './carrera.interface';
import { GradoInterface } from './grado.interface';

export interface EstudianteInterface {
  id?: number;
  codigo: string;
  cedula: string;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  carrera: number | CarreraInterface;
  usuario?: number | UsuarioInterface;
  grado?: number | GradoInterface;
}
