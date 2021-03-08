import { Component, OnInit } from '@angular/core';
import {CursoInterface} from '../../../../interfaces/interfaces/curso.interface';
import {NotasTablaInterface} from '../../../../interfaces/interfaces/notas-tabla.interface';
import {NUMERO_FILAS_TABLAS} from '../../../../constantes/numero-filas-tablas';
import {QueryParamsInterface} from '../../../../interfaces/interfaces/query-params.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {CargandoService} from '../../../../servicios/cargando-service/cargando-service';
import {ToasterService} from 'angular2-toaster';
import {CursoRestService} from '../../../../servicios/rest/servicios/curso-rest.service';
import {EstudianteRestService} from '../../../../servicios/rest/servicios/estudiante-rest.service';
import {RegistroNotaRestService} from '../../../../servicios/rest/servicios/registro-nota-rest.service';
import {MatriculaRestService} from '../../../../servicios/rest/servicios/matricula-rest.service';
import {MatDialog} from '@angular/material';
import {MatriculaInterface} from '../../../../interfaces/interfaces/matricula.interface';
import {EstudianteInterface} from '../../../../interfaces/interfaces/estudiante.interface';

import {RegistroNotaInterface} from '../../../../interfaces/interfaces/registro-nota.interface';
import * as FileSaver from 'file-saver';
import * as xlsx from 'xlsx';
import * as jsPdf from 'jspdf';
import 'jspdf-autotable';
import {UserOptions} from 'jspdf-autotable';

interface jsPDFWithPlugin  extends jsPdf {
  autoTable: (options: UserOptions) => jsPdf;
}
@Component({
  selector: 'app-ruta-ver-nomina',
  templateUrl: './ruta-ver-nomina.component.html',
  styleUrls: ['./ruta-ver-nomina.component.scss']
})
export class RutaVerNominaComponent implements OnInit {

  idCurso: number;
  padre: CursoInterface;
  notas: any[];
  exportColumns: any[];
  columnas = [
    {field: 'cedula', header: 'Cédula', width: '10%'},
    {field: 'nombre', header: 'Nombre', width: '20%'},
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
    private readonly _matriculaService: MatriculaRestService,
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
    this.exportColumns = this.columnas.map(col => ({title: col.header, dataKey: col.field}));

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
    this._matriculaService.findAll(JSON.stringify(consulta))
      .subscribe(
        (respuesta: [MatriculaInterface[], number]) => {
          this.notas = respuesta[0].map(
            r => {
              const notas = {
                cedula: (r.estudiante as EstudianteInterface).cedula ,
                nombre: (r.estudiante as EstudianteInterface).nombre + ' ' + (r.estudiante as EstudianteInterface).apellido ,
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

  exportExcel() {
    const worksheet = xlsx.utils.json_to_sheet(this.notas);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'estudiantes');
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
