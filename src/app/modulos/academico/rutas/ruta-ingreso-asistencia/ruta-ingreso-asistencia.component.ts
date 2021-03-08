import { Component, OnInit } from "@angular/core";
import { CursoInterface } from "src/app/interfaces/interfaces/curso.interface";
import { NUMERO_FILAS_TABLAS } from "src/app/constantes/numero-filas-tablas";
import { QueryParamsInterface } from "src/app/interfaces/interfaces/query-params.interface";
import { VALIDACION_HORAS } from "src/app/constantes/validaciones-formulario/validacion-input";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { EstudianteRestService } from "src/app/servicios/rest/servicios/estudiante-rest.service";
import { CursoRestService } from "src/app/servicios/rest/servicios/curso-rest.service";
import { CargandoService } from "src/app/servicios/cargando-service/cargando-service";
import { ToasterService } from "angular2-toaster";
import { MatriculaRestService } from "src/app/servicios/rest/servicios/matricula-rest.service";
import { MatDialog } from "@angular/material";
import { RegistroAsistenciaRestService } from "src/app/servicios/rest/servicios/registro-asistencia-rest.service";
import { debounceTime } from "rxjs/operators";
import { EstudianteInterface } from "src/app/interfaces/interfaces/estudiante.interface";
import { RegistroAsistenciaInterface } from "src/app/interfaces/interfaces/registro-asistencia.interface";
import {NotasTablaInterface} from '../../../../interfaces/interfaces/notas-tabla.interface';

@Component({
  selector: "app-ruta-ingreso-asistencia",
  templateUrl: "./ruta-ingreso-asistencia.component.html",
  styleUrls: ["./ruta-ingreso-asistencia.component.scss"]
})
export class RutaIngresoAsistenciaComponent implements OnInit {
  idCurso: number;
  padre: CursoInterface;
  horas: any[];
  check = false;
  clonedhoras: { [s: string]: any; } = {};
  columnas = [
    { field: "cedula", header: "Cédula", width: "10%" },
    { field: "nombre", header: "Nombre", width: "20%" },
    {
      field: "horasAsistidas",
      header: "Número de horas asistidas",
      width: "20%"
    },
    { field: "acciones", header: "Acciones", width: "20%" }
  ];

  rows = NUMERO_FILAS_TABLAS;
  totalRecords: number;
  loading: boolean;
  queryParams: QueryParamsInterface = {};
  busqueda = "";
  ruta = [];
  nombreCurso = "";
  horaControl = new FormControl("", VALIDACION_HORAS);

  constructor(
    private _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _cargandoService: CargandoService,
    private readonly _toasterService: ToasterService,
    private readonly _cursoService: CursoRestService,
    private readonly _estudianteService: EstudianteRestService,
    private readonly _registroAsistenciaService: RegistroAsistenciaRestService,
    public dialogo: MatDialog
  ) {
    this.horaControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(valor => {});
  }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(param => {
      this.idCurso = +param.get("id");
      this._cursoService
        .findOne(this.idCurso)
        .subscribe((curso: CursoInterface) => {
          this.padre = curso;
          this.nombreCurso = curso.id + " " + curso.grupo;
        });
    });
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.skip = event.first;
    this.buscar(this.queryParams.skip);
  }
  buscar(skip: number) {
    const consulta = {
      relations: ["estudiante", "curso"],
      where: {
        curso: {
          id: this.idCurso
        }
      },
      skip,
      take: this.rows,
      order: { id: "DESC" }
    };
    this._registroAsistenciaService.findAll(JSON.stringify(consulta)).subscribe(
      (respuesta: [RegistroAsistenciaInterface[], number]) => {
        this.horas = respuesta[0].map(r => {
          const horas = {
            horasAsistidas: r.horasAsistidas,
            cedula: (r.estudiante as EstudianteInterface).cedula,
            nombre:
              (r.estudiante as EstudianteInterface).nombre +
              " " +
              (r.estudiante as EstudianteInterface).apellido,
            id: r.id
          };
          return horas;
        });
        this.totalRecords = respuesta[1];
        this.loading = false;
        this._router.navigate(this.ruta, {
          queryParams: {
            skip: this.queryParams.skip,
            where: JSON.stringify(this.queryParams.where)
          }
        });
      },
      error => {
        this.loading = false;
        console.error("Error en el servidor", error);
        this._toasterService.pop(
          "error",
          "Error",
          "Error al cargar materias de la carrera"
        );
      }
    );
  }

  onRowEditInit(hora) {
    console.log("Row edit initialized");
    this.clonedhoras[hora.cedula] = {...hora};
  }

  onRowEditSave(item) {
    this._cargandoService.habilitarCargando();
    const valor1 = this.validateEntero(item.horasAsistidas);
    if (valor1) {
      console.log("valores", item);
      const consulta = {
        where: {
          cedula: item.cedula
        }
      };
      this._estudianteService
        .findAll(JSON.stringify(consulta))
        .subscribe(respuesta => {
          const estudiante = respuesta[0][0];
          const idEstudiante = estudiante.id;
          const registroAsistencia: RegistroAsistenciaInterface = {
            horasAsistidas: item.horasAsistidas,
            estudiante: idEstudiante,
            curso: this.idCurso
          };
          this._registroAsistenciaService.updateOne(item.id, registroAsistencia).subscribe(
            r => {
              this._cargandoService.deshabilitarCargando();
              this._toasterService.pop(
                "success",
                "",
                "Asistencia registrada con éxito"
              );
            },
            error => {
              this._cargandoService.deshabilitarCargando();
              this._toasterService.pop(
                "error",
                "Error",
                "No se logro gurdar en la base de datos"
              );
            }
          );
        });
    } else {
      this._cargandoService.deshabilitarCargando();
      this._toasterService.pop(
        "error",
        "Error",
        "Las horas no válidas"
      );
    }
  }

  onRowEditCancel(hora, index: number) {
    console.log("Row edit cancelled");
    console.log('index', this.clonedhoras[hora.cedula]);
    this.horas[index] = this.clonedhoras[hora.cedula];
    delete this.clonedhoras[hora.cedula];
  }

  validateEntero(valor) {
    const RE = /^[0-9]+$/;
    if (RE.test(valor)) {
      return true;
    } else {
      return false;
    }
  }
}
