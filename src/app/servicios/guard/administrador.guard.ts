import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {CanActivate} from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import {Observable} from 'rxjs';

declare var user_id: string;

@Injectable()
export class AdministradorGuard implements CanActivate {

  constructor() {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('asdfasdfsadfsdf',route,state);
    const existenDatos = (user_id !== '');
    if (existenDatos) {
      return true;
    } else {
      return false;
    }
  }
}
