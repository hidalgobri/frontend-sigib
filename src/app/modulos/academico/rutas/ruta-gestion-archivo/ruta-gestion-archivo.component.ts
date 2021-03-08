import { Component, OnInit } from "@angular/core";
import { EstudianteInterface } from "src/app/interfaces/interfaces/estudiante.interface";
import { GradoInterface } from "src/app/interfaces/interfaces/grado.interface";
import { NUMERO_FILAS_TABLAS } from "src/app/constantes/numero-filas-tablas";
import { QueryParamsInterface } from "src/app/interfaces/interfaces/query-params.interface";
import { EstudianteRestService } from "src/app/servicios/rest/servicios/estudiante-rest.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CargandoService } from "src/app/servicios/cargando-service/cargando-service";
import { ToasterService } from "angular2-toaster";
import { MatDialog } from "@angular/material";
import { GradoRestService } from "src/app/servicios/rest/servicios/grado-rest.service";
import { CrearEditarGradoComponent } from "../../modales/crear-editar-grado/crear-editar-grado.component";

@Component({
  selector: "app-ruta-gestion-archivo",
  templateUrl: "./ruta-gestion-archivo.component.html",
  styleUrls: ["./ruta-gestion-archivo.component.scss"]
})
export class RutaGestionArchivoComponent implements OnInit {
  estudiantes: EstudianteInterface[];
  grados: GradoInterface[];

  columnas = [
    { field: "codigo", header: "Código", width: "10%" },
    { field: "cedula", header: "Cédula", width: "20%" },
    { field: "nombre", header: "Nombre", width: "20%" },
    { field: "apellido", header: "Apellido", width: "20%" },
    { field: "notaCurriculum", header: "Nota Promedio Carrera", width: "15%" },
    { field: "notaProyecto", header: "Nota Proyecto Final", width: "15%" },
    { field: "notaGrado", header: "Nota de Grado", width: "15%" },
  ];

  rows = NUMERO_FILAS_TABLAS;
  totalRecords: number;
  loading: boolean;
  queryParams: QueryParamsInterface = {};
  busqueda = "";
  ruta = [];
  filterpost = "";

  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _estudianteService: EstudianteRestService,
    // tslint:disable-next-line:variable-name
    private readonly _gradoService: GradoRestService,
    // tslint:disable-next-line:variable-name
    private readonly _activatedRoute: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private readonly _router: Router,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
    public dialogo: MatDialog
  ) {}

  ngOnInit() {}

  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.skip = event.first;
    this.buscar(this.queryParams.skip);
  }

  buscar(skip: number) {
    const consulta = {
      relations: ["grado"],
      skip,
      take: this.rows,
      order: { id: "DESC" }
    };
    this._estudianteService.findAll(JSON.stringify(consulta)).subscribe(
      (respuesta: [EstudianteInterface[], number]) => {
        this.estudiantes = respuesta[0];
        this.totalRecords = respuesta[1];
        console.log("records", this.estudiantes);
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
          "Error al cargar los estudiantes"
        );
      }
    );
  }

  abrirDialogo(gradoSeleccionado?): void {
    const dialogRef = this.dialogo.open(CrearEditarGradoComponent, {
      data: { grado: gradoSeleccionado }
    });
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe(
      (registroCreado: GradoInterface) => {
        if (registroCreado) {
          if (gradoSeleccionado) {
            const indiceRegistro = this.estudiantes.indexOf(gradoSeleccionado);
            this.grados[indiceRegistro] = registroCreado;
            this._toasterService.pop("success", "", "Grado actualizado");
          } else {
            this._toasterService.pop(
              "success",
              "",
              "Grado registrado exitosamente"
            );
            this.grados.unshift(registroCreado);
          }
        }
      },
      error => {
        if (gradoSeleccionado) {
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(
            "error",
            "Error",
            "No se actualizo el grado"
          );
        } else {
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(
            "error",
            "Error",
            "Se produjo un error al guardar el grado"
          );
        }
      }
    );
  }
}
