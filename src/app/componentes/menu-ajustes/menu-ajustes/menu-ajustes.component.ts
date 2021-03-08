import { Component, OnInit } from '@angular/core';
import {OPCIONES_MENU_AJUSTES} from '../../../constantes/opciones-menu-ajustes';

@Component({
  selector: 'app-menu-ajustes',
  templateUrl: './menu-ajustes.component.html',
  styleUrls: ['./menu-ajustes.component.scss']
})
export class MenuAjustesComponent implements OnInit {

  opcionesMenuAjustes = OPCIONES_MENU_AJUSTES;
  constructor() { }

  ngOnInit() {
  }

}
