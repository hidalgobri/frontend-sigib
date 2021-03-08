export function eliminarElementosRepetidosArreglo(arreglo: any[]) {
  const hash = {};
  return arreglo.filter((elemento: any) => {
    const exists = !hash[elemento] || false;
    hash[elemento] = true;
    return exists;
  });
}
