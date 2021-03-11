import YAML from "yaml";
import { StyleSheet, css } from "aphrodite";
import { MiHorario } from "./MiHorario";
import { Horarios } from "./Horarios";
import { Curso, CursoUsuario, DatosHorario, DatosVarianteUsuario, ListaCursosUsuario } from "../types/DatosHorario";
import { estilosGlobales } from "../Estilos";
import { Show, createSignal, createEffect, createMemo, batch, createState } from "solid-js";

const datosPromise = (async () => {
    const file = await fetch("/horarios/2020_2_fps_ingenieriadesistemas.yaml");
    const text = await file.text();
    return YAML.parse(text) as DatosHorario;
})();

const ElemCargando = () =>
    <div className={css(estilosGlobales.contenedor, estilosGlobales.inlineBlock)}>
        Recuperando horarios...
    </div>

export type EstadoLayout = "MaxPersonal" | "Normal" | "MaxHorarios";

const [cursosUsuario, setCursosUsuarios] = createState<ListaCursosUsuario>({
    cursos: []
});



const agregarCursoUsuario = (curso: Curso) => {
    if (cursosUsuario.cursos.find(x => x.nombre === curso.nombre)) {
        return;
    }

    const gruposTeoria: { [k: string]: DatosVarianteUsuario } = {};
    for (const [key, data] of Object.entries(curso.Teoria)) {
        gruposTeoria[key] = Object.assign({seleccionado: false}, data);
    }

    const gruposLab: { [k: string]: DatosVarianteUsuario } = {};
    for (const [key, data] of Object.entries(curso.Laboratorio ?? {})) {
        gruposLab[key] = Object.assign({seleccionado: false}, data);
    }

    const cursoUsuario: CursoUsuario = {
        ...curso,
        oculto: false,
        Teoria: gruposTeoria,
        Laboratorio: gruposLab
    };

    setCursosUsuarios("cursos", a => [...a, cursoUsuario]);
};

export function ContenedorHorarios() {
    const [datosCargados, setDatosCargados] = createSignal(false);
    const [datos, setDatos] = createSignal<DatosHorario | null>(null);
    const [estadoLayout, setEstadoLayout] = createSignal<EstadoLayout>(
        localStorage.getItem("estadoLayout") as EstadoLayout || "Normal"
    );

    const e = createMemo(() => {
        let templateColumns = "";
        switch (estadoLayout()) {
            case "MaxHorarios": {
                templateColumns = "4rem auto";
                break;
            }
            case "MaxPersonal": {
                templateColumns = "auto 4rem";
                break;
            }
            case "Normal": {
                templateColumns = "50% 50%"
            }
        }

        localStorage.setItem("estadoLayout", estadoLayout());

        return StyleSheet.create({
            contenedor: {
                display: "grid",
                gridTemplateColumns: templateColumns
            }
        });
    });

    createEffect(async () => {
        const datos = await datosPromise;
        batch(() => {
            setDatos(datos);
            setDatosCargados(true);
        });
    });

    return <div className={css(e().contenedor)}>
        <div>
            <MiHorario estadoLayout={estadoLayout()} setEstadoLayout={setEstadoLayout} cursosUsuario={cursosUsuario}/>
        </div>
        <div>
            <Show when={datosCargados()}>
                <Horarios data={datos()!!}
                          estadoLayout={estadoLayout()}
                          setEstadoLayout={setEstadoLayout}
                          fnAgregarCurso={agregarCursoUsuario}/>
            </Show>
        </div>
    </div>;
}
