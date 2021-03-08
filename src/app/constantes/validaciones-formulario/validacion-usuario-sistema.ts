import {Validators} from '@angular/forms';

export const VALIDACION_CEDULA_USUARIO = [

  Validators.required,
  Validators.minLength(10),
  Validators.maxLength(10),
];
export const MENSAJES_VALIDACION_CEDULA_USUARIO = {
  required: 'El campo nombre es obligatorio',
  minlength: 'El campo nombre debe tener más de 10 caracteres',
  maxlength: 'El campo nombre debe tener más de 10 caracteres'
};

export const VALIDACION_PASSWORD_USUARIO = [
  Validators.required,
];
export const MENSAJES_VALIDACION_PASSWORD_USUARIO = {
  required: 'El campo password es obligatorio'
};

export const VALIDACION_ROL_USUARIO = [
  Validators.required,
];
export const MENSAJES_VALIDACION_ROL_USUARIO = {
  required: 'El campo perfil es obligatorio'
};


