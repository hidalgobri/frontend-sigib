import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export class PrincipalRestService<Entidad> {
  protected url: string;
  protected segmento: string;
  protected port: string;

  protected cabecerasGenerales: { headers: HttpHeaders };

  constructor(
    url,
    port,
    segmento,
    // tslint:disable-next-line:variable-name
    protected _http: HttpClient,
    private entidad?: string
  ) {
    this.url = url;
    this.port = port;
    this.segmento = segmento;
    setTimeout(
      () => {
      },
      1
    );
  }

  public establecerCabecerasGenerales(cabeceras: { headers: HttpHeaders }): void {
    if (cabeceras) {
      // tslint:disable-next-line:no-object-literal-type-assertion
      this.cabecerasGenerales.headers = {
        ...this.cabecerasGenerales.headers,
        ...cabeceras.headers
      } as HttpHeaders;
    }
  }

  public findAll(criterioBusqueda = '', cabeceras?: { headers: HttpHeaders }): Observable<[Entidad[], number]> {
    const url = this.url + this.port + '/' + this.segmento + `?criterioBusqueda=${criterioBusqueda}`;
    let cabecerasDePeticion;
    if (cabeceras) {
      cabecerasDePeticion = JSON.parse(JSON.stringify(this.cabecerasGenerales));
      cabecerasDePeticion.headers = {...cabecerasDePeticion.headers, ...cabeceras.headers};
    }
    return this._http
      .get(url, cabecerasDePeticion)
      .pipe(
        // tslint:disable-next-line:no-angle-bracket-type-assertion
        map((r: any) => {
          const respuesta: [Entidad[], number] = r;
          return respuesta;
        })
      );
  }

  public findOne(id: number | string, cabeceras?: { headers: HttpHeaders }): Observable<Entidad> {
    const url = this.url + ':' + this.port  + '/' + this.segmento + `/${id}`;
    let cabecerasDePeticion;
    if (cabeceras) {
      cabecerasDePeticion = JSON.parse(JSON.stringify(this.cabecerasGenerales));
      cabecerasDePeticion.headers = {...cabecerasDePeticion.headers, ...cabeceras.headers};
    }
    return this._http
      .get(url, cabecerasDePeticion)
      .pipe(
        // tslint:disable-next-line:no-angle-bracket-type-assertion
        map((r: any) => {
          const respuesta: Entidad = r;
          return respuesta;
        })
      );
  }

  public findWhereOr(criterioBusqueda, cabeceras?: { headers: HttpHeaders }): Observable<[Entidad[], number]> {
    const url = this.url+ this.port  + '/' + this.segmento + '/findWhereOr' + '?' + JSON.stringify(criterioBusqueda);
    let cabecerasDePeticion;
    if (cabeceras) {
      cabecerasDePeticion = JSON.parse(JSON.stringify(this.cabecerasGenerales));
      cabecerasDePeticion.headers = {...cabecerasDePeticion.headers, ...cabeceras.headers};
    }
    return this._http
      .get(url, cabecerasDePeticion)
      .pipe(
        // tslint:disable-next-line:no-angle-bracket-type-assertion
        map((r: any) => {
          const respuesta: [Entidad[], number] = r;
          return respuesta;
        })
      );
  }

  public count(criterioBusqueda = '', cabeceras?: { headers: HttpHeaders }): Observable<{ registros: number }> {
    const url = this.url+ this.port  + '/' + this.segmento + '/count';
    // const url = this.url + '/' + this.segmento + '/count' + '?' + JSON.stringify(criterioBusqueda);
    let cabecerasDePeticion;
    if (cabeceras) {
      cabecerasDePeticion = JSON.parse(JSON.stringify(this.cabecerasGenerales));
      cabecerasDePeticion.headers = {...cabecerasDePeticion.headers, ...cabeceras.headers};
    }
    return this._http
      .get(url, cabecerasDePeticion)
      .pipe(
        // tslint:disable-next-line:no-angle-bracket-type-assertion
        map((r: any) => {
          const respuesta: { registros: number } = r;
          return respuesta;
        })
      );
  }

  public create(registro: any, cabeceras?: { headers: HttpHeaders }): Observable<Entidad> {
    const url = this.url + this.port  + '/' + this.segmento + '';
    let cabecerasDePeticion;
    if (cabeceras) {
      cabecerasDePeticion = JSON.parse(JSON.stringify(this.cabecerasGenerales));
      cabecerasDePeticion.headers = {...cabecerasDePeticion.headers, ...cabeceras.headers};
    }
    return this._http
      .post(url, registro, cabecerasDePeticion)
      .pipe(
        // tslint:disable-next-line:no-angle-bracket-type-assertion
        map((r: any) => {
          const respuesta: Entidad = r;
          return respuesta;
        })
      );
  }

  public updateOne(id: number | string, actualizacion: any, cabeceras?: { headers: HttpHeaders }): Observable<Entidad> {
    const url = this.url + this.port + '/' + this.segmento + `/${id}`;
    let cabecerasDePeticion;
    if (cabeceras) {
      cabecerasDePeticion = JSON.parse(JSON.stringify(this.cabecerasGenerales));
      cabecerasDePeticion.headers = {...cabecerasDePeticion.headers, ...cabeceras.headers};
    }
    return this._http
      .put(url, actualizacion, cabecerasDePeticion)
      .pipe(
        // tslint:disable-next-line:no-angle-bracket-type-assertion
        map((r: any) => {
          const respuesta: Entidad = r;
          return respuesta;
        })
      );
  }

  public deleteOne(id: number | string, cabeceras?: { headers: HttpHeaders }): Observable<{ mensaje: string }> {
    const url = this.url+ this.port + '/' + this.segmento + `/${id}`;
    let cabecerasDePeticion;
    if (cabeceras) {
      cabecerasDePeticion = JSON.parse(JSON.stringify(this.cabecerasGenerales));
      cabecerasDePeticion.headers = {...cabecerasDePeticion.headers, ...cabeceras.headers};
    }
    return this._http
      .delete(url, cabecerasDePeticion)
      .pipe(
        // tslint:disable-next-line:no-angle-bracket-type-assertion
        map((r: any) => {
          const respuesta: { mensaje: string } = r;
          return respuesta;
        })
      );
  }

}
