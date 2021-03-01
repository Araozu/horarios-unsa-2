import { AnioData } from "../types/DatosHorario";
import { For } from "solid-js";
import { StyleSheet, css } from "aphrodite";
import { estilosGlobales } from "../Estilos";

const e = StyleSheet.create({
    contenedorCurso: {
        display: "inline-block",

    }
});

export function Cursos(props: { dataAnio: AnioData }) {
    return <>
        <For each={Object.entries(props.dataAnio)}>
            {([_, datosCurso]) => {
                return <span className={css(
                    e.contenedorCurso,
                    estilosGlobales.contenedor,
                    estilosGlobales.contenedorCursor,
                    estilosGlobales.contenedorCursorSoft
                )}
                >
                    <i className="ph-plus"/>
                    {datosCurso.abreviado} - {datosCurso.nombre}
                </span>
            }}
        </For>
    </>;
}
