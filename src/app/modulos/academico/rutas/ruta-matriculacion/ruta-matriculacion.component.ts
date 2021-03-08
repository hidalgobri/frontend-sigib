import { Component, OnInit } from '@angular/core';
import {CursoInterface} from '../../../../interfaces/interfaces/curso.interface';
import {MateriaInterface} from '../../../../interfaces/interfaces/materia.interface';
import {ProfesorInterface} from '../../../../interfaces/interfaces/profesor.interface';
import {NUMERO_FILAS_TABLAS} from '../../../../constantes/numero-filas-tablas';
import {QueryParamsInterface} from '../../../../interfaces/interfaces/query-params.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {CargandoService} from '../../../../servicios/cargando-service/cargando-service';
import {ToasterService} from 'angular2-toaster';
import {MatDialog} from '@angular/material';
import {CursoRestService} from '../../../../servicios/rest/servicios/curso-rest.service';
import {LocalStorageService} from '../../../../servicios/rest/servicios/local-storage';
import {UsuarioSistemaInterface} from '../../../../interfaces/interfaces/usuario-sistema';
import {EstudianteRestService} from '../../../../servicios/rest/servicios/estudiante-rest.service';
import {EstudianteInterface} from '../../../../interfaces/interfaces/estudiante.interface';
import {CarreraInterface} from '../../../../interfaces/interfaces/carrera.interface';
import {MatriculaRestService} from '../../../../servicios/rest/servicios/matricula-rest.service';
import {RegistroNotaRestService} from '../../../../servicios/rest/servicios/registro-nota-rest.service';
import {RegistroAsistenciaRestService} from '../../../../servicios/rest/servicios/registro-asistencia-rest.service';
import {RegistroNotaInterface} from '../../../../interfaces/interfaces/registro-nota.interface';
import {RegistroAsistenciaInterface} from '../../../../interfaces/interfaces/registro-asistencia.interface';

@Component({
  selector: 'app-ruta-matriculacion',
  templateUrl: './ruta-matriculacion.component.html',
  styleUrls: ['./ruta-matriculacion.component.scss']
})
export class RutaMatriculacionComponent implements OnInit {
  cursos: CursoInterface[];
  cursosIncritos: CursoInterface[] = [];
  materias: MateriaInterface[];
  profesores: ProfesorInterface[];
  estudiante: EstudianteInterface;
  columnas = [
    { field: "id", header: "Código", width: "10%" },
    { field: "grupo", header: "Grupo", width: "10%" },
    { field: "horario", header: "Horario", width: "15%" },
    { field: "aula", header: "Aula", width: "10%" },
    { field: "numeroMaximoAlumnos", header: "Alumnos", width: "10%" },
    { field: "profesor", header: "Profesor", width: "20%" },
    { field: "materia", header: "Materia", width: "20%" },
    { field: "acciones", header: "Acciones", width: "20%" }
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
    private readonly _localStorage: LocalStorageService,
    private readonly _estudianteService: EstudianteRestService,
    private readonly _cursoService: CursoRestService,
    private readonly _matriculaService: MatriculaRestService,
    private readonly _registroNotaService: RegistroNotaRestService,
    private readonly _registroAsistenciaService: RegistroAsistenciaRestService,
  ) {}

  ngOnInit() {}

  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.skip = event.first;
    this.buscar(this.queryParams.skip);
  }

  buscar(skip: number) {

    const cedulaEstudiante: UsuarioSistemaInterface =  JSON.parse(this._localStorage.obtenerDatosLocalStorage('usuario'));
    const estudianteConsulta = {
      relations: ['carrera', 'usuario'],
      where: {
        cedula: cedulaEstudiante.cedulaUsuario,
      },
      skip,
      take: this.rows,
      order: { id: 'DESC' }
    };
    this._estudianteService.findAll(JSON.stringify(estudianteConsulta))
      .subscribe(
        (estudiantes: [EstudianteInterface[], number]) => {
          console.log('estudiantes de estudiante con esa carrera', estudiantes[0][0]);
          this.estudiante = estudiantes[0][0] as EstudianteInterface;
          if (this.estudiante) {
            const carreraId =  +(this.estudiante.carrera as CarreraInterface ).id;
            console.log('carrera id', carreraId);
            const consulta = {
              relations: ['profesor', 'materia'],
              where: {
                idCarrera: carreraId
              },
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

  abrirDialogo(cursoSeleccionado): void {
    if (cursoSeleccionado) {
      this._toasterService.pop({
        type: "success",
        body: "Curso registrado exitosamente",
        timeout: 10000
      });
      this.cursosIncritos.unshift(cursoSeleccionado);
      const i = this.cursos.indexOf(cursoSeleccionado);
      if ( i !== -1 ) {
        this.cursos.splice( i, 1 );
      }
    } else {
    }
  }

  eliminarItemDeArray(item ) {
    const i = this.cursosIncritos.indexOf( item );
    if ( i !== -1 ) {
      this.cursosIncritos.splice( i, 1 );
      this._toasterService.pop({
        type: "warning",
        body: "Curso eliminado",
        timeout: 10000,
      });
    }
    this.cursos.unshift(item);
  }

  finalizarMatricula() {
    if (this.cursosIncritos.length > 0) {
      for (const curso of this.cursosIncritos) {
        this._matriculaService.create({
          estudiante: this.estudiante.id,
          curso: curso.id
        }).subscribe(
          r => {
            const registroNota: RegistroNotaInterface = {
              notaPrimerQuimestre: 0,
              notaSegundoQuimestre: 0,
              estudiante: this.estudiante.id,
              curso: curso.id
            };
            this._registroNotaService.create(registroNota).subscribe(
              r2 => {
                const registroAsistencia: RegistroAsistenciaInterface = {
                  estudiante: this.estudiante.id,
                  curso: curso.id,
                  horasAsistidas: 0,
                };
                this._registroAsistenciaService.create(registroAsistencia).subscribe(
                  r3 => {
                    console.log('registros creados', {
                      matricula: r,
                      notas: r2,
                      asistencia: r3
                    });
                    this._toasterService.pop({
                      type: "success",
                      body: "Matrícula registrada exitosamente",
                      timeout: 10000
                    });
                  }
                );
              }
            );
          },
          error => {
            this._toasterService.pop({
              type: "error",
              body: "Matricula ya registrada",
              timeout: 10000,
            });
          }
        );
      }
        } else {
      this._cargandoService.deshabilitarCargando();
      this._toasterService.pop({
        type: "error",
        body: "No se ha seleccionado ningun elemento",
        timeout: 10000,
      });

    }
  }
}
