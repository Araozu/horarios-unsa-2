import { AnioData, Curso, ListaCursosUsuario } from "../types/DatosHorario";
import { createEffect, createMemo, For } from "solid-js";
import { StyleSheet, css } from "aphrodite";
import { estilosGlobales } from "../Estilos";

const e = StyleSheet.create({
    contenedorCurso: {
        display: "inline-block"
    }
});

interface Props {
    dataAnio: AnioData,
    fnAgregarCurso: (c: Curso) => void,
    listaCursosUsuario: ListaCursosUsuario
}

export function Cursos(props: Props) {

    const claseCursoNoAgregado = css(
        e.contenedorCurso,
        estilosGlobales.contenedor,
        estilosGlobales.contenedorCursor,
        estilosGlobales.contenedorCursorSoft
    );

    const claseCursoAgregado = css(
        e.contenedorCurso,
        estilosGlobales.contenedor,
        estilosGlobales.contenedorCursor,
        estilosGlobales.contenedorCursorSoft,
        estilosGlobales.contenedorCursorActivo,
    );

    return <>
        <For each={Object.entries(props.dataAnio)}>
            {([_, datosCurso]) => {

                const cursoAgregadoMemo = createMemo(
                    () => props.listaCursosUsuario.cursos.find(x => x.nombre === datosCurso.nombre) !== undefined,
                    undefined,
                    (x, y) => x === y
                );

                const tituloMemo = createMemo(() => cursoAgregadoMemo()
                    ? `Remover ${datosCurso.abreviado} de mi horario`
                    : `Agregar ${datosCurso.abreviado} a mi horario`
                );

                const claseMemo = createMemo(() =>
                    cursoAgregadoMemo()
                        ? claseCursoAgregado
                        : claseCursoNoAgregado
                );

                const iconoMemo = createMemo(() =>
                    cursoAgregadoMemo()
                        ? "ph-minus"
                        : "ph-plus"
                );

                return <span title={tituloMemo()}
                             className={claseMemo()}
                             onClick={() => props.fnAgregarCurso(datosCurso)}
                >
                    <i className={iconoMemo()}/>
                    {datosCurso.abreviado} - {datosCurso.nombre}
                </span>
            }}
        </For>
    </>;
}
