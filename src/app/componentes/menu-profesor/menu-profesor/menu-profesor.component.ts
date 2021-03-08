import { Component, OnInit } from '@angular/core';
import { OPCIONES_MENU_PROFESOR } from 'src/app/constantes/opciones-menu-profesor';

@Component({
  selector: 'app-menu-profesor',
  templateUrl: './menu-profesor.component.html',
  styleUrls: ['./menu-profesor.component.scss']
})
export class MenuProfesorComponent implements OnInit {

opcionesMenuAdministrador = OPCIONES_MENU_PROFESOR;
  constructor() { }

  ngOnInit() {
  }

}
