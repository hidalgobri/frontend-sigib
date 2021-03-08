import { Validators } from '@angular/forms';
import { LETRAS_NUMEROS_ESPACIOS, SOLO_ENTEROS } from '../patrones';

export const VALIDACION_NOMBRE_CARRERA = [
  Validators.required,
  Validators.maxLength(25),
  Validators.minLength(2),
  Validators.pattern(LETRAS_NUMEROS_ESPACIOS)

];
export const MENSAJES_VALIDACION_NOMBRE_CARRERA = {
  required: 'Por favor ingrese un nombre',
  maxlength: 'Nombre incorrecto',
  minlength: 'Nombre incorrecto',
  pattern: 'Nombre incorrecto'
};


export const VALIDACION_DURACION_CARRERA = [
  Validators.required,
  Validators.maxLength(4),
  Validators.minLength(1),
  Validators.pattern(SOLO_ENTEROS)

];
export const MENSAJES_VALIDACION_DURACION_CARRERA = {
  required: 'Por favor ingrese una duracion',
  maxlength: 'Duración incorrecta',
  minlength: 'Duración incorrecta',
  pattern: 'Duración incorrecta'
};
