import YAML from "yaml";
import { css, StyleSheet } from "aphrodite";
import { MiHorario } from "./ContenedorHorarios/MiHorario";
import {
    Anios,
    Cursos,
    DatosHorario,
    DatosGrupo,
} from "../../../types/DatosHorario";
import { batch, createEffect, createMemo, createSignal, Show } from "solid-js";
import { useListaCursos } from "./ContenedorHorarios/useListaCursos";

export type EstadoLayout = "MaxPersonal" | "Normal" | "MaxHorarios";

const {
    listaCursos: cursosUsuario,
    setListaCursos: setCursosUsuarios,
    agregarCursoALista: agregarCursoUsuario,
} = useListaCursos();

export function ContenedorHorarios(props: {datos: Cursos}) {

    createEffect(async() => {
        const d2 = props.datos;
        batch(() => {
            Object.entries(d2).forEach(([_, curso]) => agregarCursoUsuario(curso));
        });
    });

    return (
        <MiHorario
            cursos={props.datos}
            fnAgregarCurso={agregarCursoUsuario}
            setCursosUsuarios={setCursosUsuarios}
        />
    );
}
