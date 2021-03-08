import { Validators } from '@angular/forms';
import {
  SOLO_ENTEROS,
  SOLO_LETRAS_ESPACIOS,
} from '../patrones';

export const VALIDACION_CEDULA_PROFESOR = [
  Validators.required,
  Validators.maxLength(10),
  Validators.minLength(10),
  Validators.pattern(SOLO_ENTEROS)
];
export const MENSAJES_VALIDACION_CEDULA_PROFESOR = {
  required: 'Por favor ingrese un número de cédula',
  maxlength: 'Cédula no válida',
  minlength: 'Cédula no válida',
  pattern: 'Cédula no válida'
};

export const VALIDACION_NOMBRE_PROFESOR = [
  Validators.required,
  Validators.maxLength(100),
  Validators.pattern(SOLO_LETRAS_ESPACIOS)
];
export const MENSAJES_VALIDACION_NOMBRE_PROFESOR = {
  required: 'Por favor ingrese el nombre del profesor',
  maxlength: 'Nombre no válido',
  pattern: 'Nombre no válido'
};

export const VALIDACION_APELLIDO_PROFESOR = [
  Validators.required,
  Validators.maxLength(100),
  Validators.pattern(SOLO_LETRAS_ESPACIOS)
];
export const MENSAJES_VALIDACION_APELLIDO_PROFESOR = {
  required: 'Por favor ingrese el apellido del profesor',
  maxlength: 'Apellido no válido',
  pattern: 'Apellido no válido'
};

export const VALIDACION_TELEFONO_PROFESOR = [
  Validators.required,
  Validators.maxLength(10),
  Validators.minLength(10)
];
export const MENSAJES_VALIDACION_TELEFONO_PROFESOR = {
  required: 'Por favor ingrese el número de teléfono del profesor',
  maxlength: 'Número de teléfono no válido',
};

export const VALIDACION_CORREO_PROFESOR = [
  Validators.required,
  Validators.maxLength(50),
  Validators.email
];
export const MENSAJES_VALIDACION_CORREO_PROFESOR = {
  required: 'Por favor ingrese el correo del profesor',
  maxlength: 'Correo no válido',
  email: 'Correo no válido'
};

export const VALIDACION_TIPO_CONTRATO_PROFESOR = [Validators.required];
export const MENSAJES_VALIDACION_TIPO_CONTRATO_PROFESOR = {
  required: 'Por favor seleccione un tipo de contrato'
};

export const VALIDACION_FECHA_CONTRATACION_PROFESOR = [
  Validators.required,
  Validators.maxLength(10),
];
export const MENSAJES_VALIDACION_FECHA_CONTRATACION_PROFESOR = {
  required: 'Por favor ingrese la fecha de contratación del profesor',
  maxLength: 'Fecha no válida',
};
