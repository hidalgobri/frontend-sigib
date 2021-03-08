import { Toast } from 'angular2-toaster';

export const toastExitoCrear: Toast = {
  type: 'success',
  title: 'Correcto',
  body: 'Creado correctamente',
  showCloseButton: true,
};

export const toastExitoEditar: Toast = {
  type: 'success',
  title: 'Correcto',
  body: 'Guardado Correctamente',
  showCloseButton: true,
};

export const toastExitoEliminar: Toast = {
  type: 'success',
  title: 'Correcto',
  body: 'Eliminado Correctamente',
  showCloseButton: true,
};

export const toastErrorCrear: Toast = {
  type: 'error',
  title: 'Error',
  body: 'Error creando',
  showCloseButton: true,
};

export const toastErrorEditar: Toast = {
  type: 'error',
  title: 'Error',
  body: 'Error editando',
  showCloseButton: true,
};

export const toastErrorEliminar: Toast = {
  type: 'error',
  title: 'Error',
  body: 'Error eliminando',
  showCloseButton: true,
};
export const ToastExitoEstado: Toast = {
  type: 'success',
  title: 'Exito',
  body: 'Estado actualizado',
  showCloseButton: true,
};

export const ToastErrorEstado: Toast = {
  type: 'error',
  title: 'Error',
  body: 'Error actualizando',
  showCloseButton: true,
};

export const ToastErrorCargandoDatos: Toast = {
  type: 'error',
  title: 'Error',
  body: 'Error al traer datos',
  showCloseButton: true,
};


export function generarToasterErrorCrearCampoRepetido(campo: string) {
  return {
    type: 'error',
    title: 'Error',
    body:
      'Error creando, talvez el  campo ' +
      campo +
      ' ya se encuentra registrado',
    showCloseButton: true,
  };
}

export function generarToasterErrorEditarCampoRepetido(campo: string) {
  return {
    type: 'error',
    title: 'Error',
    body:
      'Error editando, talvez el campo ' +
      campo +
      ' ya se encuentra registrado',
    showCloseButton: true,
  };
}

export const toastErrorConexionServidor: Toast = {
  type: 'error',
  title: 'Error',
  body: 'Fallo conexion al servidor',
  showCloseButton: true,
};

export function generarMensajePersonalizado(titulo: string, mensaje: string, tipo = 'error') {
  return {
    type: tipo,
    title: `${titulo}`,
    body: `${mensaje}`
  };
}

export const toastErrorMostrar: Toast = {
  type: 'error',
  title: 'Error',
  body: 'Error al mostrar registro',
  showCloseButton: true,
};

