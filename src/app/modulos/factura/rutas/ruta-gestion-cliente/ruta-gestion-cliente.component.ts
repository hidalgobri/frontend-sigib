import { Component, OnInit } from '@angular/core';
import { ClienteInterface } from 'src/app/interfaces/interfaces/cliente.interface';
import { OPCIONES_HABILITADO_SELECT } from 'src/app/constantes/opciones-habilitado-select';
import { ESTADOS } from 'src/app/constantes/estados';
import { NUMERO_FILAS_TABLAS } from 'src/app/constantes/numero-filas-tablas';
import { QueryParamsInterface } from 'src/app/interfaces/interfaces/query-params.interface';
import { UsuarioRestService } from 'src/app/servicios/rest/servicios/usuario-rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CargandoService } from 'src/app/servicios/cargando-service/cargando-service';
import { ToasterService } from 'angular2-toaster';
import { MatDialog } from '@angular/material';
import { CrearEditarUsuarioComponent } from 'src/app/modulos/configuraciones/modales/crear-editar-usuario/crer-editar-usuario.component';
import { CrearEditarClienteComponent } from '../../modales/crear-editar-cliente/crear-editar-cliente.component';

@Component({
  selector: 'app-ruta-gestion-cliente',
  templateUrl: './ruta-gestion-cliente.component.html',
  styleUrls: ['./ruta-gestion-cliente.component.scss']
})
export class RutaGestionClienteComponent implements OnInit {


  clientes: ClienteInterface[] = [
    {
      cedula:   '1704125883',
      nombre:   'Cristhian',
      apellido: 'Jumbo',
      direccion:'Marin',
      telefono: '0998033447'


    },
        {
      cedula:   '1714125883',
      nombre:   'Manuel',
      apellido: 'Laso',
      direccion:'Armenia',
      telefono: '0993825276'
    },
        {
      cedula: '1704452883',
      nombre: 'Esteban',
      apellido: 'Guerra',
      direccion:'Ofelia',
      telefono: '0998022445'
    }
  ];
  opcionesHabilitado = OPCIONES_HABILITADO_SELECT;
  estados = ESTADOS;
  columnas = [
    {field: 'cedula', header: 'Cédula', width: '20%'},
    {field: 'nombre', header: 'Nombre', width: '20%'},
    {field: 'apellido', header: 'Apellido', width: '20%'},
    {field: 'direccion', header: 'Direccion', width: '20%'},
    {field: 'telefono', header: 'Teléfono', width: '20%'},
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
    private readonly _clienteervice: UsuarioRestService,
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

  abrirDialogo(clienteSeleccionado?): void {
    const dialogRef = this.dialogo.open(
      CrearEditarClienteComponent,
      {
        data: {cliente: clienteSeleccionado},
      }
    );
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$
      .subscribe((registroCreado: ClienteInterface) => {
        if (registroCreado) {
          if (clienteSeleccionado) {
            const indiceRegistro = this.clientes.indexOf(clienteSeleccionado);
            this.clientes[indiceRegistro] = registroCreado;
          } else {
            this.clientes.unshift(registroCreado);
          }
        }
      });

  }
}
