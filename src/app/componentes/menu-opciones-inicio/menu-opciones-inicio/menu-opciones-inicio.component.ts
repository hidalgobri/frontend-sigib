import { Component, OnInit } from '@angular/core';
import {OPCIONES_MENU_INICIO} from '../../../constantes/opciones-menu-inicio';

@Component({
  selector: 'app-menu-opciones-inicio',
  templateUrl: './menu-opciones-inicio.component.html',
  styleUrls: ['./menu-opciones-inicio.component.scss']
})
export class MenuOpcionesInicioComponent implements OnInit {

  opcionesMenuInicio = OPCIONES_MENU_INICIO;
  constructor() { }

  ngOnInit() {
  }

}
