import {Validators} from '@angular/forms';import { SOLO_ENTEROS, SOLO_LETRAS_ESPACIOS, EXPRESION_CORREO, EXPRESION_TELEFONO } from '../patrones';

export const VALIDACION_NOMBRE_MATERIA = [
  Validators.required,
  Validators.maxLength(60),
  Validators.pattern(SOLO_LETRAS_ESPACIOS)

];
export const MENSAJE_NOMBRE_MATERIA = {
  required: 'Por favor ingrese un nombre',
  maxlength: 'Nombre incorrecto',
  pattern: 'Nombre incorrecto'
};

export const VALIDACION_ANIO_MATERIA = [
  Validators.required,
];
export const MENSAJE_ANIO_MATERIA = {
  required: 'Por favor seleccione el año',
};

export const VALIDACION_TIPO_MATERIA = [
  Validators.required,
];
export const MENSAJE_TIPO_MATERIA = {
  required: 'Por favor seleccione el tipo de materia',
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

export const VALIDACION_TELEFONO_ESTUDIANTE =[
  Validators.required,
  Validators.maxLength(10),
  Validators.minLength(10),
  Validators.pattern(EXPRESION_TELEFONO)
]

export const MENSAJES_VALIDACION_TELEFONO_ESTUDIANTE = {
  required: 'Por favor ingrese el número de telefono del estudiante',
  maxlength: 'Número de telefono no válido',
  pattern: 'Número de telefono no válido',
};
