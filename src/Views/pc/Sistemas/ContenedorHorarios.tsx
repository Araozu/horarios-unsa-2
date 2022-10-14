import YAML from "yaml";
import { css, StyleSheet } from "aphrodite";
import { MiHorario } from "./ContenedorHorarios/MiHorario";
import { Horarios } from "./ContenedorHorarios/Horarios";
import {
    Anios,
    Cursos,
    DatosHorario,
    DatosHorarioRaw,
    DatosGrupo,
} from "../../../types/DatosHorario";
import { estilosGlobales } from "../../../Estilos";
import { batch, createEffect, createMemo, createSignal, Show } from "solid-js";
import { useListaCursos } from "./ContenedorHorarios/useListaCursos";

const datosPromise = (async() => {
    const file = await fetch("/horarios/2022_2_fps_ingenieriadesistemas.yaml");
    const text = await file.text();
    const datosRaw = YAML.parse(text) as DatosHorarioRaw;
    console.log(datosRaw);

    // Agregar los campos faltantes a DatosHorarioRaw para que sea DatosHorario
    const datos: DatosHorario = {
        ...datosRaw,
        años: {},
    };

    const anios: Anios = {};
    for (const [nombreAnio, anio] of Object.entries(datosRaw.años)) {
        const anioData: Cursos = {};
        for (const [nombreCurso, curso] of Object.entries(anio)) {

            const gruposTeoria: { [k: string]: DatosGrupo } = {};
            for (const [key, data] of Object.entries(curso.Teoria)) {
                gruposTeoria[key] = Object.assign({seleccionado: false}, data);
            }

            const gruposLab: { [k: string]: DatosGrupo } = {};
            for (const [key, data] of Object.entries(curso.Laboratorio ?? {})) {
                gruposLab[key] = Object.assign({seleccionado: false}, data);
            }

            anioData[nombreCurso] = {
                ...curso,
                oculto: false,
                Teoria: gruposTeoria,
                Laboratorio: gruposLab,
            };
        }

        anios[nombreAnio] = anioData;
    }

    datos.años = anios;
    return datos;
})();

const ElemCargando = () => (
    <div className={css(estilosGlobales.contenedor, estilosGlobales.inlineBlock)}>
        Recuperando horarios...
    </div>
);

export type EstadoLayout = "MaxPersonal" | "Normal" | "MaxHorarios";

const {
    listaCursos: cursosUsuario,
    setListaCursos: setCursosUsuarios,
    agregarCursoALista: agregarCursoUsuario,
} = useListaCursos();

export function ContenedorHorarios() {
    const [datosCargados, setDatosCargados] = createSignal(false);
    const [datos, setDatos] = createSignal<DatosHorario | null>(null);

    createEffect(async() => {
        const datos = await datosPromise;
        batch(() => {
            setDatos(datos);
            setDatosCargados(true);
        });
    });

    return (
        <MiHorario
            cursosUsuario={cursosUsuario}
            fnAgregarCurso={agregarCursoUsuario}
            setCursosUsuarios={setCursosUsuarios}
        />
    );
}
