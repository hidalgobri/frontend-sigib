import {Validators} from '@angular/forms';

export const VALIDACION_NOMBRE_JUGADOR = [

  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(10),
];
export const MENSAJES_VALIDACION_NOMBRE_JUGADOR = {
  required: 'El campo nombre es obligatorio',
  minlength: 'El campo nombre debe tener mínimo 3 caracteres',
  maxlength: 'El campo nombre no debe tener más de 10 caracteres'
};

export const VALIDACION_PASSWORD_JUGARDOR = [
  Validators.required,
];
export const MENSAJES_VALIDACION_PASSWORD_JUGARDOR = {
  required: 'El campo password es obligatorio'
};


