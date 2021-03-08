import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuOpcionesInicioComponent } from './menu-opciones-inicio/menu-opciones-inicio.component';
import {OpcionMenuModule} from '../../compartido/opcion-menu/opcion-menu.module';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [MenuOpcionesInicioComponent],
  exports: [
    MenuOpcionesInicioComponent
  ],
  imports: [
    CommonModule,
    OpcionMenuModule,
    RouterModule
  ]
})
export class MenuOpcionesInicioModule { }
