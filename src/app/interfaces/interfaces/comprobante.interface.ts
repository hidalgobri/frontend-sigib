import { EstudianteInterface } from './estudiante.interface';

export interface ComprobanteInterface{
    numero: number;
    fecha: string;
    ci: string;
    nombre: string;
    tipo: string;
    formapago: string;
    realizadop: string;
    comprobantep: string;
    beneficiario: string;
    estudiante: number | EstudianteInterface;

}
