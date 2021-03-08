import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturaRoutingModule } from './factura-routing.module';
import { RutaGestionFacturaComponent } from './rutas/ruta-gestion-factura/ruta-gestion-factura.component';
import { MenuOpcionesFacturacionModule } from 'src/app/componentes/menu-opciones-facturacion/menu-opciones-facturacion.module';
import { RutaGestionComprobanteComponent } from './rutas/ruta-gestion-comprobante/ruta-gestion-comprobante.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatDialogModule, MatSelectModule, MatOptionModule, MatButtonModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { SelectGeneralModule } from 'src/app/compartido/select-general/select-general.module';
import { PickListModule } from 'primeng/picklist';
import { RutaGestionClienteComponent } from './rutas/ruta-gestion-cliente/ruta-gestion-cliente.component';
import { FormularioClienteComponent } from './formularios/formulario-cliente/formulario-cliente.component';
import { FormularioFacturaComponent } from './formularios/formulario-factura/formulario-factura.component';
import { FormularioComprobanteComponent } from './formularios/formulario-comprobante/formulario-comprobante.component';
import { CrearEditarClienteComponent } from './modales/crear-editar-cliente/crear-editar-cliente.component';
import { CrearEditarComprobanteComponent } from './modales/crear-editar-comprobante/crear-editar-comprobante.component';
import { CrearEditarFacturaComponent } from './modales/crear-editar-factura/crear-editar-factura.component';


@NgModule({
  declarations: [RutaGestionFacturaComponent,
    RutaGestionComprobanteComponent,
RutaGestionClienteComponent,
FormularioClienteComponent,
FormularioFacturaComponent,
FormularioComprobanteComponent,
CrearEditarClienteComponent,
CrearEditarComprobanteComponent,
CrearEditarFacturaComponent

  ],
  imports: [
    CommonModule,
    FacturaRoutingModule,
    MenuOpcionesFacturacionModule,
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
CrearEditarClienteComponent,
CrearEditarComprobanteComponent,
CrearEditarFacturaComponent
  ]
})
export class FacturaModule { }
