import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuOpcionesFacturacionComponent } from 'src/app/componentes/menu-opciones-facturacion/menu-opciones-facturacion/menu-opciones-facturacion.component';
import { RutaGestionFacturaComponent } from './rutas/ruta-gestion-factura/ruta-gestion-factura.component';
import { RutaGestionComprobanteComponent } from './rutas/ruta-gestion-comprobante/ruta-gestion-comprobante.component';
import { RutaGestionClienteComponent } from './rutas/ruta-gestion-cliente/ruta-gestion-cliente.component';


const routes: Routes = [
    {
    path: 'menu-factura',
    children: [
      {
        path: '',
        component: MenuOpcionesFacturacionComponent,
      },
      {
        path: 'factura',
        component: RutaGestionFacturaComponent
      },
      {
        path: 'comprobante',
        component:RutaGestionComprobanteComponent
      },
      {
        path: 'clientes',
        component:RutaGestionClienteComponent
      },
    ]
  },
  {
    path: '',
    redirectTo: 'menu-factura',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturaRoutingModule { }
