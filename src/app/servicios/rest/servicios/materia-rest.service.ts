import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {PrincipalRestService} from '../rest-principal.service';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import { MateriaInterface } from 'src/app/interfaces/interfaces/materia.interface';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class MateriaRestService extends PrincipalRestService<MateriaInterface> {
  constructor(
    // tslint:disable-next-line:variable-name
    public readonly _http: HttpClient,
  ) {
    // @ts-ignore
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'materia';
  }
}
