import { Component, OnInit } from "@angular/core";
import { ProfesorInterface } from "src/app/interfaces/interfaces/profesor.interface";
import { NUMERO_FILAS_TABLAS } from "src/app/constantes/numero-filas-tablas";
import { QueryParamsInterface } from "src/app/interfaces/interfaces/query-params.interface";
import { ProfesorRestService } from "src/app/servicios/rest/servicios/profesor-rest.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CargandoService } from "src/app/servicios/cargando-service/cargando-service";
import { ToasterService } from "angular2-toaster";
import { MatDialog } from "@angular/material";
import { CrearEditarProfesorComponent } from "../../modales/crear-editar-profesor/crear-editar-profesor.component";

@Component({
  selector: "app-ruta-gestion-profesores",
  templateUrl: "./ruta-gestion-profesores.component.html",
  styleUrls: ["./ruta-gestion-profesores.component.scss"]
})
export class RutaGestionProfesoresComponent implements OnInit {
  profesores: ProfesorInterface[];

  columnas = [
    { field: "id", header: "Código", width: "10%" },
    { field: "cedula", header: "Cédula", width: "15%" },
    { field: "nombre", header: "Nombre", width: "15%" },
    { field: "apellido", header: "Apellido", width: "15%" },
    { field: "telefono", header: "Teléfono", width: "20%" },
    { field: "correo", header: "Correo", width: "30%" },
    { field: "tipoContrato", header: "Contrato", width: "15%" },
    {
      field: "fechaContratacion",
      header: "Fecha de Contratación",
      width: "20%"
    },
    {
      field: "acciones",
      header: "Acciones",
      width: "20%"
    }
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
    private readonly _profesorService: ProfesorRestService,
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

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe(
      queryParams => {
        this.queryParams.skip = queryParams.skip ? +queryParams.skip : 0;
        this.queryParams.where = queryParams.where
          ? JSON.parse(queryParams.where)
          : {};
        this.queryParams.where.tipo = this.queryParams.where.tipo
          ? this.queryParams.where.tipo
          : undefined;
        // tslint:disable-next-line:max-line-length
        this.queryParams.where.habilitado =
          this.queryParams.where.habilitado === 0 ||
          this.queryParams.where.habilitado === 1
            ? this.queryParams.where.habilitado
            : undefined;
        this.queryParams.where.nivelJuego = this.queryParams.where.nivelJuego
          ? this.queryParams.where.nivelJuego
          : undefined;
      },
      error => {
        console.error("Error en acceder a la ruta");
      }
    );
  }

  buscarPorNombre(busqueda: string) {
    this.busqueda = busqueda.trim();
    this.filterpost = this.busqueda;
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.skip = event.first;
    this.buscar(this.queryParams.skip);
  }

  buscar(skip: number) {
    const consulta = {
      where: this.queryParams.where,
      skip,
      take: this.rows,
      order: { id: "DESC" }
    };
    this._profesorService.findAll().subscribe(
      (respuesta: [ProfesorInterface[], number]) => {
        this.profesores = respuesta[0];
        this.totalRecords = respuesta[1];
        console.log("records", this.profesores);
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
          "Error al cargar los profesores"
        );
      }
    );
  }

  abrirDialogo(profesorSeleccionado?): void {
    const dialogRef = this.dialogo.open(CrearEditarProfesorComponent, {
      data: { profesor: profesorSeleccionado }
    });
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$.subscribe(
      (registroCreado: ProfesorInterface) => {
        if (registroCreado) {
          if (profesorSeleccionado) {
            const indiceRegistro = this.profesores.indexOf(
              profesorSeleccionado
            );
            this.profesores[indiceRegistro] = registroCreado;
            this._toasterService.pop("success", "", "Profesor actualizado");
          } else {
            this._toasterService.pop(
              "success",
              "",
              "Profesor registrado exitosamente"
            );
            this.profesores.unshift(registroCreado);
          }
        }
      },
      error => {
        if (profesorSeleccionado) {
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(
            "error",
            "Error",
            "No se actualizo el profesor"
          );
        } else {
          this._cargandoService.deshabilitarCargando();
          this._toasterService.pop(
            "error",
            "Error",
            "Se produjo un error al guardar el profesor"
          );
        }
      }
    );
  }
}
