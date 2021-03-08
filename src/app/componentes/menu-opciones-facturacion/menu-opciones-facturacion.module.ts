import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuOpcionesFacturacionComponent } from './menu-opciones-facturacion/menu-opciones-facturacion.component';
import { OpcionMenuModule } from 'src/app/compartido/opcion-menu/opcion-menu.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [MenuOpcionesFacturacionComponent],
  exports: [
  MenuOpcionesFacturacionComponent
  ],
  imports: [
    CommonModule,
    OpcionMenuModule,
    RouterModule
  ]
})
export class MenuOpcionesFacturacionModule { }
