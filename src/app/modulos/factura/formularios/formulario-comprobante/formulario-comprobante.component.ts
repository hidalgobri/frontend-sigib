import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UsuarioInterface } from 'src/app/interfaces/interfaces/usuario.interface';
import { Usuario } from 'src/app/clases/usuario';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { generarMensajesError } from 'src/app/funciones/generar-mensajes-error';
import { Comprobante } from 'src/app/clases/comprobante';
import { ComprobanteInterface } from 'src/app/interfaces/interfaces/comprobante.interface';

@Component({
  selector: 'app-formulario-comprobante',
  templateUrl: './formulario-comprobante.component.html',
  styleUrls: ['./formulario-comprobante.component.scss']
})
export class FormularioComprobanteComponent implements OnInit {


  @Output() comprobanteValido: EventEmitter< ComprobanteInterface| boolean> = new EventEmitter();
  @Input() comprobante: Comprobante;
  mensajesError = {
    numero:[],
    fecha:[],
    ci: [],
    nombre:[],
    tipo:[],
    formapago: [],
    realizadop: [],
    comprobantep: [],
    beneficiario: [],
    estudiante: [],
  };
  formularioComprobante: FormGroup;
  subscribers = [];
  mostrarFormularioComprobante = false;
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
    this.formularioComprobante = this._formBuilder.group({
      numero:   [this.comprobante ? this.comprobante.numero : ''],
      fecha:    [this.comprobante ? this.comprobante.fecha : ''],
      ci: [this.comprobante ? this.comprobante.ci : '' ],
      nombre:[this.comprobante ? this.comprobante.nombre : ''],
      tipo:     [this.comprobante ? this.comprobante.tipo : ''],
      formapago: [this.comprobante ? this.comprobante.formapago : ''],
    });
  }

  private _verificarCamposFormulario() {
    this.verificarCampoFormControl('numero');
    this.verificarCampoFormControl('fecha');
    this.verificarCampoFormControl('ci');
    this.verificarCampoFormControl('nombre');
    this.verificarCampoFormControl('tipo');
    this.verificarCampoFormControl('formapago');
    this.verificarCampoFormControl('realizadop');
    this.verificarCampoFormControl('comprobantep');
    this.verificarCampoFormControl('beneficiario');
  }

  private _verificarFormulario() {
    const formularioFormGroup = this.formularioComprobante;
    const subscriber = formularioFormGroup
      .valueChanges
      .subscribe(
        formulario => {
          const comprobanteValido = formularioFormGroup.valid;
          if (comprobanteValido) {
            this.comprobanteValido.emit(formulario);
          } else {
            this.comprobanteValido.emit(false);
          }
        }
      );
    this.subscribers.push(subscriber);
  }

  setearValorSelect(campo) {
    const esString = typeof campo === 'string';
    return esString ? JSON.parse(campo) : campo;
  }
  verificarCampoFormControl(campo) {
    const campoFormControl = this.formularioComprobante.get(campo);
    const subscriber = campoFormControl
      .valueChanges
      .pipe(debounceTime(500))
      .subscribe(
        valor => {
          return true;
        }
      );
    this.subscribers.push(subscriber);
  }
}
