import { PrincipalRestService } from "../rest-principal.service";
import { GradoInterface } from "src/app/interfaces/interfaces/grado.interface";
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class GradoRestService extends PrincipalRestService<GradoInterface> {
  constructor(
    // tslint:disable-next-line:variable-name
    public readonly _http: HttpClient
  ) {
    // @ts-ignore
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = "grado";
  }
}
