import { Component, OnInit } from '@angular/core';
import { OPCIONES_MENU_FACTURACION } from 'src/app/constantes/opciones-menu-facturacion';

@Component({
  selector: 'app-menu-opciones-facturacion',
  templateUrl: './menu-opciones-facturacion.component.html',
  styleUrls: ['./menu-opciones-facturacion.component.scss']
})
export class MenuOpcionesFacturacionComponent implements OnInit {

  opcionesMenuAdministrador = OPCIONES_MENU_FACTURACION;
  constructor() { }

  ngOnInit() {
  }

}
