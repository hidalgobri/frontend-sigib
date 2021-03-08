import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuOpcionesAcademicoComponent } from 'src/app/componentes/menu-opciones-academico/menu-opciones-academico/menu-opciones-academico.component';
import { RutaGestionCarrerasComponent } from './rutas/ruta-gestion-carreras/ruta-gestion-carreras.component';
import { RutaGestionCursosComponent } from './rutas/ruta-gestion-cursos/ruta-gestion-cursos.component';
import { RutaGestionEstudiantesComponent } from './rutas/ruta-gestion-estudiantes/ruta-gestion-estudiantes.component';
import { RutaGestionArchivoComponent } from './rutas/ruta-gestion-archivo/ruta-gestion-archivo.component';
import { MenuOpcionesEstudianteComponent } from 'src/app/componentes/menu-opciones-estudiante/menu-opciones-estudiante/menu-opciones-estudiante.component';
import { RutaVerComprobantesComponent } from './rutas/ruta-ver-comprobantes/ruta-ver-comprobantes.component';
import { RutaVerHorariosComponent } from './rutas/ruta-ver-horarios/ruta-ver-horarios.component';
import { RutaVerCurriculumComponent } from './rutas/ruta-ver-curriculum/ruta-ver-curriculum.component';
import { RutaMatriculacionComponent } from './rutas/ruta-matriculacion/ruta-matriculacion.component';
import { MenuProfesorComponent } from 'src/app/componentes/menu-profesor/menu-profesor/menu-profesor.component';
import { RutaNotasEstudianteComponent } from './rutas/ruta-notas-estudiante/ruta-notas-estudiante.component';
import { RutaCursoProfesorComponent } from './rutas/ruta-curso-profesor/ruta-curso-profesor.component';
import { RutaGestionProfesoresComponent } from './rutas/ruta-gestion-profesores/ruta-gestion-profesores.component';
import { RutaGestionMateriasCarreraComponent } from './rutas/ruta-gestion-materias-carrera/ruta-gestion-materias-carrera.component';
import {RutaIngresoNotasComponent} from './rutas/ruta-ingreso-notas/ruta-ingreso-notas.component';
import {RutaVerNominaComponent} from './rutas/ruta-ver-nomina/ruta-ver-nomina.component';
import {RutaAsistenciaEstudianteComponent} from './rutas/ruta-asistencia-estudiante/ruta-asistencia-estudiante.component';
import {RutaIngresoAsistenciaComponent} from './rutas/ruta-ingreso-asistencia/ruta-ingreso-asistencia.component';

const routes: Routes = [
  {
    path: "menu-academico",
    children: [
      {
        path: "",
        component: MenuOpcionesAcademicoComponent
      },
      {
        path: "carreras",
        children: [
          {
            path: "",
            component: RutaGestionCarrerasComponent
          },
          {
            path: ":id/materias",
            component: RutaGestionMateriasCarreraComponent
          }
        ]
      },
      {
        path: "cursos",
        component: RutaGestionCursosComponent
      },
      {
        path: "estudiantes",
        children: [
          {
            path: "",
            component: MenuOpcionesEstudianteComponent
          },
          {
            path: "ver-comprobantes",
            component: RutaVerComprobantesComponent
          },
          {
            path: "ver-horarios",
            component: RutaVerHorariosComponent
          },
          {
            path: "ver-curriculum",
            component: RutaVerCurriculumComponent
          },
          {
            path: "matriculacion",
            component: RutaMatriculacionComponent
          }
        ]
      },
      {
        path: "profesores",
        children: [
          {
            path: "",
            component: MenuProfesorComponent
          },
          {
            path: "notas-estudiante",
            children: [
              {
                path: "",
                component: RutaNotasEstudianteComponent
              },
              {
                path: ":id/notas",
                component: RutaIngresoNotasComponent
              }
            ]
          },
          {
            path: "cursos-profesor",
            children: [
              {
                path: '',
                component: RutaCursoProfesorComponent
              },
              {
                path: ':id/nomina',
                component: RutaVerNominaComponent,
              }
            ]
          },
          {
            path: "asistencia-estudiante",
            children: [
              {
                path: "",
                component: RutaAsistenciaEstudianteComponent
              },
              {
                path: ":id/asistencia",
                component: RutaIngresoAsistenciaComponent
              }
            ]
          }
        ]
      },
      {
        path: "archivo",
        component: RutaGestionArchivoComponent
      },
      {
        path: "gestion-profesores",
        component: RutaGestionProfesoresComponent
      },
      {
        path: "gestion-estudiantes",
        component: RutaGestionEstudiantesComponent
      }
    ]
  },
  {
    path: "",
    redirectTo: "menu-academico",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademicoRoutingModule {}
