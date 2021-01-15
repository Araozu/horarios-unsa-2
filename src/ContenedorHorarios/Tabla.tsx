import { StyleSheet, css } from "aphrodite";
import { For, Show } from "solid-js";
import { estilosGlobales } from "../Estilos";
import { mostrarDescansos } from "../Store";

const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
const horas = [
    "07:00 - 07:50",
    "07:50 - 08:40",
    "08:40 - 08:50",
    "08:50 - 09:40",
    "09:40 - 10:30",
    "10:30 - 10:40",
    "10:40 - 11:30",
    "11:30 - 12:20",
    "12:20 - 13:10",
    "13:10 - 14:00",
    "14:00 - 14:50",
    "14:50 - 15:40",
    "15:40 - 15:50",
    "15:50 - 16:40",
    "16:40 - 17:30",
    "17:30 - 17:40",
    "17:40 - 18:30",
    "18:30 - 19:20",
    "19:20 - 20:10",
    "20:10 - 21:00"
]
const horasDescanso = [
    "08:40 - 08:50",
    "10:30 - 10:40",
    "15:40 - 15:50",
    "17:30 - 17:40"
]

export function Tabla() {
    const e = StyleSheet.create({
        fila: {
            position: "relative",
            zIndex: 2,
            transition: "background-color 250ms",
            ":hover": {
                backgroundColor: "rgba(200, 200, 200, 0.25)"
            }
        },
        filaBorde: {
            position: "absolute",
            top: 0,
            height: "1px",
            width: "100%",
            backgroundColor: "rgba(200, 200, 200, 0.25)",
            zIndex: 1
        },
        celdaHora: {
            textAlign: "center",
            width: "4rem",
            padding: "0.25rem 0"
        },
        celdaComun: {
            width: "calc((100% - 4rem) / 5)",
            textAlign: "center",
            padding: "0 0.5rem",
            boxSizing: "border-box"
        }
    });

    return <div>
        <div className={css(e.fila)}>
            <div className={css(e.celdaHora, estilosGlobales.inlineBlock)}>
                Hora
            </div>
            <For each={dias}>
                {dia =>
                    <div className={css(e.celdaComun, estilosGlobales.inlineBlock)}>
                        {dia}
                    </div>
                }
            </For>
        </div>
        <For each={horas}>
            {hora =>
                <div className={css(e.fila)}>
                    <div className={css(e.celdaHora, estilosGlobales.inlineBlock)}>
                        {hora.substring(0, 5)}
                    </div>
                    <For each={dias}>
                        {() =>
                            <div className={css(e.celdaComun, estilosGlobales.inlineBlock)}>
                                :D
                            </div>
                        }
                    </For>
                    <div className={css(e.filaBorde)}/>
                </div>
            }
        </For>
    </div>
}