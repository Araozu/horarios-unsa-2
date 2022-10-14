import { StyleSheet, css } from "aphrodite/no-important";
import { createSignal, For } from "solid-js";
import { Swiper, SwiperSlide } from "swiper/solid";
import { horas } from "../../Store";

import "swiper/css";
import { Grupo } from "./Grupo";

const s = StyleSheet.create({
    container: {
        display: "grid",
        gridTemplateColumns: "13vw 1fr",
        textAlign: "center",
        fontSize: "0.9rem",
    },
    tableIndex: {
        backgroundColor: "rgb(108,67,75)",
        color: "white",
        padding: "0.5rem 0.25rem",
        textAlign: "center",
        width: "42vw",
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

function Dia(props: { dia: string, grupos: Array<GrupoDia> }) {
    const ss = StyleSheet.create({
        contenedorDia: {
            position: "relative",
            width: "42vw",
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

export function Table(props: { datos: TableInput }) {
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
            <Swiper
                slidesPerView={2}
                style="width: 86vw"
            >
                <SwiperSlide>{lunes}</SwiperSlide>
                <SwiperSlide>{martes}</SwiperSlide>
                <SwiperSlide>{miercoles}</SwiperSlide>
                <SwiperSlide>{jueves}</SwiperSlide>
                <SwiperSlide>{viernes}</SwiperSlide>
            </Swiper>
        </div>
    );
}
