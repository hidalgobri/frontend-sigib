import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuAjustesComponent } from './menu-ajustes/menu-ajustes.component';
import {OpcionMenuModule} from '../../compartido/opcion-menu/opcion-menu.module';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [MenuAjustesComponent],
  exports: [
    MenuAjustesComponent
  ],
  imports: [
    CommonModule,
    OpcionMenuModule,
    RouterModule
  ]
})
export class MenuAjustesModule { }
