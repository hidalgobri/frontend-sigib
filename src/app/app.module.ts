import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ToasterModule} from 'angular2-toaster';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BlockUIModule} from 'primeng/blockui';
import {RutaInicioComponent} from './rutas/ruta-inicio/ruta-inicio.component';
import {RutaNoEncontradaComponent} from './rutas/ruta-no-encontrada/ruta-no-encontrada.component';
import {MenuOpcionesInicioModule} from './componentes/menu-opciones-inicio/menu-opciones-inicio.module';
import {HeaderModule} from './componentes/header/header.module';
import {FooterModule} from './componentes/footer/footer.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, MatInputModule} from '@angular/material';
import {TextMaskModule} from 'angular2-text-mask';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {AdministradorModule} from './modulos/administrador/administrador.module';
import {JugadorGuard} from './servicios/guard/jugador.guard';
import {AdministradorGuard} from './servicios/guard/administrador.guard';
import { UsuarioRestService } from './servicios/rest/servicios/usuario-rest.service';
import { RutaGestionInformacionComponent } from './modulos/informacion/rutas/ruta-gestion-informacion/ruta-gestion-informacion.component';
import { FilterPipe } from './pipes/filter.pipe';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    RutaInicioComponent,
    RutaNoEncontradaComponent,
    AppComponent,
    RutaNoEncontradaComponent,
    RutaGestionInformacionComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    CommonModule,
    RouterModule,
    AppRoutingModule,
    BlockUIModule,
    ToasterModule.forRoot(),
    BrowserAnimationsModule,
    MenuOpcionesInicioModule,
    HeaderModule,
    FooterModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    TextMaskModule,
    AdministradorModule,
  ],
  providers: [
    UsuarioRestService,
    CookieService,
    JugadorGuard,
    AdministradorGuard,
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}

