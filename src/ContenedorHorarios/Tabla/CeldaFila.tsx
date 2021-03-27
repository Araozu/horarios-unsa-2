import { StyleSheet, css } from "aphrodite"
import { estilosGlobales } from "../../Estilos"
import { For, createSignal, createMemo } from "solid-js"
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
    datos: {
        id: string,
        txt: string,
        esLab: boolean,
        datosGrupo: DatosGrupo,
        fnSeleccionar: () => void
    }[],
    fnResaltarFila: () => void,
    fnDesresaltarFila: () => void,
    dia: Dia,
    tablaObserver: TablaObserver,
}

const claseSeldaSeleccionada = css(e.celdaSeleccionado)

export function CeldaFila(props: Props) {
    const datos = props.datos

    return (
        <div className={css(e.celdaComun, estilosGlobales.inlineBlock)}>
            <For each={datos}>
                {(datos) => {
                    const id = datos.id
                    const txt = datos.txt
                    const esLab = datos.esLab
                    const fnSeleccionar = datos.fnSeleccionar

                    const estadoCeldaMemo = props.tablaObserver.registrarConId(id)

                    const [estabaResaltado, setEstabaResaltado] = createSignal(false)

                    const estaSeleccionado = createMemo(() => datos.datosGrupo.seleccionado)

                    const clases = createMemo(
                        () => {
                            const clases = [
                                e.celdaCurso,
                                esLab ? e.celdaCursoLab : e.celdaCursoTeoria,
                                estaSeleccionado() && e.celdaSeleccionado,
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

                                    // TODO
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

                                    break
                                }
                                case "ResaltadoOculto": {
                                    props.fnResaltarFila()
                                    setEstabaResaltado(true)

                                    break
                                }
                                case "ResaltadoSeleccionado": {
                                    props.fnResaltarFila()
                                    setEstabaResaltado(true)

                                    break
                                }
                            }

                            return `${css(...clases)} ${adicional}`
                        },
                        undefined,
                        (x, y) => x === y,
                    )

                    return (
                        <span className={clases()}
                              onMouseEnter={() => {
                                  props.tablaObserver.resaltar(id)
                              }}
                              onMouseLeave={() => {
                                  props.tablaObserver.quitarResaltado()
                              }}
                              onClick={fnSeleccionar}
                        >
                            {txt}
                        </span>
                    )
                }}
            </For>
        </div>
    )
}
