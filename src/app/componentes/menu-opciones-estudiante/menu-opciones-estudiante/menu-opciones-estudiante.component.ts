import { Component, OnInit } from '@angular/core';
import { OPCIONES_MENU_ESTUDIANTE } from 'src/app/constantes/opciones-menu-estudiante';

@Component({
  selector: 'app-menu-opciones-estudiante',
  templateUrl: './menu-opciones-estudiante.component.html',
  styleUrls: ['./menu-opciones-estudiante.component.scss']
})
export class MenuOpcionesEstudianteComponent implements OnInit {

  opcionesMenuAdministrador = OPCIONES_MENU_ESTUDIANTE;

  constructor() { }

  ngOnInit() {
  }

}
