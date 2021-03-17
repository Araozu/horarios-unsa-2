import { AnioData, Curso, DatosVariante, ListaCursosUsuario } from "../types/DatosHorario";
import { createEffect, createMemo, For } from "solid-js";
import { StyleSheet, css } from "aphrodite";
import { estilosGlobales } from "../Estilos";

const e = StyleSheet.create({
    inline: {
        display: "inline-block"
    },
    lineaTexto: {
        marginBottom: "0.5rem"
    },
    tablaGrupos: {
        whiteSpace: "pre",
        borderCollapse: "collapse",
        borderSpacing: 0
    },
    contenedorCurso: {
        display: "inline-block",
        verticalAlign: "top"
    },
    botonTexto: {
        padding: "0.25rem 0.35rem",
        borderRadius: "5px"
    }
});

interface Props {
    dataAnio: AnioData,
    fnAgregarCurso: (c: Curso) => void,
    listaCursosUsuario: ListaCursosUsuario
}

function IndicadorGrupo(props: { nombre: string, esLab: boolean }) {
    return <span className={css(e.botonTexto, estilosGlobales.contenedorCursor, estilosGlobales.contenedorCursorSoft)}
                 style={props.esLab ? {"font-style": "italic"} : {"font-weight": "bold"}}>
        {props.esLab ? "L" : ""}{props.nombre}
    </span>
}

const agruparProfesores = (datos: { [k: string]: DatosVariante }) => {
    const profesores: { [k: string]: string[] } = {};
    for (const [grupo, datosGrupo] of Object.entries(datos)) {
        const nombreProfesor = datosGrupo.Docente;
        if (!profesores[nombreProfesor]) {
            profesores[nombreProfesor] = [];
        }
        profesores[nombreProfesor].push(grupo);
    }
    return profesores;
};

export function Cursos(props: Props) {

    const claseCursoNoAgregado = css(
        e.contenedorCurso,
        estilosGlobales.contenedor
    );

    const claseCursoAgregado = css(
        e.contenedorCurso,
        estilosGlobales.contenedor,
        estilosGlobales.contenedorCursorActivo,
    );

    return <>
        <For each={Object.entries(props.dataAnio)}>
            {([_, datosCurso]) => {

                const cursoAgregadoMemo = createMemo(
                    () => props.listaCursosUsuario.cursos.find(x => {
                        return x.nombre === datosCurso.nombre && !x.oculto
                    }) !== undefined,
                    undefined,
                    (x, y) => x === y
                );

                const tituloMemo = createMemo(() => cursoAgregadoMemo()
                    ? `Remover de mi horario`
                    : `Agregar a mi horario`
                );

                const claseMemo = createMemo(() => cursoAgregadoMemo()
                    ? claseCursoAgregado
                    : claseCursoNoAgregado
                );

                const profesoresTeoria = createMemo(() => agruparProfesores(datosCurso.Teoria));
                const profesoresLab = createMemo(() => agruparProfesores(datosCurso.Laboratorio ?? {}));

                return <div className={claseMemo()}>
                    <div className={css(e.inline, e.lineaTexto)}>
                        {datosCurso.abreviado} - {datosCurso.nombre}
                    </div>
                    <table>
                        <tbody>
                        <tr>
                            <For each={Object.entries(profesoresTeoria())}>
                                {([profesor, grupos]) => {
                                    return <td style={{"padding-bottom": "0.5rem", "padding-right": "0.75rem"}}>
                                        <span>
                                            {profesor}&nbsp;
                                        </span>
                                        <For each={grupos}>
                                            {x => <IndicadorGrupo nombre={x} esLab={false}/>}
                                        </For>
                                    </td>
                                }}
                            </For>
                        </tr>
                        <tr>
                            <For each={Object.entries(profesoresLab())}>
                                {([profesor, grupos]) => {
                                    return <td style={{"padding-bottom": "0.5rem", "padding-right": "0.75rem"}}>
                                        <span>
                                            {profesor}&nbsp;
                                        </span>
                                        <For each={grupos}>
                                            {x => <IndicadorGrupo nombre={x} esLab={true}/>}
                                        </For>
                                    </td>
                                }}
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
            }}
        </For>
    </>;
}
