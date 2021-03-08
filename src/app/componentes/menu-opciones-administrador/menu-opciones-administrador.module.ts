import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuOpcionesAdministradorComponent } from './menu-opciones-administrador/menu-opciones-administrador.component';
import {OpcionMenuModule} from '../../compartido/opcion-menu/opcion-menu.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [MenuOpcionesAdministradorComponent],
  exports: [
    MenuOpcionesAdministradorComponent
  ],
  imports: [
    CommonModule,
    OpcionMenuModule,
    RouterModule
  ]
})
export class MenuOpcionesAdministradorModule { }
