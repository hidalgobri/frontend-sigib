import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import { Registro } from 'src/app/clases/registro';
import { VALIDACION_CEDULA_USUARIO, MENSAJES_VALIDACION_CEDULA_USUARIO } from 'src/app/constantes/validaciones-formulario/validacion-usuario';
import { VALIDACION_PASSWORD_USUARIO, VALIDACION_ROL_USUARIO, MENSAJES_VALIDACION_PASSWORD_USUARIO, MENSAJES_VALIDACION_ROL_USUARIO } from 'src/app/constantes/validaciones-formulario/validacion-usuario-sistema';
import { generarMensajesError } from 'src/app/funciones/generar-mensajes-error';

@Component({
  selector: 'app-registro-formulario',
  templateUrl: './registro-formulario.component.html',
  styleUrls: ['./registro-formulario.component.scss']
})
export class RegistroFormularioComponent implements OnInit {

  @Output() registroValido: EventEmitter<Registro | boolean> = new EventEmitter();
  @Input() registro: Registro;
  mensajesError = {
    cedula: [],
    password: [],
    rol: [],
  };
  formularioRegistro: FormGroup;

  subscribers = [];
  mostrarFormularioRegistro = false;


  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _formBuilder: FormBuilder
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

  reiniciarFormulario() {
    this.formularioRegistro = undefined;
    this.subscribers.forEach(s => s.unsubscribe());
    this.subscribers = [];
    this.iniciarFormulario();
  }

  private _inicializarFormulario() {
    this.formularioRegistro = this._formBuilder.group({
      cedula: [this.registro ? this.registro.nombre : '', VALIDACION_CEDULA_USUARIO],
      password: [this.registro ? this.registro.password : '', VALIDACION_PASSWORD_USUARIO],
      rol: [this.registro ? this.registro.password : '', VALIDACION_ROL_USUARIO]

    });
  }

  private _verificarCamposFormulario() {
    this.verificarCampoFormControl('cedula', MENSAJES_VALIDACION_CEDULA_USUARIO);
    this.verificarCampoFormControl('password', MENSAJES_VALIDACION_PASSWORD_USUARIO);
    this.verificarCampoFormControl('rol', MENSAJES_VALIDACION_ROL_USUARIO);
  }

  verificarCampoFormControl(campo,mensajeValidacion) {
    const campoFormControl = this.formularioRegistro.get(campo);
    const subscriber = campoFormControl
      .valueChanges
      .pipe(debounceTime(100))
      .subscribe(
        valor => {
           this.mensajesError[campo] = generarMensajesError(campoFormControl, this.mensajesError[campo], mensajeValidacion);
          }
      );
    this.subscribers.push(subscriber);
  }

  private _verificarFormulario() {
    const formularioFormGroup = this.formularioRegistro;
    const subscriber = formularioFormGroup
      .valueChanges
      .subscribe((
        formulario => {
          const registroValido = formularioFormGroup.valid;
          if (registroValido) {
            console.log('registroValido', registroValido);
            this.registroValido.emit(formulario);
          } else {
            console.log('registroValido', registroValido);
            this.registroValido.emit(false);
          }
        }
      ));
    this.subscribers.push(subscriber);
  }

}
