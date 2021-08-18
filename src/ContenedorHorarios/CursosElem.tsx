import { Cursos, DatosGrupo, ListaCursosUsuario, Curso } from "../types/DatosHorario"
import { createMemo, For, produce, SetStateFunction } from "solid-js"
import { StyleSheet, css } from "aphrodite"
import { estilosGlobales } from "../Estilos"
import { TablaObserver } from "./TablaObserver"

const e = StyleSheet.create({
    inline: {
        display: "inline-block",
    },
    lineaTexto: {
        marginBottom: "0.5rem",
    },
    tablaGrupos: {
        whiteSpace: "pre",
        borderCollapse: "collapse",
        borderSpacing: 0,
    },
    contenedorCurso: {
        display: "inline-block",
        verticalAlign: "top",
    },
    cursoOculto: {
        display: "none",
    },
    botonTexto: {
        padding: "0.25rem 0.35rem",
        borderRadius: "5px",
    },
    botonCurso: {
        backgroundColor: "transparent",
        border: "none",
        color: "var(--color)",
    },
})

const claseCursoNoAgregado = css(
    e.contenedorCurso,
    estilosGlobales.contenedor,
)

const claseCursoOculto = css(e.cursoOculto)

interface Props {
    version: number,
    dataAnio: Cursos,
    anioActual: () => string,
    fnAgregarCurso: (c: Curso) => void,
    listaCursosUsuario: ListaCursosUsuario,
    esCursoMiHorario: boolean,
    setCursosUsuarios: SetStateFunction<ListaCursosUsuario>,
    tablaObserver: TablaObserver,
}

type FnSetCursosUsuarios = SetStateFunction<ListaCursosUsuario>;

interface PropsIndicadorGrupo {
    nombre: string,
    esLab: boolean,
    idParcial: string,
    tablaObserver: TablaObserver,
    onClick: () => void
}

function IndicadorGrupo(props: PropsIndicadorGrupo) {
    const id = `${props.idParcial}_${props.esLab ? "L" : "T"}_${props.nombre}`
    return (
        <span className={css(e.botonTexto, estilosGlobales.contenedorCursor, estilosGlobales.contenedorCursorSoft)}
            style={props.esLab ? {"font-style": "italic"} : {"font-weight": "bold"}}
            onMouseEnter={() => props.tablaObserver.resaltar(id)}
            onMouseLeave={() => props.tablaObserver.quitarResaltado()}
            onClick={props.onClick}
        >
            {props.esLab ? "L" : ""}{props.nombre}
        </span>
    )
}

const agruparProfesores = (
    datos: { [k: string]: DatosGrupo },
    indiceCurso: number,
    esLab: boolean,
    setCursosUsuarios: FnSetCursosUsuarios,
) => {
    const profesores: { [k: string]: [string, () => void][] } = {}
    for (const [grupo, datosGrupo] of Object.entries(datos)) {
        const nombreProfesor = datosGrupo.Docente
        if (!profesores[nombreProfesor]) {
            profesores[nombreProfesor] = []
        }
        profesores[nombreProfesor].push([
            grupo,
            () => {
                setCursosUsuarios("cursos", Number(indiceCurso), "Teoria", produce<{ [p: string]: DatosGrupo }>((x) => {
                    const grupoActualSeleccionado = x[grupo].seleccionado

                    if (grupoActualSeleccionado) {
                        x[grupo].seleccionado = false
                    } else {
                        for (let xKey in x) {
                            x[xKey].seleccionado = xKey === grupo
                        }
                    }
                }))
            },
        ])
    }
    return profesores
}

function CursoE(
    indiceCurso: string,
    datosCurso: Curso, 
    anio: () => string, 
    claseCursoAgregado: string, 
    props: Props
) {
    const idCurso = `${props.version}_${anio()}_${datosCurso.abreviado}`

    const cursoAgregadoMemo = createMemo(
        () => props.listaCursosUsuario.cursos.find((x) => x.nombre === datosCurso.nombre && !x.oculto) !== undefined,
        undefined,
        (x, y) => x === y,
    )

    const tituloMemo = createMemo(() => (cursoAgregadoMemo()
        ? "Remover de mi horario"
        : "Agregar a mi horario"))

    const claseMemo = createMemo(() => {
        if (props.esCursoMiHorario && datosCurso.oculto) {
            return claseCursoOculto
        }
        return cursoAgregadoMemo()
            ? claseCursoAgregado
            : claseCursoNoAgregado
    })

    const profesoresTeoria = createMemo(() => agruparProfesores(
        datosCurso.Teoria,
        Number(indiceCurso),
        false,
        props.setCursosUsuarios,
    ))
    const profesoresLab = createMemo(() => agruparProfesores(
        datosCurso.Laboratorio ?? {},
        Number(indiceCurso),
        true,
        props.setCursosUsuarios,
    ))

    const IndicadorGrupos = (profesor: string, grupos: [string, () => void][], esLab: boolean) => (
        <td style={{"padding-bottom": "0.5rem", "padding-right": "0.75rem"}}>
            <span>
                {profesor}&nbsp;
            </span>
            <For each={grupos}>
                {([x, fnOnClick]) => (
                    <IndicadorGrupo
                        nombre={x}
                        esLab={esLab}
                        idParcial={idCurso}
                        tablaObserver={props.tablaObserver}
                        onClick={fnOnClick}
                    />
                )
                }
            </For>
        </td>
    )

    return (
        <div className={claseMemo()}>
            <button
                className={css(e.botonCurso, e.inline, e.lineaTexto, e.botonTexto, estilosGlobales.contenedorCursor, estilosGlobales.contenedorCursorSoft)}
                onMouseEnter={() => props.tablaObserver.resaltar(idCurso)}
                onMouseLeave={() => props.tablaObserver.quitarResaltado()}
            >
                {datosCurso.abreviado} - {datosCurso.nombre}
            </button>
            <table>
                <tbody>
                    <tr>
                        <For each={Object.entries(profesoresTeoria())}>
                            {([profesor, grupos]) => IndicadorGrupos(profesor, grupos, false)}
                        </For>
                    </tr>
                    <tr>
                        <For each={Object.entries(profesoresLab())}>
                            {([profesor, grupos]) => IndicadorGrupos(profesor, grupos, true)}
                        </For>
                    </tr>
                </tbody>
            </table>
            <button
                className={css(e.botonTexto, estilosGlobales.contenedorCursor, estilosGlobales.contenedorCursorSoft)}
                onClick={() => props.fnAgregarCurso(datosCurso)}
            >
                {tituloMemo}
            </button>
        </div>
    )
}

export function CursosElem(props: Props) {
    const anio = () => props.anioActual().substring(0, props.anioActual().indexOf(" "))

    const claseCursoAgregado = css(
        e.contenedorCurso,
        estilosGlobales.contenedor,
        !props.esCursoMiHorario && estilosGlobales.contenedorCursorActivo,
    )

    return (
        <>
            <For each={Object.entries(props.dataAnio)}>
                {([indiceCurso, datosCurso]) => CursoE(indiceCurso, datosCurso, anio, claseCursoAgregado, props)}
            </For>
        </>
    )
}
