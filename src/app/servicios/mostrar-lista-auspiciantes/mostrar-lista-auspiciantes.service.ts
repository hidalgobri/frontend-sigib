import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MostrarListaAuspiciantesService {

  mostrando = false;
  cambioMostrar: EventEmitter<boolean> = new EventEmitter();

  mostrar() {
    this.mostrando = true;
    this.cambioMostrar.emit(true);
  }

  ocultar() {
    setTimeout(() => {
      this.mostrando = false;
      this.cambioMostrar.emit(false);
    }, 500);
  }
}
