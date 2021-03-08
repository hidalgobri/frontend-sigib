import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UsuarioInterface } from 'src/app/interfaces/interfaces/usuario.interface';
import { Usuario } from 'src/app/clases/usuario';
import { FormGroup, FormBuilder } from '@angular/forms';
import {VALIDACION_CODIGO_ROL, VALIDACION_NOMBRE_ROL, MENSAJES_VALIDACION_CODIGO_ROL, MENSAJES_VALIDACION_NOMBRE_ROL } from 'src/app/constantes/validaciones-formulario/validacion-rol';
import { debounceTime } from 'rxjs/operators';
import { generarMensajesError } from 'src/app/funciones/generar-mensajes-error';
import { RolInterface } from 'src/app/interfaces/interfaces/role.interfaces';
import { Rol } from 'src/app/clases/role';

@Component({
  selector: 'app-formulario-rol',
  templateUrl: './formulario-rol.component.html',
  styleUrls: ['./formulario-rol.component.scss']
})
export class FormularioRolComponent implements OnInit {

  @Output() rolValido: EventEmitter< RolInterface| boolean> = new EventEmitter();
  @Input() rol: Rol;
  @Input() puedeEditarFormulario: boolean = false;
  mensajesError = {
    codigo: [],
    nombre: [],
  };
  formularioRol: FormGroup;
  subscribers = [];
  mostrarFormularioRol = false;
  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.iniciarFormulario();
  }

  iniciarFormulario() {
    this._inicializarFormulario();
    this._verificarCamposFormulario();
    this._verificarFormulario();
  }

  private _inicializarFormulario() {
    this.formularioRol = this._formBuilder.group({
      codigo: [this.rol ? this.rol.codigo : '', VALIDACION_CODIGO_ROL],
      nombre: [this.rol ? this.rol.nombre : '', VALIDACION_NOMBRE_ROL],
    });
      if (this.puedeEditarFormulario) {
      this.formularioRol.disable();
      this.formularioRol.get('nombre').enable();
    }

  }

  private _verificarCamposFormulario() {
    this.verificarCampoFormControl('codigo', MENSAJES_VALIDACION_CODIGO_ROL);
    this.verificarCampoFormControl('nombre', MENSAJES_VALIDACION_NOMBRE_ROL);
  }

  private _verificarFormulario() {
    const formularioFormGroup = this.formularioRol;
    const subscriber = formularioFormGroup
      .valueChanges
      .subscribe(
        formulario => {
          const rolValido = formularioFormGroup.valid;
          if (rolValido) {
            this.rolValido.emit(formulario);
          } else {
            this.rolValido.emit(false);
          }
        }
      );
    this.subscribers.push(subscriber);
  }

  verificarCampoFormControl(campo, mensajeValidacion) {
    const campoFormControl = this.formularioRol.get(campo);
    const subscriber = campoFormControl
      .valueChanges
      .pipe(debounceTime(500))
      .subscribe(
        valor => {
          this.mensajesError[campo] = generarMensajesError(campoFormControl, this.mensajesError[campo], mensajeValidacion);
        }
      );
    this.subscribers.push(subscriber);
  }

}
