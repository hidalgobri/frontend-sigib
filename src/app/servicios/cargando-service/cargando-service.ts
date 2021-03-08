import { EventEmitter, Injectable } from '@angular/core';
import { CargandoServiceInterface } from '../../interfaces/cargando-service.interface';

@Injectable(
  {
    providedIn: 'root',
  }
)
export class CargandoService implements CargandoServiceInterface {
  cargando = false;
  cambioCargando: EventEmitter<boolean> = new EventEmitter();

  habilitarCargando() {
    this.cargando = true;
    this.cambioCargando.emit(true);
  }

  deshabilitarCargando() {
    setTimeout(() => {
      this.cargando = false;
      this.cambioCargando.emit(false);
    }, 250);
  }
}
