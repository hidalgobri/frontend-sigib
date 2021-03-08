import { Component, OnInit } from "@angular/core";
import { CursoInterface } from "src/app/interfaces/interfaces/curso.interface";
import { NUMERO_FILAS_TABLAS } from "src/app/constantes/numero-filas-tablas";
import { QueryParamsInterface } from "src/app/interfaces/interfaces/query-params.interface";
import { ActivatedRoute, Router } from "@angular/router";
import { CargandoService } from "src/app/servicios/cargando-service/cargando-service";
import { ToasterService } from "angular2-toaster";
import { MatDialog } from "@angular/material";
import { CursoRestService } from "src/app/servicios/rest/servicios/curso-rest.service";
import { CrearEditarCursoComponent } from '../../modales/crear-editar-curso/crear-editar-curso.component';
import {MateriaInterface} from '../../../../interfaces/interfaces/materia.interface';
import {ProfesorInterface} from '../../../../interfaces/interfaces/profesor.interface';

@Component({
  selector: "app-ruta-gestion-cursos",
  templateUrl: "./ruta-gestion-cursos.component.html",
  styleUrls: ["./ruta-gestion-cursos.component.scss"]
})
export class RutaGestionCursosComponent implements OnInit {
  cursos: CursoInterface[];
  materias: MateriaInterface[];
  profesores: ProfesorInterface[];
  columnas = [
    { field: "id", header: "Código", width: "10%" },
    { field: "grupo", header: "Grupo", width: "20%" },
    { field: "horario", header: "Horario", width: "10%" },
    { field: "aula", header: "Aula", width: "10%" },
    { field: "numeroMaximoAlumnos", header: "Alumnos", width: "10%" },
    { field: "periodoAcademico", header: "Período Académico", width: "10%" },
    { field: "profesor", header: "Profesor", width: "20%" },
    { field: "materia", header: "Materia", width: "20%" },
    { field: "acciones", header: "Acciones", width: "10%" }
  ];

  rows = NUMERO_FILAS_TABLAS;

  totalRecords: number;
  loading: boolean;
  queryParams: QueryParamsInterface = {};
  busqueda = "";
  ruta = [];
  nombreProfesor = "";
  nombreMateria = "";

  constructor(
    private _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _cargandoService: CargandoService,
    private readonly _toasterService: ToasterService,
    public dialogo: MatDialog,
    private readonly _cursoService: CursoRestService
  ) {}

  ngOnInit() {}

  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.skip = event.first;
    this.buscar(this.queryParams.skip);
  }

  buscar(skip: number) {
    const consulta = {
      relations: ['profesor', 'materia'],
      skip,
      take: this.rows,
      order: { id: 'DESC' }
    };
    this._cursoService.findAll(JSON.stringify(consulta)).subscribe(
      (respuesta: [CursoInterface[], number]) => {
        this.cursos = respuesta[0];
        this.totalRecords = respuesta[1];
        console.log('datos de la base', this.cursos);
        this.loading = false;
        this._router.navigate(this.ruta, {
          queryParams: {
            skip: this.queryParams.skip,
            where: JSON.stringify(this.queryParams.where)
          }
        });
      },
      error => {
        this.loading = false;
        console.error("Error en el servidor", error);
        this._toasterService.pop(
          "error",
          "Error",
          "Error al cargar cursos"
        );
      }
    );
  }

  abrirDialogo(cursoSeleccionado?): void {
    const dialogRef = this.dialogo.open(CrearEditarCursoComponent, {
      data: { curso: cursoSeleccionado }
    });
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe((registroCreado: CursoInterface) => {
      if (registroCreado) {
        if (cursoSeleccionado) {
          const indiceRegistro = this.cursos.indexOf(cursoSeleccionado);
          this.cursos[indiceRegistro] = registroCreado;
          this._toasterService.pop(
            "success",
            "",
            "Curso actualizado exitosamente"
          );
          this.cursos[indiceRegistro] = registroCreado;
        } else {
          this._toasterService.pop({
            type: "success",
            body: "Curso registrado exitosamente",
            timeout: 1000
          });
          this.cursos.unshift(registroCreado);
        }
      }
    });
  }
}
