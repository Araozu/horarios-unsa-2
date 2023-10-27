import { StyleSheet, css } from "aphrodite"
import { estilosGlobales } from "../../Estilos"
import { For, createSignal, createMemo, createEffect, onCleanup } from "solid-js"
import { Dia } from "../../Store"
import { DatosGrupo } from "../../types/DatosHorario"
import { TablaObserver } from "../TablaObserver"

const e = StyleSheet.create({
    celdaComun: {
        width: "20%",
        textAlign: "center",
        padding: "0 0.7rem",
        boxSizing: "border-box",
        userSelect: "none",
    },
    celdaCurso: {
        display: "inline-block",
        padding: "0.25rem 0.35rem",
        cursor: "pointer",
        borderRadius: "5px",
        // transition: "background-color 100ms, color 100ms"
    },
    celdaResaltado: {
        // color: "#151515"
    },
    celdaCursoTeoria: {
        fontWeight: "bold",
    },
    celdaCursoLab: {
        fontStyle: "italic",
    },
    celdaSeleccionado: {
        textDecoration: "underline",
        backgroundColor: "rgba(200, 200, 200, 0.3)",
    },
    celdaOculto: {
        opacity: 0.3,
    },
    celdaResaltadoOculto: {
        opacity: 0.7,
    },
    celdaResaltadoSeleccionado: {
        textDecoration: "underline",
    },
})

const eColores = StyleSheet.create({
    lunes: {
        backgroundColor: "rgba(33,150,243,1)",
    },
    martes: {
        backgroundColor: "rgba(255,214,0 ,1)",
        color: "#151515",
    },
    miercoles: {
        backgroundColor: "rgba(236,64,122 ,1)",
    },
    jueves: {
        backgroundColor: "rgba(29,233,182 ,1)",
        color: "#151515",
    },
    viernes: {
        backgroundColor: "rgba(244,67,54,1)",
    },
})

const clasesColores = {
    Lunes: css(eColores.lunes),
    Martes: css(eColores.martes),
    Miercoles: css(eColores.miercoles),
    Jueves: css(eColores.jueves),
    Viernes: css(eColores.viernes),
}

interface DatosProps {
    id: string,
    txt: string,
    esLab: boolean,
    datosGrupo: DatosGrupo,
    fnSeleccionar: () => void
}

interface Props {
    /**
     * Informacion de los cursos a renderizar en la celda
     *
     * id - Identificador unico del grupo: 20200912_1er_PW1_T_A
     *
     * txt - El nombre a renderizar
     *
     * esLab - Boolean que indica si el grupo es de laboratorio
     */
    datos: DatosProps[],
    fnResaltarFila: () => void,
    fnDesresaltarFila: () => void,
    dia: Dia,
    tablaObserver: TablaObserver,
}

const claseSeldaSeleccionada = css(e.celdaSeleccionado)

function RenderFila(datos: DatosProps, props: Props) {
    const id = datos.id
    const txt = datos.txt
    const esLab = datos.esLab
    const fnSeleccionar = datos.fnSeleccionar

    const estadoCeldaMemo = props.tablaObserver.registrarConId(id, datos.datosGrupo)

    const [estabaResaltado, setEstabaResaltado] = createSignal(false)

    // Limpiar los memos, porque cuando se desmonta la celda esos memos quedan sin efecto
    onCleanup(() => {
        props.tablaObserver.limpiar(id)
    })

    const clases = createMemo(
        () => {
            const clases = [
                e.celdaCurso,
                esLab ? e.celdaCursoLab : e.celdaCursoTeoria,
            ]
            let adicional = ""

            const estadoCelda = estadoCeldaMemo()

            switch (estadoCelda) {
                case "Normal": {
                    if (estabaResaltado()) {
                        props.fnDesresaltarFila()
                        setEstabaResaltado(false)
                    }

                    break
                }
                case "Oculto": {
                    if (estabaResaltado()) {
                        props.fnDesresaltarFila()
                        setEstabaResaltado(false)
                    }

                    clases.push(e.celdaOculto)
                    break
                }
                case "Resaltado": {
                    props.fnResaltarFila()
                    setEstabaResaltado(true)
                    clases.push(e.celdaResaltado)
                    adicional = clasesColores[props.dia]
                    break
                }
                case "Seleccionado": {
                    if (estabaResaltado()) {
                        props.fnDesresaltarFila()
                        setEstabaResaltado(false)
                    }

                    clases.push(e.celdaSeleccionado)
                    break
                }
                case "ResaltadoOculto": {
                    props.fnResaltarFila()
                    setEstabaResaltado(true)

                    clases.push(e.celdaResaltadoOculto)
                    adicional = clasesColores[props.dia]
                    break
                }
                case "ResaltadoSeleccionado": {
                    props.fnResaltarFila()
                    setEstabaResaltado(true)

                    clases.push(e.celdaResaltadoSeleccionado)
                    adicional = clasesColores[props.dia]
                    break
                }
            }

            return `${css(...clases)} ${adicional}`
        },
        undefined,
        (x, y) => x === y,
    )

    return (
        <button className={clases()}
            onMouseEnter={() => {
                props.tablaObserver.resaltar(id)
            }}
            onMouseLeave={() => {
                props.tablaObserver.quitarResaltado()
            }}
            onClick={fnSeleccionar}
        >
            {txt}
        </button>
    )
}

export function CeldaFila(props: Props) {
    const datos = props.datos

    return (
        <div className={css(e.celdaComun, estilosGlobales.inlineBlock)}>
            <For each={datos}>
                {(datos) => RenderFila(datos, props)}
            </For>
        </div>
    )
}
