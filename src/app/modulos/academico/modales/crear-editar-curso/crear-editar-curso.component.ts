import { Component, OnInit, Inject } from "@angular/core";
import { CursoInterface } from "src/app/interfaces/interfaces/curso.interface";
import { RutaGestionCursosComponent } from "../../rutas/ruta-gestion-cursos/ruta-gestion-cursos.component";
import { CursoRestService } from "src/app/servicios/rest/servicios/curso-rest.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { CargandoService } from "src/app/servicios/cargando-service/cargando-service";
import { ToasterService } from "angular2-toaster";
import { toastErrorEditar } from "src/app/constantes/mensajes-toaster";
import { MateriaRestService } from "../../../../servicios/rest/servicios/materia-rest.service";
import { MateriaInterface } from "../../../../interfaces/interfaces/materia.interface";
import { CarreraInterface } from "../../../../interfaces/interfaces/carrera.interface";

@Component({
  selector: "app-crear-editar-curso",
  templateUrl: "./crear-editar-curso.component.html",
  styleUrls: ["./crear-editar-curso.component.scss"]
})
export class CrearEditarCursoComponent implements OnInit {
  crearEditarCurso: CursoInterface;
  formularioValido;
  idCarrera: number;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { curso: CursoInterface },
    public dialogo: MatDialogRef<RutaGestionCursosComponent>,
    private readonly _cargandoService: CargandoService,
    private readonly _cursoService: CursoRestService,
    private readonly _toasterService: ToasterService,
    private readonly _materiaService: MateriaRestService
  ) {}

  ngOnInit() {}

  validarFormulario(curso) {
    if (curso) {
      const consulta = {
        relations: ["carrera"],
        where: {
          id: curso.materia.id
        }
      };
      this._materiaService
        .findAll(JSON.stringify(consulta))
        .subscribe((respuesta: [MateriaInterface[], number]) => {
          console.log("respuesta para crear curso", respuesta[0][0]);
          const carreraId = respuesta[0][0].carrera as CarreraInterface;
          this.crearEditarCurso = {
            grupo: curso.grupo,
            horario: curso.horario,
            aula: curso.aula,
            numeroMaximoAlumnos: curso.numeroMaximoAlumnos,
            periodoAcademico: curso.periodoAcademico,
            profesor: curso.profesor,
            materia: curso.materia,
            idCarrera: carreraId.id
          };
          this.formularioValido = true;
        });
    } else {
      this.formularioValido = false;
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.curso) {
      this._cursoService
        .updateOne(this.data.curso.id, this.crearEditarCurso)
        .subscribe(
          async r => {
            this._cargandoService.deshabilitarCargando();
            const consulta = {
              relations: ["profesor", "materia"],
              where: {
                id: this.data.curso.id
              }
            };
            this._cursoService
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
      console.log(this.crearEditarCurso);
      this._cursoService.create(this.crearEditarCurso).subscribe(
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
