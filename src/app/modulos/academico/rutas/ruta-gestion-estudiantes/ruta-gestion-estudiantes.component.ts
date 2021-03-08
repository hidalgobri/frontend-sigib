import { Component, OnInit } from '@angular/core';
import { EstudianteInterface } from 'src/app/interfaces/interfaces/estudiante.interface';
import { NUMERO_FILAS_TABLAS } from 'src/app/constantes/numero-filas-tablas';
import { QueryParamsInterface } from 'src/app/interfaces/interfaces/query-params.interface';
import { EstudianteRestService } from 'src/app/servicios/rest/servicios/estudiante-rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CargandoService } from 'src/app/servicios/cargando-service/cargando-service';
import { ToasterService } from 'angular2-toaster';
import { MatDialog } from '@angular/material';
import { CrearEditarEstudianteComponent } from '../../modales/crear-editar-estudiante/crear-editar-estudiante.component';

@Component({
  selector: 'app-ruta-gestion-estudiantes',
  templateUrl: './ruta-gestion-estudiantes.component.html',
  styleUrls: ['./ruta-gestion-estudiantes.component.scss']
})
export class RutaGestionEstudiantesComponent implements OnInit {


  estudiantes: EstudianteInterface[];
  columnas = [
    {field: 'codigo', header: 'Código', width: '10%'},
    {field: 'cedula', header: 'Cédula', width: '20%'},
    {field: 'nombre', header: 'Nombre', width: '20%'},
    {field: 'apellido', header: 'Apellido', width: '20%'},
    {field: 'telefono', header: 'Telefono', width: '20%'},
    {field: 'correo', header: 'Correo Electrónico', width: '20%'},
    {field: 'acciones', header: 'Acciones', width: '10%'},
  ];
  rows = NUMERO_FILAS_TABLAS;
  totalRecords: number;
  loading: boolean;
  queryParams: QueryParamsInterface = {};
  busqueda = '';
  tipo;
  nivel;
  estado;
  ruta = [];
  filterpost ='';

  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _estudianteService: EstudianteRestService,
    // tslint:disable-next-line:variable-name
    private readonly _activatedRoute: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private readonly  _router: Router,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
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
    this.filterpost = this.busqueda;
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
      where: this.queryParams.where,
      skip,
      take: this.rows,
      order: {id: 'DESC'}
    };
    this._estudianteService.findAll()
      .subscribe(
        (respuesta: [EstudianteInterface[], number]) => {
          this.estudiantes = respuesta[0];
          this.totalRecords = respuesta[1];
          console.log('records', this.estudiantes);
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
          this._toasterService.pop('error', 'Error', 'Error al cargar los estudiantes');
        }
      );
  }

  abrirDialogo(estudianteSeleccionado?): void {
    const dialogRef = this.dialogo.open(
      CrearEditarEstudianteComponent,
      {
        data: {estudiante: estudianteSeleccionado},
      }
    );
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$
      .subscribe((registroCreado: EstudianteInterface) => {
        if (registroCreado) {
          if (estudianteSeleccionado) {
            const indiceRegistro = this.estudiantes.indexOf(estudianteSeleccionado);
            this.estudiantes[indiceRegistro] = registroCreado;
            this._toasterService.pop('success', '', 'Estudiante actualizado');
          } else {
            this._toasterService.pop('success', '', 'Estudiante registrado exitosamente');
            this.estudiantes.unshift(registroCreado);
          }
        }
      },
        error => {
          if (estudianteSeleccionado) {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop('error', 'Error', 'No se actualizo el esutdiante');
          } else {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop('error', 'Error', 'Se produjo un error al guardar el estudiante');
          }
        }
      );

  }
}
