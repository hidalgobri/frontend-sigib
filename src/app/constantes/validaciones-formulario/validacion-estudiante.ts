import {Validators} from '@angular/forms';import { SOLO_ENTEROS, SOLO_LETRAS_ESPACIOS, EXPRESION_CORREO, EXPRESION_TELEFONO } from '../patrones';

export const VALIDACION_CEDULA_ESTUDIANTE = [
  Validators.required,
  Validators.maxLength(10),
  Validators.minLength(10),
  Validators.pattern(SOLO_ENTEROS)

];
export const MENSAJES_VALIDACION_CEDULA_ESTUDIANTE = {
  required: 'Por favor ingrese un número de cédula',
  maxlength: 'Cédula no válida',
  minlength: 'Cédula no válida',
  pattern: 'Cédula no válida'
};

export const VALIDACION_NOMBRE_ESTUDIANTE =[
  Validators.required,
  Validators.maxLength(100),
  Validators.pattern(SOLO_LETRAS_ESPACIOS)
]

export const MENSAJES_VALIDACION_NOMBRE_ESTUDIANTE = {
  required: 'Por favor ingrese el nombre del estudiante',
  maxlength: 'Nombre no válido',
  pattern: 'Nombre no válido'
};

export const VALIDACION_APELLIDO_ESTUDIANTE =[
  Validators.required,
  Validators.maxLength(100),
  Validators.pattern(SOLO_LETRAS_ESPACIOS)
]

export const MENSAJES_VALIDACION_APELLIDO_ESTUDIANTE = {
  required: 'Por favor ingrese el apellido del estudiante',
  maxlength: 'Apellido no válido',
  pattern: 'Apellido no válido',
};

export const VALIDACION_CORREO_ESTUDIANTE =[
  Validators.required,
  Validators.maxLength(50),
  Validators.email,
]

export const MENSAJES_VALIDACION_CORREO_ESTUDIANTE = {
  required: 'Por favor ingrese el correo del estudiante',
  maxlength: 'Correo no válido',
  email: 'Correo no válido',
};

export const VALIDACION_CARRERA_ESTUDIANTE = [
  Validators.required,
];
export const MENSAJES_VALIDACION_CARRERA_ESTUDIANTE = {
  required: 'Por favor seleccione una carrera',
};

export const VALIDACION_TELEFONO_ESTUDIANTE = [
  Validators.required,
  Validators.maxLength(10),
  Validators.minLength(10),
];

export const MENSAJES_VALIDACION_TELEFONO_ESTUDIANTE = {
  required: 'Por favor ingrese el número de teléfono del estudiante',
  maxlength: 'Número de teléfono no válido',
};
