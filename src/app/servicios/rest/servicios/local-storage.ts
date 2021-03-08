import {Inject, Injectable} from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { UsuarioSistemaInterface } from 'src/app/interfaces/interfaces/usuario-sistema';

@Injectable()
export class LocalStorageService {
  constructor(
    @Inject(LOCAL_STORAGE)
    // tslint:disable-next-line:variable-name
    private readonly _localStorage: StorageService
  ) {}

  public guardarEnLocalStorage(key: string, usuario: UsuarioSistemaInterface): void {
    this._localStorage.set(key, JSON.stringify(usuario));
  }

  public obtenerDatosLocalStorage(key?: string) {
    console.log(this._localStorage.get(`${key}`));
    return this._localStorage.get(`${key}`);
  }
}
