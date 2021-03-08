import { Component, OnInit, Inject } from "@angular/core";
import { ProfesorInterface } from "src/app/interfaces/interfaces/profesor.interface";
import { ProfesorRestService } from "src/app/servicios/rest/servicios/profesor-rest.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { RutaGestionProfesoresComponent } from "../../rutas/ruta-gestion-profesores/ruta-gestion-profesores.component";
import { CargandoService } from "src/app/servicios/cargando-service/cargando-service";
import { ToasterService } from "angular2-toaster";
import { UsuarioRestService } from "src/app/servicios/rest/servicios/usuario-rest.service";
import { validarCedula } from 'src/app/funciones/validar-cedula';

@Component({
  selector: "app-crear-editar-profesor",
  templateUrl: "./crear-editar-profesor.component.html",
  styleUrls: ["./crear-editar-profesor.component.scss"]
})
export class CrearEditarProfesorComponent implements OnInit {
  crearEditarProfesor: ProfesorInterface;
  formularioValido;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { profesor: ProfesorInterface },
    public dialogo: MatDialogRef<RutaGestionProfesoresComponent>,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _profesorService: ProfesorRestService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
    private readonly _usuarioService: UsuarioRestService
  ) {}

  ngOnInit() {}

  validarFormulario(profesor) {
    if (profesor) {
      this.crearEditarProfesor = profesor;
      if (this.crearEditarProfesor.cedula) {
        try {
          const cedula = this.crearEditarProfesor.cedula;
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
    if (this.data.profesor) {
      this.crearEditarProfesor.id = this.data.profesor.id;
      this._profesorService
        .updateOne(this.data.profesor.id, this.crearEditarProfesor)
        .subscribe(
          async r => {
            this._cargandoService.deshabilitarCargando();
            this.dialogo.close(this.crearEditarProfesor);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
          }
        );
    } else {
      this.crearEditarProfesor.id = 1;
      this._usuarioService
        .create({
          cedula: this.crearEditarProfesor.cedula,
          contrasenia: "A" + this.crearEditarProfesor.cedula + "a-",
          rol: 2
        })
        .subscribe(
          r => {
            this.crearEditarProfesor.usuario = r.id;
            this._profesorService
              .create(this.crearEditarProfesor)
              .subscribe(
                respuesta => {
                  this._cargandoService.deshabilitarCargando();
                  this.dialogo.close(respuesta);
                },
                err => {
                  this._toasterService.pop(
                    "error",
                    "Error",
                    "Profesor ya registrado"
                  );
                  this._cargandoService.deshabilitarCargando();
                  console.error(err);
                }
              );
          },
          err => {
            this._toasterService.pop(
              "error",
              "Error",
              "Profesor ya registrado"
            );
            this._cargandoService.deshabilitarCargando();
            console.error(err);
          }
        );
    }
  }
}
