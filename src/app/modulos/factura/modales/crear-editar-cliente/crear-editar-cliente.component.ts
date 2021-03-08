import { Component, OnInit, Inject } from '@angular/core';
import { ClienteInterface } from 'src/app/interfaces/interfaces/cliente.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UsuarioInterface } from 'src/app/interfaces/interfaces/usuario.interface';
import { RutaGestionUsuariosComponent } from 'src/app/modulos/configuraciones/rutas/ruta-gestion-usuarios/ruta-gestion-usuarios.component';
import { CargandoService } from 'src/app/servicios/cargando-service/cargando-service';
import { UsuarioRestService } from 'src/app/servicios/rest/servicios/usuario-rest.service';
import { ToasterService } from 'angular2-toaster';
import { ESTADOS } from 'src/app/constantes/estados';
import { RutaGestionClienteComponent } from '../../rutas/ruta-gestion-cliente/ruta-gestion-cliente.component';

@Component({
  selector: 'app-crear-editar-cliente',
  templateUrl: './crear-editar-cliente.component.html',
  styleUrls: ['./crear-editar-cliente.component.scss']
})
export class CrearEditarClienteComponent implements OnInit {
  crearEditarCliente: ClienteInterface;
  formularioValido;
  cliente: ClienteInterface;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {cliente: ClienteInterface},
    public dialogo: MatDialogRef<RutaGestionClienteComponent>,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _usuarioService: UsuarioRestService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,

  ) {
  }

  ngOnInit() {
  }
  validarFormulario(usuario) {
    if (usuario) {
      this.crearEditarCliente = usuario;
      this.formularioValido = true;
    } else {
      this.formularioValido = false;
    }
  }

  metodoCrearEditar() {

  }



}
