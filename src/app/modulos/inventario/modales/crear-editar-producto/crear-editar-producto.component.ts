import { Component, OnInit, Inject } from '@angular/core';
import { ProductoInterface } from 'src/app/interfaces/interfaces/producto.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RolInterface } from 'src/app/interfaces/interfaces/role.interfaces';
import { RutaGestionRolesComponent } from 'src/app/modulos/configuraciones/rutas/ruta-gestion-roles/ruta-gestion-roles.component';
import { CargandoService } from 'src/app/servicios/cargando-service/cargando-service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-crear-editar-producto',
  templateUrl: './crear-editar-producto.component.html',
  styleUrls: ['./crear-editar-producto.component.scss']
})
export class CrearEditarProductoComponent implements OnInit {

crearEditarProducto: ProductoInterface;
  formularioValido;
  producto: ProductoInterface;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {roproductol: ProductoInterface},
    public dialogo: MatDialogRef<RutaGestionRolesComponent>,
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
      this.crearEditarProducto = usuario;
      this.formularioValido = true;
    } else {
      this.formularioValido = false;
    }
  }

  metodoCrearEditar() {

  }
}
