import { Component, OnInit, Inject } from '@angular/core';
import { RolInterface } from 'src/app/interfaces/interfaces/role.interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CargandoService } from 'src/app/servicios/cargando-service/cargando-service';
import { ToasterService } from 'angular2-toaster';
import { RutaGestionRolesComponent } from '../../rutas/ruta-gestion-roles/ruta-gestion-roles.component';

@Component({
  selector: 'app-crear-editar-rol',
  templateUrl: './crear-editar-rol.component.html',
  styleUrls: ['./crear-editar-rol.component.scss']
})
export class CrearEditarRolComponent implements OnInit {

  crearEditarRol: RolInterface;
  formularioValido;
  rol: RolInterface;
  puedeEditar: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { rol: RolInterface },
    public dialogo: MatDialogRef<RutaGestionRolesComponent>,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,

  ) {
  }

  ngOnInit() {
    if (this.data.rol) {
      this.puedeEditar = true
    }
  }
  validarFormulario(rol) {
    if (rol) {
      this.crearEditarRol = rol;
      this.formularioValido = true;
    } else {
      this.formularioValido = false;
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.rol) {
      this._cargandoService.deshabilitarCargando();
      this.crearEditarRol.codigo = this.data.rol.codigo,
      this.dialogo.close(this.crearEditarRol);
    } else {
      this._cargandoService.deshabilitarCargando();
      this.dialogo.close(this.crearEditarRol);
    }
  }
}
