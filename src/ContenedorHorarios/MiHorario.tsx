import { estilosGlobales } from "../Estilos";
import { StyleSheet, css } from "aphrodite";
import { Tabla } from "./Tabla";
import { mostrarDescansos } from "../Store";
import { EstadoLayout } from "./ContenedorHorarios";
import { Switch, Match } from "solid-js";
import { BotonMaxMin } from "./BotonMaxMin";

interface MiHorarioProps {
    estadoLayout: EstadoLayout,
    setEstadoLayout: (v: EstadoLayout) => EstadoLayout
}

export function MiHorario(props: MiHorarioProps) {
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
                    {/*
                        <div
                            className={css(
                                estilosGlobales.inlineBlock,
                                estilosGlobales.contenedor,
                                estilosGlobales.contenedorCursor,
                                estilosGlobales.contenedorCursorSoft
                            )}
                            onClick={() => setMostrarDescansos(!mostrarDescansos())}
                        >
                            <i className={claseBotonMostrarDescansos()}/>
                            &nbsp;Mostrar descansos
                        </div>
                    */}
                </div>


                <div className={css(
                    e.horario,
                    estilosGlobales.contenedor
                )}>
                    <Tabla data={{}} anio={"Mi horario"} version={1}/>
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
