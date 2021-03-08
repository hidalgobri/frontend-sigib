import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { GradoRestService } from "src/app/servicios/rest/servicios/grado-rest.service";
import { Grado } from "src/app/clases/grado";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ToasterService } from "angular2-toaster";
import { VALIDACION_NOTA, MENSAJES_VALIDACION_NOTA } from 'src/app/constantes/validaciones-formulario/validacion-input';
import { debounceTime } from 'rxjs/operators';
import { generarMensajesError } from 'src/app/funciones/generar-mensajes-error';
import { Estudiante } from 'src/app/clases/estudiante';

@Component({
  selector: "app-formulario-grado",
  templateUrl: "./formulario-grado.component.html",
  styleUrls: ["./formulario-grado.component.scss"]
})
export class FormularioGradoComponent implements OnInit {
  @Output() gradoValido: EventEmitter<
    GradoRestService | boolean
  > = new EventEmitter();

  @Input() grado: Grado;
  @Input() estudiante: Estudiante;

  mensajesError = {
    notaProyecto: [],
    estudiante: []
  };

  formularioGrado: FormGroup;
  subscribers = [];
  mostrarFormularioGrado = false;

  constructor(
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
    this.formularioGrado = undefined;
    this.subscribers.forEach(s => s.unsubscribe());
    this.subscribers = [];
    this.iniciarFormulario();
  }
  private _inicializarFormulario() {
    this.formularioGrado = this._formBuilder.group({
      notaProyecto: [
        this.grado ? this.grado.notaProyecto : "",
        VALIDACION_NOTA
      ],
    });
    this.formularioGrado.get('estudiante').disable();
  }

  private _verificarCamposFormulario() {
    this.verificarCampoFormControl(
      "notaProyecto",
      MENSAJES_VALIDACION_NOTA
    );
  }

  private _verificarFormulario() {
    const formularioFormGroup = this.formularioGrado;
    const subscriber = formularioFormGroup.valueChanges.subscribe(
      formulario => {
        const gradoValido = formularioFormGroup.valid;
        if (gradoValido) {
          this.gradoValido.emit(formulario);
        } else {
          this.gradoValido.emit(false);
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
    const campoFormControl = this.formularioGrado.get(campo);
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
}
