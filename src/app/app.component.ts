import {Component, EventEmitter, HostListener, OnInit} from '@angular/core';
import {CargandoService} from './servicios/cargando-service/cargando-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'juego-bolsa-front';
  bloqueado = false;
  mostrarListaAuspiciantes = false;

  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
  ) {
  }

  ngOnInit(): void {
    this.escucharCambiosEnCargandoService();
  }

  escucharCambiosEnCargandoService() {
    this._cargandoService
      .cambioCargando
      .subscribe(
        (cambio) => {
          this.bloqueado = cambio;
        }
      );
  }
}
