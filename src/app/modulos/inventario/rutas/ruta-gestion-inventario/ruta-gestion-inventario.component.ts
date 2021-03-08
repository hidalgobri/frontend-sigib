import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/clases/producto';
import { OPCIONES_HABILITADO_SELECT } from 'src/app/constantes/opciones-habilitado-select';
import { ESTADOS } from 'src/app/constantes/estados';
import { NUMERO_FILAS_TABLAS } from 'src/app/constantes/numero-filas-tablas';
import { QueryParamsInterface } from 'src/app/interfaces/interfaces/query-params.interface';
import { UsuarioRestService } from 'src/app/servicios/rest/servicios/usuario-rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CargandoService } from 'src/app/servicios/cargando-service/cargando-service';
import { ToasterService } from 'angular2-toaster';
import { MatDialog } from '@angular/material';
import { CrearEditarRolComponent } from 'src/app/modulos/configuraciones/modales/crear-editar-rol/crear-editar-rol.component';
import { RolInterface } from 'src/app/interfaces/interfaces/role.interfaces';
import { CrearEditarProductoComponent } from '../../modales/crear-editar-producto/crear-editar-producto.component';
import { ProductoInterface } from 'src/app/interfaces/interfaces/producto.interface';

@Component({
  selector: 'app-ruta-gestion-inventario',
  templateUrl: './ruta-gestion-inventario.component.html',
  styleUrls: ['./ruta-gestion-inventario.component.scss']
})
export class RutaGestionInventarioComponent implements OnInit {



  productos: Producto[] = [
    {
nombre: 'labial',
tipo: 'cosmeticos',
descontinuado:false,
identificador:'0001A',
marca: 'Avon',
precioUnitario:'5.50',
stock:20

    }
  ];
  opcionesHabilitado = OPCIONES_HABILITADO_SELECT;
  estados = ESTADOS;
  columnas = [
    {field: 'nombre', header: 'nombre', width: '20%'},
    {field: 'tipo', header: 'tipo', width: '20%'},
    {field: 'descontinuado', header: 'descontinuado', width: '20%'},
    {field: 'identificador', header: 'identificador', width: '20%'},
    {field: 'marca', header: 'marca', width: '20%'},
    {field: 'precioUnitario', header: 'precioUnitario', width: '20%'},
    {field: 'stock', header: 'stock', width: '20%'},
    {field: 'acciones', header: 'Acciones', width: '40%'},
  ];
  rows = NUMERO_FILAS_TABLAS;
  totalRecords: number;
  loading: boolean;
  queryParams: QueryParamsInterface = {};
  busqueda = '';
  estado;
  ruta = [];

  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _rolervice: UsuarioRestService,
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

  actualizarEstado(registro) {
  }

  buscarPorNombre(busqueda: string) {
    this.busqueda = busqueda.trim();
    this.queryParams.where = this.busqueda === '' ? {} : {titulo: this.busqueda};
    //this.buscar(this.queryParams.skip);
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.skip = event.first;
    const seBuscoPorTipo = this.queryParams.where.tipo;
    const seBuscoPorEstado = this.queryParams.where.habilitado === 1 || this.queryParams.where.habilitado === 0;
    const seBuscoPorNivel = this.queryParams.where.nivelJuego;
    const seBuscoPorTipoEstadoNivel = seBuscoPorTipo || seBuscoPorEstado || seBuscoPorNivel;
  }

  buscar(skip: number) {
    const consulta = {
      where: this.queryParams.where,
      relations: ['tipo', 'nivelJuego'],
      skip,
      take: this.rows,
      order: {id: 'DESC'}
    };
  }

  abrirDialogo(rolSeleccionado?): void {
    const dialogRef = this.dialogo.open(
      CrearEditarProductoComponent,
      {
        data: {rol: rolSeleccionado},
      }
    );
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$
      .subscribe((registroCreado: ProductoInterface) => {
        if (registroCreado) {
          if (rolSeleccionado) {
            const indiceRegistro = this.productos.indexOf(rolSeleccionado);
            this.productos[indiceRegistro] = registroCreado;
          } else {
            this.productos.unshift(registroCreado);
          }
        }
      });

  }
}
