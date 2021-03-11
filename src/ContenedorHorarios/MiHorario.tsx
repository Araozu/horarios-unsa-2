import { estilosGlobales } from "../Estilos";
import { StyleSheet, css } from "aphrodite";
import { Tabla } from "./Tabla";
import { mostrarDescansos } from "../Store";
import { EstadoLayout } from "./ContenedorHorarios";
import { Switch, Match, For, createMemo } from "solid-js";
import { BotonMaxMin } from "./BotonMaxMin";
import { AnioData, ListaCursosUsuario } from "../types/DatosHorario";

interface MiHorarioProps {
    estadoLayout: EstadoLayout,
    setEstadoLayout: (v: EstadoLayout) => EstadoLayout,
    cursosUsuario: ListaCursosUsuario
}

function Horario(props: { cursosUsuario: ListaCursosUsuario }) {
    return <div>
        <For each={props.cursosUsuario.cursos}>
            {c => {
                return <div>
                    <p>{c.abreviado} - {c.nombre}</p>
                </div>
            }}
        </For>
    </div>
}

const e = StyleSheet.create({
    horario: {},
    boton: {
        textDecoration: "none",
        // paddingRight: "0.5rem",
        "::before": {
            fontSize: "1rem",
            // transform: "translateY(0.2rem)",
            textDecoration: "none"
        }
    }
});

export function MiHorario(props: MiHorarioProps) {

    const datosMiHorario = createMemo(() => {
        const obj: AnioData = {};
        props.cursosUsuario.cursos.forEach(x => {
            obj[x.nombre] = {...x};
        });
        return obj;
    });

    const claseBotonMostrarDescansos = () =>
        mostrarDescansos()
            ? "ph-check " + css(e.boton)
            : "ph-circle " + css(e.boton);

    const fnMaximizar = () => props.setEstadoLayout("MaxPersonal");
    const fnMinimizar = () => props.setEstadoLayout("Normal");
    const estadoActualLayout = () => props.estadoLayout;

    return <div>
        <Switch>
            <Match when={props.estadoLayout === "Normal" || props.estadoLayout === "MaxPersonal"}>
                <div>
                    <div className={css(
                        estilosGlobales.inlineBlock,
                        estilosGlobales.contenedor
                    )}>
                        Mi horario
                    </div>
                    |
                    <BotonMaxMin
                        fnMaximizar={fnMaximizar}
                        fnMinimizar={fnMinimizar}
                        estadoActualLayout={estadoActualLayout}
                        estadoLayoutMax={"MaxPersonal"}
                    />
                </div>

                <div className={css(
                    e.horario,
                    estilosGlobales.contenedor
                )}>
                    <Tabla data={datosMiHorario()} anio={"Mi horario"} version={1}/>

                    <Horario cursosUsuario={props.cursosUsuario}/>

                </div>
            </Match>
            <Match when={props.estadoLayout === "MaxHorarios"}>
                <BotonMaxMin
                    fnMaximizar={fnMaximizar}
                    fnMinimizar={fnMinimizar}
                    estadoActualLayout={estadoActualLayout}
                    estadoLayoutMax={"MaxPersonal"}
                />
            </Match>
        </Switch>
    </div>;
}
