import { createMemo, createEffect, untrack } from "solid-js"
import {createStore, SetStoreFunction, Store, produce} from "solid-js/store"
import { DatosGrupo } from "../types/DatosHorario"

const createMemoDefault = <T>(f: () => T) => createMemo<T>(
    f,
    undefined,
    {
        equals: (x, y) => x === y,
    },
)

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

type EstadoSeleccionado =
    | "Seleccionado"
    | "Oculto"
    | "Normal"

interface IResaltado {
    anio?: string,
    curso?: string,
    esLab?: boolean,
    grupo?: string,
}

interface ISeleccionado {
    [anio: string]: {
        [curso: string]: {
            Laboratorio: string[]
            Teoria: string[]
        },
    },
}

export class TablaObserver {

    private readonly resaltado: Store<IResaltado>
    private readonly setResaltado: SetStoreFunction<IResaltado>
    private memos: { [id: string]: () => EstadoCelda } = {}

    private readonly seleccionado: Store<ISeleccionado>
    private readonly setSeleccionado: SetStoreFunction<ISeleccionado>

    constructor() {
        const [resaltado, setResaltado] = createStore<IResaltado>({
            anio: undefined,
            curso: undefined,
            esLab: undefined,
            grupo: undefined,
        })
        this.resaltado = resaltado
        this.setResaltado = setResaltado

        const [seleccionado, setSeleccionado] = createStore<ISeleccionado>({})
        this.seleccionado = seleccionado
        this.setSeleccionado = setSeleccionado
    }

    /**
     * Crea un memo que indica el estado de la celda
     * @param anio El año
     * @param curso Curso abreviado
     * @param esLab Si es laboratorio
     * @param grupo Una única letra
     * @param datosGrupo Contiene `seleccionado`, se usa ese valor reactivo
     */
    private registrar(
        anio: string,
        curso: string,
        esLab: boolean,
        grupo: string,
        datosGrupo: DatosGrupo,
    ): () => EstadoCelda {
        const resaltado = this.resaltado
        const resaltadoMemo = createMemoDefault(() => {
            if (resaltado.anio === anio && resaltado.curso === curso) {
                if (resaltado.esLab === undefined) {
                    return true
                } else if (resaltado.esLab !== esLab) {
                    return false
                } else {
                    if (resaltado.grupo === undefined) {
                        return true
                    } else return resaltado.grupo === grupo
                }
            } else {
                return false
            }
        })

        // Registrar curso en `seleccionado`
        this.setSeleccionado((obj: Store<ISeleccionado>) => {
            const nuevoObj = {...obj}

            if (!nuevoObj[anio]) {
                nuevoObj[anio] = {}
            }

            if (!nuevoObj[anio][curso]) {
                nuevoObj[anio][curso] = {
                    Laboratorio: [],
                    Teoria: [],
                }
            }

            return nuevoObj
        })

        // Crear un effect para que cada vez que la celda se seleccione se actualize `seleccionado`
        createEffect(() => {
            const seleccionado = datosGrupo.seleccionado
            if (seleccionado) {
                this.setSeleccionado(anio, curso, esLab ? "Laboratorio" : "Teoria", (x) => [...x, grupo])
            } else {
                this.setSeleccionado(anio, curso, esLab ? "Laboratorio" : "Teoria", (x) => x.filter((x) => x !== grupo))
            }
        })

        const seleccionadoMemo = createMemoDefault<EstadoSeleccionado>(() => {
            const gruposSeleccionados = this.seleccionado[anio][curso][esLab ? "Laboratorio" : "Teoria"]

            if (gruposSeleccionados.length > 0) {
                return gruposSeleccionados.find((x) => x === grupo) ? "Seleccionado" : "Oculto"
            } else {
                return "Normal"
            }
        })

        return createMemoDefault((): EstadoCelda => {
            const resaltado = resaltadoMemo()
            const seleccionado = seleccionadoMemo()

            switch (seleccionado) {
                case "Normal": {
                    return resaltado ? "Resaltado" : "Normal"
                }
                case "Oculto": {
                    return resaltado ? "ResaltadoOculto" : "Oculto"
                }
                case "Seleccionado": {
                    return resaltado ? "ResaltadoSeleccionado" : "Seleccionado"
                }
                default: {
                    let _: never
                    // eslint-disable-next-line prefer-const
                    _ = seleccionado
                    return _
                }
            }
        })
    }

    /**
     * Crea un memo que indica el estado de la celda a partir de un id
     * @param id Id a registrar - YYYYMMDD_Año_Curso[\_Lab[_Grupo]]
     * @param datosGrupo Contiene `seleccionado`, se usa ese valor reactivo
     */
    registrarConId(id: string, datosGrupo: DatosGrupo): () => EstadoCelda {
        if (this.memos[id]) {
            return this.memos[id]
        }

        const [, anio, curso, lab, grupo] = id.split("_")
        const memo = this.registrar(anio, curso, lab === "L", grupo, datosGrupo)
        this.memos[id] = memo
        return memo
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

        let esLab: boolean | undefined
        if (lab === undefined) {
            esLab = undefined
        } else {
            esLab = lab === "L"
        }
        this.setResaltado({
            anio,
            curso,
            esLab,
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

    limpiar(id: string) {
        delete this.memos[id]
    }
}
