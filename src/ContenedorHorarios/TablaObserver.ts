/**
 * - Normal
 * - Oculto - Otro grupo seleccionado
 * - Seleccionado - Cursor ensima
 * - Resaltado - Grupo seleccionado
 * - ResaltadoSeleccionado - Grupo seleccionado y cursor encima
 * - ResaltadoOculto - Otro grupo seleccionado y cursor encima
 */
import { createMemo, createState, SetStateFunction, State } from "solid-js";

type EstadoCelda =
    | "Normal"
    | "Oculto"
    | "Seleccionado"
    | "Resaltado"
    | "ResaltadoSeleccionado"
    | "ResaltadoOculto"

interface Datos {
    anio?: string,
    curso?: string,
    esLab?: boolean,
    grupo?: string
}

export class TablaObserver {

    private readonly resaltado: State<Datos>
    private readonly setResaltado: SetStateFunction<Datos>
    private gruposSeleccionados = {}

    constructor() {
        const [resaltado, setResaltado] = createState<Datos>({
            anio: undefined,
            curso: undefined,
            esLab: undefined,
            grupo: undefined
        });
        this.resaltado = resaltado;
        this.setResaltado = setResaltado;
    }

    // Cada celda se registra dando estos datos
    // Devuelve un memo con un valor de EstadoCelda,
    // el cual cada celda sabra como manejar
    registrar(anio: string, cursoAbreviado: string, esLab: boolean, grupo: string) {
        const fn = () => {

        };

        const memo = createMemo(
            fn,
            undefined,
            (x, y) => x === y
        );
    }

    resaltar(id: string) {

    }

    quitarResaltado() {
        this.setResaltado({
            anio: undefined,
            curso: undefined,
            esLab: undefined,
            grupo: undefined
        });
    }
}
