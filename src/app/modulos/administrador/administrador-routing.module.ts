import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaMenuAdministradorComponent} from './rutas/ruta-menu-administrador/ruta-menu-administrador.component';
import {MenuAjustesComponent} from '../../componentes/menu-ajustes/menu-ajustes/menu-ajustes.component';
import { RutaLoginComponent } from './rutas/ruta-login/ruta-login.component';
import { AdministradorGuard } from 'src/app/servicios/guard/administrador.guard';

const routes: Routes = [
  {
    path: 'login',
    component: RutaLoginComponent,
  },
  {
    path: 'menu',
    data: { tipoUsuario: 'administrador' },
    canActivate: [AdministradorGuard],
    children: [
      {
        path: '',
        component: RutaMenuAdministradorComponent
      },
      {
        path: 'configuraciones',
        loadChildren: () => import('../configuraciones/configuraciones.module').then(mod => mod.ConfiguracionesModule),
      },
      {
        path: 'inventario',
        loadChildren: () => import('../inventario/inventario.module').then(mod => mod.InventarioModule),
      },
      {
        path: 'academico',
        loadChildren: () => import('../academico/academico.module').then(mod => mod.AcademicoModule),
      },
            {
        path: 'facturacion',
        loadChildren: () => import('../factura/factura.module').then(mod => mod.FacturaModule),
      }
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
