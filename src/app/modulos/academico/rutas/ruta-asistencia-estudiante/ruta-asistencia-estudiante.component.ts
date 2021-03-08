import { Component, OnInit } from "@angular/core";
import { CursoInterface } from "src/app/interfaces/interfaces/curso.interface";
import { ProfesorInterface } from "src/app/interfaces/interfaces/profesor.interface";
import { NUMERO_FILAS_TABLAS } from "src/app/constantes/numero-filas-tablas";
import { QueryParamsInterface } from "src/app/interfaces/interfaces/query-params.interface";
import { ActivatedRoute, Router } from "@angular/router";
import { CargandoService } from "src/app/servicios/cargando-service/cargando-service";
import { ToasterService } from "angular2-toaster";
import { MatDialog } from "@angular/material";
import { LocalStorageService } from "src/app/servicios/rest/servicios/local-storage";
import { ProfesorRestService } from "src/app/servicios/rest/servicios/profesor-rest.service";
import { CursoRestService } from "src/app/servicios/rest/servicios/curso-rest.service";
import { MatriculaRestService } from "src/app/servicios/rest/servicios/matricula-rest.service";
import { UsuarioSistemaInterface } from "src/app/interfaces/interfaces/usuario-sistema";

@Component({
  selector: "app-ruta-asistencia-estudiante",
  templateUrl: "./ruta-asistencia-estudiante.component.html",
  styleUrls: ["./ruta-asistencia-estudiante.component.scss"]
})
export class RutaAsistenciaEstudianteComponent implements OnInit {
  cursos: CursoInterface[];
  profesor: ProfesorInterface;

  columnas = [
    { field: "id", header: "Código", width: "10%" },
    { field: "grupo", header: "Grupo", width: "10%" },
    { field: "horario", header: "Horario", width: "15%" },
    { field: "aula", header: "Aula", width: "10%" },
    { field: "materia", header: "Materia", width: "20%" },
    { field: "acciones", header: "Acciones", width: "20%" }
  ];

  rows = NUMERO_FILAS_TABLAS;

  totalRecords: number;
  loading: boolean;
  queryParams: QueryParamsInterface = {};
  busqueda = "";
  ruta = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _cargandoService: CargandoService,
    private readonly _toasterService: ToasterService,
    public dialogo: MatDialog,
    private readonly _localStorage: LocalStorageService,
    private readonly _profesorService: ProfesorRestService,
    private readonly _cursoService: CursoRestService,
    private readonly _matriculaService: MatriculaRestService
  ) {}

  ngOnInit() {}

  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.skip = event.first;
    this.buscar(this.queryParams.skip);
  }

  buscar(skip: number) {
    const cedulaEstudiante: UsuarioSistemaInterface = JSON.parse(
      this._localStorage.obtenerDatosLocalStorage("usuario")
    );
    const profesorConsulta = {
      where: {
        cedula: cedulaEstudiante.cedulaUsuario
      },
      skip,
      take: this.rows,
      order: { id: "DESC" }
    };
    this._profesorService.findAll(JSON.stringify(profesorConsulta)).subscribe(
      (profesores: [ProfesorInterface[], number]) => {
        this.profesor = profesores[0][0] as ProfesorInterface;
        if (this.profesor) {
          const profesorId = +this.profesor.id;
          const consulta = {
            relations: ["profesor", "materia"],
            where: {
              profesor: {
                id: profesorId
              }
            },
            skip,
            take: this.rows,
            order: { id: "DESC" }
          };
          this._cursoService.findAll(JSON.stringify(consulta)).subscribe(
            (respuesta: [CursoInterface[], number]) => {
              this.cursos = respuesta[0];
              this.totalRecords = respuesta[1];
              console.log("datos de la base", this.cursos);
              this.loading = false;
            },
            error => {
              this.loading = false;
              console.error("Error en el servidor", error);
              this._toasterService.pop(
                "error",
                "Error",
                "Error al cargar materias de la carrera"
              );
            }
          );
        } else {
          this.loading = false;
          this._toasterService.pop(
            "warning",
            "",
            "No existen cursos creado para la carrera"
          );
        }
      },
      error => {
        this.loading = false;
        console.error("Error en el servidor", error);
        this._toasterService.pop(
          "warning",
          "",
          "No existen cursos creado para la carrera"
        );
      }
    );
  }

  irMenuAsistencia(idCurso: number) {
    const url = [
      "administrador",
      "menu",
      "academico",
      "menu-academico",
      "profesores",
      "asistencia-estudiante",
      idCurso,
      "asistencia"
    ];
    this._router.navigate(url);
  }
}
