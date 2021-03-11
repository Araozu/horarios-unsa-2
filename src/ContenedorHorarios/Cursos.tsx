import { AnioData, Curso } from "../types/DatosHorario";
import { For } from "solid-js";
import { StyleSheet, css } from "aphrodite";
import { estilosGlobales } from "../Estilos";

const e = StyleSheet.create({
    contenedorCurso: {
        display: "inline-block",

    }
});

export function Cursos(props: { dataAnio: AnioData, fnAgregarCurso: (c: Curso) => void }) {
    return <>
        <For each={Object.entries(props.dataAnio)}>
            {([_, datosCurso]) => {
                return <span title={"Agregar " + datosCurso.abreviado + " a mi horario"} className={css(
                    e.contenedorCurso,
                    estilosGlobales.contenedor,
                    estilosGlobales.contenedorCursor,
                    estilosGlobales.contenedorCursorSoft
                )}
                             onClick={() => props.fnAgregarCurso(datosCurso)}
                >
                    <i className="ph-plus"/>
                    {datosCurso.abreviado} - {datosCurso.nombre}
                </span>
            }}
        </For>
    </>;
}
