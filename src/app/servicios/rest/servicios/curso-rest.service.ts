import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PrincipalRestService } from "../rest-principal.service";
import { environment } from "../../../../environments/environment";
import { CursoInterface } from "src/app/interfaces/interfaces/curso.interface";

@Injectable({
  providedIn: "root"
})
export class CursoRestService extends PrincipalRestService<CursoInterface> {
  constructor(
    public readonly _http: HttpClient
  ) {
    // @ts-ignore
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = "curso";
  }
}
