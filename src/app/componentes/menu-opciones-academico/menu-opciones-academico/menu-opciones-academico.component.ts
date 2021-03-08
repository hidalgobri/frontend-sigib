import { Component, OnInit } from '@angular/core';
import { OPCIONES_MENU_ACADEMICO } from 'src/app/constantes/menu-opciones-academico';

@Component({
  selector: 'app-menu-opciones-academico',
  templateUrl: './menu-opciones-academico.component.html',
  styleUrls: ['./menu-opciones-academico.component.scss']
})
export class MenuOpcionesAcademicoComponent implements OnInit {

  opcionesMenuAdministrador = OPCIONES_MENU_ACADEMICO;
  constructor() { }

  ngOnInit() {
  }
}
