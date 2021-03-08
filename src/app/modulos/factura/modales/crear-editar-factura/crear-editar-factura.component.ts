import { Component, OnInit, Inject } from '@angular/core';
import { FacturaInterface } from 'src/app/interfaces/interfaces/factura.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CargandoService } from 'src/app/servicios/cargando-service/cargando-service';
import { UsuarioRestService } from 'src/app/servicios/rest/servicios/usuario-rest.service';
import { ToasterService } from 'angular2-toaster';
import { RutaGestionFacturaComponent } from '../../rutas/ruta-gestion-factura/ruta-gestion-factura.component';

@Component({
  selector: 'app-crear-editar-factura',
  templateUrl: './crear-editar-factura.component.html',
  styleUrls: ['./crear-editar-factura.component.scss']
})
export class CrearEditarFacturaComponent implements OnInit {


  crearEditarFactura: FacturaInterface;
  formularioValido;
  factura: FacturaInterface;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {cliente: FacturaInterface},
    public dialogo: MatDialogRef<RutaGestionFacturaComponent>,
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
      this.crearEditarFactura = usuario;
      this.formularioValido = true;
    } else {
      this.formularioValido = false;
    }
  }

  metodoCrearEditar() {

  }


}
