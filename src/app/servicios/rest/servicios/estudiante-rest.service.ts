import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {PrincipalRestService} from '../rest-principal.service';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import { EstudianteInterface } from 'src/app/interfaces/interfaces/estudiante.interface';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class EstudianteRestService extends PrincipalRestService<EstudianteInterface> {
  constructor(
    // tslint:disable-next-line:variable-name
    public readonly _http: HttpClient,
  ) {
    // @ts-ignore
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'estudiante';
  }
}
