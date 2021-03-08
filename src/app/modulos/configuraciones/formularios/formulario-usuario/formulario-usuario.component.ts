import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UsuarioInterface} from '../../../../interfaces/interfaces/usuario.interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, map, mergeMap} from 'rxjs/operators';
import {generarMensajesError} from '../../../../funciones/generar-mensajes-error';
import { Usuario } from "../../../../clases/usuario";
import {pipe} from 'rxjs';
import { VALIDACION_CEDULA_USUARIO, VALIDACION_NOMBRE_USUARIO, MENSAJES_VALIDACION_CEDULA_USUARIO, MENSAJES_VALIDACION_NOMBRE_USUARIO } from 'src/app/constantes/validaciones-formulario/validacion-usuario';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.scss']
})
export class FormularioUsuarioComponent implements OnInit {

  @Output() usuarioValida: EventEmitter< UsuarioInterface| boolean> = new EventEmitter();
  @Input() usuario: Usuario;
  mensajesError = {
    cedula: [],
    nombre: [],
  };
  formularioUsuario: FormGroup;
  subscribers = [];
  mostrarFormularioUsuario = false;
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
    this.formularioUsuario = this._formBuilder.group({
      cedula: [this.usuario ? this.usuario.cedula : '', VALIDACION_CEDULA_USUARIO],
      nombre: [this.usuario ? this.usuario.nombre : '', VALIDACION_NOMBRE_USUARIO],
    });
  }

  private _verificarCamposFormulario() {
    this.verificarCampoFormControl('cedula', MENSAJES_VALIDACION_CEDULA_USUARIO);
    this.verificarCampoFormControl('nombre', MENSAJES_VALIDACION_NOMBRE_USUARIO);
  }

  private _verificarFormulario() {
    const formularioFormGroup = this.formularioUsuario;
    const subscriber = formularioFormGroup
      .valueChanges
      .subscribe(
        formulario => {
          const usuarioValida = formularioFormGroup.valid;
          if (usuarioValida) {
            this.usuarioValida.emit(formulario);
          } else {
            this.usuarioValida.emit(false);
          }
        }
      );
    this.subscribers.push(subscriber);
  }

  verificarCampoFormControl(campo, mensajeValidacion) {
    const campoFormControl = this.formularioUsuario.get(campo);
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
