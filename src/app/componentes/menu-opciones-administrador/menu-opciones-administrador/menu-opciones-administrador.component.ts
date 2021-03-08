import { Component, OnInit } from '@angular/core';
import {OPCIONES_MENU_ADMINISTRADOR} from '../../../constantes/opciones-menu-administrador';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/servicios/rest/servicios/local-storage';

@Component({
  selector: 'app-menu-opciones-administrador',
  templateUrl: './menu-opciones-administrador.component.html',
  styleUrls: ['./menu-opciones-administrador.component.scss']
})
export class MenuOpcionesAdministradorComponent implements OnInit {

  opcionesMenuAdministrador = OPCIONES_MENU_ADMINISTRADOR;
  esEstudiante = false;
  esProfesor = false;
  esAdmin = true;
  rol;
  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _localStorageService: LocalStorageService,


  ) { }

  ngOnInit() {
    this._activatedRoute
      .queryParams
      .subscribe(
        params => {
          if(params.rol === 'Estudiante'){
            const url = ['/administrador','menu','academico','menu-academico','estudiantes'];
            return this._router.navigate(url);
          }else {
            if(params.rol === 'Administrador'){
              const rol = JSON.parse(this._localStorageService.obtenerDatosLocalStorage('usuario')).rol;
              if(rol === 'Administrador'){
                this.esAdmin = true;
              }
            }else{
              if(params.rol === 'Profesor'){
                const url = ['/administrador','menu','academico','menu-academico','profesores'];
                return this._router.navigate(url);
              }
            }
          }
        }
      );
  }

}
