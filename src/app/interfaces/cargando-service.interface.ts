import { EventEmitter } from '@angular/core';

export interface CargandoServiceInterface {
  cargando;
  cambioCargando: EventEmitter<boolean>;

  habilitarCargando();

  deshabilitarCargando();
}
