import {StyleSheet, css} from "aphrodite/no-important";
import { createSignal, JSX } from "solid-js";

const s = StyleSheet.create({
    container: {
        display: "grid",
        gridTemplateColumns: "3.5rem 1fr 1fr",
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
        textAlign: "left",
        borderRight: "solid 2px var(--color-borde)",
    },
});

type DayIndex = 0 | 1 | 2 | 3;
const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];

function Grupo(props: {curso: string, grupo: string}) {
    const ss = StyleSheet.create({
        button: {
            display: "inline-block",
            padding: "0.25rem 0.35rem",
            textAlign: "left",
            borderRadius: "10px",
            border: "solid 2px red",
            flexGrow: 1,
            margin: "1px",
        },
    });
    return (
        <button className={css(ss.button)}>
            {props.curso}
            <br />
            {props.grupo}
        </button>
    );
}

export function Celda(props: {children: JSX.Element}) {
    const ss = StyleSheet.create({
        celda: {
            padding: "0 0.25rem",
            display: "flex",
        },
    });
    return (
        <div className={css(ss.celda)}>
            {props.children}
        </div>
    );
}

export function Table() {
    const [currentDay, setCurrentDay] = createSignal<DayIndex>(0);

    return (
        <div className={css(s.container)}>
            <div className={css(s.columna)}>
                <div className={css(s.tableIndex)} style="border: none">&nbsp;</div>
            </div>
            <div className={css(s.columna)}>
                <div className={css(s.tableIndex)}>{days[currentDay()]}</div>
                <Celda>
                    <Grupo curso="TAIS 2" grupo="LA" />
                    <Grupo curso="ST2" grupo="LB" />
                </Celda>
                <Celda>
                    <Grupo curso="TAIS 2" grupo="LB" />
                </Celda>
                <Celda>
                    <Grupo curso="TAIS" grupo="LC" />
                    <Grupo curso="PIS 2" grupo="LB" />
                    <Grupo curso="PPP" grupo="B" />
                </Celda>
            </div>
            <div className={css(s.columna)}>
                <div className={css(s.tableIndex)}>{days[currentDay() + 1]}</div>
                <div style="padding: 0 0.25rem" />
            </div>
        </div>
    );
}
