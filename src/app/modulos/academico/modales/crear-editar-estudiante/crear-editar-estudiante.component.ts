import { Component, OnInit, Inject } from '@angular/core';
import { EstudianteInterface } from 'src/app/interfaces/interfaces/estudiante.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RutaGestionEstudiantesComponent } from '../../rutas/ruta-gestion-estudiantes/ruta-gestion-estudiantes.component';
import { CargandoService } from 'src/app/servicios/cargando-service/cargando-service';
import { EstudianteRestService } from 'src/app/servicios/rest/servicios/estudiante-rest.service';
import { ToasterService } from 'angular2-toaster';
import {validarCedula} from '../../../../funciones/validar-cedula';
import {UsuarioRestService} from '../../../../servicios/rest/servicios/usuario-rest.service';

@Component({
  selector: 'app-crear-editar-estudiante',
  templateUrl: './crear-editar-estudiante.component.html',
  styleUrls: ['./crear-editar-estudiante.component.scss']
})
export class CrearEditarEstudianteComponent implements OnInit {

  crearEditarEstudiante: EstudianteInterface;
  formularioValido;
  estudiante: EstudianteInterface;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {estudiante: EstudianteInterface},
    public dialogo: MatDialogRef<RutaGestionEstudiantesComponent>,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _estudianteService: EstudianteRestService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
    private readonly _usuarioService: UsuarioRestService
  ) {
  }

  ngOnInit() {
  }
  validarFormulario(estudiante) {
    if (estudiante) {
      this.crearEditarEstudiante = estudiante;
      if (this.crearEditarEstudiante.cedula) {
        try {
          const cedula = this.crearEditarEstudiante.cedula;
          const respuestaValidarCedula = validarCedula(cedula);
          if (respuestaValidarCedula) {
            this.formularioValido = true;
          } else {
            this.formularioValido = false;
          }
        } catch (e) {
          this.formularioValido = false;
        }
      }
    } else {
      this.formularioValido = false;
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.estudiante) {
      this.crearEditarEstudiante.carrera = 1;
      this.crearEditarEstudiante.codigo = this.data.estudiante.codigo;
      this._estudianteService
        .updateOne(this.data.estudiante.id, this.crearEditarEstudiante)
        .subscribe(
          async r => {
            this._cargandoService.deshabilitarCargando();
            this.dialogo.close(this.crearEditarEstudiante);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
          },
        );
    } else {
      this.crearEditarEstudiante.carrera = 1;
      this.crearEditarEstudiante.codigo = '0001';
      this._usuarioService
        .create({
          cedula: this.crearEditarEstudiante.cedula,
          contrasenia: 'A' + this.crearEditarEstudiante.cedula + 'a-',
          rol: 2
        }).subscribe(
        r => {
          this.crearEditarEstudiante.usuario = r.id;
          this._estudianteService.create(
            this.crearEditarEstudiante
          ).subscribe(
            respuesta => {
              this._cargandoService.deshabilitarCargando();
              this.dialogo.close(respuesta);
            },
            err => {
              this._toasterService.pop('error', 'Error', 'Estudiante ya registrado');
              this._cargandoService.deshabilitarCargando();
              console.error(err);
            },
          );
        },
        err => {
          this._toasterService.pop('error', 'Error', 'Estudiante ya registrado');
          this._cargandoService.deshabilitarCargando();
          console.error(err);
        },
      );
    }
  }

}
