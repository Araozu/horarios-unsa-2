import YAML from "yaml";
import { css, StyleSheet } from "aphrodite";
import { MiHorario } from "./ContenedorHorarios/MiHorario";
import { Horarios } from "./ContenedorHorarios/Horarios";
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
    const [datos, setDatos] = createSignal<Cursos>({});

    createEffect(async() => {
        const datos = props.datos;
        batch(() => {
            setDatos(datos);
        });
    });

    return (
        <MiHorario
            cursos={datos()}
            fnAgregarCurso={agregarCursoUsuario}
            setCursosUsuarios={setCursosUsuarios}
        />
    );
}
