import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  Inject
} from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ToasterService } from "angular2-toaster";
import { debounceTime } from "rxjs/operators";
import { generarMensajesError } from "src/app/funciones/generar-mensajes-error";
import { MateriaInterface } from "src/app/interfaces/interfaces/materia.interface";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { CargandoService } from "src/app/servicios/cargando-service/cargando-service";
import {
  toastExitoEditar,
  toastErrorEditar,
  toastExitoCrear
} from "src/app/constantes/mensajes-toaster";
import { RutaGestionMateriasCarreraComponent } from "../../rutas/ruta-gestion-materias-carrera/ruta-gestion-materias-carrera.component";
import { MateriaRestService } from "src/app/servicios/rest/servicios/materia-rest.service";
import { CarreraInterface } from "src/app/interfaces/interfaces/carrera.interface";

@Component({
  selector: "app-crear-editar-materias-carrera",
  templateUrl: "./crear-editar-materias-carrera.component.html",
  styleUrls: ["./crear-editar-materias-carrera.component.scss"]
})
export class CrearEditarMateriasCarreraComponent implements OnInit {
  crearEditarMateria: MateriaInterface;
  formularioValido;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { materia: MateriaInterface; carrera: CarreraInterface },
    public dialogo: MatDialogRef<RutaGestionMateriasCarreraComponent>,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _materiaService: MateriaRestService,
    // tslint:disable-next-line: variable-name
    private readonly _toasterService: ToasterService
  ) {}

  ngOnInit() {}

  validarFormulario(materia) {
    if (materia) {
      this.crearEditarMateria = {
        anio: materia.anio,
        tipoMateria: materia.tipo,
        carrera: materia.carrera,
        codigo: materia.codigo,
        nombre: materia.nombre
      };
      this.formularioValido = true;
    } else {
      this.formularioValido = false;
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.materia) {
      this._materiaService
        .updateOne(this.data.materia.id, this.crearEditarMateria)
        .subscribe(
          r => {
            this._cargandoService.deshabilitarCargando();
            const consulta = {
              where: {
                id: this.data.materia.id
              }
            };
            this._materiaService
              .findAll(JSON.stringify(consulta))
              .subscribe(res => {
                const primerElemento = res[0][0];
                this.dialogo.close(primerElemento);
              });
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
            this._toasterService.pop(toastErrorEditar);
          }
        );
    } else {
      this.crearEditarMateria.carrera = this.data.carrera.id;
      this.crearEditarMateria.codigo =
        this.crearEditarMateria.tipoMateria[0] +
        this.crearEditarMateria.anio[0];
      console.log("sadfsdfdfadsf", this.crearEditarMateria);
      this._materiaService.create(this.crearEditarMateria).subscribe(
        r => {
          this._cargandoService.deshabilitarCargando();
          this.dialogo.close(r);
        },
        err => {
          this._cargandoService.deshabilitarCargando();
          console.error(err);
        }
      );
    }
  }
}
