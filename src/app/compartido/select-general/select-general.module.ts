import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectGeneralComponent } from './select-general/select-general.component';
import {DropdownModule} from 'primeng/dropdown';



@NgModule({
  declarations: [SelectGeneralComponent],
  imports: [
    CommonModule,
    DropdownModule,
  ],
  exports: [
    SelectGeneralComponent,
  ]
})
export class SelectGeneralModule { }
