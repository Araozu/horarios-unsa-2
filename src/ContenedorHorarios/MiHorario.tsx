import { estilosGlobales } from "../Estilos";
import { StyleSheet, css } from "aphrodite";
import { Tabla } from "./Tabla";
import { mostrarDescansos } from "../Store";
import { EstadoLayout } from "./ContenedorHorarios";
import { Switch, Match, For, createMemo } from "solid-js";
import { BotonMaxMin } from "./BotonMaxMin";
import { BotonIcono } from "./BotonIcono";
import { Cursos, ListaCursosUsuario } from "../types/DatosHorario";

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
        const obj: Cursos = {};
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

    /* TODO: En barra superior colocar todos los horarios. En barra inferior el horario
        actual.
        Al hacer click en un horario de la barra superior, llevarlo al inicio de la lista.
     */
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
                </div>

                <div>
                    <div className={css(
                        estilosGlobales.inlineBlock,
                        estilosGlobales.contenedor
                    )}>
                        Mi horario
                    </div>
                    |
                    <BotonIcono titulo={"Nuevo horario en blanco"}
                                icono={"ph-plus"}
                                onClick={() => {
                                }}
                    />
                    <BotonIcono titulo={"Reiniciar horario"}
                                icono={"ph-arrow-counter-clockwise"}
                                onClick={() => {
                                }}
                    />
                    <BotonIcono titulo={"Duplicar horario"}
                                icono={"ph-copy"}
                                onClick={() => {
                                }}
                    />
                    <BotonIcono titulo={"Eliminar horario"}
                                icono={"ph-trash"}
                                onClick={() => {
                                }}
                    />
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
                    <Tabla data={datosMiHorario()}
                           anio={"Mi horario"}
                           version={1}
                           idHover={() => ""}
                           setIdHover={(v: string) => ""}
                    />

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
