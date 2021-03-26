import { Cursos, CursoRaw, DatosGrupo, ListaCursosUsuario, Curso } from "../types/DatosHorario"
import { createEffect, createMemo, For, SetStateFunction } from "solid-js"
import { StyleSheet, css } from "aphrodite"
import { estilosGlobales } from "../Estilos"

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
})

interface Props {
    dataAnio: Cursos,
    anioActual: () => string,
    fnAgregarCurso: (c: Curso) => void,
    listaCursosUsuario: ListaCursosUsuario,
    idHover: () => string,
    setIdHover: (v: string) => string,
    esCursoMiHorario: boolean,
    setCursosUsuarios: SetStateFunction<ListaCursosUsuario>
}

type FnSetCursosUsuarios = SetStateFunction<ListaCursosUsuario>;

interface PropsIndicadorGrupo {
    nombre: string,
    esLab: boolean,
    idParcial: string,
    setIdHover: (v: string) => string,
    onClick: () => void
}

function IndicadorGrupo(props: PropsIndicadorGrupo) {
    const id = `${props.idParcial}_${props.esLab ? "L" : "T"}_${props.nombre}`
    return (
        <span className={css(e.botonTexto, estilosGlobales.contenedorCursor, estilosGlobales.contenedorCursorSoft)}
            style={props.esLab ? {"font-style": "italic"} : {"font-weight": "bold"}}
            onMouseEnter={() => props.setIdHover(id)}
            onMouseLeave={() => props.setIdHover("")}
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
                setCursosUsuarios(
                    "cursos",
                    indiceCurso,
                    esLab ? "Laboratorio" : "Teoria",
                    /// @ts-ignore
                    grupo,
                    "seleccionado",
                    (x) => !x,
                )
            },
        ])
    }
    return profesores
}

export function CursosElem(props: Props) {
    const anio = () => props.anioActual().substring(0, props.anioActual().indexOf(" "))

    const claseCursoNoAgregado = css(
        e.contenedorCurso,
        estilosGlobales.contenedor,
    )

    const claseCursoAgregado = css(
        e.contenedorCurso,
        estilosGlobales.contenedor,
        !props.esCursoMiHorario && estilosGlobales.contenedorCursorActivo,
    )

    const claseCursoOculto = css(e.cursoOculto)

    return (
        <>
            <For each={Object.entries(props.dataAnio)}>
                {([indiceCurso, datosCurso]) => {

                    const idCurso = `${anio()}_${datosCurso.abreviado}`

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

                    return (
                        <div className={claseMemo()}>
                            <div
                                className={css(e.inline, e.lineaTexto, e.botonTexto, estilosGlobales.contenedorCursor, estilosGlobales.contenedorCursorSoft)}
                                onMouseEnter={() => props.setIdHover(idCurso)}
                                onMouseLeave={() => props.setIdHover("")}
                            >
                                {datosCurso.abreviado} - {datosCurso.nombre}
                            </div>
                            <table>
                                <tbody>
                                    <tr>
                                        <For each={Object.entries(profesoresTeoria())}>
                                            {([profesor, grupos]) => (
                                                <td style={{"padding-bottom": "0.5rem", "padding-right": "0.75rem"}}>
                                                    <span>
                                                        {profesor}&nbsp;
                                                    </span>
                                                    <For each={grupos}>
                                                        {([x, fnOnClick]) => (
                                                            <IndicadorGrupo nombre={x}
                                                                esLab={false}
                                                                idParcial={idCurso}
                                                                setIdHover={props.setIdHover}
                                                                onClick={fnOnClick}
                                                            />
                                                        )
                                                        }
                                                    </For>
                                                </td>
                                            )}
                                        </For>
                                    </tr>
                                    <tr>
                                        <For each={Object.entries(profesoresLab())}>
                                            {([profesor, grupos]) => (
                                                <td style={{"padding-bottom": "0.5rem", "padding-right": "0.75rem"}}>
                                                    <span>
                                                        {profesor}&nbsp;
                                                    </span>
                                                    <For each={grupos}>
                                                        {([x, fnOnClick]) => (
                                                            <IndicadorGrupo nombre={x}
                                                                esLab
                                                                idParcial={idCurso}
                                                                setIdHover={props.setIdHover}
                                                                onClick={fnOnClick}
                                                            />
                                                        )
                                                        }
                                                    </For>
                                                </td>
                                            )}
                                        </For>
                                    </tr>
                                </tbody>
                            </table>
                            <span
                                className={css(e.botonTexto, estilosGlobales.contenedorCursor, estilosGlobales.contenedorCursorSoft)}
                                onClick={() => props.fnAgregarCurso(datosCurso)}
                            >
                                {tituloMemo}
                            </span>
                        </div>
                    )
                }}
            </For>
        </>
    )
}
