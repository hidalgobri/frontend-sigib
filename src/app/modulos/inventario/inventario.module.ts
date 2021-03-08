import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventarioRoutingModule } from './inventario-routing.module';
import { FormularioProductoComponent } from './formularios/formulario-producto/formulario-producto.component';
import { CrearEditarProductoComponent } from './modales/crear-editar-producto/crear-editar-producto.component';
import { RutaGestionInventarioComponent } from './rutas/ruta-gestion-inventario/ruta-gestion-inventario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatDialogModule, MatSelectModule, MatOptionModule, MatButtonModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { SelectGeneralModule } from 'src/app/compartido/select-general/select-general.module';
import { PickListModule } from 'primeng/picklist';


@NgModule({
  declarations: [FormularioProductoComponent, CrearEditarProductoComponent, RutaGestionInventarioComponent],
  imports: [
    CommonModule,
    InventarioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    TextMaskModule,
    DropdownModule,
    MatDialogModule,
    TableModule,
    MatSelectModule,
    SelectGeneralModule,
    MatOptionModule,
    PickListModule,
    MatButtonModule,
  ],
    entryComponents: [
      CrearEditarProductoComponent
  ]
})
export class InventarioModule { }
