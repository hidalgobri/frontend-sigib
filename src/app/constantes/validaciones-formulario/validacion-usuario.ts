import { Validators } from '@angular/forms';
import { SOLO_LETRAS_ESPACIOS, SOLO_ENTEROS } from '../patrones';

export const VALIDACION_CEDULA_USUARIO = [
  Validators.required,
  Validators.maxLength(10),
  Validators.minLength(10),
  Validators.pattern(SOLO_ENTEROS)
];
export const MENSAJES_VALIDACION_CEDULA_USUARIO = {
  required: 'El campo cédula es obligatorio',
  maxlength: 'El campo  cédula unicamente debe teer 10 caracteres ',
  minlength: 'El campo  cédula unicamente debe teer 10 caracteres ',
  pattern: 'El campo solo puede tener números enteros'
};

export const VALIDACION_NOMBRE_USUARIO = [
  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(60),
  Validators.pattern(SOLO_LETRAS_ESPACIOS)
];
export const MENSAJES_VALIDACION_NOMBRE_USUARIO = {
  required: 'El campo cédula es obligatorio',
  minlength: 'El campo cédula debe tener mínimo 3 caracteres',
  maxlength: 'El campo  cédula no debe tener mas de 5 caracteres ',
  pattern: 'El campo solo puede tener letras, acentos y ñ'
};
