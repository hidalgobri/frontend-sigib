import { Injectable } from '@angular/core';
import { PrincipalRestService } from '../rest-principal.service';
import { ComprobanteInterface } from 'src/app/interfaces/interfaces/comprobante.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteRestService extends PrincipalRestService<ComprobanteInterface> {

  constructor(
    // tslint:disable-next-line:variable-name
    public readonly _http: HttpClient,
  ) {
    // @ts-ignore
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'comprobante';
  }
}
