import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Carrera } from 'src/app/clases/carrera';
import { CarreraInterface } from 'src/app/interfaces/interfaces/carrera.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { VALIDACION_NOMBRE_CARRERA, VALIDACION_DURACION_CARRERA, MENSAJES_VALIDACION_NOMBRE_CARRERA, MENSAJES_VALIDACION_DURACION_CARRERA } from 'src/app/constantes/validaciones-formulario/validacion-carrera';
import { generarMensajesError } from 'src/app/funciones/generar-mensajes-error';

@Component({
  selector: 'app-formulario-carrera',
  templateUrl: './formulario-carrera.component.html',
  styleUrls: ['./formulario-carrera.component.scss']
})
export class FormularioCarreraComponent implements OnInit {

 @Output() carreraValida: EventEmitter< CarreraInterface| boolean> = new EventEmitter();
  @Input() carrera: Carrera;
  mensajesError = {
    duracion: [],
    nombre: [],
  };
  formularioCarrera: FormGroup;
  subscribers = [];
  mostrarFormularioCarrera = false;
  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.iniciarFormulario()
  }

  iniciarFormulario() {
    this._inicializarFormulario();
    this._verificarCamposFormulario();
    this._verificarFormulario();
  }

  private _inicializarFormulario() {
    this.formularioCarrera = this._formBuilder.group({
      nombre: [this.carrera ? this.carrera.nombre : '',VALIDACION_NOMBRE_CARRERA],
      duracion: [this.carrera ? this.carrera.duracion : '',VALIDACION_DURACION_CARRERA],
    });
  }

  private _verificarCamposFormulario() {
    this.verificarCampoFormControl('nombre', MENSAJES_VALIDACION_NOMBRE_CARRERA);
    this.verificarCampoFormControl('duracion', MENSAJES_VALIDACION_DURACION_CARRERA);
  }

  private _verificarFormulario() {
    const formularioFormGroup = this.formularioCarrera;
    const subscriber = formularioFormGroup
      .valueChanges
      .subscribe(
        formulario => {
          const UsuarioValidada = formularioFormGroup.valid;
          if (UsuarioValidada) {
            this.carreraValida.emit(formulario);
          } else {
            this.carreraValida.emit(false);
          }
        }
      );
    this.subscribers.push(subscriber);
  }

  setearValorSelect(campo) {
    const esString = typeof campo === 'string';
    return esString ? JSON.parse(campo) : campo;
  }
  verificarCampoFormControl(campo, mensajeValidacion) {
    const campoFormControl = this.formularioCarrera.get(campo);
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
