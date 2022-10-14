import { GrupoDia } from "./Table";

export class MapaCeldas {
    // Almacena referencias a input
    private mapa: Map<number, Map<number, null>> = new Map();

    private disponible(nroFila: number, nroColumna: number): boolean {
        if (!this.mapa.has(nroFila)) return true;

        const fila = this.mapa.get(nroFila)!;

        return fila.has(nroColumna) === false;
    }

    private obtenerFilaOCrear(nro: number): Map<number, null> {
        if (!this.mapa.has(nro)) {
            const m = new Map<number, null>();
            this.mapa.set(nro, m);
            return m;
        }

        return this.mapa.get(nro)!;
    }

    // Devuelve el offset
    public solicitar(inicio: number, cantidad: number): number {
        const filas = [];
        for (let i = 0; i < cantidad; i += 1) filas.push(inicio + i);

        for (let offsetActual = 0; offsetActual < 8; offsetActual += 1) {
            let todasCeldasDisponibles = true;
            for (const fila of filas) {
                if (!this.disponible(fila, offsetActual)) {
                    todasCeldasDisponibles = false;
                    break;
                }
            }

            if (todasCeldasDisponibles) {
                // Crear estas celdas y almacenar
                filas.forEach((nroFila) => {
                    const fila = this.obtenerFilaOCrear(nroFila);
                    fila.set(offsetActual, null);
                });

                // Devolver nro de offset
                return offsetActual;
            }
        }

        throw new Error("Limite de celdas alcanzado");
    }

    public generarFraccion(nroFila: number, nroColumna: number, cantidad: number): number {
        let fraccionActual = 1;
        for (let i = 0; i < cantidad; i += 1) {
            const nroFilaActual = nroFila + i;
            const filaActual = this.mapa.get(nroFilaActual)!;
            const numeroColumnas = filaActual.size;
            if (numeroColumnas > fraccionActual) {
                fraccionActual = numeroColumnas;
            }
        }

        return fraccionActual;
    }
}

export function generarMapaCeldas(entrada: Readonly<Array<GrupoDia>>): Array<GrupoDia> {
    const mapa = new MapaCeldas();
    const salida: Array<GrupoDia> = [];

    // Obtener los offsets de cada curso
    for (const input of entrada) {
        const offset = mapa.solicitar(input.offsetVertical, input.nroHoras);
        salida.push({
            ...input,
            offsetHorizontal: offset,
            fraccion: -1,
        });
    }

    // Generar las fracciones de cada curso
    for (const output of salida) {
        output.fraccion = mapa.generarFraccion(output.offsetVertical, output.offsetHorizontal, output.nroHoras);
    }

    return salida;
}
