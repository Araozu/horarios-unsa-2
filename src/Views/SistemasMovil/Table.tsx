import {StyleSheet, css} from "aphrodite/no-important";
import { createSignal, For, JSX } from "solid-js";
import { horas } from "../../Store";

const s = StyleSheet.create({
    container: {
        display: "grid",
        gridTemplateColumns: "14vw 1fr 1fr",
        textAlign: "center",
        fontSize: "0.9rem",
    },
    tableIndex: {
        backgroundColor: "rgba(83,25,37,0.8)",
        color: "white",
        padding: "0.5rem 0.25rem",
        textAlign: "center",
    },
    columna: {
        borderRight: "solid 2px var(--color-borde)",
    },
    celdaHora: {
        position: "relative",
        top: "-0.75rem",
        height: "3rem",
    },
});

type DayIndex = 0 | 1 | 2 | 3;
const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];

type Output = {
    curso: string,
    grupo: string,
    idxHoraInicio: number,
    nroHoras: number,
    offset: number, // 0, 1, 2
    fraccion: number, // por cuanto dividir la celda. 1, 2, 3, ...
}

function Grupo(props: {data: Output}) {
    const ss = StyleSheet.create({
        button: {
            display: "inline-block",
            padding: "0.2rem 0.2rem",
            textAlign: "left",
            borderRadius: "10px",
            border: "solid 2px red",
            position: "absolute",
        },
    });
    return (
        <button className={css(ss.button)} style={`left: calc((43vw / ${props.data.fraccion}) * ${props.data.offset} - 14vw); top: ${props.data.idxHoraInicio * 3}rem; height: ${props.data.nroHoras * 3}rem; width: calc(100% / ${props.data.fraccion})`}>
            {props.data.curso}
            <br />
            {props.data.grupo}
        </button>
    );
}

function Dia(props: {dia: string}) {
    const ss = StyleSheet.create({
        contenedorDia: {
            position: "relative",
        },
    });
    return (
        <div className={css(s.columna)}>
            <div className={css(s.tableIndex)}>{props.dia}</div>
            <div className={css(ss.contenedorDia)}>
                <Grupo data={{
                    curso: "TAIS",
                    grupo: "LA",
                    idxHoraInicio: 0,
                    nroHoras: 3,
                    offset: 1,
                    fraccion: 3,
                }}
                />
                <Grupo data={{
                    curso: "PPP",
                    grupo: "LB",
                    idxHoraInicio: 2,
                    nroHoras: 2,
                    offset: 2,
                    fraccion: 3,
                }}
                />
                <Grupo data={{
                    curso: "FC",
                    grupo: "LC",
                    idxHoraInicio: 1,
                    nroHoras: 4,
                    offset: 3,
                    fraccion: 3,
                }}
                />
            </div>
        </div>
    );
}

export function Table() {
    const [currentDay, setCurrentDay] = createSignal<DayIndex>(0);

    return (
        <div className={css(s.container)}>
            <div className={css(s.columna)}>
                <div className={css(s.tableIndex)} style="border: none; background: transparent;">&nbsp;</div>
                <For each={horas}>
                    {(hora) => <div className={css(s.celdaHora)}>{hora.substring(0, 5)}</div>}
                </For>
            </div>
            <Dia dia={days[currentDay()]} />
            <Dia dia={days[currentDay() + 1]} />
        </div>
    );
}
