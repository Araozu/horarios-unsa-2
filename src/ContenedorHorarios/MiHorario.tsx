import { estilosGlobales } from "../Estilos";
import { StyleSheet, css } from "aphrodite";
import { Tabla } from "./Tabla";
import { mostrarDescansos, setMostrarDescansos } from "../Store";
import { EstadoLayout } from "./ContenedorHorarios";
import { Switch, Match } from "solid-js";

export function MiHorario(props: { estadoLayout: EstadoLayout }) {
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

    const iconoBoton = () => props.estadoLayout === "Normal" ? "ph-arrows-in" : "ph-arrows-out";

    const claseBotonMostrarDescansos = () =>
        mostrarDescansos()
            ? "ph-check " + css(e.boton)
            : "ph-circle " + css(e.boton);

    return <div>

        <Switch>
            <Match when={props.estadoLayout === "Normal"}>
                <div>
                    <div className={css(
                        estilosGlobales.inlineBlock,
                        estilosGlobales.contenedor
                    )}>
                        Mi horario
                    </div>
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
                <div
                     className={css(
                         estilosGlobales.contenedor,
                         estilosGlobales.inlineBlock,
                         estilosGlobales.contenedorCursor,
                         estilosGlobales.contenedorCursorSoft,
                         estilosGlobales.contenedorPhospor
                     )}
                >
                    <i className={css(estilosGlobales.botonPhospor) + " " + iconoBoton()}/>
                </div>
            </Match>
        </Switch>


    </div>;
}
