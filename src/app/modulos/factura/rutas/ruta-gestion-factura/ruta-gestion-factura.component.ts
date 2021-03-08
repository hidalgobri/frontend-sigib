import { Component, OnInit } from '@angular/core';
import { FacturaInterface } from 'src/app/interfaces/interfaces/factura.interface';
import { OPCIONES_HABILITADO_SELECT } from 'src/app/constantes/opciones-habilitado-select';
import { ESTADOS } from 'src/app/constantes/estados';
import { NUMERO_FILAS_TABLAS } from 'src/app/constantes/numero-filas-tablas';
import { QueryParamsInterface } from 'src/app/interfaces/interfaces/query-params.interface';
import { UsuarioRestService } from 'src/app/servicios/rest/servicios/usuario-rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CargandoService } from 'src/app/servicios/cargando-service/cargando-service';
import { ToasterService } from 'angular2-toaster';
import { MatDialog } from '@angular/material';
import { CrearEditarFacturaComponent } from '../../modales/crear-editar-factura/crear-editar-factura.component';

@Component({
  selector: 'app-ruta-gestion-factura',
  templateUrl: './ruta-gestion-factura.component.html',
  styleUrls: ['./ruta-gestion-factura.component.scss']
})
export class RutaGestionFacturaComponent implements OnInit {



  facturas: FacturaInterface[] = [
    {

      numero:     '7883',
      concepto:   'Compra 2 cepillos',
      formapago:  'Efectivo en caja',
      fecha:      '01/03/2019',
      tcliente:   'Estudiante',
      estado:     'Activo'


    },
        {
      numero:     '7884',
      concepto:   'Compra 1 Keratina',
      formapago:  'Deposito en banco',
      fecha:      '02/03/2019',
      tcliente:   'Cliente',
      estado:     'Activo'
    },
        {
      numero:     '7885',
      concepto:   'Compra 3 konzil',
      formapago:  'Efectivo en caja',
      fecha:      '03/03/2019',
      tcliente:   'Estudiante',
      estado:     'Activo'
    }
  ];
  opcionesHabilitado = OPCIONES_HABILITADO_SELECT;
  estados = ESTADOS;
  columnas = [
    {field: 'numero', header: 'Numero', width: '20%'},
    {field: 'concepto', header: 'Concepto', width: '20%'},
    {field: 'formapago', header: 'FormaDePago', width: '20%'},
    {field: 'fecha', header: 'Fecha', width: '20%'},
    {field: 'tcliente', header: 'TipoDeCliente', width: '10%'},
    {field: 'estado', header: 'Estado', width: '10%'}
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
    private readonly _facturaervice: UsuarioRestService,
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

  abrirDialogo(facturaSeleccionada?): void {
    const dialogRef = this.dialogo.open(
      CrearEditarFacturaComponent,
      {
        data: {factura: facturaSeleccionada},
      }
    );
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$
      .subscribe((registroCreado: FacturaInterface) => {
        if (registroCreado) {
          if (facturaSeleccionada) {
            const indiceRegistro = this.facturas.indexOf(facturaSeleccionada);
            this.facturas[indiceRegistro] = registroCreado;
          } else {
            this.facturas.unshift(registroCreado);
          }
        }
      });

  }
}
