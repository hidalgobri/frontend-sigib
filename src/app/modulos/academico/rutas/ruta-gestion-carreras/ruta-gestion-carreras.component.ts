import { Component, OnInit } from '@angular/core';
import { CarreraInterface } from 'src/app/interfaces/interfaces/carrera.interface';
import { OPCIONES_HABILITADO_SELECT } from 'src/app/constantes/opciones-habilitado-select';
import { ESTADOS } from 'src/app/constantes/estados';
import { NUMERO_FILAS_TABLAS } from 'src/app/constantes/numero-filas-tablas';
import { QueryParamsInterface } from 'src/app/interfaces/interfaces/query-params.interface';
import { CrearEditarCarreraComponent } from '../../modales/crear-editar-carrera/crear-editar-carrera.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CargandoService } from 'src/app/servicios/cargando-service/cargando-service';
import { ToasterService } from 'angular2-toaster';
import { MatDialog } from '@angular/material';
import { CarreraRestService } from 'src/app/servicios/rest/servicios/carrrera-rest.service';

@Component({
  selector: 'app-ruta-gestion-carreras',
  templateUrl: './ruta-gestion-carreras.component.html',
  styleUrls: ['./ruta-gestion-carreras.component.scss']
})
export class RutaGestionCarrerasComponent implements OnInit {



  carreras: CarreraInterface[];
  opcionesHabilitado = OPCIONES_HABILITADO_SELECT;
  estados = ESTADOS;
  columnas = [
    {field: 'codigo', header: 'Código', width: '20%'},
    {field: 'nombre', header: 'Nombre', width: '40%'},
    {field: 'duracion', header: 'Duración', width: '40%'},
    {field: 'acciones', header: 'Acciones', width: '40%'},
  ];
  rows = NUMERO_FILAS_TABLAS;
  totalRecords: number;
  loading: boolean;
  queryParams: QueryParamsInterface = {};
  busqueda = '';
  ruta = [];

  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _activatedRoute: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private readonly  _router: Router,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    private readonly _carreraService: CarreraRestService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
    public dialogo: MatDialog,
  ) {
  }

  ngOnInit() {
    this._activatedRoute.queryParams
      .subscribe(
        queryParams => {
          this.queryParams.skip = queryParams.skip ? +queryParams.skip : 0;
          this.queryParams.where = queryParams.where ? JSON.parse(queryParams.where) : {};
          this.queryParams.where.tipo = this.queryParams.where.tipo ? this.queryParams.where.tipo : undefined;
          // tslint:disable-next-line:max-line-length
          this.queryParams.where.habilitado = this.queryParams.where.habilitado === 0 || this.queryParams.where.habilitado === 1 ? this.queryParams.where.habilitado : undefined;
          this.queryParams.where.nivelJuego = this.queryParams.where.nivelJuego ? this.queryParams.where.nivelJuego : undefined;
        }, error => {
          console.error('Error en acceder a la ruta');
        });
  }

  buscarPorNombre(busqueda: string) {
    this.busqueda = busqueda.trim();
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.skip = event.first;
    this.buscar(this.queryParams.skip);
  }

  buscar(skip: number) {
    const consulta = {
      where: this.queryParams.where,
      skip,
      take: this.rows,
      order: {id: 'DESC'}
    };
    this._carreraService.findAll()
      .subscribe(
        (respuesta: [CarreraInterface[], number]) => {
          this.carreras = respuesta[0];
          this.totalRecords = respuesta[1];
          console.log('registros de la base', this.carreras);
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
          this._toasterService.pop('error', 'Error', 'Error al cargar las carreras');
        }
      );
  }

  abrirDialogo(carreraSeleccionada?): void {
    const dialogRef = this.dialogo.open(
      CrearEditarCarreraComponent,
      {
        data: {carrera: carreraSeleccionada},
      }
    );
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$
      .subscribe((registroCreado: CarreraInterface) => {
        if (registroCreado) {
          if (carreraSeleccionada) {
            const indiceRegistro = this.carreras.indexOf(carreraSeleccionada);
            this.carreras[indiceRegistro] = registroCreado;
            this._toasterService.pop('success', '', 'Carrera actualizada exitosamente');
            this.carreras[indiceRegistro] = registroCreado;
          } else {
            this._toasterService.pop('success', '', 'Carrera registrada exitosamente');
            this.carreras.unshift(registroCreado);
          }
        }
      });

  }
    irMenuMaterias(idCarrera:number) {
      const url = ['administrador', 'menu', 'academico', 'menu-academico', 'carreras', idCarrera, 'materias']
    this._router.navigate(url);
  }

}
