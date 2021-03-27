import { createMemo, createState, SetStateFunction, State } from "solid-js"

/**
 * - Normal
 * - Oculto - Otro grupo seleccionado
 * - Resaltado - Cursor encima
 * - Seleccionado - Grupo escogido
 * - ResaltadoSeleccionado - Grupo escogido y cursor encima
 * - ResaltadoOculto - Otro grupo escogido y cursor encima
 */
type EstadoCelda =
    | "Normal"
    | "Oculto"
    | "Resaltado"
    | "Seleccionado"
    | "ResaltadoSeleccionado"
    | "ResaltadoOculto"

interface Datos {
    anio?: string,
    curso?: string,
    esLab?: boolean,
    grupo?: string,
}

export class TablaObserver {

    private readonly resaltado: State<Datos>
    private readonly setResaltado: SetStateFunction<Datos>
    private gruposSeleccionados = {}
    private memos: {[id: string]: () => EstadoCelda} = {};

    constructor() {
        const [resaltado, setResaltado] = createState<Datos>({
            anio: undefined,
            curso: undefined,
            esLab: undefined,
            grupo: undefined,
        })
        this.resaltado = resaltado
        this.setResaltado = setResaltado
    }

    /**
     * Crea un memo que indica el estado de la celda
     * @param anio El año
     * @param curso Curso abreviado
     * @param esLab Si es laboratorio
     * @param grupo Una única letra
     */
    private registrar(anio: string, curso: string, esLab: boolean, grupo: string): () => EstadoCelda {
        const resaltado = this.resaltado
        const resaltadoMemo = createMemo(
            () => {
                if (resaltado.anio === anio && resaltado.curso === curso) {
                    if (resaltado.esLab === undefined) {
                        return true
                    } else if (resaltado.esLab !== esLab) {
                        return false
                    } else {
                        if (resaltado.grupo === undefined) {
                            return true
                        } else return resaltado.grupo === grupo;
                    }
                } else {
                    return false
                }
            },
            undefined,
            (x, y) => x === y,
        )

        return createMemo(
            (): EstadoCelda => {
                if (resaltadoMemo()) {
                    return "Resaltado"
                } else {
                    return "Normal"
                }
            },
            undefined,
            (x, y) => x === y,
        )
    }

    /**
     * Crea un memo que indica el estado de la celda a partir de un id
     * @param id Id a registrar - YYYYMMDD_Año_Curso[\_Lab[_Grupo]]
     */
    registrarConId(id: string): () => EstadoCelda {
        if (this.memos[id]) {
            return this.memos[id]
        }

        const [, anio, curso, lab, grupo] = id.split("_")
        const memo = this.registrar(anio, curso, lab === "L", grupo)
        this.memos[id] = memo;
        return memo;
    }

    /**
     * Parsea el id y hace que las celdas registradas se actualizen adecuadamente
     * @param id Id a resaltar - YYYYMMDD_Año_Curso[\_Lab[_Grupo]]
     */
    resaltar(id: string) {
        const [, anio, curso, lab, grupo] = id.split("_")
        if (anio === undefined || curso === undefined) {
            console.error("Error al intentar resaltar celda: anio o curso son undefined:", anio, curso)
            return
        }

        this.setResaltado({
            anio,
            curso,
            esLab: lab === "L",
            grupo,
        })
    }

    quitarResaltado() {
        this.setResaltado({
            anio: undefined,
            curso: undefined,
            esLab: undefined,
            grupo: undefined,
        })
    }
}
