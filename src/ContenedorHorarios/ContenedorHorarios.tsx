import YAML from "yaml"
import { css, StyleSheet } from "aphrodite"
import { MiHorario } from "./MiHorario"
import { Horarios } from "./Horarios"
import {
    Anios,
    Cursos,
    CursoRaw,
    Curso,
    DatosHorario,
    DatosHorarioRaw,
    DatosGrupo,
    ListaCursosUsuario,
} from "../types/DatosHorario"
import { estilosGlobales } from "../Estilos"
import { batch, createEffect, createMemo, createSignal, createState, Show } from "solid-js"
import { useListaCursos } from "./useListaCursos"

const datosPromise = (async() => {
    const file = await fetch("/horarios/2020_2_fps_ingenieriadesistemas.yaml")
    const text = await file.text()
    const datosRaw = YAML.parse(text) as DatosHorarioRaw

    // Agregar los campos faltantes a DatosHorarioRaw para que sea DatosHorario
    const datos: DatosHorario = {
        ...datosRaw,
        años: {},
    }

    const anios: Anios = {}
    for (const [nombreAnio, anio] of Object.entries(datosRaw.años)) {
        const anioData: Cursos = {}
        for (const [nombreCurso, curso] of Object.entries(anio)) {

            const gruposTeoria: { [k: string]: DatosGrupo } = {}
            for (const [key, data] of Object.entries(curso.Teoria)) {
                gruposTeoria[key] = Object.assign({seleccionado: false}, data)
            }

            const gruposLab: { [k: string]: DatosGrupo } = {}
            for (const [key, data] of Object.entries(curso.Laboratorio ?? {})) {
                gruposLab[key] = Object.assign({seleccionado: false}, data)
            }

            anioData[nombreCurso] = {
                ...curso,
                oculto: false,
                Teoria: gruposTeoria,
                Laboratorio: gruposLab,
            }
        }

        anios[nombreAnio] = anioData
    }

    datos.años = anios
    return datos
})()

const ElemCargando = () => (
    <div className={css(estilosGlobales.contenedor, estilosGlobales.inlineBlock)}>
        Recuperando horarios...
    </div>
)

export type EstadoLayout = "MaxPersonal" | "Normal" | "MaxHorarios";

const {
    listaCursos: cursosUsuario,
    setListaCursos: setCursosUsuarios,
    agregarCursoALista: agregarCursoUsuario,
} = useListaCursos()

export function ContenedorHorarios() {
    const [datosCargados, setDatosCargados] = createSignal(false)
    const [datos, setDatos] = createSignal<DatosHorario | null>(null)
    const [estadoLayout, setEstadoLayout] = (
        createSignal<EstadoLayout>(localStorage.getItem("estadoLayout") as EstadoLayout || "Normal")
    )

    const e = createMemo(() => {
        let templateColumns = ""
        switch (estadoLayout()) {
            case "MaxHorarios": {
                templateColumns = "4rem auto"
                break
            }
            case "MaxPersonal": {
                templateColumns = "auto 4rem"
                break
            }
            case "Normal": {
                templateColumns = "50% 50%"
            }
        }

        localStorage.setItem("estadoLayout", estadoLayout())

        return StyleSheet.create({
            contenedor: {
                display: "grid",
                gridTemplateColumns: templateColumns,
            },
        })
    })

    createEffect(async() => {
        const datos = await datosPromise
        batch(() => {
            setDatos(datos)
            setDatosCargados(true)
        })
    })

    return (
        <div className={css(e().contenedor)}>
            <div>
                <MiHorario
                    estadoLayout={estadoLayout()}
                    setEstadoLayout={setEstadoLayout}
                    cursosUsuario={cursosUsuario}
                    fnAgregarCurso={agregarCursoUsuario}
                    setCursosUsuarios={setCursosUsuarios}
                />
            </div>
            <div>
                <Show when={datosCargados()}>
                    <Horarios
                        data={datos()!}
                        estadoLayout={estadoLayout()}
                        setEstadoLayout={setEstadoLayout}
                        fnAgregarCurso={(c) => agregarCursoUsuario(JSON.parse(JSON.stringify(c)))}
                        listaCursosUsuario={cursosUsuario}
                        setCursosUsuarios={setCursosUsuarios}
                    />
                </Show>
            </div>
        </div>
    )
}
