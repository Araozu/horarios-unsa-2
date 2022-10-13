
interface Curso {
    // Nombre completo del curso
    nombre: string,
    // Nombre del curso abreviado
    abreviado: string,
    // Información de las horas de teoria
    Teoria: {
        // grupo es una letra: A, B, C, D
        [grupo: string]: DatosGrupo,
    },
    // Información de las horas de laboratorio
    Laboratorio?: {
        // grupo es una letra: A, B, C, D
        [grupo: string]: DatosGrupo,
    },
}

interface DatosGrupo {
    // Nombre del docente de este grupo
    Docente: string,
    /*
        Las horas del curso en el siguiente formato: DD_HHMM
        DD puede ser Lu, Ma, Mi, Ju, Vi
        Ejm: Ma0850, Vi1640, Ju1550
    */
    Horas: string[]
}

// Exclusivo de un unico dia
type Input = {
    horaInicio: number,
    nroHoras: number,
}

type Output = {
    horaInicio: number,
    nroHoras: number,
    offset: number, // 0, 1, 2
    fraccion: number, // por cuanto dividir la celda. 1, 2, 3, ...
}

class MapaCeldas {
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

function generarMapaCeldas(entrada: Readonly<Array<Input>>): Array<Output> {
    const mapa = new MapaCeldas();
    const salida: Array<Output> = [];

    // Obtener los offsets de cada curso
    for (const input of entrada) {
        const offset = mapa.solicitar(input.horaInicio, input.nroHoras);
        salida.push({
            ...input,
            offset,
            fraccion: -1,
        });
    }

    // Generar las fracciones de cada curso
    for (const output of salida) {
        output.fraccion = mapa.generarFraccion(output.horaInicio, output.offset, output.nroHoras);
    }

    return salida;
}

describe("generarMapaCeldas", () => {
    it("vacio si input es vacio", () => {
        const input: Array<Input> = [];
        const output = generarMapaCeldas(input);
        expect(output.length).toBe(0);
    });

    it("funciona con 1 curso", () => {
        const input: Array<Input> = [
            {
                horaInicio: 0,
                nroHoras: 2,
            },
        ];
        const output = generarMapaCeldas(input)[0];
        expect(output).not.toBeUndefined();
        expect(output.offset).toBe(0);
        expect(output.fraccion).toBe(1);
    });

    it("funciona con 2 cursos", () => {
        const input: Array<Input> = [
            {
                horaInicio: 0,
                nroHoras: 2,
            },
            {
                horaInicio: 1,
                nroHoras: 3,
            },
        ];

        const output1 = generarMapaCeldas(input)[0];
        expect(output1.offset).toBe(0);
        expect(output1.fraccion).toBe(2);

        const output2 = generarMapaCeldas(input)[1];
        expect(output2.offset).toBe(1);
        expect(output2.fraccion).toBe(2);
    });
});

describe("MapaCeldas", () => {
    it("crea 1", () => {
        const mapa = new MapaCeldas();
        const input = {} as unknown as Input;
        const offset = mapa.solicitar(0, 2);
        expect(offset).toBe(0);
    });

    it("crea varios que no se solapan", () => {
        const mapa = new MapaCeldas();
        const input = {} as unknown as Input;
        let offset = mapa.solicitar(0, 2);
        expect(offset).toBe(0);
        offset = mapa.solicitar(4, 3);
        expect(offset).toBe(0);
        offset = mapa.solicitar(7, 4);
        expect(offset).toBe(0);
    });

    it("crea varios que se solapan", () => {
        const mapa = new MapaCeldas();
        const input = {} as unknown as Input;
        let offset = mapa.solicitar(0, 2);
        expect(offset).toBe(0);
        offset = mapa.solicitar(0, 2);
        expect(offset).toBe(1);
        offset = mapa.solicitar(0, 4);
        expect(offset).toBe(2);
    });

    it("crea varios que se solapan de formas diferentes", () => {
        /*
            x
            x x x
            y x x
            y x x
            y z x
              z
              z
         */
        const mapa = new MapaCeldas();
        const input = {} as unknown as Input;
        let offset = mapa.solicitar(0, 2);
        expect(offset).toBe(0);
        offset = mapa.solicitar(1, 3);
        expect(offset).toBe(1);
        offset = mapa.solicitar(1, 4);
        expect(offset).toBe(2);
        offset = mapa.solicitar(2, 3);
        expect(offset).toBe(0);
        offset = mapa.solicitar(4, 2);
        expect(offset).toBe(1);
    });

    it("genera offsets", () => {
        const mapa = new MapaCeldas();
        const input = {} as unknown as Input;
        let offset = mapa.solicitar(0, 2);
        expect(offset).toBe(0);
        let fraccion = mapa.generarFraccion(0, offset, 2);
        expect(fraccion).toBe(1);

        offset = mapa.solicitar(1, 3);
        fraccion = mapa.generarFraccion(1, offset, 3);
        expect(fraccion).toBe(2);

        mapa.solicitar(1, 4);
        mapa.solicitar(2, 3);
        offset = mapa.solicitar(4, 2);
        fraccion = mapa.generarFraccion(4, offset, 2);
        expect(fraccion).toBe(3);
    });
});

export {};
