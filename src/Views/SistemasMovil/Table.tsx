import {StyleSheet, css} from "aphrodite/no-important";
import { createSignal, For } from "solid-js";
import { horas } from "../../Store";

const s = StyleSheet.create({
    container: {
        display: "grid",
        gridTemplateColumns: "13vw 1fr 1fr",
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

type DayIndex = 0 | 1 | 2 | 3 | 4;
const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];

export type GrupoDia = {
    id_horario: number,
    id_laboratorio: number,
    abreviado: string,
    grupo: string,
    offsetVertical: number, // 07:00 -> 0, 07:50 -> 1
    nroHoras: number,
    offsetHorizontal: number, // 0, 1, 2
    fraccion: number, // por cuanto dividir la celda. 1, 2, 3, ...
}

function Grupo(props: {data: GrupoDia}) {
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
    const estilo = () => {
        const fraccion = props.data.fraccion;
        const offsetHorizontal = props.data.offsetHorizontal + 1;
        const offsetVertical = props.data.offsetVertical;
        const nroHoras = props.data.nroHoras;
        return `left: calc((43vw / ${fraccion}) * ${offsetHorizontal} - 14vw); top: ${offsetVertical * 3}rem;` +
            `height: ${nroHoras * 3}rem; width: calc(100% / ${fraccion})`;
    };
    return (
        <button className={css(ss.button)} style={estilo()}>
            {props.data.abreviado}
            <br />
            {props.data.grupo}
        </button>
    );
}

function Dia(props: {dia: string, grupos: Array<GrupoDia>}) {
    const ss = StyleSheet.create({
        contenedorDia: {
            position: "relative",
        },
    });
    return (
        <div className={css(s.columna)}>
            <div className={css(s.tableIndex)}>{props.dia}</div>
            <div className={css(ss.contenedorDia)}>
                <For each={props.grupos}>
                    {(grupo) => (
                        <Grupo data={grupo} />
                    )}
                </For>
            </div>
        </div>
    );
}

export type TableInput = {
    lunes: Array<GrupoDia>,
    martes: Array<GrupoDia>,
    miercoles: Array<GrupoDia>,
    jueves: Array<GrupoDia>,
    viernes: Array<GrupoDia>,
}

export function Table(props: {datos: TableInput}) {
    const [currentDay, setCurrentDay] = createSignal<DayIndex>(0);

    const lunes = <Dia dia={"Lunes"} grupos={props.datos.lunes} />;
    const martes = <Dia dia={"Martes"} grupos={props.datos.martes} />;
    const miercoles = <Dia dia={"Miercoles"} grupos={props.datos.miercoles} />;
    const jueves = <Dia dia={"Jueves"} grupos={props.datos.jueves} />;
    const viernes = <Dia dia={"Viernes"} grupos={props.datos.viernes} />;

    return (
        <div className={css(s.container)}>
            <div className={css(s.columna)}>
                <div className={css(s.tableIndex)} style="border: none; background: transparent;">&nbsp;</div>
                <For each={horas}>
                    {(hora) => <div className={css(s.celdaHora)}>{hora.substring(0, 5)}</div>}
                </For>
            </div>
            {martes}
            {miercoles}
        </div>
    );
}
