import { Component, OnInit, Inject } from "@angular/core";
import { GradoInterface } from "src/app/interfaces/interfaces/grado.interface";
import { EstudianteInterface } from "src/app/interfaces/interfaces/estudiante.interface";
import { RutaGestionArchivoComponent } from "../../rutas/ruta-gestion-archivo/ruta-gestion-archivo.component";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { CargandoService } from "src/app/servicios/cargando-service/cargando-service";
import { ToasterService } from "angular2-toaster";
import { GradoRestService } from 'src/app/servicios/rest/servicios/grado-rest.service';
import { toastErrorEditar } from 'src/app/constantes/mensajes-toaster';

@Component({
  selector: "app-crear-editar-grado",
  templateUrl: "./crear-editar-grado.component.html",
  styleUrls: ["./crear-editar-grado.component.scss"]
})
export class CrearEditarGradoComponent implements OnInit {
  crearEditarGrado: GradoInterface;
  formularioValido;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { grado: GradoInterface; estudiante: EstudianteInterface },
    public dialogo: MatDialogRef<RutaGestionArchivoComponent>,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _gradoService: GradoRestService,
    // tslint:disable-next-line: variable-name
    private readonly _toasterService: ToasterService
  ) {}

  ngOnInit() {}

  validarFormulario(grado) {
    if (grado) {
      this.crearEditarGrado = {
        notaCurriculum: grado.notaCurriculum,
        notaProyecto: grado.notaProyecto,
        notaGrado: grado.notaGrado,
        estudiante: grado.estudiante
      };
      this.formularioValido = true;
    } else {
      this.formularioValido = false;
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.grado) {
      this._gradoService
        .updateOne(this.data.grado.id, this.crearEditarGrado)
        .subscribe(
          r => {
            this._cargandoService.deshabilitarCargando();
            const consulta = {
              where: {
                id: this.data.grado.id
              }
            };
            this._gradoService
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
      this.crearEditarGrado.estudiante = this.data.estudiante.id;
      this._gradoService.create(this.crearEditarGrado).subscribe(
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
