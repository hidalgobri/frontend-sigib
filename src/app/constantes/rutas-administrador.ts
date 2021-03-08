import {AdministradorGuard} from '../servicios/guard/administrador.guard';

export const RUTAS_ADMINISTRADOR = [
  {
    path: 'administrador',
    loadChildren: () => import('../modulos/administrador/administrador.module').then(mod => mod.AdministradorModule),
  }
];
