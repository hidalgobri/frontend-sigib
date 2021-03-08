import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { ProfesorRestService } from "src/app/servicios/rest/servicios/profesor-rest.service";
import { Profesor } from "src/app/clases/profesor";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ToasterService } from "angular2-toaster";
import {
  VALIDACION_CEDULA_PROFESOR,
  VALIDACION_NOMBRE_PROFESOR,
  VALIDACION_APELLIDO_PROFESOR,
  VALIDACION_TELEFONO_PROFESOR,
  VALIDACION_CORREO_PROFESOR,
  VALIDACION_TIPO_CONTRATO_PROFESOR,
  VALIDACION_FECHA_CONTRATACION_PROFESOR,
  MENSAJES_VALIDACION_CEDULA_PROFESOR,
  MENSAJES_VALIDACION_NOMBRE_PROFESOR,
  MENSAJES_VALIDACION_APELLIDO_PROFESOR,
  MENSAJES_VALIDACION_TELEFONO_PROFESOR,
  MENSAJES_VALIDACION_CORREO_PROFESOR,
  MENSAJES_VALIDACION_TIPO_CONTRATO_PROFESOR,
  MENSAJES_VALIDACION_FECHA_CONTRATACION_PROFESOR
} from "src/app/constantes/validaciones-formulario/validacion-profesor";
import { debounceTime } from 'rxjs/operators';
import { generarMensajesError } from 'src/app/funciones/generar-mensajes-error';
import { validarCedula } from 'src/app/funciones/validar-cedula';

@Component({
  selector: "app-formulario-profesor",
  templateUrl: "./formulario-profesor.component.html",
  styleUrls: ["./formulario-profesor.component.scss"]
})
export class FormularioProfesorComponent implements OnInit {
  @Output() profesorValido: EventEmitter<
    ProfesorRestService | boolean
  > = new EventEmitter();

  @Input() profesor: Profesor;
  mensajesError = {
    cedula: [],
    nombre: [],
    apellido: [],
    telefono: [],
    correo: [],
    tipoContrato: [],
    fechaContratacion: []
  };

  formularioProfesor: FormGroup;
  subscribers = [];
  mostrarFormularioProfesor = false;

  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _formBuilder: FormBuilder,
    private readonly _toasterService: ToasterService
  ) {}

  ngOnInit() {
    this.iniciarFormulario();
  }

  iniciarFormulario() {
    this._inicializarFormulario();
    this._verificarCamposFormulario();
    this._verificarFormulario();
  }

  reiniciarFormulario() {
    this.formularioProfesor = undefined;
    this.subscribers.forEach(s => s.unsubscribe());
    this.subscribers = [];
    this.iniciarFormulario();
  }
  private _inicializarFormulario() {
    this.formularioProfesor = this._formBuilder.group({
      cedula: [
        this.profesor ? this.profesor.cedula : "",
        VALIDACION_CEDULA_PROFESOR
      ],
      nombre: [
        this.profesor ? this.profesor.nombre : "",
        VALIDACION_NOMBRE_PROFESOR
      ],
      apellido: [
        this.profesor ? this.profesor.apellido : "",
        VALIDACION_APELLIDO_PROFESOR
      ],
      telefono: [
        this.profesor ? this.profesor.telefono : "",
        VALIDACION_TELEFONO_PROFESOR
      ],
      correo: [
        this.profesor ? this.profesor.correo : "",
        VALIDACION_CORREO_PROFESOR
      ],
      tipoContrato: [
        this.profesor ? this.profesor.tipoContrario : "",
        VALIDACION_TIPO_CONTRATO_PROFESOR
      ],
      fechaContratacion: [
        this.profesor ? this.profesor.fechaContratacion : "",
        VALIDACION_FECHA_CONTRATACION_PROFESOR
      ]
    });
  }

  private _verificarCamposFormulario() {
    this.verificarCampoFormControl(
      "cedula",
      MENSAJES_VALIDACION_CEDULA_PROFESOR
    );
    this.verificarCampoFormControl(
      "nombre",
      MENSAJES_VALIDACION_NOMBRE_PROFESOR
    );
    this.verificarCampoFormControl(
      "apellido",
      MENSAJES_VALIDACION_APELLIDO_PROFESOR
    );
    this.verificarCampoFormControl(
      "telefono",
      MENSAJES_VALIDACION_TELEFONO_PROFESOR
    );
    this.verificarCampoFormControl(
      "correo",
      MENSAJES_VALIDACION_CORREO_PROFESOR
    );
    this.verificarCampoFormControl(
      "tipoContrato",
      MENSAJES_VALIDACION_TIPO_CONTRATO_PROFESOR
    );
    this.verificarCampoFormControl(
      "fechaContratacion",
      MENSAJES_VALIDACION_FECHA_CONTRATACION_PROFESOR
    );
  }

  private _verificarFormulario() {
    const formularioFormGroup = this.formularioProfesor;
    const subscriber = formularioFormGroup.valueChanges.subscribe(
      formulario => {
        const profesorValido = formularioFormGroup.valid;
        if (profesorValido) {
          this.profesorValido.emit(formulario);
        } else {
          this.profesorValido.emit(false);
        }
      }
    );
    this.subscribers.push(subscriber);
  }

  setearValorSelect(campo) {
    const esString = typeof campo === "string";
    return esString ? JSON.parse(campo) : campo;
  }

  verificarCampoFormControl(campo, mensajeValidacion) {
    const campoFormControl = this.formularioProfesor.get(campo);
    const subscriber = campoFormControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(valor => {
        this.mensajesError[campo] = generarMensajesError(
          campoFormControl,
          this.mensajesError[campo],
          mensajeValidacion
        );
      });
    this.subscribers.push(subscriber);
  }

  validarCedular(evento) {
    console.log("valor", evento);
    if (evento.length === 10) {
      const cedula = evento;
      const respuestaValidarCedula = validarCedula(cedula);
      if (respuestaValidarCedula) {
        this._toasterService.pop("success", '', "Cédula Válida");
      } else {
        this._toasterService.pop("error", "Error", "Cédula no válida");
      }
    }
  }
}
