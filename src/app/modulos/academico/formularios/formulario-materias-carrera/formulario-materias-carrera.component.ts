import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MateriaInterface } from 'src/app/interfaces/interfaces/materia.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { VALIDACION_NOMBRE_MATERIA, VALIDACION_ANIO_MATERIA, VALIDACION_TIPO_MATERIA, MENSAJE_NOMBRE_MATERIA, MENSAJE_ANIO_MATERIA, MENSAJE_TIPO_MATERIA } from 'src/app/constantes/validaciones-formulario/validacion-materia';
import { debounceTime } from 'rxjs/operators';
import { generarMensajesError } from 'src/app/funciones/generar-mensajes-error';

@Component({
  selector: 'app-formulario-materias-carrera',
  templateUrl: './formulario-materias-carrera.component.html',
  styleUrls: ['./formulario-materias-carrera.component.scss']
})
export class FormularioMateriasCarreraComponent implements OnInit {

  @Output() materiaCarreraValida: EventEmitter<MateriaInterface | boolean> = new EventEmitter();
  @Input() materiaCarrera: MateriaInterface;
  @Input() carreraNombre: MateriaInterface;

  mensajesError = {
    nombre: [],
    anio: [],
    tipo: [],

  };
  formularioMateria: FormGroup;
  subscribers = [];

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _toasterService: ToasterService,
  ) {
  }

  ngOnInit() {
    this.iniciarFormulario();
    console.log('nombre de la carrera', this.carreraNombre);
  }

  iniciarFormulario() {
    this._inicializarFormulario();
    this._verificarCamposFormulario();
    this._verificarFormulario();
  }

  private _inicializarFormulario() {
    this.formularioMateria = this._formBuilder.group({
      nombre: [this.materiaCarrera ? this.materiaCarrera.nombre : '', VALIDACION_NOMBRE_MATERIA],
      anio: [this.materiaCarrera ? this.materiaCarrera.anio : '', VALIDACION_ANIO_MATERIA],
      tipo: [this.materiaCarrera ? this.materiaCarrera.tipoMateria : '', VALIDACION_TIPO_MATERIA],
      carrera: [this.carreraNombre],
    });
    this.formularioMateria.get('carrera').disable();
  }

  private _verificarCamposFormulario() {
    this.verificarCampoFormControl('nombre', MENSAJE_NOMBRE_MATERIA);
    this.verificarCampoFormControl('anio', MENSAJE_ANIO_MATERIA);
    this.verificarCampoFormControl('tipo', MENSAJE_TIPO_MATERIA);
  }

  private _verificarFormulario() {
    const formularioFormGroup = this.formularioMateria;
    const subscriber = formularioFormGroup
      .valueChanges
      .subscribe(
        formulario => {
          const materiaCarreraValida = formularioFormGroup.valid;
          if (materiaCarreraValida) {
            this.materiaCarreraValida.emit(formulario);
          } else {
            this.materiaCarreraValida.emit(false);
          }
        }, e => {
          console.error(e);
        }
      );
    this.subscribers.push(subscriber);
  }

  verificarCampoFormControl(campo, mensajeValidacion) {
    const campoFormControl = this.formularioMateria.get(campo);
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
