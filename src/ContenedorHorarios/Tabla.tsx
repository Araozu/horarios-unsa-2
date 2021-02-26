import { StyleSheet, css } from "aphrodite";
import { createEffect, createMemo, createSignal, createState, For } from "solid-js";
import { estilosGlobales } from "../Estilos";
import { AnioData } from "../types/DatosHorario";
import { dias, horas, horasDescanso } from "../Store";

const e = StyleSheet.create({
    fila: {
        position: "relative",
        zIndex: 2,
        transition: "background-color 250ms",
        marginLeft: "4rem",
        display: "flex",
        alignItems: "center",
        minHeight: "1rem",
        ":hover": {
            // backgroundColor: "rgba(200, 200, 200, 0.25)"
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
        padding: "0.25rem 0",
        position: "absolute",
        top: "-0.75rem"
    },
    celdaComun: {
        width: "20%",
        textAlign: "center",
        padding: "0 0.5rem",
        boxSizing: "border-box"
    },
    celdaDia: {
        padding: "0.3rem 0"
    },
    celdaCurso: {
        display: "inline-block",
        padding: "0.25rem 0.35rem",
        cursor: "pointer",
        borderRadius: "5px",
        transition: "background-color 100ms"
    },
    celdaCursoActiva: {
        backgroundColor: "rgba(200, 200, 200, 0.25)"
    },
    celdaCursoTeoria: {
        fontWeight: "bold"
    }
});

interface DataProcesada {
    [hora: string]: {
        [dia: string]: {
            id: string,
            txt: string,
            esLab: boolean
        }[]
    }
}

const procesarAnio = (data: AnioData, anio: string, version: number) => {
    const obj: DataProcesada = {};

    for (const [, curso] of Object.entries(data)) {
        const nombreAbreviado = curso.abreviado;

        for (const [grupoStr, grupo] of Object.entries(curso.Teoria)) {
            for (const hora of grupo.Horas) {
                const dia = hora.substring(0, 2);
                const horas = hora.substring(2, 4);
                const minutos = hora.substr(4);

                const horaCompleta = horas + ":" + minutos;

                const id = `${version}_${anio}_${nombreAbreviado}_T_${grupoStr}`;

                if (!(horaCompleta in obj)) {
                    obj[horaCompleta] = {};
                }

                if (!(dia in obj[horaCompleta])) {
                    obj[horaCompleta][dia] = [];
                }

                obj[horaCompleta][dia].push({
                    id,
                    txt: `${nombreAbreviado} ${grupoStr}`,
                    esLab: false
                });
            }
        }

        for (const [grupoStr, grupo] of Object.entries(curso.Laboratorio ?? {})) {
            for (const hora of grupo.Horas) {
                const dia = hora.substring(0, 2);
                const horas = hora.substring(2, 4);
                const minutos = hora.substr(4);

                const horaCompleta = horas + ":" + minutos;

                const id = `${version}_${anio}_${nombreAbreviado}_L_${grupoStr}`;

                if (!(horaCompleta in obj)) {
                    obj[horaCompleta] = {};
                }

                if (!(dia in obj[horaCompleta])) {
                    obj[horaCompleta][dia] = [];
                }

                obj[horaCompleta][dia].push({
                    id,
                    txt: `${nombreAbreviado} L${grupoStr}`,
                    esLab: true
                });
            }
        }
    }

    return obj;
}

export function Tabla(props: { data: AnioData, anio: string, version: number }) {
    const anio = () => props.anio.substring(0, props.anio.indexOf(" "));
    const data = createMemo(() => procesarAnio(props.data, anio(), props.version));
    const [idHover, setIdHover] = createSignal("");

    const celdas = createMemo(() => {
        console.log("Renderizar tabla", props.anio);
        return <For each={horas}>
            {hora => {
                return <div style={{position: "relative"}}>
                    <div className={css(e.celdaHora, estilosGlobales.inlineBlock)}>
                        {hora.substring(0, 5)}
                    </div>
                    <div className={css(e.fila)}>
                        <For each={dias}>
                            {dia => {
                                const diaStr = dia.substring(0, 2);
                                const horaStr = hora.substring(0, 5);

                                const datos = data()?.[horaStr]?.[diaStr] ?? [];

                                return <div className={css(e.celdaComun, estilosGlobales.inlineBlock)}>
                                    <For each={datos}>
                                        {({id, txt, esLab}) => {

                                            const clases = () => {
                                                const clases = [e.celdaCurso, !esLab && e.celdaCursoTeoria];
                                                if (id === idHover()) clases.push(e.celdaCursoActiva);
                                                return css(...clases);
                                            };

                                            return <span className={clases()} onMouseEnter={() => setIdHover(id)}>
                                                {txt}
                                            </span>;
                                        }}
                                    </For>
                                </div>;
                            }}
                        </For>
                        <div className={css(e.filaBorde)}/>
                    </div>
                </div>;
            }}
        </For>
    });

    return <div>
        <div className={css(e.fila)}>
            <For each={dias}>
                {dia =>
                    <div className={css(e.celdaComun, estilosGlobales.inlineBlock, e.celdaDia)}>
                        {dia}
                    </div>
                }
            </For>
        </div>
        {celdas()}
    </div>
}