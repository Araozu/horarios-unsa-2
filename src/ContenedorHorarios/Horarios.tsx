import { Curso, CursoRaw, DatosHorario, DatosHorarioRaw, ListaCursosUsuario } from "../types/DatosHorario";
import { For, createSignal, createMemo, SetStateFunction } from "solid-js";
import { css } from "aphrodite";
import { estilosGlobales } from "../Estilos";
import { Tabla } from "./Tabla";
import { CursosElem } from "./CursosElem";
import { EstadoLayout } from "./ContenedorHorarios";
import { BotonMaxMin } from "./BotonMaxMin";
import { Switch, Match } from "solid-js";

interface HorariosProps {
    data: DatosHorario,
    estadoLayout: EstadoLayout,
    setEstadoLayout: (v: EstadoLayout) => EstadoLayout,
    fnAgregarCurso: (c: Curso) => void,
    listaCursosUsuario: ListaCursosUsuario,
    setCursosUsuarios: SetStateFunction<ListaCursosUsuario>
}

export function Horarios(props: HorariosProps) {
    const [anioActual, setAnioActual] = createSignal("1er año");
    // ID que indica cuales celdas resaltar.
    const [idHover, setIdHover] = createSignal("");

    const elAnios = <For each={Object.entries(props.data.años)}>
        {([nombre]) => {
            const clases = createMemo(() => {
                const vAnio = anioActual();
                return css(
                    estilosGlobales.contenedor,
                    estilosGlobales.inlineBlock,
                    estilosGlobales.contenedorCursor,
                    estilosGlobales.contenedorCursorSoft,
                    nombre === vAnio && estilosGlobales.contenedorCursorActivo
                );
            });

            return <div className={clases()} title={"Cambiar a " + nombre} onClick={() => setAnioActual(nombre)}>
                {nombre}
            </div>
        }}
    </For>;

    const dataTabla = createMemo(() => {
        return props.data.años[anioActual()];
    });

    const fnMaximizar = () => props.setEstadoLayout("MaxHorarios");
    const fnMinimizar = () => props.setEstadoLayout("Normal");
    const estadoActualLayout = () => props.estadoLayout;

    return <div>
        <Switch>
            <Match when={props.estadoLayout === "Normal" || props.estadoLayout === "MaxHorarios"}>
                <div>
                    <div className={css(
                        estilosGlobales.inlineBlock,
                        estilosGlobales.contenedor
                    )}>
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
                <br/>
                <div className={css(estilosGlobales.contenedor)}>
                    <Tabla data={dataTabla()}
                           version={props.data.version}
                           anio={anioActual()}
                           idHover={idHover}
                           setIdHover={setIdHover}
                           setCursosUsuarios={props.setCursosUsuarios}
                    />
                </div>
                <div>
                    <CursosElem dataAnio={dataTabla()}
                                anioActual={anioActual}
                                fnAgregarCurso={props.fnAgregarCurso}
                                listaCursosUsuario={props.listaCursosUsuario}
                                idHover={idHover}
                                setIdHover={setIdHover}
                                esCursoMiHorario={false}
                    />
                </div>
            </Match>
            <Match when={props.estadoLayout === "MaxPersonal"}>
                <BotonMaxMin
                    fnMaximizar={fnMaximizar}
                    fnMinimizar={fnMinimizar}
                    estadoActualLayout={estadoActualLayout}
                    estadoLayoutMax={"MaxHorarios"}
                />
            </Match>
        </Switch>

    </div>;
}
