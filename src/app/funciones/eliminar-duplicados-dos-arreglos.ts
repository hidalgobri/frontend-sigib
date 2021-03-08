export function eliminarDuplicadosDosArreglos(datos: eliminarDuplicadosArreglos): any[] {
  const arregloElementosNoDuplicados = [];
  for (const registro of datos.arregloUno) {
    const registroEnArreglo = datos.arregloDos.find(
      vendedor => registro[datos.llave] === vendedor[datos.llave],
    );
    const indiceRegistro = datos.arregloDos.indexOf(registroEnArreglo);
    if (indiceRegistro === -1) {
      arregloElementosNoDuplicados.push(registro);
    }
  }
  return arregloElementosNoDuplicados;
}

// tslint:disable-next-line:class-name
export interface eliminarDuplicadosArreglos {
  arregloUno: any[];
  arregloDos: any[];
  llave: string;
}
