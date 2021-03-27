import { StyleSheet, css } from "aphrodite"
import { createMemo, For, SetStateFunction } from "solid-js"
import { estilosGlobales } from "../Estilos"
import { Cursos, ListaCursosUsuario, DataProcesada } from "../types/DatosHorario"
import { Dia, dias, horas } from "../Store"
import { FilaTabla } from "./Tabla/FilaTabla"
import { TablaObserver } from "./TablaObserver"

export const coloresBorde = Object.freeze([
    "rgba(33,150,243,1)",
    "rgba(255,214,0 ,1)",
    "rgba(236,64,122 ,1)",
    "rgba(29,233,182 ,1)",
    "rgba(244,67,54,1)",
])

export const diaANum = (d: Dia) => {
    switch (d) {
        case "Lunes":
            return 0
        case "Martes":
            return 1
        case "Miercoles":
            return 2
        case "Jueves":
            return 3
        case "Viernes":
            return 4
    }
}

const e = StyleSheet.create({
    fila: {
        position: "relative",
        zIndex: 2,
        transition: "background-color 250ms",
        marginLeft: "4.5rem",
        display: "flex",
        alignItems: "center",
        minHeight: "1.5rem",
        ":hover": {
            // backgroundColor: "rgba(200, 200, 200, 0.25)"
        },
    },
    filaBorde: {
        position: "absolute",
        top: 0,
        height: "1px",
        width: "100%",
        backgroundColor: "rgba(200, 200, 200, 0.25)",
        zIndex: 1,
    },
    celdaHora: {
        textAlign: "center",
        width: "4rem",
        padding: "0.25rem 0",
        position: "absolute",
        top: "-0.75rem",
    },
    celdaComun: {
        width: "20%",
        textAlign: "center",
        padding: "0 0.5rem",
        boxSizing: "border-box",
    },
    celdaDia: {
        padding: "0.3rem 0",
    },
    celdaCurso: {
        display: "inline-block",
        padding: "0.25rem 0.35rem",
        cursor: "pointer",
        borderRadius: "5px",
        transition: "background-color 100ms",
    },
    celdaCursoActiva: {
        backgroundColor: "rgba(200, 200, 200, 0.25)",
    },
    celdaCursoTeoria: {
        fontWeight: "bold",
    },
})

type FnSetCursosUsuarios = SetStateFunction<ListaCursosUsuario>;

const procesarAnio = (data: Cursos, anio: string, version: number, setCursosUsuarios: FnSetCursosUsuarios) => {
    const obj: DataProcesada = {}

    for (const [indiceCurso, curso] of Object.entries(data)) {
        if (curso.oculto) continue

        const nombreAbreviado = curso.abreviado

        for (const [grupoStr, grupo] of Object.entries(curso.Teoria)) {
            for (const hora of grupo.Horas) {
                const dia = hora.substring(0, 2)
                const horas = hora.substring(2, 4)
                const minutos = hora.substr(4)

                const horaCompleta = `${horas}:${minutos}`

                const id = `${version}_${anio}_${nombreAbreviado}_T_${grupoStr}`

                if (!(horaCompleta in obj)) {
                    obj[horaCompleta] = {}
                }

                if (!(dia in obj[horaCompleta])) {
                    obj[horaCompleta][dia] = []
                }

                obj[horaCompleta][dia].push({
                    id,
                    txt: `${nombreAbreviado} ${grupoStr}`,
                    esLab: false,
                    datosGrupo: grupo,
                    fnSeleccionar: () => {
                        /// @ts-ignore
                        setCursosUsuarios("cursos", indiceCurso, "Teoria", grupoStr, "seleccionado", (x) => !x)
                    },
                })
            }
        }

        for (const [grupoStr, grupo] of Object.entries(curso.Laboratorio ?? {})) {
            for (const hora of grupo.Horas) {
                const dia = hora.substring(0, 2)
                const horas = hora.substring(2, 4)
                const minutos = hora.substr(4)

                const horaCompleta = `${horas}:${minutos}`

                const id = `${version}_${anio}_${nombreAbreviado}_L_${grupoStr}`

                if (!(horaCompleta in obj)) {
                    obj[horaCompleta] = {}
                }

                if (!(dia in obj[horaCompleta])) {
                    obj[horaCompleta][dia] = []
                }

                obj[horaCompleta][dia].push({
                    id,
                    txt: `${nombreAbreviado} L${grupoStr}`,
                    esLab: true,
                    datosGrupo: grupo,
                    fnSeleccionar: () => {
                        /// @ts-ignore
                        setCursosUsuarios("cursos", indiceCurso, "Laboratorio", grupoStr, "seleccionado", (x) => !x)
                    },
                })
            }
        }
    }

    return obj
}

interface Props {
    data: Cursos,
    anio: string,
    version: number,
    setCursosUsuarios: SetStateFunction<ListaCursosUsuario>,
    tablaObserver: TablaObserver,
}

export function Tabla(props: Props) {
    const anio = () => props.anio.substring(0, props.anio.indexOf(" "))
    const data = createMemo(() => procesarAnio(props.data, anio(), props.version, props.setCursosUsuarios))

    const celdas = createMemo(() => {
        // Hace reaccionar a la reactividad de Solid
        props.data
        return (
            <For each={horas}>
                {(hora) => (
                    <FilaTabla
                        data={data()}
                        hora={hora}
                        tablaObserver={props.tablaObserver}
                    />
                )}
            </For>
        )
    })

    return (
        <div>
            <div className={css(e.fila)}>
                <For each={dias}>
                    {(dia) => (
                        <div className={css(e.celdaComun, estilosGlobales.inlineBlock, e.celdaDia)}>
                            {dia}
                        </div>
                    )}
                </For>
            </div>
            {celdas()}
        </div>
    )
}
