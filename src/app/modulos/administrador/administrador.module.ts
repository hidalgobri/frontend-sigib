import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RutaMenuAdministradorComponent} from './rutas/ruta-menu-administrador/ruta-menu-administrador.component';
import {AdministradorRoutingModule} from './administrador-routing.module';
import {MenuOpcionesAdministradorModule} from '../../componentes/menu-opciones-administrador/menu-opciones-administrador.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, MatInputModule} from '@angular/material';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MenuAjustesModule} from '../../componentes/menu-ajustes/menu-ajustes.module';
import {ConfiguracionesModule} from '../configuraciones/configuraciones.module';4
import {AutoCompleteModule} from 'primeng/autocomplete';
import { RutaLoginComponent } from './rutas/ruta-login/ruta-login.component';
import { RegistroFormularioComponent } from './formularios/registro-formulario/registro-formulario.component';
import { LocalStorageService } from 'src/app/servicios/rest/servicios/local-storage';


@NgModule({
  declarations: [
    RutaMenuAdministradorComponent,
    RutaLoginComponent,
    RegistroFormularioComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    MenuOpcionesAdministradorModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MenuAjustesModule,
    ConfiguracionesModule,
    AutoCompleteModule
    ],
  entryComponents: [
  ],
  providers: [LocalStorageService]

})
export class AdministradorModule {
}
