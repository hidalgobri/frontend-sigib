import { Component, OnInit, Inject } from '@angular/core';
import { CarreraInterface } from 'src/app/interfaces/interfaces/carrera.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RutaGestionCarrerasComponent } from '../../rutas/ruta-gestion-carreras/ruta-gestion-carreras.component';
import { CargandoService } from 'src/app/servicios/cargando-service/cargando-service';
import { ToasterService } from 'angular2-toaster';
import { CarreraRestService } from 'src/app/servicios/rest/servicios/carrrera-rest.service';

@Component({
  selector: 'app-crear-editar-carrera',
  templateUrl: './crear-editar-carrera.component.html',
  styleUrls: ['./crear-editar-carrera.component.scss']
})
export class CrearEditarCarreraComponent implements OnInit {

 crearEditarCarrera: CarreraInterface;
  formularioValido;
  carrera: CarreraInterface;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {carrera: CarreraInterface},
    public dialogo: MatDialogRef<RutaGestionCarrerasComponent>,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
    private readonly _carreraService:CarreraRestService,

  ) {
  }

  ngOnInit() {
  }
  validarFormulario(usuario) {
    if (usuario) {
      this.crearEditarCarrera = usuario;
      this.formularioValido = true;
    } else {
      this.formularioValido = false;
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.carrera) {
      this.crearEditarCarrera.codigo = this.crearEditarCarrera.nombre[0] + '1' ;
      console.log('registro a actualizarce', this.crearEditarCarrera)
      this._carreraService
        .updateOne(this.data.carrera.id, this.crearEditarCarrera)
        .subscribe(
          async r => {
            this._cargandoService.deshabilitarCargando();
            this.dialogo.close(this.crearEditarCarrera);
          },
          err => {
            this._toasterService.pop('error', 'Error', 'carrera ya registrado');
            this._cargandoService.deshabilitarCargando();
            console.error(err);
          },
        );
    } else {
      this.crearEditarCarrera.codigo = this.crearEditarCarrera.nombre[0] + '1' ;
      console.log('registro a crearse', this.crearEditarCarrera)
      this._carreraService
        .create(this.crearEditarCarrera)
        .subscribe(
          r => {
            this._cargandoService.deshabilitarCargando();
            this.dialogo.close(r);
          },
          err => {
            this._toasterService.pop('error', 'Error', 'carrera ya registrado');
            this._cargandoService.deshabilitarCargando();
            console.error(err);
          },
        );
    }
  }
}
