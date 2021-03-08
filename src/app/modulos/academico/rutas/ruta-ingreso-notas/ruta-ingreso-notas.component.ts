import { Component, OnInit } from '@angular/core';
import {NUMERO_FILAS_TABLAS} from '../../../../constantes/numero-filas-tablas';
import {QueryParamsInterface} from '../../../../interfaces/interfaces/query-params.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {CargandoService} from '../../../../servicios/cargando-service/cargando-service';
import {ToasterService} from 'angular2-toaster';
import {MatDialog} from '@angular/material';
import {CursoInterface} from '../../../../interfaces/interfaces/curso.interface';
import {CursoRestService} from '../../../../servicios/rest/servicios/curso-rest.service';
import {EstudianteRestService} from '../../../../servicios/rest/servicios/estudiante-rest.service';
import {RegistroNotaRestService} from '../../../../servicios/rest/servicios/registro-nota-rest.service';
import {MatriculaRestService} from '../../../../servicios/rest/servicios/matricula-rest.service';
import {EstudianteInterface} from '../../../../interfaces/interfaces/estudiante.interface';
import {FormControl} from '@angular/forms';
import {VALIDACION_NOTA} from '../../../../constantes/validaciones-formulario/validacion-input';
import {debounceTime} from 'rxjs/operators';
import {RegistroNotaInterface} from '../../../../interfaces/interfaces/registro-nota.interface';
import {NotasTablaInterface} from '../../../../interfaces/interfaces/notas-tabla.interface';
import {MatriculaInterface} from '../../../../interfaces/interfaces/matricula.interface';

@Component({
  selector: 'app-ruta-ingreso-notas',
  templateUrl: './ruta-ingreso-notas.component.html',
  styleUrls: ['./ruta-ingreso-notas.component.scss']
})
export class RutaIngresoNotasComponent implements OnInit {

  idCurso: number;
  padre: CursoInterface;
  notas: NotasTablaInterface[];
  columnas = [
    {field: 'cedula', header: 'Cédula', width: '10%'},
    {field: 'nombre', header: 'Nombre', width: '20%'},
    {field: 'notaPrimerQuimestre', header: 'Nota 1 Quimestre ', width: '20%'},
    {field: 'notaSegundoQuimestre', header: 'Nota 2 Quimestre', width: '20%'},
    {field: 'acciones', header: 'Acciones', width: '20%'},
  ];
  rows = NUMERO_FILAS_TABLAS;
  totalRecords: number;
  loading: boolean;
  queryParams: QueryParamsInterface = {};
  busqueda = '';
  ruta = [];
  nombreCurso = '';
  clonedNotas: { [s: string]: NotasTablaInterface; } = {};
  constructor(
    private _activatedRoute: ActivatedRoute,
    private readonly  _router: Router,
    private readonly _cargandoService: CargandoService,
    private readonly _toasterService: ToasterService,
    private readonly _cursoService: CursoRestService,
    private readonly _estudianteService: EstudianteRestService,
    private readonly _registroNotaService: RegistroNotaRestService,
    public dialogo: MatDialog,
  ) {}

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(param => {
      console.log('respuesta', param.get('id'));
      this.idCurso = +param.get('id');
      this._cursoService
        .findOne(this.idCurso).subscribe(
        (curso: CursoInterface) => {
          this.padre = curso;
          this.nombreCurso = curso.id + ' ' + curso.grupo;
        }
      );
    });

  }

  buscarPorNombre(busqueda: string) {
    this.busqueda = busqueda.trim();
    //this.filterpost = this.busqueda;
    // this.queryParams.where = this.busqueda === '' ? {} : {titulo: this.busqueda};
    //this.buscar(this.queryParams.skip);
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.skip = event.first;
    this.buscar(this.queryParams.skip);
  }

  buscar(skip: number) {
    const consulta = {
      relations: ['estudiante', 'curso'],
      where: {
        curso: {
          id: this.idCurso,
        },
      },
      skip,
      take: this.rows,
      order: {id: 'DESC'}
    };
    this._registroNotaService.findAll(JSON.stringify(consulta))
      .subscribe(
        (respuesta: [RegistroNotaInterface[], number]) => {
          this.notas = respuesta[0].map(
            r => {
              const notas = {
                notaSegundoQuimestre: r.notaSegundoQuimestre,
                notaPrimerQuimestre: r.notaSegundoQuimestre,
                cedula: (r.estudiante as EstudianteInterface).cedula ,
                nombre: (r.estudiante as EstudianteInterface).nombre + ' ' + (r.estudiante as EstudianteInterface).apellido ,
                id: r.id,
              };
              return notas;
            }
          );
          this.totalRecords = respuesta[1];
          this.loading = false;
          this._router.navigate(this.ruta, {
            queryParams: {
              skip: this.queryParams.skip,
              where: JSON.stringify(this.queryParams.where),
            }
          });
        }, error => {
          this.loading = false;
          console.error('Error en el servidor', error);
          this._toasterService.pop('error', 'Error', 'Error al cargar materias de la carrera');
        }
      );
  }
  onRowEditInit(nota: NotasTablaInterface) {
    console.log('Row edit initialized');
    this.clonedNotas[nota.cedula] = {...nota};
  }

  onRowEditSave(item: NotasTablaInterface) {
    this._cargandoService.habilitarCargando();
    console.log('item',item);
    const valor1 = this.validateDecimal(item.notaPrimerQuimestre);
    const valor2 = this.validateDecimal(item.notaSegundoQuimestre);
    if (valor1 && valor2) {
      console.log('valores', item);
      const consulta = {
        where: {
          cedula: item.cedula,
        }
      };
      this._estudianteService.findAll(JSON.stringify(consulta)).subscribe(
        respuesta => {
          const estudiante = respuesta[0][0];
          const idEstudiante = estudiante.id;
          const registroNotas: RegistroNotaInterface = {
            notaSegundoQuimestre: item.notaSegundoQuimestre,
            notaPrimerQuimestre: item.notaPrimerQuimestre,
            estudiante: idEstudiante,
            curso: this.idCurso,
          };
          this._registroNotaService.updateOne(item.id, registroNotas).subscribe(
            r => {
              this._cargandoService.deshabilitarCargando();
              this._toasterService.pop('success', '', 'Nota registrada con éxito');
            }
            , error => {
              this._cargandoService.deshabilitarCargando();
              this._toasterService.pop('error', 'Error', 'No se logro gurdar en la base de datos');
            });
        }
      );
    } else {
      this._cargandoService.deshabilitarCargando();
      this._toasterService.pop('error', 'Error', 'La calificación no es válida  Ej. 0.00 o 10.00');
    }
  }
  onRowEditCancel(nota: NotasTablaInterface, index: number) {
    console.log('nota', nota);
    console.log('index', index);
    console.log('index', this.clonedNotas[nota.cedula]);
    this.notas[index] = this.clonedNotas[nota.cedula];
    delete this.clonedNotas[nota.cedula];
  }
  validateDecimal(valor) {
    const RE = /^\d*(\.\d{1})?\d{0,1}$/;
    if (RE.test(valor)) {
      return true;
    } else {
      return false;
    }
  }
}
