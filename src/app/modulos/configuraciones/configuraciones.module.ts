import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RutaGestionUsuariosComponent} from './rutas/ruta-gestion-usuarios/ruta-gestion-usuarios.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {TextMaskModule} from 'angular2-text-mask';
import {ConfiguracionesRoutingModule} from './configuraciones-routing.module';
import {FormularioUsuarioComponent} from './formularios/formulario-usuario/formulario-usuario.component';
import {DropdownModule} from 'primeng/dropdown';
import {CrearEditarUsuarioComponent} from './modales/crear-editar-usuario/crer-editar-usuario.component';
import {MatDialogModule} from '@angular/material/dialog';
import {SelectGeneralModule} from '../../compartido/select-general/select-general.module';
import {TableModule} from 'primeng/table';
import {MenuAjustesModule} from '../../componentes/menu-ajustes/menu-ajustes.module';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {PickListModule} from 'primeng/picklist';
import {MatButtonModule} from '@angular/material';
import { FormularioRolComponent } from './formularios/formulario-rol/formulario-rol.component';
import { CrearEditarRolComponent } from './modales/crear-editar-rol/crear-editar-rol.component';
import { RutaGestionRolesComponent } from './rutas/ruta-gestion-roles/ruta-gestion-roles.component';

@NgModule({
  declarations: [
    RutaGestionUsuariosComponent,
    FormularioUsuarioComponent,
    CrearEditarUsuarioComponent,
    FormularioRolComponent,
    CrearEditarRolComponent,
    RutaGestionRolesComponent,
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    TextMaskModule,
    ConfiguracionesRoutingModule,
    DropdownModule,
    MatDialogModule,
    TableModule,
    MatSelectModule,
    SelectGeneralModule,
    MatOptionModule,
    MenuAjustesModule,
    PickListModule,
    MatButtonModule,

  ],
  entryComponents: [
    CrearEditarUsuarioComponent,
    CrearEditarRolComponent,
  ],
})
export class ConfiguracionesModule {
}
