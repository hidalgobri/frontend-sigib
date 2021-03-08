import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {PrincipalRestService} from '../rest-principal.service';
import {environment} from '../../../../environments/environment';
import {UsuarioInterface} from '../../../interfaces/interfaces/usuario.interface';
import {Observable} from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class UsuarioRestService extends PrincipalRestService<UsuarioInterface> {
  constructor(
    // tslint:disable-next-line:variable-name
    public readonly _http: HttpClient,
  ) {
    // @ts-ignore
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'usuario';
  }

  obtenerUsuariosLike(
    datos,
  ): Observable<any> {
    return this._http.get(
      this.url +
      `:${this.port}/${
        this.segmento
      }/buscar-usuarios-like?datos=${JSON.stringify(
        datos,
      )}`,
    );
  }
}
