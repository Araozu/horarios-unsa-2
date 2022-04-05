import { estilosGlobales } from "../Estilos"
import { StyleSheet, css } from "aphrodite"
import { Tabla } from "./Tabla"
import { EstadoLayout } from "./ContenedorHorarios"
import { Switch, Match, createMemo } from "solid-js"
import {SetStoreFunction} from "solid-js/store"
import { BotonMaxMin } from "./BotonMaxMin"
import { BotonIcono } from "./BotonIcono"
import { Curso, Cursos, ListaCursosUsuario } from "../types/DatosHorario"
import { CursosElem } from "./CursosElem"
import { TablaObserver } from "./TablaObserver"

interface MiHorarioProps {
    estadoLayout: EstadoLayout,
    setEstadoLayout: (v: EstadoLayout) => EstadoLayout,
    cursosUsuario: ListaCursosUsuario,
    fnAgregarCurso: (c: Curso) => void,
    setCursosUsuarios: SetStoreFunction<ListaCursosUsuario>
}

const e = StyleSheet.create({
    horario: {},
    boton: {
        textDecoration: "none",
        // paddingRight: "0.5rem",
        "::before": {
            fontSize: "1rem",
            // transform: "translateY(0.2rem)",
            textDecoration: "none",
        },
    },
})

export function MiHorario(props: MiHorarioProps) {
    const tablaObserver = new TablaObserver()

    const datosMiHorario = createMemo(() => {
        const obj: Cursos = {}
        props.cursosUsuario.cursos.forEach((x, i) => {
            obj[i] = x
        })
        return obj
    })

    const fnMaximizar = () => props.setEstadoLayout("MaxPersonal")
    const fnMinimizar = () => props.setEstadoLayout("Normal")
    const estadoActualLayout = () => props.estadoLayout

    /* TODO: En barra superior colocar todos los horarios. En barra inferior el horario
        actual.
        Al hacer click en un horario de la barra superior, llevarlo al inicio de la lista.
    */
    return (
        <div>
            <Switch>
                <Match when={props.estadoLayout === "Normal" || props.estadoLayout === "MaxPersonal"}>

                    <div>
                        <div className={css(
                            estilosGlobales.inlineBlock,
                            estilosGlobales.contenedor,
                        )}
                        >
                        Mi horario
                        </div>
                    </div>

                    <div>
                        <div className={css(
                            estilosGlobales.inlineBlock,
                            estilosGlobales.contenedor,
                        )}
                        >
                            Mi horario
                        </div>
                        |
                        {/*
                        <BotonIcono
                            titulo={"Nuevo horario en blanco"}
                            icono={"ph-plus"}
                            onClick={() => {}}
                        />
                        <BotonIcono
                            titulo={"Reiniciar horario"}
                            icono={"ph-arrow-counter-clockwise"}
                            onClick={() => {}}
                        />
                        <BotonIcono
                            titulo={"Duplicar horario"}
                            icono={"ph-copy"}
                            onClick={() => {}}
                        />
                        <BotonIcono titulo={"Eliminar horario"}
                            icono={"ph-trash"}
                            onClick={() => {}}
                        />
                        |
                        */}
                        <BotonMaxMin
                            fnMaximizar={fnMaximizar}
                            fnMinimizar={fnMinimizar}
                            estadoActualLayout={estadoActualLayout}
                            estadoLayoutMax={"MaxPersonal"}
                        />
                    </div>

                    <div className={css(
                        e.horario,
                        estilosGlobales.contenedor,
                    )}
                    >
                        <Tabla
                            data={datosMiHorario()}
                            anio={"Mi horario"}
                            version={1}
                            setCursosUsuarios={props.setCursosUsuarios}
                            tablaObserver={tablaObserver}
                        />
                    </div>

                    <CursosElem
                        version={Math.floor(Math.random() * 1_000_000)}
                        anioActual={() => "Mi horario"}
                        dataAnio={datosMiHorario()}
                        fnAgregarCurso={props.fnAgregarCurso}
                        listaCursosUsuario={props.cursosUsuario}
                        esCursoMiHorario
                        setCursosUsuarios={props.setCursosUsuarios}
                        tablaObserver={tablaObserver}
                    />
                </Match>
                <Match when={props.estadoLayout === "MaxHorarios"}>
                    {/*
                    <BotonMaxMin
                        fnMaximizar={fnMaximizar}
                        fnMinimizar={fnMinimizar}
                        estadoActualLayout={estadoActualLayout}
                        estadoLayoutMax={"MaxPersonal"}
                    />
                    */}
                    <div />
                </Match>
            </Switch>
        </div>
    )
}
