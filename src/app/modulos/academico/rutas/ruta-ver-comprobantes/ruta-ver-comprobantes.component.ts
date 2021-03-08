//import { Component, OnInit } from '@angular/core';
import { ComprobanteInterface } from 'src/app/interfaces/interfaces/comprobante.interface';
//import { ActivatedRoute, Router } from '@angular/router';
import { MateriaRestService } from 'src/app/servicios/rest/servicios/materia-rest.service';
import { CarreraRestService } from 'src/app/servicios/rest/servicios/carrrera-rest.service';
import { CargandoService } from 'src/app/servicios/cargando-service/cargando-service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { MatDialog } from '@angular/material';
import { QueryParamsInterface } from 'src/app/interfaces/interfaces/query-params.interface';
import { NUMERO_FILAS_TABLAS } from 'src/app/constantes/numero-filas-tablas';
import { ComprobanteRestService } from 'src/app/servicios/rest/servicios/comprobante-rest.service';
import { UsuarioSistemaInterface } from 'src/app/interfaces/interfaces/usuario-sistema';
import { EstudianteInterface } from 'src/app/interfaces/interfaces/estudiante.interface';
import { EstudianteRestService } from 'src/app/servicios/rest/servicios/estudiante-rest.service';
import { LocalStorageService } from 'src/app/servicios/rest/servicios/local-storage';
//import { ToasterService } from 'angular2-toaster';
//import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-ruta-ver-comprobantes',
  templateUrl: './ruta-ver-comprobantes.component.html',
  styleUrls: ['./ruta-ver-comprobantes.component.scss']
})
export class RutaVerComprobantesComponent implements OnInit {


  rows = NUMERO_FILAS_TABLAS;
  totalRecords: number;
  loading: boolean;
  queryParams: QueryParamsInterface = {};
  comprobantes: ComprobanteInterface[];
  ciEstudiante: string;
  estudiante: EstudianteInterface;
  ruta = [];

  columnas = [
    {field: 'numero', header: 'Número', width: '10%'},
    {field: 'fecha', header: 'Fecha', width: '10%'},
    {field: 'ci', header: 'Cédula Identidad', width: '10%'},
    {field: 'nombre', header: 'Nombre', width: '10%'},
    {field: 'tipo', header: 'Tipo', width: '10%'},
    {field: 'formaPago', header: 'Forma de pago', width: '10%'},
    {field: 'realizadop', header: 'Realizado por', width: '20%'},
    {field: 'comprobantep', header: 'Comprobante pago', width: '10%'},
    {field: 'beneficiario', header: 'Beneficiario', width: '10%'},
  ];


  constructor(
    private _activatedRoute: ActivatedRoute,
    private readonly _comprobanteService: ComprobanteRestService,
   // private readonly _carreraService: CarreraRestService,
    // tslint:disable-next-line:variable-name
    // tslint:disable-next-line:variable-name
    private readonly  _router: Router,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    private readonly _estudianteService: EstudianteRestService,
    private readonly _localStorage: LocalStorageService,
    private readonly _toasterService: ToasterService,


    public dialogo: MatDialog,
    ) { }

    ngOnInit() {

    }

    cargarDatosLazy(event) {
      this.loading = true;
      this.queryParams.skip = event.first;
      this.buscar(this.queryParams.skip);
    }


    buscar(skip: number) {

      const cedulaEstudiante: UsuarioSistemaInterface =  JSON.parse(this._localStorage.obtenerDatosLocalStorage('usuario'));

      const consulta = {
        where: {
          ci: cedulaEstudiante.cedulaUsuario,
        },
        skip,
        take: this.rows,
        order: {ci: 'DESC'}
      };
      this._comprobanteService.findAll(JSON.stringify(consulta))
        .subscribe(
          (respuesta: [ComprobanteInterface[], number]) => {
            this.comprobantes = respuesta[0];
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
}
