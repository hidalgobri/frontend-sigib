import { Component, OnInit } from '@angular/core';
import { CursoInterface } from 'src/app/interfaces/interfaces/curso.interface';
import { MatriculaInterface } from 'src/app/interfaces/interfaces/matricula.interface';
import { RegistroNotaInterface } from 'src/app/interfaces/interfaces/registro-nota.interface';
import { EstudianteInterface } from 'src/app/interfaces/interfaces/estudiante.interface';
import { NUMERO_FILAS_TABLAS } from 'src/app/constantes/numero-filas-tablas';
import { QueryParamsInterface } from 'src/app/interfaces/interfaces/query-params.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { MatDialog } from '@angular/material';
import { MatriculaRestService } from 'src/app/servicios/rest/servicios/matricula-rest.service';
import { LocalStorageService } from 'src/app/servicios/rest/servicios/local-storage';
import { EstudianteRestService } from 'src/app/servicios/rest/servicios/estudiante-rest.service';
import { CursoRestService } from 'src/app/servicios/rest/servicios/curso-rest.service';
import { UsuarioSistemaInterface } from 'src/app/interfaces/interfaces/usuario-sistema';
import { RegistroNotaRestService } from 'src/app/servicios/rest/servicios/registro-nota-rest.service';

@Component({
  selector: 'app-ruta-ver-curriculum',
  templateUrl: './ruta-ver-curriculum.component.html',
  styleUrls: ['./ruta-ver-curriculum.component.scss']
})
export class RutaVerCurriculumComponent implements OnInit {

  registroNotas: RegistroNotaInterface[];
  estudiante: EstudianteInterface;
  columnas = [
    { field: "notaPrimerQuimestre", header: "Nota Primer Quimestre", width: "20%" },
    { field: "notaSegundoQuimestre", header: "Nota Segundo Quimestre", width: "20%" },
    { field: "profesor", header: "Profesor", width: "20%" },
    { field: "materia", header: "Materia", width: "20%" },
    { field: "anio", header: "Año", width: "20%" },
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
    private readonly _toasterService: ToasterService,
    public dialogo: MatDialog,
    private readonly _localStorage: LocalStorageService,
    private readonly _estudianteService: EstudianteRestService,
    private readonly _registroNotasService: RegistroNotaRestService,
    
  ) {}

  ngOnInit() {}

  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.skip = event.first;
    this.buscar(this.queryParams.skip);
  }

  buscar(skip: number) {
    const cedulaEstudiante: UsuarioSistemaInterface =  JSON.parse(this._localStorage.obtenerDatosLocalStorage('usuario'));
    const profesorConsulta = {
      cedula: cedulaEstudiante.cedulaUsuario,
      skip,
      take: this.rows,
      order: { id: 'DESC' }
    };
    this._estudianteService.findAll(JSON.stringify(profesorConsulta))
      .subscribe(
        (estudiantes: [EstudianteInterface[], number]) => {
          console.log('Registros de notas de estudiantes carrera', estudiantes[0][0]);
          this.estudiante = estudiantes[0][0] as EstudianteInterface;
          if (this.estudiante) {
            const estudianteId = this.estudiante.id;
           // const estudianteId = 4;
            console.log('estudiante id', estudianteId);
            const consulta = {
              relations: ['estudiante', 'curso', 'curso.profesor', 'curso.materia'],
              where: {
                estudiante: {
                  id: estudianteId
                }
              },
              skip,
              take: this.rows,
              order: { id: 'DESC' }
            };
            this._registroNotasService.findAll(JSON.stringify(consulta)).subscribe(
              (respuesta: [RegistroNotaInterface[], number]) => {
                this.registroNotas  = respuesta[0];
                this.totalRecords = respuesta[1];
                console.log('datos de la base', this.registroNotas);
                this.loading = false;
              },
              error => {
                this.loading = false;
                console.error("Error en el servidor", error);
                this._toasterService.pop(
                  "error",
                  "Error",
                  "Error al cargar notas de la carrera"
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
        }, error => {
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

}
