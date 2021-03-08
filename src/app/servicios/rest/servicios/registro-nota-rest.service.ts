import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {PrincipalRestService} from '../rest-principal.service';
import {environment} from '../../../../environments/environment';
import {RegistroNotaInterface} from '../../../interfaces/interfaces/registro-nota.interface';
import {Observable} from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class RegistroNotaRestService extends PrincipalRestService<RegistroNotaInterface> {
  constructor(
    // tslint:disable-next-line:variable-name
    public readonly _http: HttpClient,
  ) {
    // @ts-ignore
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'registro-nota';
  }
}
