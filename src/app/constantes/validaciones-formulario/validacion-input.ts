import { Validators } from '@angular/forms';
import {SOLO_ENTEROS_O_DECIMALES__POSITIVOS, SOLO_ENTEROS} from '../patrones';

export const VALIDACION_NOTA = [
  Validators.required,
  Validators.pattern(SOLO_ENTEROS_O_DECIMALES__POSITIVOS)
];
export const MENSAJES_VALIDACION_NOTA = {
  required: 'Por favor ingrese la nota',
  pattern: 'Nota no válida'
};

export const VALIDACION_HORAS = [
  Validators.required,
  Validators.pattern(SOLO_ENTEROS)
];
export const MENSAJES_VALIDACION_HORAS = {
  required: 'Por favor ingrese las horas asistidas',
  pattern: 'Número de horas no validas'
};
