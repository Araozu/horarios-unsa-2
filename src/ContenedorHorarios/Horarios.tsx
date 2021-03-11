import { Curso, DatosHorario } from "../types/DatosHorario";
import { For, createSignal, createMemo} from "solid-js";
import { css } from "aphrodite";
import { estilosGlobales } from "../Estilos";
import { Tabla } from "./Tabla";
import { Cursos } from "./Cursos";
import { EstadoLayout } from "./ContenedorHorarios";
import { BotonMaxMin } from "./BotonMaxMin";
import { Switch, Match } from "solid-js";

interface HorariosProps {
    data: DatosHorario,
    estadoLayout: EstadoLayout,
    setEstadoLayout: (v: EstadoLayout) => EstadoLayout,
    fnAgregarCurso: (c: Curso) => void
}

export function Horarios(props: HorariosProps) {

    const [anioActual, setAnioActual] = createSignal("1er año");

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
                    <Tabla data={dataTabla()} version={props.data.version} anio={anioActual()}/>
                </div>
                <div>
                    <Cursos dataAnio={dataTabla()} fnAgregarCurso={props.fnAgregarCurso}/>
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
