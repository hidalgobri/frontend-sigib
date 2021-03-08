import { UsuarioInterface } from './usuario.interface';

export interface ProfesorInterface {
  id?: number;
  cedula: string;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  tipoContrato: string;
  fechaContratacion: string | Date;
  usuario?: number | UsuarioInterface;
}
