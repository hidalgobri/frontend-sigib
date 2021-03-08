import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { EstudianteRestService } from "src/app/servicios/rest/servicios/estudiante-rest.service";
import { Estudiante } from "src/app/clases/estudiante";
import { FormGroup, FormBuilder } from "@angular/forms";
import {
  VALIDACION_CEDULA_ESTUDIANTE,
  VALIDACION_NOMBRE_ESTUDIANTE,
  VALIDACION_APELLIDO_ESTUDIANTE,
  VALIDACION_TELEFONO_ESTUDIANTE,
  VALIDACION_CORREO_ESTUDIANTE,
  VALIDACION_CARRERA_ESTUDIANTE,
  MENSAJES_VALIDACION_CEDULA_ESTUDIANTE,
  MENSAJES_VALIDACION_NOMBRE_ESTUDIANTE,
  MENSAJES_VALIDACION_APELLIDO_ESTUDIANTE,
  MENSAJES_VALIDACION_TELEFONO_ESTUDIANTE,
  MENSAJES_VALIDACION_CORREO_ESTUDIANTE
} from "src/app/constantes/validaciones-formulario/validacion-estudiante";
import { generarMensajesError } from "src/app/funciones/generar-mensajes-error";
import { debounceTime } from "rxjs/operators";
import { validarCedula } from "../../../../funciones/validar-cedula";
import { ToasterService } from "angular2-toaster";

@Component({
  selector: "app-formulario-estudiante",
  templateUrl: "./formulario-estudiante.component.html",
  styleUrls: ["./formulario-estudiante.component.scss"]
})
export class FormularioEstudianteComponent implements OnInit {
  @Output() estudianteValido: EventEmitter<
    EstudianteRestService | boolean
  > = new EventEmitter();
  @Input() estudiante: Estudiante;
  mensajesError = {
    cedula: [],
    nombre: [],
    apellido: [],
    telefono: [],
    correo: [],
    carrera: []
  };
  formularioEstudiante: FormGroup;
  subscribers = [];
  mostrarFormularioEstudiante = false;
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
    this.formularioEstudiante = undefined;
    this.subscribers.forEach(s => s.unsubscribe());
    this.subscribers = [];
    this.iniciarFormulario();
  }
  private _inicializarFormulario() {
    this.formularioEstudiante = this._formBuilder.group({
      cedula: [
        this.estudiante ? this.estudiante.cedula : "",
        VALIDACION_CEDULA_ESTUDIANTE
      ],
      nombre: [
        this.estudiante ? this.estudiante.nombre : "",
        VALIDACION_NOMBRE_ESTUDIANTE
      ],
      apellido: [
        this.estudiante ? this.estudiante.apellido : "",
        VALIDACION_APELLIDO_ESTUDIANTE
      ],
      telefono: [
        this.estudiante ? this.estudiante.telefono : "",
        VALIDACION_TELEFONO_ESTUDIANTE
      ],
      correo: [
        this.estudiante ? this.estudiante.correo : "",
        VALIDACION_CORREO_ESTUDIANTE
      ],
      carrera: [
        this.estudiante ? this.estudiante.carrera : "",
        VALIDACION_CARRERA_ESTUDIANTE
      ]
    });
  }

  private _verificarCamposFormulario() {
    this.verificarCampoFormControl(
      "cedula",
      MENSAJES_VALIDACION_CEDULA_ESTUDIANTE
    );
    this.verificarCampoFormControl(
      "nombre",
      MENSAJES_VALIDACION_NOMBRE_ESTUDIANTE
    );
    this.verificarCampoFormControl(
      "apellido",
      MENSAJES_VALIDACION_APELLIDO_ESTUDIANTE
    );
    this.verificarCampoFormControl(
      "telefono",
      MENSAJES_VALIDACION_TELEFONO_ESTUDIANTE
    );
    this.verificarCampoFormControl(
      "correo",
      MENSAJES_VALIDACION_CORREO_ESTUDIANTE
    );
    this.verificarCampoFormControl(
      "carrera",
      MENSAJES_VALIDACION_TELEFONO_ESTUDIANTE
    );
  }

  private _verificarFormulario() {
    const formularioFormGroup = this.formularioEstudiante;
    const subscriber = formularioFormGroup.valueChanges.subscribe(
      formulario => {
        const estudianteValido = formularioFormGroup.valid;
        if (estudianteValido) {
          this.estudianteValido.emit(formulario);
        } else {
          this.estudianteValido.emit(false);
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
    const campoFormControl = this.formularioEstudiante.get(campo);
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
        this._toasterService.pop("success", "", "Cédula Válida");
      } else {
        this._toasterService.pop("error", "Error", "Cédula no válida");
      }
    }
  }
}
