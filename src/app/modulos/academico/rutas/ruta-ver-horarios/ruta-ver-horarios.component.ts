import { Component, OnInit } from '@angular/core';
import { NUMERO_FILAS_TABLAS } from 'src/app/constantes/numero-filas-tablas';
import { QueryParamsInterface } from 'src/app/interfaces/interfaces/query-params.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { MatDialog } from '@angular/material';
import { MatriculaRestService } from 'src/app/servicios/rest/servicios/matricula-rest.service';
import { MatriculaInterface } from 'src/app/interfaces/interfaces/matricula.interface';
import { CursoInterface } from 'src/app/interfaces/interfaces/curso.interface';
import { EstudianteInterface } from 'src/app/interfaces/interfaces/estudiante.interface';
import { LocalStorageService } from 'src/app/servicios/rest/servicios/local-storage';
import { EstudianteRestService } from 'src/app/servicios/rest/servicios/estudiante-rest.service';
import { CursoRestService } from 'src/app/servicios/rest/servicios/curso-rest.service';
import { UsuarioSistemaInterface } from 'src/app/interfaces/interfaces/usuario-sistema';
import * as xlsx from 'xlsx';
import * as FileSaver from 'file-saver';
import {ReportesHorarioInterface} from '../../../../interfaces/interfaces/reportesHorario.interface';
import {validarCedula} from '../../../../funciones/validar-cedula';
import {ProfesorInterface} from '../../../../interfaces/interfaces/profesor.interface';
import {MateriaInterface} from '../../../../interfaces/interfaces/materia.interface';

@Component({
  selector: 'app-ruta-ver-horarios',
  templateUrl: './ruta-ver-horarios.component.html',
  styleUrls: ['./ruta-ver-horarios.component.scss']
})
export class RutaVerHorariosComponent implements OnInit {

  cursos: CursoInterface[];
  matriculas: MatriculaInterface[];
  estudiante: EstudianteInterface;
  reportesHorario: ReportesHorarioInterface[];
  columnas = [
    { field: "horario", header: "Horario", width: "20%" },
    { field: "grupo", header: "Grupo", width: "10%" },
    { field: "aula", header: "Aula", width: "20%" },
    { field: "profesor", header: "Profesor", width: "20%" },
    { field: "materia", header: "Materia", width: "20%" },
    { field: "anio", header: "Año", width: "10%" },
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
    private readonly _matriculaService: MatriculaRestService,
    private readonly _localStorage: LocalStorageService,
    private readonly _estudianteService: EstudianteRestService,
    private readonly _cursoService: CursoRestService,
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
          console.log('matriculas de estudiante con esa carrera', estudiantes[0][0]);
          this.estudiante = estudiantes[0][0] as EstudianteInterface;
          if (this.estudiante) {
            const estudianteId = this.estudiante.id;
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
            this._matriculaService.findAll(JSON.stringify(consulta)).subscribe(
              (respuesta: [MatriculaInterface[], number]) => {
                this.matriculas  = respuesta[0];
                this.totalRecords = respuesta[1];
                console.log('datos de la base', this.matriculas);
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

  exportExcel() {
    if (this.matriculas) {
      this.reportesHorario = this.matriculas.map( value => {
          return {
            horario: (value.curso as CursoInterface ).horario,
            grupo: (value.curso as CursoInterface ).grupo,
            aula: (value.curso as CursoInterface ).aula,
            // tslint:disable-next-line:max-line-length
            profesor: ((value.curso as CursoInterface ).profesor as ProfesorInterface).nombre + ' ' + ((value.curso as CursoInterface ).profesor as ProfesorInterface).apellido,
            materia: ((value.curso as CursoInterface ).materia as MateriaInterface).nombre,
            año: ((value.curso as CursoInterface ).materia as MateriaInterface).anio,
          };
        }
      );
      const worksheet = xlsx.utils.json_to_sheet(this.reportesHorario);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'horario-estudiante');
      this._toasterService.pop(
        'success',
        "",
        "Reporte horario generado exitosamente"
      );
    } else {
      this._toasterService.pop(
        'error',
        "Error",
        "No existen registros"
      );
    }
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
