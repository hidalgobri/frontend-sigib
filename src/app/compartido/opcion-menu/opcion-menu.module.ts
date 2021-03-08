import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpcionMenuComponent } from './opcion-menu/opcion-menu.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';



@NgModule({
  declarations: [OpcionMenuComponent],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
  ],
  exports: [OpcionMenuComponent]
})
export class OpcionMenuModule { }
