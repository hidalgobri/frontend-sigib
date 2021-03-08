import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarreraInterface } from 'src/app/interfaces/interfaces/carrera.interface';
import { NUMERO_FILAS_TABLAS } from 'src/app/constantes/numero-filas-tablas';
import { QueryParamsInterface } from 'src/app/interfaces/interfaces/query-params.interface';
import { MateriaRestService } from 'src/app/servicios/rest/servicios/materia-rest.service';
import { MateriaInterface } from 'src/app/interfaces/interfaces/materia.interface';
import { CargandoService } from 'src/app/servicios/cargando-service/cargando-service';
import { ToasterService } from 'angular2-toaster';
import { MatDialog } from '@angular/material';
import { CarreraRestService } from 'src/app/servicios/rest/servicios/carrrera-rest.service';
import { CrearEditarMateriasCarreraComponent } from '../../modales/crear-editar-materias-carrera/crear-editar-materias-carrera.component';

@Component({
  selector: 'app-ruta-gestion-materias-carrera',
  templateUrl: './ruta-gestion-materias-carrera.component.html',
  styleUrls: ['./ruta-gestion-materias-carrera.component.scss']
})
export class RutaGestionMateriasCarreraComponent implements OnInit {

  idCarrera: number;
  padre: CarreraInterface;
  materias: MateriaInterface[];
  columnas = [
    {field: 'codigo', header: 'Código', width: '10%'},
    {field: 'nombre', header: 'Nombre', width: '20%'},
    {field: 'anio', header: 'Año', width: '20%'},
    {field: 'tipoMateria', header: 'Tipo', width: '20%'},
    {field: 'carrera', header: 'Carrera', width: '20%'},
    {field: 'acciones', header: 'Acciones', width: '10%'},
  ];
  rows = NUMERO_FILAS_TABLAS;
  totalRecords: number;
  loading: boolean;
  queryParams: QueryParamsInterface = {};
  busqueda = '';
  ruta = [];
  nombreCarrera = '';
  constructor(
    private _activatedRoute: ActivatedRoute,
    private readonly _materiaService: MateriaRestService,
    private readonly _carreraService: CarreraRestService,
    // tslint:disable-next-line:variable-name
    // tslint:disable-next-line:variable-name
    private readonly  _router: Router,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
    public dialogo: MatDialog,

  ) { }

  ngOnInit() {
this._activatedRoute.paramMap.subscribe(param => {
  console.log('respuesta', param.get('id'));
  this.idCarrera = +param.get('id');
              this._carreraService
              .findOne(this.idCarrera).subscribe(
              emisor => {
                this.padre = emisor
                this.nombreCarrera = emisor.nombre;
              }
            );
})

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
      where: {
        carrera: this.idCarrera,
      },
      skip,
      take: this.rows,
      order: {id: 'DESC'}
    };
    this._materiaService.findAll(JSON.stringify(consulta))
      .subscribe(
        (respuesta: [MateriaInterface[], number]) => {
          this.materias = respuesta[0];
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
abrirDialogo(materiaSeleccionada?): void {
    const dialogRef = this.dialogo.open(
      CrearEditarMateriasCarreraComponent,
      {
        data: {materia: materiaSeleccionada, carrera: this.padre},
      }
    );
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$
      .subscribe((registroCreado: MateriaInterface) => {
        if (registroCreado) {
          if (materiaSeleccionada) {
            const indiceRegistro = this.materias.indexOf(materiaSeleccionada);
            this.materias[indiceRegistro] = registroCreado;
            this._toasterService.pop('success', '', 'Materia actualizada exitosamente',);
            this.materias[indiceRegistro] = registroCreado;
          } else {
            this._toasterService.pop({type:'success', body:'Materia registrada exitosamente', timeout:1000});
            this.materias.unshift(registroCreado);
          }
        }
      });

  }

}
