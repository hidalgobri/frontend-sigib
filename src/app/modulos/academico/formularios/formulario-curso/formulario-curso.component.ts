import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { CursoInterface } from "src/app/interfaces/interfaces/curso.interface";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MateriaInterface } from "../../../../interfaces/interfaces/materia.interface";
import { ProfesorInterface } from "../../../../interfaces/interfaces/profesor.interface";
import { MateriaRestService } from "../../../../servicios/rest/servicios/materia-rest.service";
import { ProfesorRestService } from "../../../../servicios/rest/servicios/profesor-rest.service";
import {
  MENSAJES_VALIDACION_AULA_CURSO,
  MENSAJES_VALIDACION_GRUPO_CURSO,
  MENSAJES_VALIDACION_HORARIO_CURSO,
  MENSAJES_VALIDACION_MATERIA_CURSO,
  MENSAJES_VALIDACION_MAXIMO_CURSO,
  MENSAJES_VALIDACION_PROFESOR_CURSO,
  MENSAJES_VALIDACION_PERIODO_ACADEMICO,
  VALIDACION_AULA_CURSO,
  VALIDACION_GRUPO_CURSO,
  VALIDACION_HORARIO_CURSO,
  VALIDACION_MATERIA_CURSO,
  VALIDACION_MAXIMO_CURSO,
  VALIDACION_PROFESOR_CURSO,
  VALIDACION_PERIODO_ACADEMICO
} from "../../../../constantes/validaciones-formulario/validacion-curso";
import { debounceTime, mergeMap } from "rxjs/operators";
import { generarMensajesError } from "../../../../funciones/generar-mensajes-error";

@Component({
  selector: "app-formulario-curso",
  templateUrl: "./formulario-curso.component.html",
  styleUrls: ["./formulario-curso.component.scss"]
})
export class FormularioCursoComponent implements OnInit {
  @Output() cursoValido: EventEmitter<
    CursoInterface | boolean
  > = new EventEmitter();
  @Input() curso: CursoInterface;
  mensajesError = {
    horario: [],
    aula: [],
    numeroMaximoAlumnos: [],
    profesor: [],
    materia: [],
    grupo: [],
    periodoAcademico: []
  };

  formularioCurso: FormGroup;
  subscribers = [];
  materia: MateriaInterface[];
  profesor: ProfesorInterface[];
  indiceArregloMateria: number;
  indiceArregloProfesor: number;

  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _formBuilder: FormBuilder,
    // tslint:disable-next-line:variable-name
    private readonly _materiaService: MateriaRestService,
    // tslint:disable-next-line:variable-name
    private readonly _profesorService: ProfesorRestService
  ) {}

  ngOnInit() {
    this.cargaMateriaProfesor();
  }

  iniciarFormulario() {
    this._inicializarFormulario();
    this._verificarCamposFormulario();
    this._verificarFormulario();
  }

  private _inicializarFormulario() {
    this.formularioCurso = this._formBuilder.group({
      horario: [this.curso ? this.curso.horario : "", VALIDACION_HORARIO_CURSO],
      grupo: [this.curso ? this.curso.grupo : "", VALIDACION_GRUPO_CURSO],
      aula: [this.curso ? this.curso.aula : "", VALIDACION_AULA_CURSO],
      numeroMaximoAlumnos: [
        this.curso ? this.curso.numeroMaximoAlumnos : "",
        VALIDACION_MAXIMO_CURSO
      ],
      periodoAcademico: [
        this.curso ? this.curso.periodoAcademico : "",
        VALIDACION_PERIODO_ACADEMICO
      ],
      profesor: [
        this.curso ? this.curso.profesor : "",
        VALIDACION_PROFESOR_CURSO
      ],
      materia: [this.curso ? this.curso.materia : "", VALIDACION_MATERIA_CURSO]
    });
  }

  private _verificarCamposFormulario() {
    this.verificarCampoFormControl(
      "horario",
      MENSAJES_VALIDACION_HORARIO_CURSO
    );
    this.verificarCampoFormControl("grupo", MENSAJES_VALIDACION_GRUPO_CURSO);
    this.verificarCampoFormControl("aula", MENSAJES_VALIDACION_AULA_CURSO);
    this.verificarCampoFormControl(
      "numeroMaximoAlumnos",
      MENSAJES_VALIDACION_MAXIMO_CURSO
    );
    this.verificarCampoFormControl(
      "periodoAcademico",
      MENSAJES_VALIDACION_PERIODO_ACADEMICO
    );
    this.verificarCampoFormControl(
      "profesor",
      MENSAJES_VALIDACION_PROFESOR_CURSO
    );
    this.verificarCampoFormControl(
      "materia",
      MENSAJES_VALIDACION_MATERIA_CURSO
    );
  }

  private _verificarFormulario() {
    const formularioFormGroup = this.formularioCurso;
    const subscriber = formularioFormGroup.valueChanges.subscribe(
      formulario => {
        const cursoValidado = formularioFormGroup.valid;
        if (cursoValidado) {
          formulario.materia = this.setearValorSelect(formulario.materia);
          formulario.profesor = this.setearValorSelect(formulario.profesor);
          this.cursoValido.emit(formulario);
        } else {
          this.cursoValido.emit(false);
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
    const campoFormControl = this.formularioCurso.get(campo);
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

  cargaMateriaProfesor() {
    this._materiaService
      .findAll()
      .pipe(
        mergeMap((materiaServicio: [MateriaInterface[], number]) => {
          this.materia = materiaServicio[0];
          return this._profesorService.findAll();
        })
      )
      .subscribe(
        (respuestaProfesores: [ProfesorInterface[], number]) => {
          this.profesor = respuestaProfesores[0];
          if (this.curso) {
            // tslint:disable-next-line:max-line-length
            this.indiceArregloMateria = this.curso.materia
              ? this.materia.findIndex(
                  materia =>
                    materia.id === (this.curso.materia as MateriaInterface).id
                )
              : -1;
            // tslint:disable-next-line:max-line-length
            this.indiceArregloProfesor = this.curso.profesor
              ? this.profesor.findIndex(
                  profesor =>
                    profesor.id ===
                    (this.curso.profesor as ProfesorInterface).id
                )
              : -1;
          }
          this.iniciarFormulario();
        },
        error => {
          console.log("este es el errror", error);
        }
      );
  }
}
