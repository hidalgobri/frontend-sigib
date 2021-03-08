import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuOpcionesAcademicoComponent } from './menu-opciones-academico/menu-opciones-academico.component';
import { OpcionMenuModule } from 'src/app/compartido/opcion-menu/opcion-menu.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [MenuOpcionesAcademicoComponent],
  imports: [
    CommonModule,
    OpcionMenuModule,
    RouterModule
  ],
  exports: [
    MenuOpcionesAcademicoComponent
  ]
})
export class MenuOpcionesAcademicoModule { }
