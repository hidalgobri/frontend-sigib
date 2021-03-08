import { Component, OnInit } from '@angular/core';
import { OPCIONES_HABILITADO_SELECT } from 'src/app/constantes/opciones-habilitado-select';
import { ESTADOS } from 'src/app/constantes/estados';
import { NUMERO_FILAS_TABLAS } from 'src/app/constantes/numero-filas-tablas';
import { QueryParamsInterface } from 'src/app/interfaces/interfaces/query-params.interface';
import { UsuarioRestService } from 'src/app/servicios/rest/servicios/usuario-rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CargandoService } from 'src/app/servicios/cargando-service/cargando-service';
import { ToasterService } from 'angular2-toaster';
import { MatDialog } from '@angular/material';
import { CrearEditarComprobanteComponent } from '../../modales/crear-editar-comprobante/crear-editar-comprobante.component';
import { ComprobanteInterface } from 'src/app/interfaces/interfaces/comprobante.interface';

@Component({
  selector: 'app-ruta-gestion-comprobante',
  templateUrl: './ruta-gestion-comprobante.component.html',
  styleUrls: ['./ruta-gestion-comprobante.component.scss']
})
export class RutaGestionComprobanteComponent implements OnInit {



  comprobantes: ComprobanteInterface[] = [
    {
      numero:     5883,
      fecha:      '01/03/2019',
      ci:         'matricula',
      nombre:     'Efectivo en caja',
      tipo:       '70',
      formapago:   'Tarjeta de Crédito',
      realizadop:   'Administrador',
      comprobantep: '',
      beneficiario: '',
      estudiante: 4,
    },
        {
      numero:     5883,
      fecha:      '01/03/2019',
      ci:         'matricula',
      nombre:     'Efectivo en caja',
      tipo:       '70',
      formapago:   'Tarjeta de Crédito',
      realizadop:   'Administrador',
      comprobantep: '',
      beneficiario: '',
      estudiante: 4,
    },
        {
      numero:     5883,
      fecha:      '01/03/2019',
      ci:         'matricula',
      nombre:     'Efectivo en caja',
      tipo:       '70',
      formapago:   'Tarjeta de Crédito',
      realizadop:   'Administrador',
      comprobantep: '',
      beneficiario: '',
      estudiante: 4,
    }
  ];
  opcionesHabilitado = OPCIONES_HABILITADO_SELECT;
  estados = ESTADOS;
  columnas = [
    {field: 'numero', header: 'Numero', width: '10%'},
    {field: 'fecha', header: 'Fecha', width: '10%'},
    {field: 'ci', header: 'Ced Identidad', width: '10%'},
    {field: 'nombre', header: 'Nombre', width: '10%'},
    {field: 'tipo', header: 'Tipo', width: '10%'},
    {field: 'formapago', header: 'Forma de pago', width: '10%'},
    {field: 'realizadop', header: 'Realizado por', width: '20%'},
    {field: 'comprobantep', header: 'Comprobante pago', width: '10%'},
    {field: 'beneficiario', header: 'Beneficiario', width: '10%'},
    {field: 'estudiante', header: 'Estudiante', width: '10%'},
    {field: 'acciones', header: 'Acciones', width: '20%'}
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
    private readonly _comprobanteervice: UsuarioRestService,
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

  abrirDialogo(comprobanteSeleccionado?): void {
    const dialogRef = this.dialogo.open(
      CrearEditarComprobanteComponent,
      {
        data: {comprobante: comprobanteSeleccionado},
      }
    );
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$
      .subscribe((registroCreado: ComprobanteInterface) => {
        if (registroCreado) {
          if (comprobanteSeleccionado) {
            const indiceRegistro = this.comprobantes.indexOf(comprobanteSeleccionado);
            this.comprobantes[indiceRegistro] = registroCreado;
          } else {
            this.comprobantes.unshift(registroCreado);
          }
        }
      });

  }
}
