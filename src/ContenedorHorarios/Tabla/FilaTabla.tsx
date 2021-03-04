import { StyleSheet, css } from "aphrodite";
import { estilosGlobales } from "../../Estilos";
import { For, createSignal } from "solid-js";
import { dias } from "../../Store";
import { CeldaFila } from "./CeldaFila";
import { DataProcesada } from "../../types/DatosHorario";

const e = StyleSheet.create({
    celdaHora: {
        textAlign: "center",
        width: "4rem",
        padding: "0.25rem 0",
        position: "absolute",
        top: "-0.75rem"
    },
    fila: {
        position: "relative",
        zIndex: 2,
        transition: "background-color 250ms, border 100ms",
        marginLeft: "4rem",
        display: "flex",
        alignItems: "center",
        minHeight: "1.5rem",
        borderLeft: "solid transparent",
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
    filaResaltada: {
        borderLeft: "solid"
    }
});

interface Props {
    hora: string,
    data: () => DataProcesada,
    idHover: () => string,
    setIdHover: (v: string) => string
}

export function FilaTabla(props: Props) {
    const [filaResaltada, setFilaResaltada] = createSignal(false);

    const hora = props.hora;
    const data = props.data;

    const claseFilaComun = css(e.fila);
    const claseFilaResaltada = css(e.fila, e.filaResaltada);

    const resaltarFila = () => {
        if (!filaResaltada()) {
            setFilaResaltada(true);
        }
    };

    const desresaltarFila = () => {
        if (filaResaltada()) {
            setFilaResaltada(false);
        }
    }

    return <div style={{position: "relative"}}>
        <div className={css(e.celdaHora, estilosGlobales.inlineBlock)}>
            {hora.substring(0, 5)}
        </div>
        <div className={filaResaltada() ? claseFilaResaltada : claseFilaComun}>
            <For each={dias}>
                {dia => {
                    const diaStr = dia.substring(0, 2);
                    const horaStr = hora.substring(0, 5);

                    const datos = data()?.[horaStr]?.[diaStr] ?? [];

                    return <CeldaFila
                        datos={datos}
                        idHover={props.idHover}
                        setIdHover={props.setIdHover}
                        fnResaltarFila={resaltarFila}
                        fnDesresaltarFila={desresaltarFila}
                    />
                }}
            </For>
            <div className={css(e.filaBorde)}/>
        </div>
    </div>;
}