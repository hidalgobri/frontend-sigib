import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AcademicoRoutingModule } from "./academico-routing.module";
import { RutaGestionCarrerasComponent } from "./rutas/ruta-gestion-carreras/ruta-gestion-carreras.component";
import { RutaGestionCursosComponent } from "./rutas/ruta-gestion-cursos/ruta-gestion-cursos.component";
import { RutaGestionEstudiantesComponent } from "./rutas/ruta-gestion-estudiantes/ruta-gestion-estudiantes.component";
import { RutaGestionArchivoComponent } from "./rutas/ruta-gestion-archivo/ruta-gestion-archivo.component";
import { MenuOpcionesAcademicoModule } from "src/app/componentes/menu-opciones-academico/menu-opciones-academico.module";
import { FormularioCarreraComponent } from "./formularios/formulario-carrera/formulario-carrera.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatInputModule,
  MatDialogModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule
} from "@angular/material";
import { TextMaskModule } from "angular2-text-mask";
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";
import { SelectGeneralModule } from "src/app/compartido/select-general/select-general.module";
import { PickListModule } from "primeng/picklist";
import { SeleccionarMateriasComponent } from "./componentes/seleccionar-materias/seleccionar-materias.component";
import { RutaVerComprobantesComponent } from "./rutas/ruta-ver-comprobantes/ruta-ver-comprobantes.component";
import { RutaVerHorariosComponent } from "./rutas/ruta-ver-horarios/ruta-ver-horarios.component";
import { RutaVerCurriculumComponent } from "./rutas/ruta-ver-curriculum/ruta-ver-curriculum.component";
import { RutaMatriculacionComponent } from "./rutas/ruta-matriculacion/ruta-matriculacion.component";
import { MenuOpcionesEstudianteModule } from "src/app/componentes/menu-opciones-estudiante/menu-opciones-estudiante.module";
import { RutaNotasEstudianteComponent } from "./rutas/ruta-notas-estudiante/ruta-notas-estudiante.component";
import { RutaCursoProfesorComponent } from "./rutas/ruta-curso-profesor/ruta-curso-profesor.component";
import { RutaAsistenciaEstudianteComponent } from "./rutas/ruta-asistencia-estudiante/ruta-asistencia-estudiante.component";
import { MenuProfesorModule } from "src/app/componentes/menu-profesor/menu-profesor.module";
import { RutaGestionProfesoresComponent } from "./rutas/ruta-gestion-profesores/ruta-gestion-profesores.component";
import { FormularioEstudianteComponent } from "./formularios/formulario-estudiante/formulario-estudiante.component";
import { CrearEditarEstudianteComponent } from "./modales/crear-editar-estudiante/crear-editar-estudiante.component";
import { FilterPipe } from "../../pipes/filter.pipe";
import { CrearEditarCarreraComponent } from "./modales/crear-editar-carrera/crear-editar-carrera.component";
import { RouterModule } from "@angular/router";
import { FormularioMateriasCarreraComponent } from "./formularios/formulario-materias-carrera/formulario-materias-carrera.component";
import { CrearEditarMateriasCarreraComponent } from "./modales/crear-editar-materias-carrera/crear-editar-materias-carrera.component";
import { RutaGestionMateriasCarreraComponent } from "./rutas/ruta-gestion-materias-carrera/ruta-gestion-materias-carrera.component";
import { FormularioGradoComponent } from './formularios/formulario-grado/formulario-grado.component';
import { CrearEditarGradoComponent } from './modales/crear-editar-grado/crear-editar-grado.component';
import { RutaIngresoNotasComponent } from './rutas/ruta-ingreso-notas/ruta-ingreso-notas.component';
import { RutaVerNominaComponent } from './rutas/ruta-ver-nomina/ruta-ver-nomina.component';
import { RutaIngresoAsistenciaComponent } from './rutas/ruta-ingreso-asistencia/ruta-ingreso-asistencia.component';
import {FormularioCursoComponent} from './formularios/formulario-curso/formulario-curso.component';
import {FormularioProfesorComponent} from './formularios/formulario-profesor/formulario-profesor.component';
import {CrearEditarProfesorComponent} from './modales/crear-editar-profesor/crear-editar-profesor.component';
import {CrearEditarCursoComponent} from './modales/crear-editar-curso/crear-editar-curso.component';

@NgModule({
  declarations: [
    RutaGestionCarrerasComponent,
    RutaGestionCursosComponent,
    RutaGestionEstudiantesComponent,
    RutaGestionArchivoComponent,
    FormularioCarreraComponent,
    CrearEditarCarreraComponent,
    SeleccionarMateriasComponent,
    RutaVerComprobantesComponent,
    RutaVerHorariosComponent,
    RutaVerCurriculumComponent,
    RutaMatriculacionComponent,
    RutaNotasEstudianteComponent,
    RutaCursoProfesorComponent,
    RutaAsistenciaEstudianteComponent,
    RutaGestionProfesoresComponent,
    FormularioEstudianteComponent,
    CrearEditarEstudianteComponent,
    FilterPipe,
    FormularioMateriasCarreraComponent,
    CrearEditarMateriasCarreraComponent,
    RutaGestionMateriasCarreraComponent,
    FormularioCursoComponent,
    CrearEditarCursoComponent,
    RutaIngresoNotasComponent,
    FormularioProfesorComponent,
    CrearEditarProfesorComponent,
    RutaVerNominaComponent,
    FormularioGradoComponent,
    CrearEditarGradoComponent,
    RutaIngresoAsistenciaComponent,
  ],
  imports: [
    CommonModule,
    AcademicoRoutingModule,
    MenuOpcionesAcademicoModule,
    MenuOpcionesEstudianteModule,
    MenuProfesorModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    TextMaskModule,
    DropdownModule,
    MatDialogModule,
    TableModule,
    MatSelectModule,
    SelectGeneralModule,
    MatOptionModule,
    PickListModule,
    MatButtonModule,
    RouterModule
  ],
  entryComponents: [
    CrearEditarCarreraComponent,
    CrearEditarEstudianteComponent,
    CrearEditarMateriasCarreraComponent,
    CrearEditarCursoComponent,
    CrearEditarProfesorComponent
  ]
})
export class AcademicoModule {}
