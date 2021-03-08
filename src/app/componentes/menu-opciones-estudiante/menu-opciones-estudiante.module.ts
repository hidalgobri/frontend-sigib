import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuOpcionesEstudianteComponent } from './menu-opciones-estudiante/menu-opciones-estudiante.component';
import { RouterModule } from '@angular/router';
import { OpcionMenuModule } from 'src/app/compartido/opcion-menu/opcion-menu.module';



@NgModule({
  declarations: [MenuOpcionesEstudianteComponent],
  imports: [
    CommonModule,
    RouterModule,
    OpcionMenuModule
  ]
})
export class MenuOpcionesEstudianteModule { }
