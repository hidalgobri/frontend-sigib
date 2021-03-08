import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CargandoService } from 'src/app/servicios/cargando-service/cargando-service';
import { UsuarioRestService } from 'src/app/servicios/rest/servicios/usuario-rest.service';
import { ToasterService } from 'angular2-toaster';
import { RutaGestionComprobanteComponent } from '../../rutas/ruta-gestion-comprobante/ruta-gestion-comprobante.component';
import { ComprobanteInterface } from 'src/app/interfaces/interfaces/comprobante.interface';

@Component({
  selector: 'app-crear-editar-comprobante',
  templateUrl: './crear-editar-comprobante.component.html',
  styleUrls: ['./crear-editar-comprobante.component.scss']
})
export class CrearEditarComprobanteComponent implements OnInit {

  crearEditarComprobante: ComprobanteInterface;
  formularioValido;
  comprobante: ComprobanteInterface;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {comprobante: ComprobanteInterface},
    public dialogo: MatDialogRef<RutaGestionComprobanteComponent>,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,

  ) {
  }

  ngOnInit() {
  }
  validarFormulario(usuario) {
    if (usuario) {
      this.crearEditarComprobante = usuario;
      this.formularioValido = true;
    } else {
      this.formularioValido = false;
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.comprobante) {
      this._cargandoService.deshabilitarCargando();
      this.crearEditarComprobante.numero = this.data.comprobante.numero,
      this.dialogo.close(this.crearEditarComprobante);
    } else {
      this._cargandoService.deshabilitarCargando();
      this.dialogo.close(this.crearEditarComprobante);
    }


  }




}
