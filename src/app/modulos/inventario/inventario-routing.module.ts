import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutaGestionInventarioComponent } from './rutas/ruta-gestion-inventario/ruta-gestion-inventario.component';


const routes: Routes = [
{
    path: 'producto',
    children: [
      {
        path: '',
        component: RutaGestionInventarioComponent,
      }
    ]
  },
  {
    path: '',
    redirectTo: 'producto',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }
