import { estilosGlobales } from "../Estilos";
import { StyleSheet, css } from "aphrodite";
import { Tabla } from "./Tabla";
import { mostrarDescansos, setMostrarDescansos } from "../Store";

export function MiHorario() {
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

    return <div>
        <div>
            <div className={css(
                estilosGlobales.inlineBlock,
                estilosGlobales.contenedor
            )}>
                Mi horario
            </div>
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
        </div>

        <div className={css(
            e.horario,
            estilosGlobales.contenedor
        )}>
            <Tabla/>
        </div>
    </div>;
}
