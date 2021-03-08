import { AbstractControl } from '@angular/forms';

export function generarMensajesError(campo: AbstractControl,  mensajesErrorCampo: string[], validacionesCampo: {}) {
  mensajesErrorCampo = [];
  if (campo.errors ) {
    mensajesErrorCampo = Object.keys(campo.errors).map(propiedad => {
      return validacionesCampo[propiedad];
    });
  }
  return mensajesErrorCampo;
}
