import {Component, Input, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import { LocalStorageService } from 'src/app/servicios/rest/servicios/local-storage';
import {UsuarioRestService} from '../../../../servicios/rest/servicios/usuario-rest.service';
import {CargandoService} from '../../../../servicios/cargando-service/cargando-service';

@Component({
  selector: 'app-ingresar-juego',
  templateUrl: './ruta-login.component.html',
  styleUrls: ['./ruta-login.component.scss']
})
export class RutaLoginComponent implements OnInit {

  datosUsuario;


  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _cookieService: CookieService,
    // tslint:disable-next-line:variable-name
    private readonly _router: Router,
    // tslint:disable-next-line:variable-name
    private readonly _activatedRoute: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
    private readonly _localStorageService: LocalStorageService,
    private readonly _usuarioService: UsuarioRestService,
    private readonly _cargandoService: CargandoService,

  ) {
  }

  ngOnInit() {
  }

  unirseARoom(participante) {

  }
  formularioValido(evento) {
    this.datosUsuario = evento;
    console.log('usuario', this.datosUsuario);
  }

  irARutaMenu() {
    if (this.datosUsuario) {
      this._cargandoService.habilitarCargando();
      const consulta = {
        where: {
          cedula: this.datosUsuario.cedula,
        }
      };
      this._usuarioService.findAll(JSON.stringify(consulta)).subscribe(
        respuesta => {
          if(respuesta[0][0]){
            console.log('respuesta', respuesta[0][0]);
            const datosLocalStorage = {
              cedulaUsuario: this.datosUsuario.cedula,
              rol: this.datosUsuario.rol
            };
            this._localStorageService
              .guardarEnLocalStorage(
                'usuario',
                datosLocalStorage
              );
            const url = ['/administrador', 'menu'];
            this._router
              .navigate(
                url,
                {
                  queryParams:{
                    cedula: this.datosUsuario.cedula,
                    rol: this.datosUsuario.rol
                  }
                });
            this._cargandoService.deshabilitarCargando();
          } else {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop('error', 'Error', 'Usuario no registrado', );
          }
        }, error => {
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop('error', 'Error', 'Usuario no registrado', );
        }
      );
    }
  }
}
