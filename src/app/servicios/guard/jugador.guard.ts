import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {CanActivate} from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

declare var window;

@Injectable()
export class JugadorGuard implements CanActivate {

  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _router: Router,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const idJuego = route.params.idJuego;
    const respuesta = window.prompt('Ingrese clave');
    return true;
  }


}
