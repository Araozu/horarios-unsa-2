import { StyleSheet, css } from "aphrodite";
import { estilosGlobales } from "../../Estilos";
import { For, createMemo } from "solid-js";
import {createStore, Store} from "solid-js/store";
import { Dia, dias } from "../../Store";
import { CeldaFila } from "./CeldaFila";
import { DataProcesada } from "../../types/DatosHorario";
import { coloresBorde, diaANum } from "../Tabla";
import { TablaObserver } from "../TablaObserver";

const e = StyleSheet.create({
    celdaHora: {
        textAlign: "center",
        width: "3.3rem",
        padding: "0.25rem 0",
        position: "absolute",
        top: "-0.75rem",
    },
    filaResaltado: {
        position: "absolute",
        zIndex: -1,
        height: "100%",
        transform: "translateX(-1rem)",
    },
    fila: {
        position: "relative",
        zIndex: 2,
        transition: "background-color 250ms, border 100ms",
        marginLeft: "4.3rem",
        display: "flex",
        alignItems: "center",
        minHeight: "1.1rem",
        ":hover": {
            // backgroundColor: "rgba(200, 200, 200, 0.25)"
        },
    },
    filaBorde: {
        position: "absolute",
        top: 0,
        height: "1px",
        width: "100%",
        backgroundColor: "rgba(200, 200, 200, 0.25)",
        zIndex: -1,
    },
    celdaResaltado: {
        height: "101%",
        width: "0.2rem",
        display: "inline-block",
    },
    celdaResaltadoTransparente: {
        backgroundColor: "transparent",
    },
});

const [diasResaltados, setDiasResaltados] = createStore({
    Lunes: 0,
    Martes: 0,
    Miercoles: 0,
    Jueves: 0,
    Viernes: 0,
} as { [k: string]: number });

interface Props {
    hora: string,
    data: DataProcesada,
    tablaObserver: TablaObserver,
}

const diasFilter = createMemo(() => Object.entries(diasResaltados)
    .filter((x) => x[1] > 0)
    .map((x) => x[0] as Dia)
    .sort((x, y) => (diaANum(x) > diaANum(y) ? 1 : -1)));

const useDiasResaltados: () => [
    Store<{ [k: string]: boolean }>,
    (d: Dia) => void,
    (d: Dia) => void
] = () => {
    const [diasResaltadosLocal, setDiasResaltadosLocal] = createStore({
        Lunes: false,
        Martes: false,
        Miercoles: false,
        Jueves: false,
        Viernes: false,
    } as { [k: string]: boolean });

    const fnResaltar = (d: Dia) => {
        setDiasResaltadosLocal(d, true);
        setDiasResaltados(d, (v) => v + 1);
    };

    const fnDesresaltar = (d: Dia) => {
        setDiasResaltadosLocal(d, false);
        setDiasResaltados(d, (v) => v - 1);
    };

    return [diasResaltadosLocal, fnResaltar, fnDesresaltar];
};

export function FilaTabla(props: Props) {
    const [diasResaltadosLocal, fnResaltar, fnDesresaltar] = useDiasResaltados();

    const hora = props.hora;
    const data = props.data;

    return (
        <div style={{position: "relative"}}>
            <div className={css(e.celdaHora, estilosGlobales.inlineBlock)}>
                {hora.substring(0, 5)}
            </div>
            <div className={css(e.fila)}>
                <div className={css(estilosGlobales.inlineBlock, e.filaResaltado)}>
                    <div
                        className={css(e.celdaResaltado, diasResaltadosLocal.Lunes ? null : e.celdaResaltadoTransparente)}
                        style={{"background-color": coloresBorde[0]}}
                    />
                    <div
                        className={css(e.celdaResaltado, diasResaltadosLocal.Martes ? null : e.celdaResaltadoTransparente)}
                        style={{"background-color": coloresBorde[1]}}
                    />
                    <div
                        className={css(e.celdaResaltado, diasResaltadosLocal.Miercoles ? null : e.celdaResaltadoTransparente)}
                        style={{"background-color": coloresBorde[2]}}
                    />
                    <div
                        className={css(e.celdaResaltado, diasResaltadosLocal.Jueves ? null : e.celdaResaltadoTransparente)}
                        style={{"background-color": coloresBorde[3]}}
                    />
                    <div
                        className={css(e.celdaResaltado, diasResaltadosLocal.Viernes ? null : e.celdaResaltadoTransparente)}
                        style={{"background-color": coloresBorde[4]}}
                    />
                </div>
                <For each={dias}>
                    {(dia) => {
                        const diaStr = dia.substring(0, 2);
                        const horaStr = hora.substring(0, 5);

                        const datos = data?.[horaStr]?.[diaStr] ?? [];

                        return (
                            <CeldaFila
                                datos={datos}
                                fnResaltarFila={() => fnResaltar(dia)}
                                fnDesresaltarFila={() => fnDesresaltar(dia)}
                                dia={dia}
                                tablaObserver={props.tablaObserver}
                            />
                        );
                    }}
                </For>
                <div className={css(e.filaBorde)} />
            </div>
        </div>
    );
}
