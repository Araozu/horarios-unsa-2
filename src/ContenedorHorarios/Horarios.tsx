import { Curso, Cursos, DatosHorario, ListaCursosUsuario } from "../types/DatosHorario"
import { batch, createMemo, createSignal, For, Match, SetStateFunction, Switch, untrack } from "solid-js"
import { css } from "aphrodite"
import { estilosGlobales } from "../Estilos"
import { Tabla } from "./Tabla"
import { CursosElem } from "./CursosElem"
import { EstadoLayout } from "./ContenedorHorarios"
import { BotonMaxMin } from "./BotonMaxMin"
import { useListaCursos } from "./useListaCursos"
import { TablaObserver } from "./TablaObserver"

interface HorariosProps {
    data: DatosHorario,
    estadoLayout: EstadoLayout,
    setEstadoLayout: (v: EstadoLayout) => EstadoLayout,
    fnAgregarCurso: (c: Curso) => void,
    listaCursosUsuario: ListaCursosUsuario,
    setCursosUsuarios: SetStateFunction<ListaCursosUsuario>
}

const {
    setListaCursos,
    agregarCursoALista,
    eliminarCursosDeLista,
} = useListaCursos()

export function Horarios(props: HorariosProps) {
    const [anioActual, setAnioActual] = createSignal("1er año")

    const tablaObserver = new TablaObserver()

    const elAnios = (
        <For each={Object.entries(props.data.años)}>
            {([nombre]) => {
                const clases = createMemo(() => {
                    const vAnio = anioActual()
                    return css(
                        estilosGlobales.contenedor,
                        estilosGlobales.inlineBlock,
                        estilosGlobales.contenedorCursor,
                        estilosGlobales.contenedorCursorSoft,
                        nombre === vAnio && estilosGlobales.contenedorCursorActivo,
                    )
                })

                return (
                    <button className={clases()} title={`Cambiar a ${nombre}`} onClick={() => setAnioActual(nombre)}>
                        {nombre}
                    </button>
                )
            }}
        </For>
    )

    const dataTabla = createMemo(() => {
        const anio = anioActual()
        const obj: Cursos = {}
        untrack(() => {
            const cursos = props.data.años[anio]
            batch(() => {
                eliminarCursosDeLista()

                let i = 0
                for (const [, curso] of Object.entries(cursos)) {
                    // El curso devuelto por esta fun. es reactivo
                    obj[i] = agregarCursoALista(curso)
                    i += 1
                }
            })
        })

        return obj
    })

    const fnMaximizar = () => props.setEstadoLayout("MaxHorarios")
    const fnMinimizar = () => props.setEstadoLayout("Normal")
    const estadoActualLayout = () => props.estadoLayout

    return (
        <div>
            <Switch>
                <Match when={props.estadoLayout === "Normal" || props.estadoLayout === "MaxHorarios"}>
                    <div>
                        <div className={css(
                            estilosGlobales.inlineBlock,
                            estilosGlobales.contenedor,
                        )}
                        >
                            Horarios disponibles
                        </div>
                    </div>
                    {elAnios}
                    |
                    <BotonMaxMin
                        fnMaximizar={fnMaximizar}
                        fnMinimizar={fnMinimizar}
                        estadoActualLayout={estadoActualLayout}
                        estadoLayoutMax={"MaxHorarios"}
                    />
                    <br />
                    <div className={css(estilosGlobales.contenedor)}>
                        <Tabla
                            data={dataTabla()}
                            version={props.data.version}
                            anio={anioActual()}
                            setCursosUsuarios={setListaCursos}
                            tablaObserver={tablaObserver}
                        />
                    </div>
                    <div>
                        <CursosElem
                            version={props.data.version}
                            dataAnio={dataTabla()}
                            anioActual={anioActual}
                            fnAgregarCurso={props.fnAgregarCurso}
                            listaCursosUsuario={props.listaCursosUsuario}
                            esCursoMiHorario={false}
                            setCursosUsuarios={setListaCursos}
                            tablaObserver={tablaObserver}
                        />
                    </div>
                </Match>
                <Match when={props.estadoLayout === "MaxPersonal"}>
                    {/*
                    <BotonMaxMin
                        fnMaximizar={fnMaximizar}
                        fnMinimizar={fnMinimizar}
                        estadoActualLayout={estadoActualLayout}
                        estadoLayoutMax={"MaxHorarios"}
                    />
                    */}
                    <div/>
                </Match>
            </Switch>

        </div>
    )
}
