import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CargandoService} from '../../../../servicios/cargando-service/cargando-service';
import {ToasterService} from 'angular2-toaster';
import {RutaGestionUsuariosComponent} from '../../rutas/ruta-gestion-usuarios/ruta-gestion-usuarios.component';
import {UsuarioInterface} from '../../../../interfaces/interfaces/usuario.interface';
import {ESTADOS} from '../../../../constantes/estados';
import { Usuario } from "../../../../clases/usuario";
import { UsuarioRestService } from 'src/app/servicios/rest/servicios/usuario-rest.service';
@Component({
  selector: 'app-crer-editar-usuario',
  templateUrl: './crer-editar-usuario.component.html',
  styleUrls: ['./crer-editar-usuario.component.scss']
})
export class CrearEditarUsuarioComponent implements OnInit {
  crearEditarUsuario: UsuarioInterface;
  formularioValido;
  usuario: UsuarioInterface;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {usuario: UsuarioInterface},
    public dialogo: MatDialogRef<RutaGestionUsuariosComponent>,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,

  ) {
  }

  ngOnInit() {
  }
  validarFormulario(usuario) {
    if (usuario) {
      this.crearEditarUsuario = usuario;
      this.formularioValido = true;
    } else {
      this.formularioValido = false;
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.usuario) {
      this._cargandoService.deshabilitarCargando();
      this.crearEditarUsuario.cedula = this.data.usuario.cedula,
      this.dialogo.close(this.crearEditarUsuario);
    } else {
      this._cargandoService.deshabilitarCargando();
      this.dialogo.close(this.crearEditarUsuario);
    }
  }

}
