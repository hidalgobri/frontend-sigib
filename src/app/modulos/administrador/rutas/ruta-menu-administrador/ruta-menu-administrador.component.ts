import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ruta-menu-administrador',
  templateUrl: './ruta-menu-administrador.component.html',
  styleUrls: ['./ruta-menu-administrador.component.scss']
})
export class RutaMenuAdministradorComponent implements OnInit {

  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _router: Router
  ) { }

    text: string;

    results: string[];

    search(event) {
            this.results = ['asdfsadfdas','asdfasdf','afdasdfsdfda'];
    }
  ngOnInit() {
  }

  irAJuegos() {
    const rutaJuegos = ['../administrador', 'juegos', 'listar-juegos'];
    this._router.navigate(rutaJuegos);
  }

  irAjustes() {
    const rutaAjustes = ['../administrador', 'ajustes'];
    this._router.navigate(rutaAjustes);
  }

}
